export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";

export type Messages = {
	layout: {
		lang: Locale;
		title: string;
		description: string;
	};
	hero: {
		homeLabel: string;
		navAriaLabel: string;
		nav: {
			world: string;
			game: string;
			about: string;
		};
		language: {
			triggerLabel: string;
			menuLabel: string;
			currentLabel: string;
			options: Record<Locale, string>;
		};
		titleLines: [string, string];
		subtitle: string;
		cta: string;
		supportingCopy: string;
		kickstarterLines: string[];
	};
	gameStats: {
		sectionLabel: string;
		playersLabel: string;
		durationLabel: string;
		agesLabel: string;
	};
	lore: {
		heading: string;
		paragraphs: [string, string, string];
		imageAlt: string;
	};
	features: {
		heading: string;
		tagline: string;
		cards: {
			titleLines: [string, string];
			body: string;
		}[];
		/** Placeholder until final GIF; swap `src` when asset is ready */
		mediaImageSrc: string;
		mediaAlt: string;
		cta: string;
	};
	tribes: {
		heading: string;
		carouselLabel: string;
		previousLabel: string;
		nextLabel: string;
		tablistLabel: string;
		slidePositionLabel: string;
		showTribeLabel: string;
		slides: {
			name: string;
			lines: [string, string];
		}[];
	};
	gameplay: {
		heading: string;
		cards: {
			title: string;
			body: string[];
		}[];
	};
	about: {
		heading: string;
		teamAlt: string;
		teamNames: string;
		paragraphs: [string, string];
		cta: string;
		tagline: string;
	};
	footer: {
		tagline: string;
		emailLabel: string;
		facebookLabel: string;
		instagramLabel: string;
		facebookTooltip: string;
		instagramTooltip: string;
	};
	waitlist: {
		dialogLabel: string;
		closeLabel: string;
		title: string;
		description: string;
		emailLabel: string;
		emailPlaceholder: string;
		submit: string;
		newsletterLabel: string;
		status: {
			empty: string;
			pending: string;
			success: string;
			notConfigured: string;
			genericError: string;
		};
		api: {
			invalidJson: string;
			invalidEmail: string;
			notConfigured: string;
			failedToSend: string;
		};
	};
	email: {
		localeNames: Record<Locale, string>;
		internal: {
			subject: string;
			heading: string;
			intro: string;
			emailLabel: string;
			submittedLabel: string;
			labelLabel: string;
			localeLabel: string;
			footer: string;
		};
		user: {
			subject: string;
			heading: string;
			intro: string;
			fileLabel: string;
			note: string;
			signature: string;
			footer: string;
		};
	};
};

const messages: Record<Locale, Messages> = {
	en: {
		layout: {
			lang: "en",
			title: "Snowbound — Board Game",
			description:
				"Survive the winter. Betray your rivals. A strategic board game of exploration, deception and survival.",
		},
		hero: {
			homeLabel: "Snowbound home",
			navAriaLabel: "Primary",
			nav: {
				world: "The World",
				game: "The Game",
				about: "About Us",
			},
			language: {
				triggerLabel: "Change language",
				menuLabel: "Select language",
				currentLabel: "Current language",
				options: {
					en: "English",
					es: "Español",
				},
			},
			titleLines: ["Survive the winter.", "Betray your rivals."],
			subtitle:
				"A Strategic Board Game of Exploration, Deception and Survival.",
			cta: "JOIN THE WAITLIST",
			supportingCopy:
				"Get notified at launch and be the first to enter Snowbound",
			kickstarterLines: ["COMING", "SOON TO", "KICKSTARTER", "PLATFORM"],
		},
		gameStats: {
			sectionLabel: "Game details",
			playersLabel: "Number of players",
			durationLabel: "Time per game",
			agesLabel: "Recommended for ages",
		},
		lore: {
			heading: "AN ICED PARADISE AWAITS...",
			paragraphs: [
				"In the frozen North, beneath shimmering auroras, tribes fight to survive the cold winter.",
				"Hidden under ancient ice lie the magical petals of the Thall Tree, a power worth risking everything for.",
				"For ages, the Inuit have fought to gain its power — will you be the next to claim it?",
			],
			imageAlt: "Illustration of the Thall Tree",
		},
		features: {
			heading: "WHAT MAKES IT UNIQUE",
			tagline: "",
			mediaImageSrc: "/images/figma/global-events.png",
			mediaAlt: "Preview of global events in Snowbound",
			cards: [
				{
					titleLines: ["CHANGING", "BOARD"],
					body: "Break the ice and reveal a new map every game",
				},
				{
					titleLines: ["HIGH PLAYER", "INTERACTION"],
					body: "Steal, block and outplay your rivals at every turn.",
				},
				{
					titleLines: ["RISK VS", "REWARD"],
					body: "Push your luck... or play it safe and lose the race.",
				},
				{
					titleLines: ["2 PATHS TO", "VICTORIES"],
					body: "You don't need to follow everyone else's path.",
				},
			],
			cta: "JOIN THE WAITLIST",
		},
		tribes: {
			heading: "The Inuit Tribes",
			carouselLabel: "Tribe carousel",
			previousLabel: "Previous tribe",
			nextLabel: "Next tribe",
			tablistLabel: "Tribe slides",
			slidePositionLabel: "Tribe {current} of {total}",
			showTribeLabel: "Show tribe",
			slides: [
				{
					name: "IQURNAT",
					lines: [
						"Shamans who invoke the power of the Thal tree.",
						"They are known for being in harmony with the spirits of the beyond.",
					],
				},
				{
					name: "Qaniktuq",
					lines: [
						"Tribe known for having their hair covered in ice.",
						"Their specialty is controlling polar bears.",
					],
				},
				{
					name: "Kaviktaq",
					lines: [
						"Tribe known for being nomadic and undertaking long journeys in search of food.",
						"They stand out for their skill in handling kayaks and their understanding of the environment.",
					],
				},
				{
					name: "IQURNAT",
					lines: [
						"Shamans who invoke the power of the Thal tree.",
						"They are known for being in harmony with spirits from the beyond.",
					],
				},
				{
					name: "Sednaluk",
					lines: [
						'They are given the name "Singers of the Sea" as they worship the goddess Sedna.',
						"Their culture is based on the sea and traditions.",
					],
				},
				{
					name: "Nunaqar",
					lines: [
						"Tribe known for being experts in the manufacture of snow goggles, a resource that allows them to travel during snowstorms.",
						"Their specialty is traditional craftsmanship.",
					],
				},
			],
		},
		gameplay: {
			heading: "GAMEPLAY",
			cards: [
				{
					title: "UNCOVERING ICE",
					body: [
						"Reveal what's under the ice",
						"and find useful items and",
						"locations",
					],
				},
				{
					title: "FINDING PETALS",
					body: [
						"You will need Petals to win the game. Every time you find one it will activate an event",
					],
				},
				{
					title: "GRAB & ESCAPE",
					body: [
						"When you find an item while",
						"searching the snow, save it",
						"in your bag and run back to",
						"your main base.",
					],
				},
				{
					title: "GLOBAL EVENTS",
					body: [
						"Events are random and affect every player. They can alter the game immediately",
					],
				},
			],
		},
		about: {
			heading: "ABOUT US",
			teamAlt: "Juanma Mateo and Gonzalo Valle",
			teamNames: "Juanma Mateo & Gonzalo Valle",
			paragraphs: [
				"We are a passionate team of game designers who, driven by our creativity, have embarked on the adventure of creating a tabletop game. Drawing from our experience in the video game industry, Snowbound brings together many of the elements we love most in tabletop gaming: competition, strategy, and unexpected twists.",
				"Your support helps turn this dream into reality and bring Snowbound to tables all around the world.",
			],
			cta: "JOIN THE WAITLIST",
			tagline: "Don't miss the launch",
		},
		footer: {
			tagline: "Get Snowbound!",
			emailLabel: "Email",
			facebookLabel: "Facebook",
			instagramLabel: "Instagram",
			facebookTooltip: "Facebook: nombre_facebook",
			instagramTooltip: "Instagram: @bigc.ountrygames",
		},
		waitlist: {
			dialogLabel: "Join the waitlist",
			closeLabel: "Close",
			title: "JOIN THE WAITLIST",
			description:
				"Get notified at launch and be the first to enter Snowbound.",
			emailLabel: "Email",
			emailPlaceholder: "Email for updates",
			submit: "GET UPDATES",
			newsletterLabel: "Snowbound newsletter",
			status: {
				empty: "Please enter your email.",
				pending: "Subscribing…",
				success: "Thanks! You are on the list — we will be in touch.",
				notConfigured:
					"Email not configured yet — we still noted your interest!",
				genericError: "Something went wrong. Please try again.",
			},
			api: {
				invalidJson: "Invalid JSON",
				invalidEmail: "Invalid email",
				notConfigured: "Email service not configured",
				failedToSend: "Failed to send email",
			},
		},
		email: {
			localeNames: {
				en: "English",
				es: "Spanish",
			},
			internal: {
				subject: "New waitlist signup",
				heading: "New waitlist signup",
				intro: "Someone requested updates with this address:",
				emailLabel: "Email",
				submittedLabel: "Submitted",
				labelLabel: "Label",
				localeLabel: "Locale",
				footer: "Sent from the Snowbound site waitlist form.",
			},
			user: {
				subject: "You're on the list",
				heading: "You're on the list",
				intro: "Thanks for signing up for news about <strong>Snowbound</strong>.",
				fileLabel: "We have this email on file:",
				note: "We'll write when there's something worth your time — no spam, just updates from the iced frontier.",
				signature: "— The Snowbound team",
				footer: "You received this because you subscribed on our website.",
			},
		},
	},
	es: {
		layout: {
			lang: "es",
			title: "Snowbound — Juego de mesa",
			description:
				"Sobrevive al invierno. Traiciona a tus rivales. Un juego de Estrategia, Exploración, Engaño y Supervivencia.",
		},
		hero: {
			homeLabel: "Inicio de Snowbound",
			navAriaLabel: "Principal",
			nav: {
				world: "Inicio",
				game: "El Juego",
				about: "Nosotros",
			},
			language: {
				triggerLabel: "Cambiar idioma",
				menuLabel: "Seleccionar idioma",
				currentLabel: "Idioma actual",
				options: {
					en: "English",
					es: "Español",
				},
			},
			titleLines: ["SOBREVIVE AL INVIERNO", "TRAICIONA A TUS RIVALES"],
			subtitle:
				"Un juego de Estrategia, Exploración, Engaño y Supervivencia",
			cta: "ÚNETE A LA LISTA DE ESPERA",
			supportingCopy:
				"Recibe notificación del lanzamiento y sé el primero en entrar a Snowbound",
			kickstarterLines: ["PRONTO EN", "KICKSTARTER"],
		},
		gameStats: {
			sectionLabel: "Detalles del juego",
			playersLabel: "Número de jugadores",
			durationLabel: "Duración de la partida",
			agesLabel: "Edad recomendada",
		},
		lore: {
			heading: "Un paraíso helado te espera",
			paragraphs: [
				"En el Norte helado, bajo auroras resplandecientes, las tribus luchan por sobrevivir al frío invierno.",
				"Ocultos bajo el hielo ancestral yacen los pétalos mágicos del Árbol Thall, un poder por el que vale la pena arriesgarlo todo.",
				"Durante siglos, los inuit han luchado por obtener su poder… ¿serás tú el próximo en reclamarlo?",
			],
			imageAlt: "Ilustración del Árbol Thall",
		},
		features: {
			heading: "QUÉ NOS HACE ÚNICOS",
			tagline: "MILES DE COMBINACIONES DIFERENTES",
			mediaImageSrc: "/images/figma/global-events.png",
			mediaAlt: "Vista previa de eventos globales en Snowbound",
			cards: [
				{
					titleLines: ["TABLERO", "ALEATORIO"],
					body: "Rompe el hielo y descubre un nuevo tablero cada partida",
				},
				{
					titleLines: ["ALTA", "INTERACCIÓN"],
					body: "Roba, bloquea y adelántate a tus rivales",
				},
				{
					titleLines: ["RIESGO VS", "RECOMPENSA"],
					body: "Arriesga tu suerte o juega seguro y pierde la partida...",
				},
				{
					titleLines: ["2 FORMAS DE", "GANAR"],
					body: "Elige otro camino mientras todos se pelean por lo mismo",
				},
			],
			cta: "ÚNETE A LA LISTA DE ESPERA",
		},
		tribes: {
			heading: "LAS TRIBUS INUIT",
			carouselLabel: "Carrusel de tribus",
			previousLabel: "Tribu anterior",
			nextLabel: "Siguiente tribu",
			tablistLabel: "Slides de tribus",
			slidePositionLabel: "Tribu {current} de {total}",
			showTribeLabel: "Mostrar tribu",
			slides: [
				{
					name: "IQURNAT",
					lines: [
						"Chamanes que invocan el poder del árbol Thal.",
						"Son conocidos por estar en armonía con los espíritus del más allá.",
					],
				},
				{
					name: "Qaniktuq",
					lines: [
						"Tribu conocida por llevar el pelo cubierto de hielo.",
						"Su especialidad es controlar osos polares.",
					],
				},
				{
					name: "Kaviktaq",
					lines: [
						"Tribu nómada que emprende largos viajes en busca de alimento.",
						"Destacan por su destreza con los kayaks y por su conocimiento del entorno.",
					],
				},
				{
					name: "IQURNAT",
					lines: [
						"Chamanes que invocan el poder del árbol Thal.",
						"Son conocidos por estar en armonía con espíritus del más allá.",
					],
				},
				{
					name: "Sednaluk",
					lines: [
						'Reciben el nombre de "Cantores del Mar" porque veneran a la diosa Sedna.',
						"Su cultura se basa en el mar y en las tradiciones.",
					],
				},
				{
					name: "Nunaqar",
					lines: [
						"Tribu experta en fabricar gafas para la nieve, un recurso que les permite viajar durante las tormentas.",
						"Su especialidad es la artesanía tradicional.",
					],
				},
			],
		},
		gameplay: {
			heading: "GAMEPLAY",
			cards: [
				{
					title: "EXCAVA EL HIELO",
					body: [
						"Revela lo que hay bajo el hielo",
						"Encuentra objetos y trampas ocultas",
					],
				},
				{
					title: "ENCUENTRA PÉTALOS",
					body: [
						"Necesitarás pétalos para ganar la partida, encontrarlos activará eventos.",
					],
				},
				{
					title: "PICK & RUN",
					body: [
						"Encuentra objetos y guárdalos",
						"en tu bolsa para llevarlos a tu",
						"base y alzarte con la victoria",
					],
				},
				{
					title: "EVENTOS GLOBALES",
					body: [
						"Los eventos cambiarán las tornas del juego cuando menos te lo esperes",
					],
				},
			],
		},
		about: {
			heading: "ABOUT US",
			teamAlt: "Juanma Mateo y Gonzalo Valle",
			teamNames: "Juanma Mateo & Gonzalo Valle",
			paragraphs: [
				"Somos un equipo apasionado de diseñadores de juegos que, impulsados por nuestra creatividad, nos hemos embarcado en la aventura de crear un juego de mesa. Basándonos en nuestra experiencia en la industria de los videojuegos, Snowbound reúne muchos de los elementos que más nos gustan de los juegos de mesa: la competencia, la estrategia y los giros inesperados.",
				"Tu apoyo ayuda a convertir este sueño en realidad y a llevar Snowbound a mesas de todo el mundo.",
			],
			cta: "ÚNETE A LA LISTA DE ESPERA",
			tagline: "No te pierdas el lanzamiento",
		},
		footer: {
			tagline: "Ven a Snowbound!",
			emailLabel: "Correo",
			facebookLabel: "Facebook",
			instagramLabel: "Instagram",
			facebookTooltip: "Facebook: nombre_facebook",
			instagramTooltip: "Instagram: @bigc.ountrygames",
		},
		waitlist: {
			dialogLabel: "Únete a la lista de espera",
			closeLabel: "Cerrar",
			title: "ÚNETE A LA LISTA DE ESPERA",
			description:
				"Recibe notificación del lanzamiento y sé el primero en entrar a Snowbound.",
			emailLabel: "Correo electrónico",
			emailPlaceholder: "Correo para novedades",
			submit: "RECIBIR NOVEDADES",
			newsletterLabel: "Newsletter de Snowbound",
			status: {
				empty: "Introduce tu correo electrónico.",
				pending: "Suscribiéndote…",
				success: "¡Gracias! Ya estás en la lista y te escribiremos pronto.",
				notConfigured:
					"El correo aún no está configurado, pero ya hemos registrado tu interés.",
				genericError: "Ha ocurrido un error. Inténtalo de nuevo.",
			},
			api: {
				invalidJson: "JSON no válido",
				invalidEmail: "Correo electrónico no válido",
				notConfigured: "El servicio de correo no está configurado",
				failedToSend: "No se pudo enviar el correo",
			},
		},
		email: {
			localeNames: {
				en: "Inglés",
				es: "Español",
			},
			internal: {
				subject: "New waitlist signup",
				heading: "New waitlist signup",
				intro: "Someone requested updates with this address:",
				emailLabel: "Email",
				submittedLabel: "Submitted",
				labelLabel: "Label",
				localeLabel: "Locale",
				footer: "Sent from the Snowbound site waitlist form.",
			},
			user: {
				subject: "Ya estás en la lista",
				heading: "Ya estás en la lista",
				intro:
					"Gracias por apuntarte para recibir novedades sobre <strong>Snowbound</strong>.",
				fileLabel: "Tenemos registrado este correo:",
				note: "Te escribiremos cuando haya algo que merezca tu tiempo: sin spam, solo novedades desde la frontera helada.",
				signature: "— El equipo de Snowbound",
				footer: "Has recibido este correo porque te suscribiste en nuestra web.",
			},
		},
	},
};

export function getMessages(locale: Locale): Messages {
	return messages[locale];
}

export function isLocale(value: string): value is Locale {
	return value === "en" || value === "es";
}

export function localePath(locale: Locale): string {
	return locale === "es" ? "/es/" : "/";
}

export function formatWithIndex(
	template: string,
	values: Record<string, string | number>,
): string {
	return Object.entries(values).reduce(
		(result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
		template,
	);
}
