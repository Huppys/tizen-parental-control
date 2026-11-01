# Installation auf dem Fernseher

Zielgerät: Samsung GQ55QN85FAU (2025), laut Nutzer Tizen 10.0, TizenBrew 2.0.5 (noch kein Testergebnis erfasst).

## Voraussetzungen

- Developer Mode am Fernseher ist aktiviert.
- Mac und Fernseher sind im selben Netz.
- `sdb` ist installiert (nur nötig für Debugging und manuelles Deployment).

## TizenBrew installieren

TizenBrew 2.0.5 ist auf dem Fernseher bereits installiert. Für eine
Neuinstallation gilt die offizielle Anleitung:
<https://github.com/reisxd/TizenBrew/blob/main/docs/README.md>.
Zuerst den Installer-Weg (Installer-Seite im TV-Browser, Developer Mode an)
versuchen. Auf Tizen 8 und neuer kann das laut Doku scheitern. Dann hilft ein
Rebuild aus dem Quellcode mit Tizen Studio und Certificate Manager. Die
konkreten Schritte sind hier noch nicht verifiziert.

## App laden

Ein TizenBrew-App-Modul wird nicht auf dem Fernseher installiert, sondern von
einem Server ausgeliefert.

1. Auf dem Mac aus dem Projektordner starten: `python3 -m http.server 8080`.
2. In TizenBrew das Modul hinzufügen. Der genaue Weg für lokale oder
   GitHub-Module ist am Gerät zu klären und hier nachzutragen.
3. Modul starten. Erwartet: Willkommensseite, Button fokussiert.
4. Mit OK auf der Fernbedienung bestätigen. Erwartet: App beendet sich.

Nach der npm-Veröffentlichung (Iteration 2) wird der Modulname direkt in
TizenBrew eingetragen.

## Autostart-Tests

Am Gerät ausfüllen.

| Test | Ergebnis |
|------|----------|
| TV-Einstellung „zuletzt genutzte App beim Start öffnen“ vorhanden? | |
| Startet TizenBrew damit nach Aus-/Einschalten? | |
| Startet TizenBrew nach Standby-Aufwachen? | |
| TizenBrew-Autostart-Einstellung vorhanden (Tizen 10)? | |
| Startet das Modul selbst automatisch? | |
| Zurück-Taste (10009) beendet die App nicht? | |

## Bekannte Probleme

Noch keine. Beim Testen hier eintragen.
