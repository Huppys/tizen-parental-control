# Installation auf dem Fernseher

Zielgerät: Samsung GQ55QN85FAU (2025), laut Nutzer Tizen 10.0, TizenBrew 2.0.5 (noch kein Testergebnis erfasst).

## Voraussetzungen

- Developer Mode am Fernseher ist aktiviert.
- Mac und Fernseher sind im selben Netz.
- `sdb` ist installiert (nur nötig für Debugging und manuelles Deployment).

## TizenBrew installieren

Offizielle Anleitung:
<https://github.com/reisxd/TizenBrew/blob/main/docs/README.md>.
Weg mit dem TizenBrew Installer (Desktop), auf diesem Gerät noch nicht
abgeschlossen getestet:

1. Am TV: Apps-Ansicht, `12345`, Developer Mode an, Host PC IP = IP des Macs.
   Fernseher neu starten (vom Strom trennen).
2. Installer in der macOS-Terminal-App starten, „Install TizenBrew“ wählen. Ab
   Tizen 7 ist eine Anmeldung mit dem Samsung-Konto für das Zertifikat nötig.
3. Danach Host PC IP auf `127.0.0.1` stellen und neu starten. Sonst kann
   TizenBrew nicht im Debug-Modus starten.

## App laden

Ein TizenBrew-App-Modul wird nicht auf dem Fernseher installiert, sondern von
einem Server ausgeliefert.

1. Sicherstellen, dass der gewünschte Stand auf GitHub (`origin/main`) liegt.
2. In TizenBrew im Module Manager das Modul als **GitHub**-Modul (nicht npm)
   hinzufügen: `Huppys/tizen-parental-control`. TizenBrew lädt es über
   `cdn.jsdelivr.net/gh/...`, das Repo muss also öffentlich sein.
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

- Das Modul ließ sich in TizenBrew nicht starten („nichts passiert“).
  Vermutete Ursache, am Gerät noch nicht bestätigt: `keys: ["Enter"]`.
  TizenBrew ruft vor dem Start `registerKey()` für jeden Eintrag ohne
  Fehlerbehandlung auf. Enter muss nicht registriert werden. Jetzt `keys: []`.
- `sdb dlog` liefert nichts: Der Fernseher meldet `log_enable:disabled`.
- `sdb connect` aus der Claude-App heraus scheiterte, aus dem Terminal des
  Nutzers klappte es. Vermutlich die macOS-Sperre „Lokales Netzwerk“.
