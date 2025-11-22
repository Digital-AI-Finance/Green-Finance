# Quick Start Guide

## First Time Setup

1. Open terminal in the project directory:
```bash
cd D:\Joerg\Research\slides\GreenFinance\react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. The application will automatically open at http://localhost:3000

## Using the Application

### Navigation
- Use Arrow Left/Right keys to move between slides
- Click Previous/Next buttons at the bottom
- Click on learning goals in the sidebar to jump to specific sections

### Progress Tracking
- Your progress is automatically saved
- Complete the self-assessment questions on slides 10, 20, and 30
- Click "Mark Goal Complete" after checking all boxes

### Learning Path
1. Start with Learning Goal 1 (Slides 1-10): Market Microstructure Theory
2. Continue to Learning Goal 2 (Slides 11-20): Quantify Market Size & Growth
3. Finish with Learning Goal 3 (Slides 21-30): Derive Pricing Models

### Interactive Features
- Hover over chart data points to see detailed values
- Check boxes on summary slides to track your understanding
- Watch the progress bar at the top update as you advance

## Troubleshooting

### Port already in use
If port 3000 is busy:
```bash
PORT=3001 npm start
```

### Dependencies not installing
Clear npm cache and retry:
```bash
npm cache clean --force
npm install
```

### Application not loading
Check console for errors (F12 in browser)
Ensure all files are present in src/ directory

## Development

### Adding New Slides
Edit `src/data/week1Slides.js` and add slide objects to the array.

### Modifying Theme
Edit `src/theme.js` to change colors and typography.

### Creating New Slide Types
1. Create component in `src/components/slides/`
2. Import in `src/components/SlideContainer.js`
3. Add case to renderSlide() switch statement

## Production Build

To create an optimized production build:
```bash
npm run build
```

Deploy the contents of the `build/` directory to your web server.
