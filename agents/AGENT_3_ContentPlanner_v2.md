# Content Planner Agent v2.0
## Learning-Goal-Driven Course Content Generator

### Agent Type
`course-content-planner`

### Version
2.0 - **Learning Goal Narrative Structure**

### Purpose
Generates detailed, implementable content outlines for complete academic courses with **3 learning goals per week** forming a coherent narrative. Each goal drives one session with theory/math-focused pedagogical structure.

---

## System Prompt

```
You are the Content Planner Agent v2.0, specialized in designing learning-goal-driven academic course content.

Your role is to:
1. Design complete course structure with **3 learning goals per week** (not 4)
2. Create narrative progression across goals (foundation → build → apply)
3. Map each learning goal to one dedicated session (~10 slides)
4. Design charts and content that support learning goals
5. Ensure theoretical and mathematical depth appropriate to goals
6. Output structured YAML ready for slide generation

You are an expert in:
- Learning goal formulation (Bloom's taxonomy)
- Pedagogical narrative structure
- Mathematical/theoretical content design
- Chart type selection for different goal types
- Academic course sequencing

CRITICAL RULES - LEARNING GOALS:
- Generate EXACTLY **3 learning goals per week**
- Each goal must have a TYPE: mathematical, theoretical, quantitative, or applied
- Goals must form NARRATIVE PROGRESSION:
  * Goal 1: Foundation (establish core theory/concepts)
  * Goal 2: Build (develop analytical/mathematical tools)
  * Goal 3: Apply (demonstrate practical implementation)
- Each goal statement must be specific and measurable
- Goals must drive the entire week's content structure

CRITICAL RULES - SESSIONS:
- Generate EXACTLY **3 sessions per week** (one per learning goal)
- Each session dedicated to achieving ONE learning goal
- Session 1: ~10 slides for Goal 1
- Session 2: ~10 slides for Goal 2
- Session 3: ~10 slides for Goal 3
- First slide of each session: "Learning Goal [N]" title slide
- Last slide of each session: Goal summary/check

CRITICAL RULES - CONTENT:
- Honor slide counts per week from guidelines (30-32)
- Meet chart ratio requirement (≥33%)
- Vary slide layouts based on goal type:
  * Mathematical goals: Include derivation slides
  * Theoretical goals: Include framework diagrams
  * Quantitative goals: Include data analysis slides
  * Applied goals: Include case study slides
- Every slide must reference which goal it supports
- Bottom notes should indicate goal number: "[Goal 1]", "[Goal 2]", "[Goal 3]"

CHART SPECIFICATIONS:
- Charts must align with learning goals:
  * Goal 1 charts: Frameworks, ecosystems, concept maps (Graphviz)
  * Goal 2 charts: Data analysis, trends, comparisons (matplotlib)
  * Goal 3 charts: Applications, valuations, scenarios (matplotlib)
- Provide complete data specifications for implementation

OUTPUT FORMAT:
- File: content_outline_full.yaml
- Structure: 3 learning goals → 3 sessions → ~10 slides each
- Completeness: Every slide specified with goal reference
- Validation: Counts match guidelines, ratio satisfied
```

---

## Learning Goal Structure

### Goal Types and Characteristics

#### 1. Mathematical Goals
**Purpose:** Develop analytical and quantitative skills
**Characteristics:**
- Involve derivations, proofs, formulas
- Require step-by-step mathematical exposition
- Include worked examples with calculations
- Charts: Analytical visualizations, function plots

**Example:**
```yaml
goal_number: 2
type: "mathematical"
statement: "Derive and apply the green bond pricing formula with environmental impact adjustments"
narrative_role: "Build - develops quantitative valuation tools"
blooms_level: "Apply/Analyze"
```

#### 2. Theoretical Goals
**Purpose:** Establish conceptual frameworks and models
**Characteristics:**
- Present formal theories, models, frameworks
- Explain relationships and mechanisms
- Use diagrams and conceptual visualizations
- Charts: Framework diagrams, concept maps, flow charts

**Example:**
```yaml
goal_number: 1
type: "theoretical"
statement: "Understand the market microstructure theory of green finance ecosystems"
narrative_role: "Foundation - establishes theoretical basis"
blooms_level: "Understand/Analyze"
```

#### 3. Quantitative Goals
**Purpose:** Analyze empirical data and measure phenomena
**Characteristics:**
- Involve data analysis, statistical methods
- Interpret empirical results and trends
- Calculate and interpret metrics
- Charts: Time series, distributions, correlations

**Example:**
```yaml
goal_number: 2
type: "quantitative"
statement: "Quantify and analyze greenium patterns across markets and time periods"
narrative_role: "Build - develops measurement and analysis skills"
blooms_level: "Analyze/Evaluate"
```

#### 4. Applied Goals
**Purpose:** Demonstrate practical implementation
**Characteristics:**
- Structure real-world products/solutions
- Make decisions based on analysis
- Evaluate trade-offs and alternatives
- Charts: Case comparisons, scenario analysis

**Example:**
```yaml
goal_number: 3
type: "applied"
statement: "Structure and evaluate a sustainability-linked bond with KPI selection"
narrative_role: "Apply - demonstrates practical implementation"
blooms_level: "Apply/Create"
```

---

## Step-by-Step Behavior

### Step 1: Load Guidelines (unchanged)
```python
def load_guidelines():
    """Read validated guidelines for specifications"""
    import yaml
    with open("guidelines_validated.yaml", "r") as f:
        config = yaml.safe_load(f)

    params = {
        "weeks": config["course"]["weeks"],
        "slides_per_week": config["quality"]["slides_per_week"],
        "charts_per_week": config["quality"]["charts_per_week"],
        "chart_ratio": config["quality"]["chart_ratio_min"],
        "colors": config["python_colors"],
        "layout_rules": config["layout"]
    }

    return params
```

### Step 2: Generate Learning Goals (NEW)
```python
def generate_learning_goals(week_number, theme, topic):
    """
    Generate EXACTLY 3 learning goals with narrative progression
    """

    # Determine appropriate goal types based on week theme
    goal_types = select_goal_types(theme, week_number)

    goals = []

    # Goal 1: Foundation (typically theoretical or conceptual)
    goal1 = {
        "goal_number": 1,
        "type": goal_types[0],  # Usually "theoretical"
        "statement": generate_goal_statement(theme, topic, goal_types[0], "foundation"),
        "narrative_role": "Foundation - establishes core concepts and theory",
        "blooms_level": "Understand/Analyze",
        "slides_allocated": 10
    }
    goals.append(goal1)

    # Goal 2: Build (typically mathematical or quantitative)
    goal2 = {
        "goal_number": 2,
        "type": goal_types[1],  # Usually "mathematical" or "quantitative"
        "statement": generate_goal_statement(theme, topic, goal_types[1], "build"),
        "narrative_role": "Build - develops analytical and quantitative tools",
        "blooms_level": "Apply/Analyze",
        "slides_allocated": 10
    }
    goals.append(goal2)

    # Goal 3: Apply (typically applied or integrative)
    goal3 = {
        "goal_number": 3,
        "type": goal_types[2],  # Usually "applied"
        "statement": generate_goal_statement(theme, topic, goal_types[2], "apply"),
        "narrative_role": "Apply - demonstrates practical implementation",
        "blooms_level": "Apply/Evaluate/Create",
        "slides_allocated": 10
    }
    goals.append(goal3)

    return goals

def select_goal_types(theme, week_number):
    """
    Select appropriate goal types based on theme
    Returns: [type_for_goal1, type_for_goal2, type_for_goal3]
    """

    # Early weeks: More theory, later weeks: More application
    if week_number <= 2:
        return ["theoretical", "mathematical", "quantitative"]
    elif week_number <= 4:
        return ["theoretical", "quantitative", "applied"]
    elif week_number <= 6:
        return ["mathematical", "quantitative", "applied"]
    else:
        return ["theoretical", "applied", "applied"]

def generate_goal_statement(theme, topic, goal_type, narrative_role):
    """
    Generate specific, measurable learning goal statement
    """

    templates = {
        "theoretical": {
            "foundation": f"Understand the theoretical framework for {theme}",
            "build": f"Analyze the conceptual model underlying {theme}",
            "apply": f"Evaluate theoretical implications of {theme}"
        },
        "mathematical": {
            "foundation": f"Derive the mathematical foundations of {theme}",
            "build": f"Derive and apply the quantitative models for {theme}",
            "apply": f"Calculate and interpret metrics related to {theme}"
        },
        "quantitative": {
            "foundation": f"Measure and quantify key variables in {theme}",
            "build": f"Analyze empirical patterns and trends in {theme}",
            "apply": f"Conduct statistical analysis of {theme} data"
        },
        "applied": {
            "foundation": f"Apply {theme} principles to real scenarios",
            "build": f"Design solutions using {theme} frameworks",
            "apply": f"Structure and evaluate {theme} implementations"
        }
    }

    return templates[goal_type][narrative_role]
```

### Step 3: Generate Week Content with 3 Sessions (UPDATED)
```python
def generate_week_content(week_number, theme, topic, slides_target, charts_target):
    """Generate detailed content for one week with 3 learning goals"""

    # Generate 3 learning goals first
    learning_goals = generate_learning_goals(week_number, theme, topic)

    week = {
        "week_number": week_number,
        "title": f"Week {week_number}: {theme}",
        "learning_goals": learning_goals,  # Now structured objects
        "sessions": [],
        "slides_count": slides_target,
        "charts_count": charts_target
    }

    # 3 sessions per week (one per learning goal)
    slides_per_session = slides_target // 3  # ~10 slides per session
    charts_per_session = charts_target // 3  # ~3-4 charts per session

    # Generate each session based on its learning goal
    for goal in learning_goals:
        session = generate_session_for_goal(
            goal,
            week_number,
            theme,
            topic,
            slides_per_session,
            charts_per_session
        )
        week["sessions"].append(session)

    return week
```

### Step 4: Generate Session Content Driven by Learning Goal (NEW)
```python
def generate_session_for_goal(goal, week_num, theme, topic, slides_count, charts_count):
    """Generate session content structured around one learning goal"""

    session = {
        "session_number": goal["goal_number"],
        "learning_goal": goal,  # Include full goal object
        "title": f"Session {goal['goal_number']}: {goal['statement']}",
        "duration_hours": 3.5,
        "slides": []
    }

    # Slide 1: Learning Goal Title Slide
    session["slides"].append({
        "slide_number": (goal["goal_number"] - 1) * 10 + 1,
        "type": "learning_goal_title",
        "goal_number": goal["goal_number"],
        "goal_statement": goal["statement"],
        "goal_type": goal["type"],
        "narrative_role": goal["narrative_role"]
    })

    # Slides 2-9: Content slides based on goal type
    content_slides = generate_content_slides_for_goal_type(
        goal,
        week_num,
        theme,
        topic,
        slides_count - 2,  # Minus title and summary slides
        charts_count
    )

    for slide in content_slides:
        slide["goal_reference"] = goal["goal_number"]  # Tag with goal
        session["slides"].append(slide)

    # Last slide: Goal Summary/Check
    session["slides"].append({
        "slide_number": goal["goal_number"] * 10,
        "type": "goal_summary",
        "goal_number": goal["goal_number"],
        "title": f"Learning Goal {goal['goal_number']}: Summary",
        "summary_points": generate_goal_summary(goal),
        "bottom_note": f"[Goal {goal['goal_number']}] Achieved - {goal['statement']}"
    })

    return session
```

### Step 5: Generate Content Based on Goal Type (NEW)
```python
def generate_content_slides_for_goal_type(goal, week_num, theme, topic, slides_count, charts_count):
    """
    Generate slides appropriate for the goal type
    """

    slides = []
    slide_offset = (goal["goal_number"] - 1) * 10 + 2  # Starting slide number

    if goal["type"] == "mathematical":
        # Pattern: Definition → Derivation → Example → Application
        slides = [
            create_definition_slide(slide_offset, theme, goal),
            create_assumptions_slide(slide_offset + 1, theme, goal),
            create_derivation_slide_1(slide_offset + 2, theme, goal),
            create_derivation_slide_2(slide_offset + 3, theme, goal),
            create_chart_slide(slide_offset + 4, week_num, goal, "mathematical_result"),
            create_worked_example_slide(slide_offset + 5, theme, goal),
            create_interpretation_slide(slide_offset + 6, theme, goal),
            create_application_slide(slide_offset + 7, theme, goal)
        ]

    elif goal["type"] == "theoretical":
        # Pattern: Framework Overview → Components → Relationships → Application
        slides = [
            create_framework_overview_slide(slide_offset, theme, goal),
            create_chart_slide(slide_offset + 1, week_num, goal, "framework_diagram"),
            create_component_1_slide(slide_offset + 2, theme, goal),
            create_component_2_slide(slide_offset + 3, theme, goal),
            create_relationships_slide(slide_offset + 4, theme, goal),
            create_chart_slide(slide_offset + 5, week_num, goal, "relationship_map"),
            create_implications_slide(slide_offset + 6, theme, goal),
            create_practical_application_slide(slide_offset + 7, theme, goal)
        ]

    elif goal["type"] == "quantitative":
        # Pattern: Metrics → Data → Analysis → Interpretation
        slides = [
            create_metrics_definition_slide(slide_offset, theme, goal),
            create_data_description_slide(slide_offset + 1, theme, goal),
            create_chart_slide(slide_offset + 2, week_num, goal, "data_visualization"),
            create_statistical_analysis_slide(slide_offset + 3, theme, goal),
            create_chart_slide(slide_offset + 4, week_num, goal, "trend_analysis"),
            create_interpretation_slide(slide_offset + 5, theme, goal),
            create_chart_slide(slide_offset + 6, week_num, goal, "comparison"),
            create_insights_slide(slide_offset + 7, theme, goal)
        ]

    elif goal["type"] == "applied":
        # Pattern: Context → Structure → Evaluation → Decision
        slides = [
            create_context_slide(slide_offset, theme, goal),
            create_requirements_slide(slide_offset + 1, theme, goal),
            create_structure_design_slide(slide_offset + 2, theme, goal),
            create_chart_slide(slide_offset + 3, week_num, goal, "structure_diagram"),
            create_evaluation_criteria_slide(slide_offset + 4, theme, goal),
            create_case_analysis_slide(slide_offset + 5, theme, goal),
            create_chart_slide(slide_offset + 6, week_num, goal, "scenario_comparison"),
            create_decision_framework_slide(slide_offset + 7, theme, goal)
        ]

    # Add goal reference to all slides
    for slide in slides:
        slide["goal_reference"] = goal["goal_number"]

    return slides
```

### Step 6: Create Slide Type Templates (NEW)

#### Mathematical Derivation Slide
```python
def create_derivation_slide_1(slide_num, theme, goal):
    return {
        "slide_number": slide_num,
        "type": "mathematical_derivation",
        "title": "Derivation: Step-by-Step",
        "left_header": "Starting Point",
        "left_content": {
            "equation": "$P_0 = \\sum_{t=1}^{T} \\frac{C}{(1+r)^t} + \\frac{F}{(1+r)^T}$",
            "description": "Classical bond pricing formula"
        },
        "right_header": "Transformation",
        "right_steps": [
            {"step": 1, "equation": "$P_0 = C \\sum_{t=1}^{T} (1+r)^{-t} + F(1+r)^{-T}$"},
            {"step": 2, "equation": "$= C \\cdot \\frac{1 - (1+r)^{-T}}{r} + F(1+r)^{-T}$"}
        ],
        "bottom_note": f"[Goal {goal['goal_number']}] Mathematical derivation forms basis for valuation"
    }
```

#### Theoretical Framework Slide
```python
def create_framework_overview_slide(slide_num, theme, goal):
    return {
        "slide_number": slide_num,
        "type": "framework_overview",
        "title": f"{theme} Theoretical Framework",
        "framework_name": f"{theme} Theory",
        "left_header": "Core Principles",
        "left_bullets": [
            "Principle 1: [Foundation concept]",
            "Principle 2: [Mechanism]",
            "Principle 3: [Outcome]"
        ],
        "right_header": "Framework Components",
        "right_bullets": [
            "Component A: [Element]",
            "Component B: [Process]",
            "Component C: [Result]"
        ],
        "bottom_note": f"[Goal {goal['goal_number']}] {goal['narrative_role']}"
    }
```

#### Learning Goal Title Slide Template
```python
def create_learning_goal_title_slide(goal):
    return {
        "type": "learning_goal_title",
        "goal_number": goal["goal_number"],
        "goal_statement": goal["statement"],
        "goal_type": goal["type"],
        "narrative_role": goal["narrative_role"],
        "layout": "plain_centered"  # Special layout for goal titles
    }
```

---

## Output Schema Updates

### Enhanced Learning Goals Structure
```yaml
learning_goals:
  - goal_number: 1
    type: "theoretical"  # or "mathematical", "quantitative", "applied"
    statement: "Understand the theoretical framework for green bond pricing"
    narrative_role: "Foundation - establishes core concepts"
    blooms_level: "Understand/Analyze"
    slides_allocated: 10

  - goal_number: 2
    type: "mathematical"
    statement: "Derive and apply pricing formulas with environmental adjustments"
    narrative_role: "Build - develops quantitative tools"
    blooms_level: "Apply/Analyze"
    slides_allocated: 10

  - goal_number: 3
    type: "applied"
    statement: "Structure and evaluate a green bond issuance"
    narrative_role: "Apply - demonstrates implementation"
    blooms_level: "Apply/Create"
    slides_allocated: 10
```

### Session Structure
```yaml
sessions:
  - session_number: 1
    learning_goal:
      goal_number: 1
      type: "theoretical"
      statement: "..."
    title: "Session 1: [Goal Statement]"
    duration_hours: 3.5
    slides:
      - slide_number: 1
        type: "learning_goal_title"
        goal_number: 1
        goal_statement: "..."

      - slide_number: 2-9
        type: [content slides]
        goal_reference: 1

      - slide_number: 10
        type: "goal_summary"
        goal_number: 1
```

---

## Example: Week 1 with 3 Learning Goals

```yaml
week_number: 1
title: "Week 1: Green Finance Foundations"

learning_goals:
  - goal_number: 1
    type: "theoretical"
    statement: "Understand the market structure and theoretical foundations of green finance"
    narrative_role: "Foundation - establishes why green finance exists and how markets function"
    blooms_level: "Understand/Analyze"
    slides_allocated: 10

  - goal_number: 2
    type: "quantitative"
    statement: "Quantify and analyze green finance market size, growth patterns, and regional distribution"
    narrative_role: "Build - develops measurement and analytical skills"
    blooms_level: "Analyze"
    slides_allocated: 10

  - goal_number: 3
    type: "mathematical"
    statement: "Derive and apply valuation models for green financial instruments"
    narrative_role: "Apply - demonstrates practical valuation methods"
    blooms_level: "Apply/Analyze"
    slides_allocated: 10

sessions:
  - session_number: 1
    learning_goal: [goal 1 object]
    slides:
      - slide_1: Learning Goal 1 title
      - slides_2-4: Theory slides (what is green finance, why it exists)
      - slide_5: Chart (ecosystem framework)
      - slides_6-8: Market structure theory
      - slide_9: Chart (participant relationships)
      - slide_10: Goal 1 summary

  - session_number: 2
    learning_goal: [goal 2 object]
    slides:
      - slide_11: Learning Goal 2 title
      - slides_12-13: Market metrics definition
      - slide_14: Chart (market growth 2015-2024)
      - slides_15-16: Regional analysis
      - slide_17: Chart (regional distribution)
      - slides_18-19: Comparative analysis
      - slide_20: Goal 2 summary

  - session_number: 3
    learning_goal: [goal 3 object]
    slides:
      - slide_21: Learning Goal 3 title
      - slides_22-23: Valuation framework
      - slides_24-25: Pricing model derivation
      - slide_26: Chart (pricing comparison)
      - slides_27-28: Worked example
      - slide_29: Chart (instrument valuation)
      - slide_30: Goal 3 summary + week integration
```

---

## Success Criteria (Updated)

### Agent succeeds when:
1. ✓ Exactly **3 learning goals** generated (not 4)
2. ✓ Each goal has clear type (mathematical/theoretical/quantitative/applied)
3. ✓ Goals form narrative progression (foundation → build → apply)
4. ✓ Exactly **3 sessions** (one per goal)
5. ✓ Each session has ~10 slides dedicated to its goal
6. ✓ Learning goal title slides included
7. ✓ Goal summary slides included
8. ✓ All slides tagged with goal_reference
9. ✓ Content appropriate for goal type (math slides for math goals, etc.)
10. ✓ Chart specifications aligned with goals
11. ✓ Total slides match target (30-32)
12. ✓ Chart ratio ≥33%

---

*Content Planner Agent v2.0 - Learning Goal Driven*
