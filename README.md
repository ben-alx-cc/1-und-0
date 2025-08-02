# Faces Mannheim - Kunstausstellung Website

Eine responsive, minimalistische Website für die Kunstausstellung "Faces Mannheim" mit modernen Scroll-Animationen.

## Features

### 🎨 Design
- **Minimalistisches Design** mit weißem Hintergrund
- **Moderne Typografie** mit Inter Font
- **Responsive Layout** für Desktop und Mobile
- **Sanfte Animationen** beim Scrollen

### 📱 Interaktion
- **Step-by-Step Scroll**: Jeder Scroll-Schritt zeigt ein neues Element
- **Touch Support**: Swipe-Gesten auf mobilen Geräten
- **Keyboard Navigation**: Pfeiltasten, Leertaste, Home/End
- **Scroll-Indikator**: Animierter Pfeil am unteren Rand

### ♿ Accessibility
- **Screen Reader Support** mit ARIA-Labels
- **Keyboard Navigation** vollständig unterstützt
- **Reduced Motion Support** für Nutzer mit Bewegungssensibilität
- **High Contrast Mode** Unterstützung

### ⚡ Performance
- **Optimierte Animationen** mit CSS Transforms
- **Intersection Observer** für bessere Performance
- **Debounced Scroll Events** für flüssige Animationen
- **Visibility API** für Tab-Wechsel Optimierung

## Projektstruktur

```
faces-mannheim/
├── index.html          # Haupt-HTML-Datei
├── style.css           # Styles und Animationen
├── script.js           # JavaScript für Scroll-Logik
├── assets/             # Ordner für Assets (Logo, etc.)
└── README.md           # Diese Datei
```

## Inhalte

Die Website zeigt die folgenden Informationen in dieser Reihenfolge:

1. **artem** - Künstler/Organisation
2. **Faces Mannheim** - Ausstellungstitel
3. **Vernissage** - Veranstaltungstyp
4. **Stadthaus N1, 3 Mannheim** - Veranstaltungsort
5. **07.08.2025** - Datum
6. **19:00 – 21:00 Uhr** - Uhrzeit

## Technische Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Mobile Support
- iOS Safari 12+
- Chrome Mobile 60+
- Samsung Internet 8+

### Dependencies
- **Inter Font** (Google Fonts)
- **Vanilla JavaScript** (keine Frameworks)
- **CSS3** mit modernen Features

## Installation & Verwendung

1. **Lokale Entwicklung**:
   ```bash
   # Einfacher HTTP-Server (Python)
   python -m http.server 8000
   
   # Oder mit Node.js
   npx serve .
   ```

2. **Öffnen Sie** `http://localhost:8000` im Browser

3. **Testen Sie**:
   - Scrollen mit Mausrad
   - Touch-Gesten auf Mobile
   - Keyboard Navigation (Pfeiltasten, Leertaste)

## Debug-Modus

Fügen Sie `?debug=true` zur URL hinzu für erweiterte Konsolen-Ausgaben:

```
http://localhost:8000?debug=true
```

Für Performance-Monitoring:

```
http://localhost:8000?debug=performance
```

## Customization

### Logo hinzufügen
1. Erstellen Sie `assets/logo.svg`
2. Ersetzen Sie den Platzhalter in `index.html`

### Farben ändern
Bearbeiten Sie die CSS-Variablen in `style.css`:

```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #666;
    --background-color: #ffffff;
}
```

### Animationen anpassen
Die Animationen können in `style.css` angepasst werden:

```css
.content-item {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Performance Optimierungen

- **CSS Transforms** statt Position/Opacity für bessere Performance
- **Will-change** Property für optimierte Animationen
- **Intersection Observer** für effiziente DOM-Beobachtung
- **Debounced Events** für flüssige Scroll-Erfahrung

## Accessibility Features

- **Semantische HTML-Struktur**
- **ARIA-Labels** für Screen Reader
- **Focus Management** für Keyboard-Navigation
- **Reduced Motion** Support
- **High Contrast** Mode Unterstützung

## Browser-Kompatibilität

Die Website nutzt moderne Web-Standards:

- **CSS Grid & Flexbox** für Layout
- **CSS Custom Properties** für Theming
- **Intersection Observer API** für Performance
- **Touch Events** für Mobile Support

## Lizenz

Dieses Projekt ist für die Kunstausstellung "Faces Mannheim" erstellt.

## Support

Bei Fragen oder Problemen:
- Prüfen Sie die Browser-Konsole für Fehlermeldungen
- Testen Sie in verschiedenen Browsern
- Verwenden Sie den Debug-Modus für erweiterte Informationen