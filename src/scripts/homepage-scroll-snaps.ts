type ScrollDirection = "up" | "down" | "idle";
type ScrollSnapAlign = "start" | "end";

interface ScrollSnapContext {
	direction: ScrollDirection;
	lastScrollY: number;
	scrollY: number;
	source: HTMLElement | null;
	target: HTMLElement;
	targetRect: DOMRect;
	targetScrollY: number;
	viewportHeight: number;
	visibleRatio: number;
}

interface ScrollSnapRule {
	align: ScrollSnapAlign;
	direction: Extract<ScrollDirection, "up" | "down">;
	id: string;
	minVisibleRatio?: number;
	rearmWhen?: (context: ScrollSnapContext) => boolean;
	shouldSnap: (context: ScrollSnapContext) => boolean;
	sourceSelector?: string;
	targetSelector: string;
}

interface ScrollSnapRuleState {
	armed: boolean;
	rule: ScrollSnapRule;
}

const LOCK_DURATION_MS = 750;
const DOWN_SNAP_MIN_VISIBLE_RATIO = 0.1;
const FEATURES_ENTRY_MIN_VISIBLE_RATIO = 0.02;
const HERO_SNAP_UP_MAX_RATIO = 0.7;
const LORE_RETURN_SNAP_TOLERANCE_PX = 2;
const REARM_OFFSET_PX = 80;
const DOWN_SNAP_REARM_TOLERANCE_PX = 24;

let homepageScrollSnapAbort: AbortController | null = null;
let lastScrollY = 0;
let lockTimeoutId: number | null = null;

function getVisibleRatio(element: HTMLElement, viewportBottomRatio = 1) {
	const rect = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportBottom = viewportHeight * viewportBottomRatio;
	const visibleTop = Math.max(0, rect.top);
	const visibleBottom = Math.min(viewportBottom, rect.bottom);
	const visibleHeight = Math.max(0, visibleBottom - visibleTop);

	if (rect.height <= 0) return 0;
	return visibleHeight / rect.height;
}

function getTargetScrollY(element: HTMLElement, align: ScrollSnapAlign) {
	const rect = element.getBoundingClientRect();
	const topDoc = rect.top + window.scrollY;

	if (align === "start") {
		return Math.max(0, Math.round(topDoc));
	}

	return Math.max(0, Math.round(topDoc + rect.height - window.innerHeight));
}

function getScrollDirection(previousY: number, currentY: number, deadzone = 4): ScrollDirection {
	if (currentY > previousY + deadzone) return "down";
	if (currentY < previousY - deadzone) return "up";
	return "idle";
}

function setScrollSnapLock(ruleId: string | null) {
	const root = document.documentElement;

	if (ruleId) {
		root.dataset.scrollSnapLock = ruleId;
	} else {
		delete root.dataset.scrollSnapLock;
	}

	document.dispatchEvent(
		new CustomEvent("snowbound:scroll-snap-lock-change", {
			detail: { ruleId },
		}),
	);
}

function clearScrollSnapLock() {
	if (lockTimeoutId !== null) {
		window.clearTimeout(lockTimeoutId);
		lockTimeoutId = null;
	}

	setScrollSnapLock(null);
}

function runSnap(rule: ScrollSnapRule, targetScrollY: number) {
	setScrollSnapLock(rule.id);
	window.scrollTo({ top: targetScrollY, behavior: "smooth" });

	if (lockTimeoutId !== null) {
		window.clearTimeout(lockTimeoutId);
	}

	lockTimeoutId = window.setTimeout(() => {
		lockTimeoutId = null;
		setScrollSnapLock(null);
	}, LOCK_DURATION_MS);
}

function buildContext(rule: ScrollSnapRule): ScrollSnapContext | null {
	const target = document.querySelector<HTMLElement>(rule.targetSelector);
	if (!target) return null;

	const scrollY = window.scrollY;
	const targetRect = target.getBoundingClientRect();

	return {
		direction: getScrollDirection(lastScrollY, scrollY),
		lastScrollY,
		scrollY,
		source: rule.sourceSelector
			? document.querySelector<HTMLElement>(rule.sourceSelector)
			: null,
		target,
		targetRect,
		targetScrollY: getTargetScrollY(target, rule.align),
		viewportHeight: window.innerHeight,
		visibleRatio: getVisibleRatio(target),
	};
}

const scrollSnapRules: ScrollSnapRuleState[] = [
	{
		armed: true,
		rule: {
			align: "start",
			direction: "down",
			id: "lore-to-features",
			minVisibleRatio: FEATURES_ENTRY_MIN_VISIBLE_RATIO,
			rearmWhen: ({ targetRect, viewportHeight }) =>
				targetRect.top >= viewportHeight - DOWN_SNAP_REARM_TOLERANCE_PX,
			shouldSnap: ({ direction, targetRect, visibleRatio }) =>
				direction === "down" &&
				targetRect.top > 0 &&
				visibleRatio >= FEATURES_ENTRY_MIN_VISIBLE_RATIO,
			targetSelector: "#features",
		},
	},
	{
		armed: true,
		rule: {
			align: "end",
			direction: "up",
			id: "features-to-lore-end",
			minVisibleRatio: DOWN_SNAP_MIN_VISIBLE_RATIO,
			rearmWhen: ({ scrollY, source }) => {
				if (!source) return scrollY > REARM_OFFSET_PX;
				const sourceTopDoc = Math.round(source.getBoundingClientRect().top + scrollY);
				return scrollY > sourceTopDoc + REARM_OFFSET_PX;
			},
			shouldSnap: ({ direction, scrollY, targetScrollY, visibleRatio }) =>
				direction === "up" &&
				visibleRatio >= DOWN_SNAP_MIN_VISIBLE_RATIO &&
				scrollY > targetScrollY + LORE_RETURN_SNAP_TOLERANCE_PX,
			sourceSelector: "#features",
			targetSelector: "#lore",
		},
	},
];

function tickScrollSnaps() {
	const lockedRuleId = document.documentElement.dataset.scrollSnapLock;

	for (const ruleState of scrollSnapRules) {
		const context = buildContext(ruleState.rule);
		if (!context) continue;

		if (ruleState.rule.rearmWhen?.(context)) {
			ruleState.armed = true;
		}

		if (lockedRuleId) {
			continue;
		}

		if (!ruleState.armed) {
			continue;
		}

		if (ruleState.rule.direction !== context.direction) {
			continue;
		}

		if (
			typeof ruleState.rule.minVisibleRatio === "number" &&
			context.visibleRatio < ruleState.rule.minVisibleRatio
		) {
			continue;
		}

		if (!ruleState.rule.shouldSnap(context)) {
			continue;
		}

		ruleState.armed = false;
		runSnap(ruleState.rule, context.targetScrollY);
		break;
	}

	lastScrollY = window.scrollY;
}

export function initHomepageScrollSnaps() {
	if (homepageScrollSnapAbort) {
		homepageScrollSnapAbort.abort();
		homepageScrollSnapAbort = null;
	}

	clearScrollSnapLock();

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	homepageScrollSnapAbort = new AbortController();
	const { signal } = homepageScrollSnapAbort;

	lastScrollY = window.scrollY;

	let ticking = false;

	const onScrollOrResize = () => {
		if (ticking) return;
		ticking = true;

		requestAnimationFrame(() => {
			ticking = false;
			tickScrollSnaps();
		});
	};

	tickScrollSnaps();
	window.addEventListener("scroll", onScrollOrResize, { passive: true, signal });
	window.addEventListener("resize", onScrollOrResize, { passive: true, signal });
}
