# Interactive Learning Platform Generator Prompt
## Reverse-Engineered from Green Finance React App

**Purpose:** Create similar learning platforms for any educational content with this exact layout, structure, and design system.

---

## MASTER PROMPT TEMPLATE

```markdown
Create a complete React.js interactive learning platform with the following specifications:

## 1. OVERALL ARCHITECTURE

### Application Structure:
- **Framework:** React 18.2+ with hooks (functional components only)
- **UI Library:** Material-UI (MUI) v5.14+
- **Animation:** Framer Motion v10.16+
- **Charts:** Recharts v2.8+ for data visualizations
- **State Management:** React hooks (useState, useEffect) with localStorage persistence
- **Routing:** None (single-page application with slide navigation)

### Dependencies:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@mui/material": "^5.14.0",
  "@mui/icons-material": "^5.14.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "recharts": "^2.8.0",
  "framer-motion": "^10.16.0",
  "d3": "^7.8.5"  // Optional, only if needed
}
```

## 2. LAYOUT STRUCTURE

### Master Layout (App.js):
```
┌─────────────────────────────────────────────────────┐
│  [ProgressBar - Full Width Top]                    │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ SIDEBAR  │        MAIN CONTENT AREA                │
│ (Fixed)  │        (Slide Container)                │
│ 280px    │        (FlexGrow)                        │
│          │                                          │
│ - Header │  ┌─────────────────────────────┐        │
│ - Goals  │  │                             │        │
│   • Goal │  │   Current Slide Content     │        │
│   • Goal │  │   (Dynamic based on type)   │        │
│   • Goal │  │                             │        │
│          │  └─────────────────────────────┘        │
│ - Status │                                          │
│          │  [Prev Button] Slide N/M [Next Button]  │
└──────────┴──────────────────────────────────────────┘
```

### Flexbox Layout Code:
```jsx
<Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  <Sidebar />  {/* Fixed width: 280px */}
  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <ProgressBar />  {/* Top bar */}
    <SlideContainer />  {/* Main content */}
  </Box>
</Box>
```

## 3. COLOR SCHEME & THEME

### Material-UI Theme Configuration:
```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#3333B2' },      // Main brand color (purple/blue)
    secondary: { main: '#ADADE0' },    // Secondary accent (lavender)
    success: { main: '#2CA02C' },      // Success states (green)
    warning: { main: '#FF7F0E' },      // Warning states (orange)
    background: {
      default: '#FAFAFA',              // Page background
      paper: '#FFFFFF'                 // Card/paper background
    }
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700, color: '#3333B2' },
    h2: { fontWeight: 600, color: '#3333B2' },
    h3: { fontWeight: 600, color: '#3333B2' },
    h4: { fontWeight: 500, color: '#3333B2' },
  }
});
```

### Extended Color Palette for Charts:
```javascript
const COLORS = {
  primary: '#3333B2',      // Primary brand
  secondary: '#ADADE0',    // Secondary accent
  light: '#C1C1E8',        // Light variant
  lighter: '#CCCCEB',      // Lighter variant
  lightest: '#D6D6EF',     // Lightest variant
  success: '#2CA02C',      // Success/positive
  warning: '#FF7F0E',      // Warning/attention
  danger: '#D62728',       // Error/critical
  neutral: '#7F7F7F'       // Neutral/gray
};
```

## 4. SIDEBAR COMPONENT

### Specifications:
- **Width:** Fixed 280px
- **Height:** 100vh (full viewport height)
- **Background:** #F5F5F5 (light gray)
- **Border:** 2px solid #E0E0E0 on right edge
- **Position:** Fixed left side

### Structure:
```jsx
<Sidebar>
  <Header Section>
    - Title (h6, primary color, bold)
    - Subtitle (body2, gray)
  </Header>

  <Section Label>
    - "LEARNING GOALS" (caption, uppercase, tracked)
  </Section>

  <Goals List>
    {goals.map(goal => (
      <GoalItem>
        - Status icon (completed/current/upcoming)
        - Goal icon (School/Analytics/Functions)
        - Goal title
        - Goal type badge
        - Progress bar (linear progress, 0-100%)
        - Click handler to jump to goal's first slide
      </GoalItem>
    ))}
  </Goals>
</Sidebar>
```

### Goal Item Design:
- **States:** completed (green check), current (filled circle, purple border), upcoming (empty circle)
- **Hover effect:** Background changes to white, slight elevation
- **Active state:** White background, 2px purple border
- **Progress bar:** Linear at bottom, primary color, height 4px

### Goal Data Structure:
```javascript
const goals = [
  {
    id: 1,
    title: "Goal Title Here",
    type: "Theoretical/Quantitative/Mathematical",
    icon: School | Analytics | Functions,  // MUI icons
    slides: [startIndex, endIndex],  // e.g., [0, 9] for slides 1-10
    color: '#C1C1E8'  // Light shade for visual distinction
  },
  // ... 2 more goals (total of 3)
];
```

## 5. PROGRESS BAR COMPONENT

### Specifications:
- **Height:** 6px
- **Position:** Top of main content area (below sidebar header level)
- **Width:** Full width of content area
- **Color:** Primary color (#3333B2)
- **Style:** Linear progress bar (MUI LinearProgress)

### Display:
```jsx
<Box>
  <Typography variant="caption">
    Slide {current + 1} of {total} | Current Goal: {goalName}
  </Typography>
  <LinearProgress
    variant="determinate"
    value={(currentSlide / totalSlides) * 100}
    sx={{
      height: 6,
      borderRadius: 3,
      bgcolor: '#E0E0E0',
      '& .MuiLinearProgress-bar': { bgcolor: '#3333B2' }
    }}
  />
</Box>
```

## 6. SLIDE CONTAINER COMPONENT

### Specifications:
- **Flex:** flexGrow: 1 (fills remaining space)
- **Padding:** 40px all sides
- **Background:** #FAFAFA
- **Overflow:** auto (scrollable if content exceeds)

### Structure:
```jsx
<SlideContainer>
  <ContentArea>
    {renderSlideByType(slide)}  // Dynamic based on slide.type
  </ContentArea>

  <NavigationControls>
    <Button
      variant="outlined"
      disabled={currentSlide === 0}
      onClick={onPrev}
    >
      Previous
    </Button>

    <SlideIndicator>
      Slide {current + 1} of {total}
    </SlideIndicator>

    <Button
      variant="contained"
      disabled={currentSlide === totalSlides - 1}
      onClick={onNext}
    >
      Next
    </Button>
  </NavigationControls>
</SlideContainer>
```

### Slide Transitions:
```jsx
<motion.div
  key={currentSlide}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
  {slideContent}
</motion.div>
```

## 7. SLIDE TYPES TO IMPLEMENT

### Type 1: Learning Goal Title (Full-Screen)
```jsx
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
  bgcolor: 'primary.main',  // Purple background
  color: '#fff'
}}>
  <Typography variant="h2">Learning Goal {number}</Typography>
  <Typography variant="h4">{goalStatement}</Typography>
  <Chip label={goalType} />  // Badge: "Theoretical", "Mathematical", etc.
  <Typography variant="body1">{narrativeRole}</Typography>
</Box>
```

### Type 2: Two-Column Content
```jsx
<Box sx={{ display: 'flex', gap: 4 }}>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">{leftHeader}</Typography>
    <ul>
      {leftBullets.map(bullet => <li>{bullet}</li>)}
    </ul>
  </Box>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">{rightHeader}</Typography>
    <ul>
      {rightBullets.map(bullet => <li>{bullet}</li>)}
    </ul>
  </Box>
</Box>
<BottomNote>{bottomNote}</BottomNote>
```

### Type 3: Chart Slide
```jsx
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  <Typography variant="h4">{title}</Typography>
  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {renderChart(chartType)}  // Dynamic chart component
  </Box>
  <BottomNote>{bottomNote}</BottomNote>
</Box>
```

### Type 4: Mathematical Derivation
```jsx
<Box sx={{ display: 'flex', gap: 4 }}>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">Starting Point</Typography>
    <MathDisplay>{equation}</MathDisplay>  // Use KaTeX or MathJax
    <Typography>Assumptions:</Typography>
    <ul>{assumptions.map(a => <li>{a}</li>)}</ul>
  </Box>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">Derivation Steps</Typography>
    {steps.map((step, i) => (
      <Box>
        <Typography>{i+1}. {step.explanation}</Typography>
        <MathDisplay>{step.equation}</MathDisplay>
      </Box>
    ))}
  </Box>
</Box>
```

### Type 5: Goal Summary (Self-Assessment)
```jsx
<Box sx={{ display: 'flex', gap: 4 }}>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">What We Achieved</Typography>
    {achievements.map(item => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircle sx={{ color: 'success.main' }} />
        <Typography>{item}</Typography>
      </Box>
    ))}
  </Box>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6">Can You Now...</Typography>
    {questions.map(q => (
      <FormControlLabel
        control={<Checkbox />}
        label={q}
      />
    ))}
    <Button variant="contained" onClick={onMarkComplete}>
      Mark Goal Complete
    </Button>
  </Box>
</Box>
```

### Type 6: Framework Overview
```jsx
<Box>
  <Typography variant="h5" align="center">{frameworkName}</Typography>
  <Box sx={{ display: 'flex', gap: 4, mt: 3 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Core Principles</Typography>
      <ul>{principles.map(p => <li>{p}</li>)}</ul>
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Framework Components</Typography>
      <ul>{components.map(c => <li>{c}</li>)}</ul>
    </Box>
  </Box>
  <BottomNote>{bottomNote}</BottomNote>
</Box>
```

## 8. BOTTOM NOTE COMPONENT

### Always at Bottom of Slide:
```jsx
<Box sx={{
  mt: 3,              // Margin top: 24px
  pt: 2,              // Padding top: 16px
  borderTop: '2px solid #E0E0E0'  // Horizontal separator
}}>
  <Typography variant="body2" sx={{
    color: '#B4B4B4',  // Light gray
    fontSize: '0.875rem',
    fontStyle: 'normal'
  }}>
    {bottomNote}  // e.g., "[Goal 1] Key takeaway here"
  </Typography>
</Box>
```

## 9. NAVIGATION SYSTEM

### Keyboard Navigation:
```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setCurrentSlide(prev => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1));
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Button Navigation:
```jsx
<Button
  variant="outlined"
  disabled={currentSlide === 0}
  onClick={() => setCurrentSlide(prev => prev - 1)}
  sx={{
    color: 'primary.main',
    borderColor: 'primary.main',
    '&:disabled': { opacity: 0.3 }
  }}
>
  Previous
</Button>

<Button
  variant="contained"
  disabled={currentSlide === totalSlides - 1}
  onClick={() => setCurrentSlide(prev => prev + 1)}
  sx={{ bgcolor: 'primary.main' }}
>
  Next
</Button>
```

### Sidebar Goal Navigation:
```jsx
<ListItem
  button
  onClick={() => onSlideChange(goal.slides[0])}  // Jump to first slide of goal
  sx={{
    cursor: 'pointer',
    '&:hover': {
      bgcolor: '#FFFFFF',
      transform: 'translateX(4px)',
      transition: 'all 0.2s ease'
    }
  }}
>
  {/* Goal content */}
</ListItem>
```

## 10. STATE MANAGEMENT

### Primary State:
```javascript
const [currentSlide, setCurrentSlide] = useState(0);
const [completedGoals, setCompletedGoals] = useState([]);
```

### localStorage Persistence:
```javascript
// Save on every change
useEffect(() => {
  localStorage.setItem('currentSlide', currentSlide.toString());
  localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
}, [currentSlide, completedGoals]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('currentSlide');
  if (saved) setCurrentSlide(parseInt(saved, 10));
}, []);
```

## 11. DATA STRUCTURE

### Slide Data Format:
```javascript
const slides = [
  // Learning Goal Title
  {
    id: 0,
    type: 'learning_goal_title',
    goalNumber: 1,
    goalStatement: "Goal statement here",
    goalType: "Theoretical",
    narrativeRole: "Foundation - Establishes core concepts"
  },

  // Two-Column Content
  {
    id: 1,
    type: 'two_column',
    title: "Slide Title",
    leftHeader: "Left Header",
    leftBullets: ["Bullet 1", "Bullet 2"],
    rightHeader: "Right Header",
    rightBullets: ["Bullet A", "Bullet B"],
    bottomNote: "[Goal 1] Key takeaway",
    goalReference: 1
  },

  // Chart Slide
  {
    id: 2,
    type: 'chart',
    title: "Chart Title",
    chartType: "market_growth",  // Identifies which chart component
    bottomNote: "[Goal 1] Chart insight",
    goalReference: 1
  },

  // Mathematical Derivation
  {
    id: 3,
    type: 'math_derivation',
    title: "Derivation Title",
    leftHeader: "Starting Point",
    leftContent: {
      equation: "$P_0 = \\sum_{t=1}^{T} \\frac{C}{(1+r)^t}$",
      assumptions: ["Assumption 1", "Assumption 2"]
    },
    rightHeader: "Derivation Steps",
    rightSteps: [
      { step: 1, explanation: "Step description", equation: "$P_0 = ...$" }
    ],
    bottomNote: "[Goal 2] Mathematical insight",
    goalReference: 2
  },

  // Goal Summary
  {
    id: 9,
    type: 'goal_summary',
    title: "Learning Goal 1: Summary",
    goalNumber: 1,
    goalStatement: "Goal statement",
    summaryPoints: ["Achievement 1", "Achievement 2"],
    checkItems: ["Can you do X?", "Can you do Y?"],
    bottomNote: "[Goal 1] Achieved - Next goal",
    goalReference: 1
  }
];
```

### Goal Data Structure:
```javascript
const goals = [
  {
    id: 1,
    title: "Goal Title (Short)",
    type: "Theoretical | Quantitative | Mathematical | Applied",
    icon: School | Analytics | Functions | Build,  // MUI icon component
    slides: [startIndex, endIndex],  // 0-indexed, e.g., [0, 9]
    color: '#C1C1E8'  // Visual distinction color
  },
  // Total: Exactly 3 goals
];
```

## 12. COMPONENT FILE STRUCTURE

```
src/
├── App.js                    // Main layout: sidebar + content
├── index.js                  // Entry point with ThemeProvider
├── theme.js                  // MUI theme configuration
│
├── components/
│   ├── Sidebar.js            // Left sidebar with 3 goals
│   ├── SlideContainer.js     // Main slide viewer + navigation
│   ├── ProgressBar.js        // Top progress indicator
│   │
│   └── slides/               // Slide type components
│       ├── LearningGoalTitle.js
│       ├── TwoColumnSlide.js
│       ├── ChartSlide.js
│       ├── MathDerivation.js
│       ├── GoalSummary.js
│       └── FrameworkOverview.js
│
├── charts/                   // Chart components
│   ├── MarketGrowthChart.js  // Recharts LineChart
│   ├── RiskReturnScatter.js  // Recharts ScatterChart
│   └── simple/               // Simplified versions (error-proof)
│       ├── NetworkDiagramSimple.js  // Static SVG
│       ├── TimelineSimple.js        // MUI Timeline
│       └── HierarchySimple.js       // Nested boxes
│
└── data/
    └── slides.js             // All slide data (array of objects)
```

## 13. RESPONSIVE DESIGN

### Breakpoints:
```javascript
// Desktop (default): Sidebar + content side-by-side
// Tablet: Collapsible sidebar
// Mobile: Full-width content, bottom navigation

sx={{
  width: { xs: '100%', md: 280 },  // Responsive sidebar width
  display: { xs: 'none', md: 'flex' }  // Hide on mobile
}}
```

### Slide Container Responsive:
```jsx
<Box sx={{
  p: { xs: 2, md: 4 },  // Less padding on mobile
  fontSize: { xs: '0.875rem', md: '1rem' }  // Smaller text on mobile
}}>
```

## 14. INTERACTIVE FEATURES

### Chart Export Button:
```jsx
<Button
  variant="outlined"
  size="small"
  startIcon={<Download />}
  onClick={() => exportChart(chartRef.current)}
>
  Export PNG
</Button>
```

### Slider Controls (for interactive calculators):
```jsx
<Slider
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
  min={0}
  max={100}
  step={1}
  valueLabelDisplay="on"
  sx={{
    color: 'primary.main',
    '& .MuiSlider-valueLabel': { bgcolor: 'primary.main' }
  }}
/>
```

### Checkboxes (for self-assessment):
```jsx
<FormControlLabel
  control={
    <Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      sx={{ color: 'primary.main' }}
    />
  }
  label="Self-assessment question"
/>
```

## 15. CHART IMPLEMENTATION PATTERNS

### Pattern A: Recharts Line Chart
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartComponent = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
      <XAxis dataKey="year" stroke="#666" />
      <YAxis stroke="#666" />
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          border: '2px solid #3333B2',
          borderRadius: 8
        }}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#3333B2"
        strokeWidth={2.5}
        dot={{ fill: '#3333B2', r: 5 }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
```

### Pattern B: Static SVG Diagram
```jsx
const DiagramComponent = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <svg width={800} height={500} viewBox="0 0 800 500">
      {/* Pre-calculated positions */}
      <circle
        cx={150} cy={200} r={40}
        fill={hovered === 'node1' ? '#3333B2' : '#ADADE0'}
        onMouseEnter={() => setHovered('node1')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
      />
      <text x={150} y={200} textAnchor="middle" fill="#fff">Label</text>
    </svg>
  );
};
```

### Pattern C: Interactive Calculator with Sliders
```jsx
const CalculatorComponent = () => {
  const [discountRate, setDiscountRate] = useState(2.5);
  const [greenium, setGreenium] = useState(3);

  // Real-time calculation
  const price = calculatePrice(discountRate, greenium);

  return (
    <Box>
      <Slider
        label="Discount Rate"
        value={discountRate}
        onChange={(e, v) => setDiscountRate(v)}
        min={0} max={10} step={0.1}
      />
      <Typography>Calculated Price: ${price}</Typography>
      <BarChart data={[{name: 'Price', value: price}]} />
    </Box>
  );
};
```

## 16. ANIMATION PATTERNS

### Slide Enter/Exit:
```jsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
```

### Staggered List Animation:
```jsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: i * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

### Chart Fade In:
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <Chart />
</motion.div>
```

## 17. STYLING CONVENTIONS

### Typography Hierarchy:
- **h2:** Learning goal titles (Huge, 700 weight)
- **h4:** Slide titles (Large, 600 weight)
- **h6:** Section headers (Medium, 600 weight)
- **body1:** Main content (Regular, 400 weight)
- **body2:** Bottom notes (Small, light gray)
- **caption:** Labels (Tiny, uppercase, tracked)

### Spacing System:
```javascript
sx={{
  p: 4,      // Padding: 32px
  m: 3,      // Margin: 24px
  gap: 4,    // Gap: 32px
  mb: 2,     // Margin bottom: 16px
}}
// MUI spacing: 1 unit = 8px
```

### Border and Shadow:
```javascript
sx={{
  borderRadius: 2,  // 16px rounded corners
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',  // Subtle elevation
  border: '2px solid #E0E0E0'  // Light gray borders
}}
```

## 18. CHART COLOR GUIDELINES

### Use This Exact Palette:
- **Primary data:** #3333B2 (purple)
- **Secondary data:** #ADADE0 (lavender)
- **Positive/Success:** #2CA02C (green)
- **Warning/Negative:** #FF7F0E (orange)
- **Neutral/Gray:** #7F7F7F
- **Backgrounds:** #FAFAFA (page), #FFFFFF (cards)
- **Borders:** #E0E0E0 (light gray)
- **Text:** #404040 (dark gray for body), #666 (medium gray for secondary)

### Chart Styling Template:
```jsx
<BarChart>
  <Bar dataKey="value" fill="#3333B2" />  // Primary color
  <XAxis stroke="#666" />
  <YAxis stroke="#666" />
  <CartesianGrid stroke="#E0E0E0" strokeDasharray="3 3" />
  <Tooltip
    contentStyle={{
      backgroundColor: '#FFFFFF',
      border: '2px solid #3333B2',
      borderRadius: 8
    }}
  />
</BarChart>
```

## 19. ACCESSIBILITY

### ARIA Labels:
```jsx
<Button aria-label="Navigate to next slide">Next</Button>
<Slider aria-label="Discount rate slider" />
<Box role="navigation" aria-label="Learning goals navigation">
```

### Keyboard Support:
- Arrow keys: Navigate slides
- Tab: Focus navigation elements
- Enter/Space: Activate buttons
- Escape: Close modals

## 20. PERFORMANCE OPTIMIZATIONS

### Lazy Loading:
```javascript
import React, { lazy, Suspense } from 'react';
const HeavyChart = lazy(() => import('./charts/HeavyChart'));

<Suspense fallback={<CircularProgress />}>
  <HeavyChart />
</Suspense>
```

### Memoization:
```javascript
const MemoizedChart = React.memo(ChartComponent);
```

### Avoid Re-renders:
```javascript
// Use React.memo for slide components
export default React.memo(TwoColumnSlide);

// Use callback refs for charts
const chartRef = useCallback(node => {
  if (node) {
    // Initialize chart
  }
}, []);
```

## 21. FILE NAMING CONVENTIONS

- **Components:** PascalCase (e.g., `Sidebar.js`, `TwoColumnSlide.js`)
- **Data files:** camelCase (e.g., `week1Slides.js`, `chartData.js`)
- **Test files:** `*.test.js` (e.g., `App.test.js`)
- **Simple versions:** Place in `simple/` subdirectory

## 22. TECHNICAL REQUIREMENTS

### Browser Support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Screen Sizes:
- **Desktop:** 1920×1080 (primary)
- **Laptop:** 1366×768
- **Tablet:** 768×1024 (landscape)
- **Mobile:** 375×667 (basic support)

### Performance Targets:
- Initial load: <3 seconds
- Slide navigation: <100ms
- Chart render: <500ms
- Bundle size: <500KB (gzipped)

---

## USAGE EXAMPLE

To create a new learning platform using this prompt:

```
1. Replace content in slides.js with your topic
2. Update goals array with your 3 learning goals
3. Update theme colors if needed (keep structure)
4. Use same component types (learning_goal_title, two_column, chart, etc.)
5. Follow same layout patterns (sidebar + content)
6. Use same navigation system (prev/next + keyboard + sidebar)
7. Maintain same state management (localStorage persistence)
```

**Result:** Identical layout and structure, different content

---

## KEY DESIGN PRINCIPLES

1. **Fixed sidebar (280px)** with 3 learning goals
2. **Flexbox layout** (sidebar + flexGrow content area)
3. **Top progress bar** showing overall completion
4. **Material-UI components** for consistency
5. **Purple/lavender color scheme** (configurable)
6. **Slide-based navigation** (not scroll)
7. **6 slide types:** learning_goal_title, two_column, chart, math_derivation, framework_overview, goal_summary
8. **localStorage persistence** for progress
9. **Keyboard navigation** (arrow keys)
10. **Framer Motion transitions** (smooth, 300ms)
11. **Bottom notes** on every slide (with horizontal separator)
12. **3-goal structure:** Foundation → Build → Apply
13. **Responsive design** (desktop primary, mobile basic)
14. **Interactive charts** (Recharts for data, simple SVG for diagrams)
15. **Self-assessment** on goal summary slides (checkboxes)

---

*This prompt template generates the exact layout, structure, and design system of the Green Finance learning platform, ready to be filled with any educational content.*
```
