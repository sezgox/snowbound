---
name: figma
description: Use when working with Figma files, the Figma REST API, design tokens, components, variables, or Dev Mode handoff to code.
---

# Figma

- Official REST API reference: https://www.figma.com/developers/api
- File URLs contain a file key; nodes use IDs from the URL or inspector. Cache responses and respect rate limits.
- For implementation handoff, prefer Dev Mode specs (layout, spacing, typography) and component/instance structure over screenshots alone.
- Authentication uses personal access tokens or OAuth per Figma account settings; never commit tokens.
