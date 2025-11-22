# Visual Layout Diagram - React Learning Platform

## ASCII Layout Specification

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [ProgressBar Component]                                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Slide 15 of 30 | Current Goal: Quantify Market Size & Growth    │   │
│  │ ████████████████████░░░░░░░░░░░░░░░░░ 50%                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├──────────────┬──────────────────────────────────────────────────────────┤
│              │                                                          │
│  SIDEBAR     │              SLIDE CONTENT AREA                         │
│  280px       │                                                          │
│  Fixed       │  ┌────────────────────────────────────────────────┐    │
│              │  │                                                │    │
│ ┌──────────┐ │  │  Title: Slide Title Here (h4, purple)         │    │
│ │ Week 1   │ │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │    │
│ │ Subtitle │ │  │                                                │    │
│ └──────────┘ │  │  ┌──────────────────┬──────────────────────┐ │    │
│              │  │  │ Left Column      │ Right Column         │ │    │
│ LEARNING     │  │  │                  │                      │ │    │
│ GOALS        │  │  │ • Bullet 1       │ • Bullet A           │ │    │
│ ─────────    │  │  │ • Bullet 2       │ • Bullet B           │ │    │
│              │  │  │ • Bullet 3       │ • Bullet C           │ │    │
│ ○ Goal 1     │  │  │                  │                      │ │    │
│  Theory      │  │  └──────────────────┴──────────────────────┘ │    │
│  [███░░░] 70%│  │                                                │    │
│              │  │  ──────────────────────────────────────────── │    │
│ ● Goal 2     │  │  [Goal 2] Bottom note appears here           │    │
│  Quant       │  │                                                │    │
│  [██░░░] 50% │  │                                                │    │
│  <CURRENT>   │  └────────────────────────────────────────────────┘    │
│              │                                                          │
│ ○ Goal 3     │  ┌─────────────────────────────────────────────────┐   │
│  Math        │  │ [Previous]  Slide 15 of 30  [Next]              │   │
│  [░░░░░] 0%  │  └─────────────────────────────────────────────────┘   │
│              │                                                          │
└──────────────┴──────────────────────────────────────────────────────────┘

LEGEND:
○ = Upcoming goal (empty circle, gray)
● = Current goal (filled circle, purple)
✓ = Completed goal (checkmark, green)
█ = Progress filled
░ = Progress empty
```

## Component Breakdown

```
App.js (Root)
├─ Box (Flex container, height: 100vh)
│  ├─ Sidebar (280px fixed)
│  │  ├─ Header Box (p: 3)
│  │  │  ├─ Typography h6: "Week 1"
│  │  │  └─ Typography body2: "Subtitle"
│  │  ├─ Label Box (p: 2)
│  │  │  └─ Typography caption: "LEARNING GOALS"
│  │  └─ List (px: 2, flexGrow: 1)
│  │     ├─ ListItem (Goal 1)
│  │     │  ├─ StatusIcon (CheckCircle | Circle | RadioButtonUnchecked)
│  │     │  ├─ GoalIcon (School | Analytics | Functions)
│  │     │  ├─ Title + Type
│  │     │  └─ LinearProgress (height: 4px)
│  │     ├─ ListItem (Goal 2)
│  │     └─ ListItem (Goal 3)
│  │
│  └─ Box (flexGrow: 1, flex column)
│     ├─ ProgressBar (height: 60px)
│     │  ├─ Typography: "Slide N of M | Current Goal"
│     │  └─ LinearProgress (height: 6px)
│     │
│     └─ SlideContainer (flexGrow: 1, p: 4)
│        ├─ motion.div (slide transition)
│        │  └─ {renderSlideByType(currentSlide)}
│        │     ├─ LearningGoalTitle (if type === 'learning_goal_title')
│        │     ├─ TwoColumnSlide (if type === 'two_column')
│        │     ├─ ChartSlide (if type === 'chart')
│        │     ├─ MathDerivation (if type === 'math_derivation')
│        │     ├─ GoalSummary (if type === 'goal_summary')
│        │     └─ FrameworkOverview (if type === 'framework_overview')
│        │
│        └─ Box (Navigation Controls)
│           ├─ Button: "Previous" (disabled if slide 0)
│           ├─ Typography: "Slide N of M"
│           └─ Button: "Next" (disabled if last slide)
```

## Slide Type Layouts

```
LEARNING GOAL TITLE (Full-screen centered):
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         Learning Goal 1                 │
│                                         │
│    [Long goal statement here]           │
│                                         │
│      [Badge: Theoretical]               │
│                                         │
│   Foundation - Establishes concepts     │
│                                         │
│                                         │
└─────────────────────────────────────────┘
Background: Purple (#3333B2)
Text: White
Centered vertically and horizontally


TWO-COLUMN (Standard content):
┌─────────────────────────────────────────┐
│ Slide Title (h4, purple)                │
│                                         │
│ ┌─────────────────┬─────────────────┐  │
│ │ Left Header (h6)│ Right Header    │  │
│ │                 │                 │  │
│ │ • Bullet 1      │ • Bullet A      │  │
│ │ • Bullet 2      │ • Bullet B      │  │
│ │ • Bullet 3      │ • Bullet C      │  │
│ │ • Bullet 4      │ • Bullet D      │  │
│ │                 │                 │  │
│ └─────────────────┴─────────────────┘  │
│                                         │
│ ─────────────────────────────────────── │
│ [Goal N] Bottom note text               │
└─────────────────────────────────────────┘
Padding: 32px
Gap between columns: 32px


CHART (Data visualization):
┌─────────────────────────────────────────┐
│ Chart Title (h4, purple)                │
│                                         │
│         ┌─────────────────────┐         │
│         │                     │         │
│         │   [Recharts Chart]  │         │
│         │   (LineChart,       │         │
│         │    BarChart, etc.)  │         │
│         │                     │         │
│         └─────────────────────┘         │
│                                         │
│ ─────────────────────────────────────── │
│ [Goal N] Chart insight                  │
└─────────────────────────────────────────┘
Chart: Centered, flexGrow:1


GOAL SUMMARY (Self-assessment):
┌─────────────────────────────────────────┐
│ Learning Goal N: Summary                │
│ Goal statement (italic)                 │
│                                         │
│ ┌─────────────────┬─────────────────┐  │
│ │ What We Achieved│ Can You Now...  │  │
│ │                 │                 │  │
│ │ ✓ Achievement 1 │ □ Question 1?   │  │
│ │ ✓ Achievement 2 │ □ Question 2?   │  │
│ │ ✓ Achievement 3 │ □ Question 3?   │  │
│ │                 │                 │  │
│ │                 │ [Mark Complete] │  │
│ └─────────────────┴─────────────────┘  │
│                                         │
│ ─────────────────────────────────────── │
│ [Goal N] Achieved - Next goal           │
└─────────────────────────────────────────┘
Green checkmarks, interactive checkboxes


MATH DERIVATION:
┌─────────────────────────────────────────┐
│ Derivation Title (h4, purple)           │
│                                         │
│ ┌─────────────────┬─────────────────┐  │
│ │ Starting Point  │ Derivation Steps│  │
│ │                 │                 │  │
│ │ P = Σ C/(1+r)^t │ 1. Explanation  │  │
│ │                 │    Equation     │  │
│ │ Assumptions:    │                 │  │
│ │ • Constant r    │ 2. Explanation  │  │
│ │ • Fixed C       │    Equation     │  │
│ │                 │                 │  │
│ └─────────────────┴─────────────────┘  │
│                                         │
│ ─────────────────────────────────────── │
│ [Goal N] Mathematical insight           │
└─────────────────────────────────────────┘
Use MathJax or plain text for equations
```

## Key Measurements

- **Sidebar width:** 280px (fixed)
- **Content padding:** 32px (4 × 8px MUI unit)
- **Column gap:** 32px
- **Border thickness:** 2px
- **Border radius:** 16px (2 × 8px)
- **Progress bar height:** 6px
- **Header height:** ~60px
- **Icon sizes:** 24-28px
- **Spacing unit:** 8px (MUI default)

## Spacing Values (MUI sx prop)

- p: 4 = 32px padding
- m: 3 = 24px margin
- gap: 4 = 32px gap
- mb: 2 = 16px margin-bottom
- mt: 3 = 24px margin-top
- pt: 2 = 16px padding-top

## Color Usage Map

- **Sidebar background:** #F5F5F5
- **Sidebar border:** #E0E0E0
- **Slide background:** #FFFFFF
- **Page background:** #FAFAFA
- **Titles:** #3333B2
- **Body text:** #404040
- **Secondary text:** #666
- **Bottom notes:** #B4B4B4
- **Borders:** #E0E0E0
- **Current goal highlight:** #3333B2
- **Completed goal:** #2CA02C
- **Upcoming goal:** #BDBDBD

---

Use this diagram when implementing the layout to ensure exact proportions and structure.
