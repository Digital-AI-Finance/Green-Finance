# Multi-Agent Academic Course Generator v2.0
## Learning-Goal-Driven Narrative Architecture

**Version:** 2.0 (Learning Goal Driven)
**Updated:** November 2024
**Status:** Specification Complete, Ready for Testing

---

## What's New in v2.0

### 🎯 **Core Innovation: 3 Learning Goals Drive Everything**

Version 2.0 introduces **learning-goal-driven narrative structure**:

- **Exactly 3 learning goals per week** (not 4 objectives)
- Each goal has **type** (mathematical/theoretical/quantitative/applied)
- Goals form **narrative progression** (foundation → build → apply)
- **One session per goal** (3 sessions, ~10 slides each)
- **Explicit goal tracking** on every slide

**Result:** Courses with clear learning paths, narrative coherence, and built-in assessment.

---

## Quick Comparison: v1.0 vs v2.0

| Feature | v1.0 | v2.0 |
|---------|------|------|
| **Learning Focus** | 4 generic objectives | 3 structured learning goals |
| **Sessions** | 4 per week | 3 per week (one per goal) |
| **Narrative** | None | Foundation → Build → Apply |
| **Goal Visibility** | Listed at start | Title slide per goal + markers throughout |
| **Slide Types** | 8 types | 12 types (+ 4 new) |
| **Math/Theory Support** | Generic layouts | Dedicated derivation & framework slides |
| **Student Tracking** | Implicit | Explicit (3 goals × progress checks) |

---

## System Architecture (Unchanged)

```
User Request
     ↓
[Course Orchestrator] ← Master coordinator
     ├─→ [Guidelines Expert] → guidelines_validated.yaml
     ├─→ [Content Planner v2.0] → content_outline_v2.yaml
     └─→ [Slide Generator v2.0] → Week1-8.pdf + charts/
```

**Core agents same, but Content Planner and Slide Generator upgraded to v2.0**

---

## The 3-Goal Structure

### Goal Design Principles

Each week has exactly **3 learning goals** that:

1. **Form a story:** Foundation → Build → Apply
2. **Have specific types:** Mathematical, theoretical, quantitative, or applied
3. **Drive content:** Each goal = 1 session = ~10 slides
4. **Are measurable:** Clear success criteria
5. **Build on each other:** Goal 2 uses Goal 1, Goal 3 uses Goals 1 & 2

### Example: Week 1 Goals

**Goal 1 (Theoretical - Foundation):**
```
"Understand the market microstructure theory explaining
green finance ecosystem dynamics"

→ Session 1 (Slides 1-10)
→ Focus: WHY green finance exists, HOW markets function
→ Charts: Ecosystem diagrams, framework flowcharts (Graphviz)
```

**Goal 2 (Quantitative - Build):**
```
"Quantify and analyze green finance market size, growth
trajectories, and regional distribution patterns"

→ Session 2 (Slides 11-20)
→ Focus: HOW MUCH the market is, WHERE it's growing
→ Charts: Time series, regional maps, distributions (matplotlib)
```

**Goal 3 (Mathematical - Apply):**
```
"Derive and apply valuation models for green bonds
incorporating environmental premium adjustments"

→ Session 3 (Slides 21-30)
→ Focus: HOW TO VALUE instruments, WHAT PRICE is fair
→ Charts: Pricing comparisons, yield curves (matplotlib)
```

**Narrative:** WHY (theory) → HOW MUCH (data) → HOW TO (valuation)

---

## New Slide Types in v2.0

### 1. Learning Goal Title Slide
**When:** First slide of each session (slides 1, 11, 21)
**Purpose:** Prominently introduce the learning goal
**Layout:** Plain, centered, large text

```latex
\begin{frame}[plain]
\vfill
{\Huge \textbf{Learning Goal 2}}\\[1.5em]
{\Large Quantify and analyze market patterns}\\[1em]
{\normalsize quantitative | Build phase}
\vfill
\end{frame}
```

---

### 2. Goal Summary Slide
**When:** Last slide of each session (slides 10, 20, 30)
**Purpose:** Summarize achievements and self-assessment
**Layout:** Two-column with checkmarks

```latex
\begin{frame}[t]{Learning Goal 2: Summary}
\textbf{What We Achieved}
✓ Quantified market at $2.1T
✓ Calculated 25% CAGR
✓ Analyzed regional patterns

\textbf{Can You Now...}
- Calculate growth rates?
- Compare regions?
- Project future trends?
\bottomnote{[Goal 2] Achieved}
\end{frame}
```

---

### 3. Mathematical Derivation Slide
**When:** Math-focused content (especially Goal 3 type goals)
**Purpose:** Step-by-step mathematical derivations
**Layout:** Two-column (assumptions + steps)

```latex
\begin{frame}[t]{Derivation: Bond Pricing}
Left: Starting equation + assumptions
Right: Step 1, Step 2, Step 3 (with equations)
\bottomnote{[Goal 3] Mathematical foundation}
\end{frame}
```

---

### 4. Framework Overview Slide
**When:** Theory-focused content (especially Goal 1 type goals)
**Purpose:** Present theoretical frameworks systematically
**Layout:** Centered framework name + two-column breakdown

```latex
\begin{frame}[t]{Market Microstructure Framework}
{\large Framework Name}
Left: Core principles
Right: Components
\bottomnote{[Goal 1] Framework explains dynamics}
\end{frame}
```

---

## Agent Specifications v2.0

### Content Planner Agent v2.0
**File:** `AGENT_3_ContentPlanner_v2.md`

**New Capabilities:**
- Generate 3 typed learning goals with narrative roles
- Map each goal to one session
- Select appropriate slide types based on goal type
- Create learning goal title and summary specifications
- Ensure goal-chart alignment

**Key Functions:**
- `generate_learning_goals()` - Creates 3-goal narrative
- `generate_session_for_goal()` - Builds session around one goal
- `select_goal_types()` - Picks appropriate types for week theme
- `generate_content_slides_for_goal_type()` - Content matching goal type

---

### Slide Generator Agent v2.0
**Files:**
- `AGENT_4_SlideGenerator.md` (base)
- `AGENT_4_SlideGenerator_v2_LaTeXTemplates.md` (extensions)

**New Capabilities:**
- Generate learning goal title slides
- Generate goal summary slides with checkmarks
- Generate mathematical derivation slides
- Generate framework overview slides
- Add goal references to bottom notes
- Handle goal-specific content patterns

**Key LaTeX Templates:**
- `generate_learning_goal_title_slide()` - Plain centered format
- `generate_goal_summary_slide()` - Two-column with checks
- `generate_mathematical_derivation_slide()` - Equations + steps
- `generate_framework_overview_slide()` - Theory presentation

---

## Example Output: Week 1 v2.0

**Generated Files:**
```
week1_content_outline_v2.yaml     # 3 goals, 3 sessions, 30 slides
Week1_v2.tex                      # With new slide types
Week1_v2.pdf                      # 30 pages

Structure:
Pages 1-10:   Session 1 (Goal 1 - Theory)
Pages 11-20:  Session 2 (Goal 2 - Quantitative)
Pages 21-30:  Session 3 (Goal 3 - Mathematical)
```

**Key Slides:**
- Slide 1: **Learning Goal 1 Title** (large, centered)
- Slides 2-9: Theoretical content with framework slides
- Slide 10: **Goal 1 Summary** (checkmarks + self-assessment)
- Slide 11: **Learning Goal 2 Title**
- Slides 12-19: Quantitative content with data charts
- Slide 20: **Goal 2 Summary**
- Slide 21: **Learning Goal 3 Title**
- Slides 22-29: Mathematical content with derivations
- Slide 30: **Goal 3 + Week Summary** (integrates all goals)

---

## Migration Path

### From v1.0 Course to v2.0:

**Step 1:** Identify 3-4 most important learning outcomes
**Step 2:** Consolidate to exactly 3 goals
**Step 3:** Assign types (mathematical/theoretical/quantitative/applied)
**Step 4:** Order in narrative sequence (foundation → build → apply)
**Step 5:** Allocate content to goals (10 slides per goal)
**Step 6:** Regenerate using v2.0 agents

---

## File Structure v2.0

```
D:/Joerg/Research/slides/GreenFinance/
├── agents/
│   ├── README_v2.md                              # This file
│   ├── IMPROVEMENTS_v2_Summary.md                # What changed
│   │
│   ├── AGENT_1_CourseOrchestrator.md             # (Unchanged)
│   ├── AGENT_2_GuidelinesExpert.md               # (Unchanged)
│   ├── AGENT_3_ContentPlanner_v2.md              # ⭐ Updated for 3 goals
│   ├── AGENT_4_SlideGenerator_v2_LaTeXTemplates.md  # ⭐ New slide layouts
│   │
│   ├── SCHEMAS_Communication_v2.yaml             # ⭐ Updated schemas
│   ├── EXAMPLE_Week1_v2_3Goals.yaml              # ⭐ Complete example
│   │
│   ├── INTEGRATION_Guide.md                      # (Update planned)
│   └── USAGE_Examples.md                         # (Update planned)
│
├── week1_content_outline_v2.yaml                 # Generated with v2.0
├── Week1_v2.pdf                                  # Generated output
└── ... (existing files)
```

---

## How to Proceed

### Option 1: Test v2.0 with Week 1
```
1. Use Content Planner v2.0 to generate week1_content_outline_v2.yaml
2. Use Slide Generator v2.0 to create LaTeX and PDFs
3. Review output for quality
4. Validate 3-goal structure works as intended
```

### Option 2: Generate Full Course with v2.0
```
1. Generate content outlines for all 8 weeks (3 goals each)
2. Review and refine goals for narrative coherence
3. Generate all slides and charts
4. Validate complete course
```

### Option 3: Compare v1.0 vs v2.0
```
1. Keep existing Week 1 (v1.0 structure)
2. Generate Week 1 v2.0 separately
3. Compare side-by-side
4. Choose preferred approach
```

---

## Key Files to Review

1. **IMPROVEMENTS_v2_Summary.md** - What changed and why
2. **AGENT_3_ContentPlanner_v2.md** - 3-goal generation logic
3. **AGENT_4_SlideGenerator_v2_LaTeXTemplates.md** - New slide layouts
4. **EXAMPLE_Week1_v2_3Goals.yaml** - Complete example
5. **SCHEMAS_Communication_v2.yaml** - Updated data formats

---

## Summary

**v2.0 = Learning Goals First**

- 3 goals per week (foundation → build → apply)
- Clear narrative progression
- Goal-driven sessions and slides
- Enhanced theory/math support
- Explicit progress tracking
- Better pedagogical structure

**Ready for:** Implementation and testing

---

*README v2.0 - Learning-Goal-Driven Multi-Agent Course Generation System*
