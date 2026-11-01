# Welcome App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A fullscreen welcome page with one "Bestätigen" button that exits the app on a Samsung Tizen TV, packaged as a TizenBrew app module.

**Architecture:** Plain HTML/CSS/JS, no framework, no build. Testable logic lives in `app/logic.js` (CommonJS-guarded so browsers load it via `<script>` and Vitest via `require`). `app/main.js` wires DOM to that logic.

**Tech Stack:** HTML/CSS/vanilla JS, Vitest (node environment), npm package in TizenBrew `app` module format.

**Spec:** `docs/superpowers/specs/2026-11-01-welcome-app-design.md`

## Global Constraints

- TizenBrew app module: `packageType: "app"`, `appName: "Parental Control"`, `appPath: "app/index.html"`, `keys: ["Enter"]`, `files: ["app"]`
- No framework, no build step
- Exit via `tizen.application.getCurrentApplication().exit()`
- Without `tizen`: console message plus visible hint "App würde jetzt beenden"
- Back key (keyCode 10009) is blocked only when `tizen` exists
- Button has focus at start
- UI text is German
- Out of scope: PIN, time windows, profiles, persistence

## Review Focus

- `tizen` exists but `tizen.application` is missing: must fall back, not throw (Task 1 test)
- `exit()` throws: must fall back and not leave the user stuck without feedback (Task 1 test)
- Back key without `tizen` (browser): must NOT be blocked (Task 1 test)
- Non-Back keys on the TV (e.g. Enter, 13): must NOT be blocked (Task 1 test)
- Double click on the button: fallback hint must show once, not stack (Task 2 manual check)

---

### Task 1: Package setup and exit/back-key logic

**Files:**
- Create: `package.json`, `app/logic.js`, `test/logic.test.js`
- Modify: `.gitignore` (add `node_modules/`)

**Interfaces:**
- Produces (`app/logic.js`, CommonJS export and `window.ParentalLogic` global):
  - `exitApp(tizenApi: object | undefined, showFallback: () => void): boolean` returns `true` if `exit()` was called successfully, otherwise calls `showFallback()` once, logs via `console.log`, returns `false`.
  - `shouldBlockKey(tizenApi: object | undefined, keyCode: number): boolean` returns `true` only if `tizenApi` is truthy and `keyCode === 10009`.

- [ ] **Step 1: Create `package.json`** with name `tizen-parental-control`, version `0.1.0`, description (German, one line), `packageType`/`appName`/`appPath`/`keys`/`files` per Global Constraints, `scripts.test = "vitest run"`, devDependency `vitest`. Run `npm install`, add `node_modules/` to `.gitignore`.

- [ ] **Step 2: Write failing tests** in `test/logic.test.js` (`require("../app/logic.js")`):
  - `exitApp calls exit and returns true when tizen is available` (fake tizen with `application.getCurrentApplication().exit` spy; `showFallback` not called)
  - `exitApp falls back when tizen is undefined` (returns false, fallback called once)
  - `exitApp falls back when tizen.application is missing` (`{}`)
  - `exitApp falls back when exit throws`
  - `shouldBlockKey blocks 10009 when tizen exists`
  - `shouldBlockKey does not block 10009 without tizen`
  - `shouldBlockKey does not block 13 when tizen exists`

- [ ] **Step 3: Run** `npx vitest run`. Expected: FAIL, module not found.

- [ ] **Step 4: Implement `app/logic.js`** per Interfaces. Wrap the exit call in try/catch. Export with `if (typeof module !== "undefined") module.exports = {...}; else window.ParentalLogic = {...}`.

- [ ] **Step 5: Run** `npx vitest run`. Expected: 7 passed.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .gitignore app/logic.js test/logic.test.js
git commit -m "feat: add exit and back-key logic with tests"
```

### Task 2: Welcome page UI

**Files:**
- Create: `app/index.html`, `app/style.css`, `app/main.js`

**Interfaces:**
- Consumes: `window.ParentalLogic.exitApp`, `window.ParentalLogic.shouldBlockKey` (Task 1)

- [ ] **Step 1: Create `app/index.html`** (lang `de`, viewport meta, `<title>Parental Control</title>`): heading "Willkommen", short hint paragraph, `<button id="confirm" autofocus>Bestätigen</button>`, hidden `<p id="fallback-hint">App würde jetzt beenden</p>`. Scripts at end of body: `logic.js`, then `main.js`.

- [ ] **Step 2: Create `app/style.css`**: fullscreen (100vw/100vh, no scroll), dark background, centered column, large text (title ≥ 4rem, button ≥ 2rem with a clearly visible focus outline for TV distance), `#fallback-hint[hidden]` hidden.

- [ ] **Step 3: Create `app/main.js`**: on `DOMContentLoaded`, focus `#confirm`; on click call `ParentalLogic.exitApp(window.tizen, showHint)` where `showHint` unhides `#fallback-hint` (idempotent, so a double click shows it once); on `keydown` call `preventDefault()` if `ParentalLogic.shouldBlockKey(window.tizen, e.keyCode)`.

- [ ] **Step 4: Manual browser check.** Run `npx serve app` (or `python3 -m http.server -d app 8080`), open it. Expected: button focused, Enter/click shows "App würde jetzt beenden" and a console message, double click shows one hint, Backspace/Back behaves normally.

- [ ] **Step 5: Commit**

```bash
git add app
git commit -m "feat: add welcome page UI"
```

### Task 3: Install and autostart documentation

**Files:**
- Create: `docs/INSTALL.md`, `README.md`

- [ ] **Step 1: Write `README.md`**: purpose (iteration 1), how to run tests (`npm test`) and preview in the browser, pointer to the spec and INSTALL.md.

- [ ] **Step 2: Write `docs/INSTALL.md`** (German) with these sections: Voraussetzungen (Developer Mode an, Mac und TV im selben Netz, `sdb` installiert); TizenBrew installieren (Installer-Weg zuerst, Rebuild aus dem Quellcode als Fallback, Hinweis zu Tizen 8+); App laden (lokal servieren und als Modul hinzufügen, bzw. nach npm-Veröffentlichung in Iteration 2); Autostart-Tests (TV-Einstellung "zuletzt genutzte App", TizenBrew-Autostart) mit Tabelle "Test / Ergebnis" zum Ausfüllen am Gerät; bekannte Probleme.

- [ ] **Step 3: Commit**

```bash
git add README.md docs/INSTALL.md
git commit -m "docs: add README and TV install guide"
```

## Self-Review Notes

- Spec coverage: package.json fields (Task 1), behavior (Tasks 1-2), autostart docs (Task 3), tests (Tasks 1-2). The Back-key rule on the TV is verified at the device (spec says so).
- Names consistent: `exitApp`, `shouldBlockKey`, `ParentalLogic`.
