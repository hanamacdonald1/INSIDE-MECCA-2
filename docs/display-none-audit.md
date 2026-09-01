# Display None Audit

This document audits the usage of `display: none` (including Tailwind's `hidden` and `.sr-only` classes) applied to elements inside `<main>` and the broader layout, confirming that no critical structure or content is hidden without a semantic or visually equivalent replacement.

## 1. Native `<details>` and `<summary>` Marker Hiding
- **Selector**: `.rb-menu summary::-webkit-details-marker`, `.rb-data-notice>summary::-webkit-details-marker`
- **Purpose**: Hides the default browser triangle on `<details>` disclosure elements because a custom visual indicator (+/- or icon) is used instead. This is purely visual and does not remove the semantic disclosure behavior or accessibility state.
- **Status**: Required.

## 2. Responsive Navigation
- **Selector**: `.rb-menu` / `.rb-nav` in CSS, and `hidden md:flex`, `md:hidden` in Tailwind (`app/site-shell.tsx`)
- **Purpose**: Desktop navigation links are hidden on small screens, replaced by a mobile menu button (and vice versa). Both provide access to the same semantic sitemap routes.
- **Status**: Required (Responsive equivalent replacement).

## 3. Form Wizard Steps
- **Selector**: `.rb-form-step[hidden]`
- **Purpose**: Implements the multi-step questionnaire wizard. Only the current step is visible. Native `hidden` attribute is used, and focus is correctly managed between steps via standard React state updates. The hidden steps represent inactive parts of the form.
- **Status**: Required.

## 4. Visual Embellishments & Icons
- **Selector**: `.rb-cinematic:after{display:none}`, `.rc-edge{display:none}`, SVG icons with `aria-hidden="true"`, `group-open:hidden` for toggle icons.
- **Purpose**: Hides purely decorative visual elements (gradients, node edges, decorative SVGs) that have no semantic meaning, or toggles between "open" and "close" icon states on a button. The button retains its accessible name.
- **Status**: Required.

## 5. Responsive Data Tables
- **Selector**: `md:hidden`, `hidden md:block` in `app/analysis/identity-inclusion/page.tsx`
- **Purpose**: Toggles between a desktop grid layout and a mobile stacked card layout. Both layouts present the exact same content, just structured differently for the viewport.
- **Status**: Required (Responsive equivalent replacement).

## 6. Visually Hidden (Screen Reader Only)
- **Selector**: `.sr-only`, `.rb-visually-hidden`
- **Purpose**: Visually hides text (e.g. social media labels) while preserving it in the accessibility tree for screen readers.
- **Status**: Required.

## 7. Responsive Questionnaire Progress Tracker
- **Selector**: `@media(max-width:760px) { .rb-questionnaire-progress ol { display:none } }`
- **Purpose**: Hides the detailed step-by-step progress buttons on very small screens to save vertical space. The progress is still visually communicated through a summary text line and progress bar, and navigation between steps happens via "Back/Continue" buttons.
- **Status**: Required (Responsive equivalent replacement).

**Conclusion**: All `display: none` rules currently present are necessary for responsive design, component state (wizards, disclosures), or decorative hiding. No critical content is unreachably hidden.
