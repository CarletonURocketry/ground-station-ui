# Contributing

Some instruction for contributing, as well as some tips on how to design your components.

## What to do

**Create an issue on the GitHub page and assign it to yourself.**

For instance, if you want to add a pressure graph to the main dashboard, open an issue and title it `Add Graph to Main Dash`. Then you can assign the issue to yourself and begin working.

Try to create issues for yourself that don't interfere with other code as much as possible. For instance, a graph is an independent component. You would only need to edit the files you created for this component, and perhaps import into the `Home` page component to view it on the dashboard.

When you're done with your feature, make a pull request!

## Standards

Some coding standards to ensure that all the code is compatible and consistent.

### Components

- Components will be made as functional components using React
- All component files are to be named with the extension `.jsx` even though `.js` will work
- All components are to be nested in the proper directory (pages in `/pages`, etc.)
- Any CSS stylesheets for a component should share the same file name as it's `.jsx` file counterpart
  - `Home.jsx` will have CSS file called `Home.css`
- Organize your imports in groups (components, utilities, hooks, etc.)

### Hooks

- Custom hooks should be given filenames ending with `.js` and be nested in the `/hooks` directory

### Utils

- All utility modules should be given filenames ending with `.js` and be nested in the `/utils` directory

### CSS Styles

- CSS stylesheets should use `rem` units for any sizing
  - This allows for easy resizing of components on different screen sizes without having to include many breakpoints (annoying CSS resizing function)
- All colours should be pulled from the `:root` colour variables (found in [`global.css`](../../../public/global.css))
  - Do this using the `var(--variable-name)` syntax
  - Exceptions to this rule are colours that will be used very few times and cannot be subsituted for a colour in the `global.css` file, such as the green used to colour in the board connection status

### HTML

- HTML tags should be descriptive.
  - Yes, a `<div>` tag would work to contain the main content of your page, but it is better practice to use the `<main>` tag
  - Descriptive class names, IDs and HTML tags should replace the need for comments

### JavaScript

- Use utility modules when possible
- Document all functions and variables in utility modules
- Use comments to make code more readable in confusing operations
- Use descriptive variable and function names
- Document all functions using JSDocs, and _include your name as the author_
