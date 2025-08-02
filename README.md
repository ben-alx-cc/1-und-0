# Faces Mannheim - Exhibition Website

Eine responsive, minimalistische Website für die Kunstausstellung „Faces Mannheim" mit innovativer Step-by-Step Scroll-Funktionalität.

## Features

- **Step-by-Step Scroll Reveal**: Jeder Scroll-Schritt zeigt neue Inhalte mit sanften Animationen
- **Responsive Design**: Optimiert für Desktop und Mobile
- **Moderne Typografie**: Inter Font-Familie für cleane Darstellung
- **Touch-Support**: Vollständig funktionsfähig auf Touch-Geräten
- **Accessibility**: Keyboard-Navigation und Screen-Reader-freundlich
- **Performance**: Optimierte Animationen und lazy loading

## Technische Details

### Projektstruktur
```
/
├── index.html          # Haupt-HTML-Datei
├── style.css           # Responsive CSS-Styles
├── script.js           # JavaScript für Scroll-Funktionalität
├── assets/
│   └── logo.svg        # Logo-Platzhalter
└── README.md           # Diese Dokumentation
```

### Inhalte (Scroll-Schritte)
1. **artem** - Künstlername
2. **Faces Mannheim** - Ausstellungstitel
3. **Vernissage** - Veranstaltungsart
4. **Stadthaus N1, 3 Mannheim** - Veranstaltungsort
5. **07.08.2025** - Datum
6. **19:00 – 21:00 Uhr** - Uhrzeit

### Navigation
- **Mausrad**: Scroll up/down für Navigation zwischen Schritten
- **Touch**: Swipe up/down auf mobilen Geräten
- **Keyboard**: 
  - ↓ / Leertaste: Nächster Schritt
  - ↑: Vorheriger Schritt
  - Home: Zum ersten Schritt
  - End: Zum letzten Schritt

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## Installation & Ausführung

1. **Lokale Entwicklung**:
   ```bash
   # Einfach die index.html in einem modernen Browser öffnen
   open index.html
   ```

2. **Mit lokalem Server** (empfohlen):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (mit http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Live Server** (VS Code Extension):
   - Live Server Extension installieren
   - Rechtsklick auf index.html → "Open with Live Server"

## Browser-Unterstützung

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge
- ⚠️ Internet Explorer 11+ (eingeschränkt)

## Anpassungen

### Logo austauschen
Das Logo in `assets/logo.svg` durch eigenes SVG ersetzen. Das Design ist optimiert für 40x40px.

### Inhalte ändern
Texte in `index.html` anpassen und entsprechende `data-step` Attribute aktualisieren.

### Styling anpassen
Farben und Typografie in `style.css` in den CSS-Variablen am Anfang der Datei:

```css
:root {
  --primary-color: #333333;
  --secondary-color: #666666;
  --accent-color: #999999;
  --background-color: #ffffff;
}
```

### Animation-Timing
Scroll-Geschwindigkeit und Animationen in `script.js` anpassen:

```javascript
this.scrollCooldown = 800; // Millisekunden zwischen Schritten
```

## Performance-Optimierungen

- Preloading kritischer Fonts
- Throttled resize events
- Optimierte CSS-Transitions
- Lazy animation initialization
- Reduced motion support

## Accessibility Features

- Semantic HTML structure
- ARIA labels
- Keyboard navigation
- High contrast mode support
- Reduced motion preferences
- Screen reader compatibility

## Lizenz

Dieses Projekt ist für die Kunstausstellung "Faces Mannheim" entwickelt worden.

## Support

Bei Fragen oder Problemen:
- Überprüfen Sie die Browser-Konsole auf Fehlermeldungen
- Stellen Sie sicher, dass JavaScript aktiviert ist
- Testen Sie in einem anderen Browser

---

Entwickelt für die Ausstellung "Faces Mannheim" - Eine digitale Präsentation mit modernem Design und intuitiver Benutzerführung.