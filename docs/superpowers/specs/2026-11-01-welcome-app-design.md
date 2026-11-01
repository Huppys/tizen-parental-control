# Tizen Parental Control – Iteration 1: Willkommens-App

## Ziel

Eine minimale Web-App für einen Samsung-Fernseher (GQ55QN85FAU, 2025, Tizen 9),
die beim Starten/Reaktivieren des Geräts als Erstes erscheint. Sie zeigt eine
Vollbild-Willkommensseite mit einem „Bestätigen“-Button, der die App beendet.
Sie ist die Grundlage für spätere Parental-Control-Funktionen.

Iteration 2 (nicht Teil dieses Specs): Installation über TizenBrew
(npm-Veröffentlichung).

## Nicht-Ziele (Iteration 1)

PIN, Zeitfenster, Profile, Datenspeicherung, Framework, Build-Schritt.

## Ansatz

Reine Web-App (HTML/CSS/JS, kein Framework, kein Build) im
TizenBrew-App-Modul-Format (`packageType: "app"`). Dadurch ist Iteration 2
nur noch Veröffentlichen. Der Nutzer installiert TizenBrew selbst auf dem
Fernseher; wir liefern App und Anleitung.

Hinweis: Die TizenBrew-Doku warnt, dass die Installation auf Tizen 8+ ggf. nicht
funktioniert und ein Rebuild aus dem Quellcode nötig sein kann.

## Struktur

```
tizen-parental-control/
├── package.json        # npm- + TizenBrew-Metadaten
├── app/
│   ├── index.html      # Vollbild-Willkommensseite + Button
│   ├── style.css
│   └── main.js
├── test/               # Vitest
├── docs/INSTALL.md     # TizenBrew installieren, Modul laden, Autostart testen
└── README.md
```

## package.json

- `name`, `version`, `description` für npm.
- `packageType: "app"`, `appName: "Parental Control"`, `appPath: "app/index.html"`.
- `keys: ["Enter"]`.
- `files: ["app"]`.

## Verhalten

- Seite füllt den Bildschirm, großer Titel und kurzer Hinweis, ein Button
  „Bestätigen“.
- Der Button hat beim Start den Fokus, damit „OK“ auf der Fernbedienung ihn
  direkt auslöst. Mausklick und Enter funktionieren im Browser ebenfalls.
- Klick beendet die App über `tizen.application.getCurrentApplication().exit()`.
- Ohne `tizen`-Objekt (Browser-Test): Konsolenmeldung und eingeblendeter Hinweis
  „App würde jetzt beenden“.
- Zurück-Taste wird nur registriert und abgefangen, wenn `tizen` existiert, damit
  die Seite nicht umgangen wird. Beenden geht nur über den Button. Die Stabilität
  wird am Gerät geprüft.

## Autostart (am Gerät zu verifizieren)

1. TV-Einstellung „zuletzt genutzte App beim Start öffnen“, falls beim Modell
   vorhanden (TizenBrew muss dann zuletzt geöffnet gewesen sein).
2. TizenBrew-Autostart-Einstellung; Verfügbarkeit auf Tizen 9 ist nicht
   verifiziert.

`docs/INSTALL.md` dokumentiert das Ergebnis; es fließt in Iteration 2 ein.

## Tests

- Vitest für die Beenden-Logik (mit und ohne `tizen`-Objekt).
- Manueller Browser-Check.
- Autostart, Fokus und Fernbedienung nur am Fernseher prüfbar.
