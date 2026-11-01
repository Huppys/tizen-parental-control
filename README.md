# Tizen Parental Control

Iteration 1: Eine Vollbild-Willkommensseite für Samsung-Tizen-Fernseher mit einem
„Bestätigen“-Button, der die App beendet. Gedacht als Grundlage für
Parental-Control-Funktionen. Format: TizenBrew-App-Modul (`packageType: "app"`).

## Entwickeln

```bash
npm install
npm test                          # Vitest: Beenden- und Zurück-Tasten-Logik
python3 -m http.server -d app 8080  # Vorschau auf http://localhost:8080
```

Im Browser gibt es kein `tizen`-Objekt. Der Button zeigt dann stattdessen
„App würde jetzt beenden“ an.

## Weiterführend

- Design: `docs/superpowers/specs/2026-11-01-welcome-app-design.md`
- Plan: `docs/superpowers/plans/2026-11-01-welcome-app.md`
- Installation auf dem Fernseher und Autostart-Tests: `docs/INSTALL.md`
