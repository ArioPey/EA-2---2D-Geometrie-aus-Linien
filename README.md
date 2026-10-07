# 2D Geometrie aus Linien

WebGL-Projekt für die Aufgabe **„2D Geometrie aus Linien“**.

## Umsetzung

Die Anwendung stellt eine selbst entworfene geometrische Katze mit **WebGL** und **GL_LINES** dar.

- 42 2D-Vertices
- `gl.drawArrays(gl.LINES, 0, vertexCount)`
- keine Interaktion
- keine externen Bilddateien
- eigene Vertexdaten
- Fehlerbehandlung
- Konsolenausgaben für QA

## Dateien

- `index.html` – Webseite, Visualisierung und Dokumentation
- `style.css` – Gestaltung
- `script.js` – WebGL, Shader und Vertexdaten

## Start

Die Anwendung kann über einen lokalen Webserver oder über GitHub Pages geöffnet werden.

## Wichtiger count-Parameter

Ein Vertex besteht aus zwei Werten (X und Y). Deshalb ist die Zahl der Werte im `Float32Array` doppelt so groß wie die Vertex-Anzahl.

Beispiel:

```javascript
const vertexCount = vertices.length / 2;
gl.drawArrays(gl.LINES, 0, vertexCount);
```

## Fehlerbehandlung / QA

Shader-Kompilierung und Program-Linking werden geprüft. Fehler werden auf der Webseite angezeigt und mit `console.error()` in der Browser-Konsole ausgegeben.

## Quelle / Inspiration

Als allgemeine Inspiration für lineare Tierillustrationen wurde die in der Aufgabenstellung genannte Quelle verwendet:

https://de.freepik.com/vektoren-kostenlos/satz-lineare-tierillustrationen_3771101.htm

Die konkrete Geometrie dieser Arbeit wurde eigenständig erstellt und nicht aus der Vorlage kopiert.
