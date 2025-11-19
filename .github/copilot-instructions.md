# GitHub Copilot Instructions for Font Combinator

## Project Overview

This is a vanilla JavaScript web application for experimenting with Google Fonts combinations. The project uses modern web standards including ES6 modules, Web Components, and the Google Fonts API.

The idea is to use no framework or build step. Just straight Javascript, HTML and CSS.

## Architecture & Technologies

- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript
- **ES6 Modules**: Modular code organization with import/export
- **Web Components**: Custom elements using Shadow DOM
- **Google Fonts API**: Integration for font loading and selection
- **Local Storage**: Persistent user settings and configurations
- **CSS Custom Properties**: Dynamic styling and theming

## Key Components

### Web Components

- `font-select`: Custom dropdown for Google Fonts selection
- `font-control`: Typography controls (weight, style, size, etc.)

### Core Modules

- `config.js`: Default typography configurations
- `configured-fonts.js`: Google Fonts definitions
- `constants.js`: Application-wide constants
- Event handlers for font and style changes

## Coding Standards & Preferences

### JavaScript Style

- Use ES6+ syntax (const/let, arrow functions, template literals)
- Prefer async/await over Promises when applicable
- Use destructuring for cleaner code
- Follow modular patterns with import/export
- Use meaningful variable and function names

### Web Components Guidelines

- Always use Shadow DOM for encapsulation
- Define templates using `document.createElement("template")`
- Implement `observedAttributes` for reactive properties
- Use custom events for component communication
- Style components using CSS-in-JS or template styles

### Event Handling

- Use custom events for cross-component communication
- Follow the pattern: `new CustomEvent(CONSTANT_NAME, { detail, bubbles: true })`
- Prefer event delegation when appropriate
- Always clean up event listeners in disconnectedCallback

### CSS Approach

- Use modern CSS features (CSS Grid, Flexbox, Custom Properties)
- Use logical properties when appropriate
- Follow mobile-first responsive design

### Google Fonts Integration

- Lazy load fonts to improve performance
- Use font-display: swap for better UX
- Cache font configurations in localStorage
- Handle font loading states gracefully

## File Organization Patterns

### New Components

When creating new web components:

```javascript
// component-name.js
const templateName = document.createElement("template");
templateName.innerHTML = `
<style>
  /* Component styles */
</style>
<!-- Component markup -->
`;

class ComponentName extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateName.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["attribute-name"];
  }

  connectedCallback() {
    // Setup logic
  }

  disconnectedCallback() {
    // Cleanup logic
  }
}

customElements.define("component-name", ComponentName);
```

### Event Constants

Define events in `constants.js`:

```javascript
export const EVENT_NAME = "custom:event-name";
```

### Configuration Objects

Follow the pattern in `config.js` for nested configurations:

```javascript
export const config = {
  elementSelector: {
    property: "value",
    // Use camelCase for JavaScript properties
  },
};
```

## Performance Considerations

- Minimize DOM queries - cache element references
- Use event delegation for better performance
- Implement lazy loading for fonts
- Debounce user input handlers
- Use requestAnimationFrame for animations

## Browser Compatibility

- Target modern browsers (ES6+ support required)
- Use progressive enhancement
- Test in Chrome, Firefox, Safari, and Edge
- Consider mobile browsers and touch interactions

## Common Patterns

### Font Loading

```javascript
// Preferred pattern for loading Google Fonts
const fontLink = document.createElement("link");
fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weights}`;
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);
```

### Local Storage Operations

```javascript
// Always parse/stringify for localStorage
const config = JSON.parse(localStorage.getItem("config")) || defaultConfig;
localStorage.setItem("config", JSON.stringify(config));
```

### Custom Event Dispatching

```javascript
const event = new CustomEvent(CONSTANT_NAME, {
  detail: {
    /* event data */
  },
  bubbles: true,
  cancelable: true,
});
this.dispatchEvent(event);
```

## Error Handling

- Use try/catch for localStorage operations
- Handle font loading failures gracefully
- Provide fallback fonts in CSS
- Log errors for debugging but don't break user experience

## Testing Considerations

- Test with slow network connections (font loading)
- Test localStorage persistence across sessions
- Verify custom elements work across different browsers
- Test responsive behavior on various screen sizes

## Documentation Style

- Use JSDoc comments for complex functions
- Document custom events and their payloads
- Explain component attributes and their effects
- Include usage examples for reusable components

When suggesting code improvements or new features, please follow these patterns and maintain consistency with the existing codebase architecture.
