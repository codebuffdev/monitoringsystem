# v1.2.20 Fixed

Fixed the JSX syntax error in `src/pages/Home.jsx`.

The interactive Performance History component was accidentally inserted inside
the `return (...)` JSX of `Home`, which caused Vite/esbuild to report:

`Unexpected "const"`

The component is now declared at module scope and the existing interactive
range behavior is preserved.

No other website components were changed.
