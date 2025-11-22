# Reusable Prompt: Interactive Learning Platform Generator

## Copy This Prompt to Generate Similar Apps

---

```
Create a React.js interactive learning platform with the following exact specifications:

## CORE REQUIREMENTS

**Framework:** React 18 + Material-UI v5 + Recharts + Framer Motion

**Layout:** Fixed sidebar (280px) + flexible content area

**Structure:** Single-page app with slide-based navigation (NOT scrolling)

**Learning Model:** 3 learning goals per course/week, ~10 slides per goal

---

## 1. LAYOUT STRUCTURE

### Master Layout (100vh flexbox):
```
┌────────────┬─────────────────────────────────┐
│            │  [ProgressBar - Top 60px]       │
│  SIDEBAR   ├─────────────────────────────────┤
│  280px     │                                 │
│  Fixed     │    SLIDE CONTENT                │
│            │    (Dynamic by type)            │
│  • Title   │                                 │
│  • 3 Goals │                                 │
│  • Status  │                                 │
│            ├─────────────────────────────────┤
│            │  [Nav: Prev | N/M | Next]       │
└────────────┴─────────────────────────────────┘
```

**Code:**
```jsx
<Box sx={{ display: 'flex', height: '100vh' }}>
  <Sidebar width={280} />
  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <ProgressBar />
    <SlideContainer />
  </Box>
</Box>
```

---

## 2. COLOR SCHEME (Exact Hex Codes)

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#3333B2' },      // Purple (headers, highlights)
    secondary: { main: '#ADADE0' },    // Lavender (accents)
    success: { main: '#2CA02C' },      // Green (completed)
    background: {
      default: '#FAFAFA',              // Page background
      paper: '#FFFFFF'                 // Card/slide background
    }
  }
});

// Extended palette for charts:
const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF',
  success: '#2CA02C',
  neutral: '#7F7F7F'
};
```

**Use primary (#3333B2) for:** Titles, headers, active states, primary chart data
**Use secondary (#ADADE0) for:** Borders, progress bars, secondary chart data
**Use success (#2CA02C) for:** Completed states, positive indicators

---

## 3. SIDEBAR SPECIFICATIONS

**Fixed Dimensions:** 280px width × 100vh height
**Background:** #F5F5F5
**Border:** 2px solid #E0E0E0 (right edge)

**Structure:**
```jsx
<Sidebar>
  {/* Header */}
  <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0' }}>
    <Typography variant="h6" color="primary">Week Title</Typography>
    <Typography variant="body2">Subtitle</Typography>
  </Box>

  {/* Section Label */}
  <Typography variant="caption" sx={{
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 600
  }}>
    LEARNING GOALS
  </Typography>

  {/* 3 Goals List */}
  <List>
    {goals.map(goal => (
      <ListItem button onClick={() => jumpToGoal(goal)}>
        <StatusIcon />  {/* CheckCircle | Circle | RadioButtonUnchecked */}
        <GoalIcon />    {/* School | Analytics | Functions */}
        <GoalTitle />
        <TypeBadge />   {/* Chip: "Theoretical", "Mathematical" */}
        <ProgressBar value={goalProgress} />
      </ListItem>
    ))}
  </List>
</Sidebar>
```

**Goal Status Icons:**
- Completed: Green checkmark (CheckCircle, #2CA02C)
- Current: Filled purple circle (Circle, #3333B2)
- Upcoming: Empty gray circle (RadioButtonUnchecked, #BDBDBD)

**Goal Type Icons:**
- Theoretical: School
- Quantitative: Analytics
- Mathematical: Functions
- Applied: Build

---

## 4. SLIDE TYPES (6 Required Types)

### Type 1: Learning Goal Title (Full-Screen Intro)
```jsx
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
  bgcolor: 'primary.main',  // Purple background
  color: '#fff',
  p: 6
}}>
  <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
    Learning Goal {goalNumber}
  </Typography>
  <Typography variant="h4" sx={{ mb: 3, maxWidth: 800 }}>
    {goalStatement}
  </Typography>
  <Chip label={goalType} sx={{ bgcolor: '#fff', color: 'primary.main' }} />
  <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
    {narrativeRole}
  </Typography>
</Box>
```

### Type 2: Two-Column Content (Most Common)
```jsx
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 4 }}>
  <Typography variant="h4" color="primary">{title}</Typography>

  <Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" color="primary">{leftHeader}</Typography>
      <ul>{leftBullets.map(b => <li>{b}</li>)}</ul>
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" color="primary">{rightHeader}</Typography>
      <ul>{rightBullets.map(b => <li>{b}</li>)}</ul>
    </Box>
  </Box>

  {/* Bottom Note */}
  <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #E0E0E0' }}>
    <Typography variant="body2" color="#B4B4B4">{bottomNote}</Typography>
  </Box>
</Box>
```

### Type 3: Chart Slide
```jsx
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 4 }}>
  <Typography variant="h4" color="primary">{title}</Typography>

  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {renderChart(chartType)}
  </Box>

  <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #E0E0E0' }}>
    <Typography variant="body2" color="#B4B4B4">{bottomNote}</Typography>
  </Box>
</Box>
```

### Type 4: Goal Summary (Self-Assessment)
```jsx
<Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
  <Typography variant="h4" color="primary">Learning Goal {N}: Summary</Typography>
  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>
    {goalStatement}
  </Typography>

  <Box sx={{ display: 'flex', gap: 4 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">What We Achieved</Typography>
      {achievements.map(item => (
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
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
      <Button variant="contained" sx={{ mt: 2 }}>
        Mark Goal Complete
      </Button>
    </Box>
  </Box>

  <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #E0E0E0' }}>
    <Typography variant="body2" color="#B4B4B4">{bottomNote}</Typography>
  </Box>
</Box>
```

### Type 5: Mathematical Derivation
```jsx
<Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
  <Typography variant="h4" color="primary">{title}</Typography>

  <Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Starting Point</Typography>
      <MathDisplay>{equation}</MathDisplay>  {/* LaTeX or MathJax */}
      <Typography variant="subtitle2">Assumptions:</Typography>
      <ul>{assumptions.map(a => <li>{a}</li>)}</ul>
    </Box>

    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Derivation Steps</Typography>
      {steps.map((step, i) => (
        <Box sx={{ mb: 2 }}>
          <Typography>{i+1}. {step.explanation}</Typography>
          <MathDisplay>{step.equation}</MathDisplay>
        </Box>
      ))}
    </Box>
  </Box>

  <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #E0E0E0' }}>
    <Typography variant="body2" color="#B4B4B4">{bottomNote}</Typography>
  </Box>
</Box>
```

### Type 6: Framework Overview
```jsx
<Box sx={{ p: 4 }}>
  <Typography variant="h4" color="primary">{title}</Typography>

  <Typography variant="h5" align="center" sx={{ my: 3 }}>
    {frameworkName}
  </Typography>

  <Box sx={{ display: 'flex', gap: 4 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Core Principles</Typography>
      <ul>{principles.map(p => <li>{p}</li>)}</ul>
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6">Components</Typography>
      <ul>{components.map(c => <li>{c}</li>)}</ul>
    </Box>
  </Box>

  <BottomNote>{bottomNote}</BottomNote>
</Box>
```

---

## 5. STATE MANAGEMENT PATTERN

```javascript
// App.js state
const [currentSlide, setCurrentSlide] = useState(0);
const [completedGoals, setCompletedGoals] = useState([]);

// localStorage persistence
useEffect(() => {
  localStorage.setItem('currentSlide', currentSlide);
  localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
}, [currentSlide, completedGoals]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('currentSlide');
  if (saved) setCurrentSlide(parseInt(saved));
}, []);

// Keyboard navigation
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') navigatePrev();
    if (e.key === 'ArrowRight') navigateNext();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## 6. SIMPLICITY RULES (Error Prevention)

**PREFER:**
- Recharts for data charts (handles lifecycle automatically)
- Static SVG for diagrams (pre-calculated positions)
- MUI components for UI (tested library)
- Framer Motion for animations (React-aware)
- Components <100 lines (easier to maintain)
- Pre-calculated data (no runtime computation)

**AVOID:**
- Custom D3 force simulations (complex cleanup)
- Manual DOM manipulation (use React state)
- Complex useEffect chains (hard to debug)
- setState in render (infinite loops)
- Missing cleanup functions (memory leaks)

---

## 7. CHART IMPLEMENTATION (Use Recharts)

### Line Chart Pattern:
```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <XAxis dataKey="x" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip contentStyle={{ border: '2px solid #3333B2' }} />
    <Line dataKey="y" stroke="#3333B2" strokeWidth={2.5} />
  </LineChart>
</ResponsiveContainer>
```

### Bar Chart Pattern:
```jsx
<BarChart data={data}>
  <XAxis dataKey="category" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value" fill="#3333B2" />
</BarChart>
```

### Scatter Chart Pattern:
```jsx
<ScatterChart>
  <XAxis dataKey="x" />
  <YAxis dataKey="y" />
  <Tooltip />
  <Scatter name="Data" data={points} fill="#3333B2" />
</ScatterChart>
```

---

## 8. NAVIGATION SYSTEM

**Methods (All 3 Required):**
1. **Previous/Next Buttons:** At bottom of slide
2. **Keyboard:** ArrowLeft/ArrowRight
3. **Sidebar Goals:** Click to jump to goal's first slide

**State:**
```javascript
const [currentSlide, setCurrentSlide] = useState(0);

const handleNext = () => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1));
const handlePrev = () => setCurrentSlide(prev => Math.max(0, prev - 1));
const jumpToGoal = (goalId) => setCurrentSlide(goals[goalId].slides[0]);
```

---

## 9. PROGRESS TRACKING

**Features Required:**
- Top progress bar (linear, 0-100%)
- Sidebar goal progress (per-goal percentage)
- Completed goal indicators (green checkmarks)
- localStorage persistence (survives page reload)

**Implementation:**
```javascript
// Calculate current goal
const currentGoal = goals.find(g =>
  currentSlide >= g.slides[0] && currentSlide <= g.slides[1]
);

// Calculate goal progress
const goalProgress = ((currentSlide - goal.slides[0] + 1) / (goal.slides[1] - goal.slides[0] + 1)) * 100;

// Mark goal complete
const handleGoalComplete = (goalId) => {
  setCompletedGoals(prev => [...prev, goalId]);
};
```

---

## 10. DATA STRUCTURE TEMPLATE

```javascript
// goals.js
export const goals = [
  {
    id: 1,
    title: "Short Goal Title",
    type: "Theoretical",
    icon: School,
    slides: [0, 9],  // Slides 1-10
    color: '#C1C1E8'
  },
  {
    id: 2,
    title: "Short Goal Title",
    type: "Quantitative",
    icon: Analytics,
    slides: [10, 19],  // Slides 11-20
    color: '#ADADE0'
  },
  {
    id: 3,
    title: "Short Goal Title",
    type: "Mathematical",
    icon: Functions,
    slides: [20, 29],  // Slides 21-30
    color: '#3333B2'
  }
];

// slides.js
export const slides = [
  // Slide 1: Goal 1 Title
  {
    id: 0,
    type: 'learning_goal_title',
    goalNumber: 1,
    goalStatement: "Full goal statement here",
    goalType: "Theoretical",
    narrativeRole: "Foundation - Establishes core concepts"
  },

  // Slide 2: Content
  {
    id: 1,
    type: 'two_column',
    title: "Slide Title",
    leftHeader: "Left Section",
    leftBullets: ["Point 1", "Point 2"],
    rightHeader: "Right Section",
    rightBullets: ["Point A", "Point B"],
    bottomNote: "[Goal 1] Key takeaway",
    goalReference: 1
  },

  // Slide 3: Chart
  {
    id: 2,
    type: 'chart',
    title: "Chart Title",
    chartType: "line_chart",  // maps to component
    bottomNote: "[Goal 1] Chart insight",
    goalReference: 1
  },

  // ... Continue for all 30 slides
  // Pattern: 10 slides per goal (title + 8 content + summary)
];
```

---

## 11. ANIMATION SPECIFICATIONS

**Slide Transitions:**
```jsx
<motion.div
  key={currentSlide}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
  {slideContent}
</motion.div>
```

**List Item Stagger:**
```jsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: i * 0.05 }}
  >
    {item}
  </motion.div>
))}
```

**Chart Fade In:**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <Chart />
</motion.div>
```

---

## 12. INTERACTIVE FEATURES

**Required Features:**
- [x] Keyboard navigation (ArrowLeft/Right)
- [x] Progress persistence (localStorage)
- [x] Goal completion tracking
- [x] Hover tooltips on charts
- [x] Click to jump to goals (sidebar)
- [x] Self-assessment checkboxes (goal summaries)
- [x] Export charts as PNG
- [x] Responsive layout (desktop primary)

**Optional Advanced Features:**
- [ ] Parameter sliders for calculators
- [ ] Drill-down modals on charts
- [ ] Animated chart elements on load
- [ ] Fullscreen mode
- [ ] Print view

---

## 13. FILE ORGANIZATION

```
src/
├── App.js              // Main: sidebar + content layout
├── index.js            // Entry with ThemeProvider
├── theme.js            // MUI theme: colors, typography
├── components/
│   ├── Sidebar.js      // 280px fixed, 3 goals
│   ├── SlideContainer.js  // Slide viewer + navigation
│   ├── ProgressBar.js  // Top progress indicator
│   └── slides/
│       ├── LearningGoalTitle.js
│       ├── TwoColumnSlide.js
│       ├── ChartSlide.js
│       ├── GoalSummary.js
│       ├── MathDerivation.js
│       └── FrameworkOverview.js
├── charts/
│   ├── LineChartComponent.js
│   ├── ScatterChartComponent.js
│   └── simple/
│       ├── DiagramSimple.js
│       └── TimelineSimple.js
└── data/
    ├── goals.js        // 3 learning goals
    └── slides.js       // All slide objects
```

---

## 14. STYLING PATTERNS

### Card/Slide Container:
```jsx
sx={{
  bgcolor: '#FFFFFF',
  borderRadius: 2,        // 16px rounded
  p: 4,                   // 32px padding
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',  // Subtle shadow
  height: '100%'
}}
```

### Headers:
```jsx
<Typography variant="h4" sx={{
  color: '#3333B2',  // Primary color
  mb: 3,             // Margin bottom
  fontWeight: 600
}}>
```

### Bullet Lists:
```jsx
<Box component="ul" sx={{ pl: 3, m: 0 }}>
  {bullets.map((bullet, idx) => (
    <Typography component="li" variant="body1" sx={{
      color: '#404040',   // Dark gray
      mb: 1.5,            // Spacing between bullets
      lineHeight: 1.6     // Readable line height
    }}>
      {bullet}
    </Typography>
  ))}
</Box>
```

### Bottom Note (Required on ALL Slides):
```jsx
<Box sx={{
  mt: 3,
  pt: 2,
  borderTop: '2px solid #E0E0E0'
}}>
  <Typography variant="body2" sx={{
    color: '#B4B4B4',
    fontSize: '0.875rem'
  }}>
    {bottomNote}
  </Typography>
</Box>
```

---

## 15. RESPONSIVE BREAKPOINTS

```javascript
sx={{
  // Mobile: xs (0-600px)
  width: { xs: '100%', md: 280 },

  // Tablet: sm (600-900px), md (900-1200px)
  p: { xs: 2, md: 4 },

  // Desktop: lg (1200-1536px), xl (1536px+)
  fontSize: { xs: '0.875rem', md: '1rem' }
}}
```

---

## 16. TESTING REQUIREMENTS

**Create These Tests:**
```javascript
// App.test.js
test('renders without crashing');
test('navigates through all slides');
test('keyboard navigation works');
test('saves progress to localStorage');
test('restores progress on mount');
test('unmounts without errors');

// Component tests
test('Sidebar shows 3 goals');
test('Goal completion marks correctly');
test('Chart components render');
test('Bottom notes display');
```

---

## IMPLEMENTATION CHECKLIST

When building with this prompt, ensure:

- [ ] Sidebar is 280px wide, fixed, with 3 learning goals
- [ ] Main content area uses flexGrow
- [ ] Top progress bar shows completion percentage
- [ ] 6 slide types implemented (title, two-column, chart, summary, math, framework)
- [ ] Bottom note on EVERY slide with horizontal separator
- [ ] Color scheme matches exactly (purple #3333B2 primary)
- [ ] Keyboard navigation (← → arrows)
- [ ] localStorage saves currentSlide and completedGoals
- [ ] Sidebar goals clickable to jump to sections
- [ ] Goal status icons (checkmark, circle, empty circle)
- [ ] Framer Motion transitions (300ms duration)
- [ ] Recharts used for all data visualizations
- [ ] Typography hierarchy consistent (h4 titles, h6 headers, body1 content)
- [ ] Spacing system uses MUI units (1 unit = 8px)
- [ ] Components are simple (<100 lines each)

---

## OUTPUT REQUIREMENTS

**Deliverables:**
1. Complete working React app (production-ready)
2. All 6 slide type components
3. Sidebar with 3 goal navigation
4. Progress tracking with localStorage
5. Keyboard navigation
6. At least 2 interactive charts (Recharts)
7. Responsive layout (desktop primary)
8. Material-UI theme matching color scheme
9. Framer Motion animations
10. README with installation and usage instructions

**File Count:** ~15-20 files minimum
**Total Code:** ~1500-2000 lines
**Dependencies:** React, MUI, Recharts, Framer Motion
**Browser:** Chrome/Firefox/Safari/Edge support

---

*Use this prompt to generate identical learning platforms for any educational topic.*
*Just change the content data (slides.js and goals.js), keep all layout/structure the same.*
```
