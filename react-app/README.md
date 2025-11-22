# Green Finance Learning Platform - Week 1

An interactive React-based learning platform for the Green Finance Professional Certificate, Week 1: Foundations of Green Finance.

## Features

- 30 interactive slides organized into 3 learning goals
- Persistent sidebar with progress tracking
- Interactive charts using Recharts
- Self-assessment quizzes with completion tracking
- Keyboard navigation (Arrow Left/Right)
- Progress saved to localStorage
- Smooth slide transitions with Framer Motion
- Lavender color scheme matching the course materials

## Learning Goals

### Goal 1: Market Microstructure Theory (Slides 1-10)
Understand the market microstructure theory explaining why green finance markets exist and how they function.

### Goal 2: Quantify Market Size & Growth (Slides 11-20)
Quantify the size, growth trajectory, and composition of global green finance markets using empirical data.

### Goal 3: Derive Pricing Models (Slides 21-30)
Derive and apply mathematical models for pricing green financial instruments, incorporating greenium and ESG factors.

## Installation

```bash
cd D:\Joerg\Research\slides\GreenFinance\react-app
npm install
```

## Running the Application

```bash
npm start
```

The application will open at http://localhost:3000

## Project Structure

```
react-app/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── charts/                 # Interactive chart components
│   │   ├── MarketGrowthChart.js
│   │   └── RiskReturnScatter.js
│   ├── components/             # Core UI components
│   │   ├── ProgressBar.js      # Top progress indicator
│   │   ├── Sidebar.js          # Left sidebar with goals
│   │   ├── SlideContainer.js   # Main slide container
│   │   └── slides/             # Slide type components
│   │       ├── LearningGoalTitle.js
│   │       ├── TwoColumnSlide.js
│   │       ├── FrameworkOverview.js
│   │       ├── MathDerivation.js
│   │       ├── GoalSummary.js
│   │       └── ChartSlide.js
│   ├── data/
│   │   └── week1Slides.js      # All 30 slides content
│   ├── App.js                  # Main application
│   ├── index.js                # React entry point
│   └── theme.js                # Material-UI theme
└── package.json
```

## Dependencies

- React 18.2
- Material-UI 5.14
- Recharts 2.8 (interactive charts)
- Framer Motion 10.16 (animations)
- D3 7.8 (optional, for advanced visualizations)

## Navigation

- Arrow Left: Previous slide
- Arrow Right: Next slide
- Click sidebar goals to jump to specific sections
- Bottom navigation: Previous/Next buttons and slide indicator

## Progress Tracking

- Progress automatically saved to browser localStorage
- Learning goals can be marked complete on summary slides (10, 20, 30)
- Resume where you left off on page reload

## Slide Types

1. **Learning Goal Title** - Full-screen goal introduction
2. **Framework Overview** - Theoretical framework presentation
3. **Two Column Slide** - Standard content with left/right columns
4. **Math Derivation** - Mathematical equations and derivations
5. **Chart Slide** - Interactive data visualizations
6. **Goal Summary** - Self-assessment with completion tracking

## Color Scheme

- Primary (Purple): #3333B2
- Secondary (Lavender): #ADADE0
- Success (Green): #2CA02C
- Warning (Orange): #FF7F0E
- Background: #FAFAFA

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
