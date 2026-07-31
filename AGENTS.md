# AGENTS.md

## Repo Shape
- This is a dependency-free static portfolio site; there is no `package.json`, build step, test runner, linter, or CI workflow in the repo.
- `index.html` is the only app entrypoint and loads scripts in this order: `particles.js`, `mouse-trail.js`, `markdown-parser.js`, then `script.js`. Keep globals compatible with that order.
- Core terminal behavior and editable portfolio content live in `script.js`; the `CONFIG` object at the top controls contact info, skills, CV data, typing speed, and the project directory.

## Local Verification
- Use a local HTTP server, not `file://`, because project data is loaded with `fetch()` from `data/projects/**`.
- Quick run command: `python -m http.server 8000`, then open `http://localhost:8000/`.
- There are no automated checks to run; verify changes in the browser console and by exercising terminal commands such as `help`, `projects`, and `projects <id>`.

## Project Data Contract
- Project listing comes from `data/projects/index.json`; each entry must match a folder under `data/projects/`.
- Each project folder must contain `project.json` with at least `id`, `name`, and `description`; `id` is what `projects <id>` and autocomplete use.
- Project details are loaded from that folder's `README.md` and rendered through the local `MarkdownParser`; update `index.json`, `project.json`, and `README.md` together when adding or renaming a project.
- `MarkdownParser` is intentionally small and supports only the patterns implemented in `markdown-parser.js`; avoid relying on full Markdown features without extending the parser and checking rendering.

## Frontend Gotchas
- The page uses fixed full-screen canvases plus a terminal/split-view layout; check both desktop and mobile widths after CSS or canvas changes.
- The header's leftmost view toggle switches between the interactive terminal and a recruiter-friendly simple portfolio. Both views must source profile, skills, experience, education, contact details, and projects from the same `CONFIG`/project data; do not maintain duplicate portfolio content in HTML.
- Keep the recruiter-friendly simple portfolio as the default experience. Simple mode should replace the terminal presentation rather than appear inside it, remove decorative canvas effects, remain easy to scan, and always offer a clear way to open terminal mode.
- `mouse-trail.js` disables itself on touch devices when `desktopOnly` is true; do not assume the mouse trail appears on mobile.
- `script.js` lowercases submitted commands before parsing, so command IDs should remain lowercase.
- `suggestions.md` is a loose idea list, not executable configuration or a source of truth.
