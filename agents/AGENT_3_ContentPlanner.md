# Content Planner Agent
## Comprehensive Course Content and Chart Specification Generator

### Agent Type
`course-content-planner`

### Purpose
Generates detailed, implementable content outlines for complete academic courses. Creates week-by-week specifications including slide breakdowns, chart specifications with realistic data, and learning materials ready for the Slide Generator Agent.

---

## System Prompt

```
You are the Content Planner Agent, specialized in designing comprehensive academic course content with pedagogical depth.

Your role is to:
1. Design complete course structure (8 weeks typical)
2. Create detailed learning objectives and session topics
3. Specify every slide with titles, content, and layout
4. Design chart specifications with realistic simulated data
5. Ensure proper progression and depth
6. Output structured YAML ready for slide generation

You are an expert in:
- Academic course design and pedagogy
- Content sequencing (beginner → advanced)
- Data visualization strategy
- Chart type selection (line, bar, pie, scatter, etc.)
- Realistic data simulation for educational purposes
- LaTeX/Beamer slide design patterns

CRITICAL RULES:
- Read guidelines_validated.yaml first (technical specs)
- Honor slide counts per week from guidelines
- Meet chart ratio requirement (≥33%, typically 10-11 charts per 30-32 slides)
- Create implementable chart specs (tool, data ranges, variables)
- Use template colors (mlpurple/mllavender theme)
- Vary slide layouts (two-column, charts, definitions, comparisons)
- Every slide must have bottom note
- Maximum 6 bullets per column (overflow prevention)
- Ensure logical progression across weeks
- No content gaps or redundancy

CHART SPECIFICATIONS MUST INCLUDE:
- chart_id: Unique identifier (e.g., week1_chart1)
- type: Visualization type (line, bar, pie, scatter, heatmap, etc.)
- tool: "python" or "graphviz"
- title: Descriptive chart title
- description: What the chart shows
- data: Complete data specification
  - Variables (x, y, categories)
  - Data type (time series, categorical, numerical)
  - Realistic value ranges
  - Sample data points
- styling: Colors from template (mlpurple, mllavender, etc.)
- insight: Key takeaway for bottom note

SLIDE LAYOUT TYPES:
1. title: Course/section title page
2. two-column: Left/right split with headers and bullets
3. chart: Full-width chart with bottom insights
4. mixed: Chart + text combination
5. definition: Concept explanation with examples
6. comparison: Side-by-side analysis
7. process: Step-by-step workflow
8. summary: Week/section recap

OUTPUT FORMAT:
- File: content_outline_full.yaml
- Structure: Weeks → Sessions → Slides → Charts
- Completeness: Every slide specified, every chart detailed
- Validation: Counts match guidelines (slides, charts, ratio)
```

---

## User Instruction Template

### Standard Usage (Called by Orchestrator)
```
Create comprehensive content outline for full course:

Input: guidelines_validated.yaml
Course Topic: {topic}
Weeks: {weeks}

For each week, generate:
1. Week title and learning objectives (3-5 objectives)
2. 4 session topics with detailed content
3. Slide breakdown (titles, key points, layout types)
4. Chart specifications (10-11 per week):
   - Chart type (line, bar, pie, scatter, etc.)
   - Data type (time series, categorical, comparison)
   - Tool (Python matplotlib/seaborn or Graphviz)
   - Variables and realistic simulated data ranges
   - Title and key insights
5. Bottom notes for each slide

Output: content_outline_full.yaml

Ensure:
- Total slides matches specification (30-32 per week)
- Chart ratio ≥33% (10-11 charts per 30-32 slides)
- Content depth sufficient for {hours_per_week} hours
- Logical progression across weeks
- No overlap or gaps in coverage

Provide detailed, implementable specifications that the slide generator can execute directly.
```

### Manual Usage
```
Design course content for: {topic}

Input Configuration: guidelines_validated.yaml
Weeks: {weeks}
Hours per week: {hours}

Generate complete content outline with:
- Learning objectives per week
- Session-by-session breakdown
- Slide specifications (all {total_slides} slides)
- Chart specifications (all {total_charts} charts)
- Realistic data for all visualizations

Save as: content_outline_full.yaml
```

---

## Agent Behavior Specification

### Step 1: Load Guidelines
```python
def load_guidelines():
    """Read validated guidelines for specifications"""

    import yaml
    with open("guidelines_validated.yaml", "r") as f:
        config = yaml.safe_load(f)

    # Extract key parameters
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

### Step 2: Design Course Structure
```python
def design_course_structure(topic, weeks, params):
    """Create high-level course structure"""

    # Week progression strategy
    structure = {
        "course_title": f"{topic} Professional Course",
        "total_weeks": weeks,
        "progression": "Foundations → Intermediate → Advanced → Applications",
        "weeks": []
    }

    # Example for 8-week course
    if weeks == 8:
        week_themes = [
            "Foundations and Ecosystem",
            "Core Instruments and Markets",
            "Integration and Strategy",
            "Risk and Assessment",
            "Specialized Applications",
            "Regulatory and Standards",
            "Impact and Measurement",
            "Advanced Topics and Future"
        ]
    else:
        # Generate themes based on topic
        week_themes = generate_week_themes(topic, weeks)

    for i, theme in enumerate(week_themes, 1):
        structure["weeks"].append({
            "week_number": i,
            "theme": theme,
            "slides_target": params["slides_per_week"][i-1],
            "charts_target": params["charts_per_week"][i-1],
            "hours": params.get("hours_per_week", 13)
        })

    return structure
```

### Step 3: Generate Week Content
```python
def generate_week_content(week_number, theme, topic, slides_target, charts_target):
    """Generate detailed content for one week"""

    week = {
        "week_number": week_number,
        "title": f"Week {week_number}: {theme}",
        "learning_objectives": generate_learning_objectives(theme, topic),
        "sessions": [],
        "slides_count": slides_target,
        "charts_count": charts_target
    }

    # 4 sessions per week (typical)
    slides_per_session = slides_target // 4
    charts_per_session = charts_target // 4

    for session_num in range(1, 5):
        session = generate_session_content(
            session_num,
            week_number,
            theme,
            topic,
            slides_per_session,
            charts_per_session
        )
        week["sessions"].append(session)

    return week

def generate_learning_objectives(theme, topic):
    """Create 3-5 specific learning objectives"""

    # These should be specific to the theme and use Bloom's taxonomy
    objectives = [
        f"Understand [concept] in context of {topic}",
        f"Analyze [relationship] between [X] and [Y]",
        f"Apply [methodology] to practical scenarios",
        f"Evaluate [framework] for {theme}",
        f"Create [deliverable] demonstrating mastery"
    ]

    return objectives[:4]  # Return 4 objectives
```

### Step 4: Generate Session Content
```python
def generate_session_content(session_num, week_num, theme, topic, slides_count, charts_count):
    """Generate slides for one session"""

    session = {
        "session_number": session_num,
        "title": f"Session {session_num}: [Specific Topic]",
        "duration_hours": 3.5,
        "slides": []
    }

    # Slide 1: Session title
    session["slides"].append({
        "slide_number": 1,
        "type": "title",
        "title": session["title"],
        "content": None
    })

    # Remaining slides: Mix of content and charts
    slide_num = 2
    charts_placed = 0

    while slide_num <= slides_count:
        # Decide slide type (aim for chart_ratio)
        if charts_placed < charts_count and should_place_chart(slide_num, slides_count, charts_count):
            # Chart slide
            slide = generate_chart_slide(week_num, session_num, slide_num, charts_placed + 1, theme)
            charts_placed += 1
        else:
            # Content slide
            slide = generate_content_slide(week_num, session_num, slide_num, theme)

        session["slides"].append(slide)
        slide_num += 1

    return session

def should_place_chart(current_slide, total_slides, total_charts):
    """Determine if chart should be placed at this position"""

    # Distribute charts evenly
    target_ratio = total_charts / total_slides
    current_ratio = charts_placed / current_slide if current_slide > 0 else 0

    # Place chart if we're behind target ratio
    return current_ratio < target_ratio
```

### Step 5: Generate Chart Specifications
```python
def generate_chart_slide(week_num, session_num, slide_num, chart_num, theme):
    """Create complete chart specification"""

    # Determine chart type based on position and content
    chart_types = ["line", "bar", "pie", "scatter", "heatmap", "box", "violin"]
    tools = ["python", "graphviz"]

    # Select appropriate type
    if chart_num % 4 == 0:
        tool = "graphviz"
        chart_type = "flowchart"
    else:
        tool = "python"
        chart_type = select_chart_type(theme, chart_num)

    chart_spec = {
        "chart_id": f"week{week_num}_chart{chart_num}",
        "type": chart_type,
        "tool": tool,
        "description": f"[Description of what chart shows for {theme}]",
        "title": f"[Chart Title Related to {theme}]"
    }

    if tool == "python":
        chart_spec["data"] = generate_data_spec(chart_type, theme)
        chart_spec["styling"] = {
            "color": "mlpurple",
            "secondary_color": "mllavender",
            "accent_color": "mlgreen"
        }
    else:
        chart_spec["graphviz_spec"] = generate_graphviz_spec(theme)

    slide = {
        "slide_number": slide_num,
        "type": "chart",
        "title": chart_spec["title"],
        "chart_spec": chart_spec,
        "bottom_note": f"Key insight from this visualization related to {theme}"
    }

    return slide

def generate_data_spec(chart_type, theme):
    """Generate realistic data specification for chart"""

    if chart_type == "line":
        return {
            "x": "years (2015-2024)",
            "y": "volume in billions USD",
            "data_type": "time series",
            "simulated_values": generate_realistic_timeseries(10),
            "trend": "increasing with volatility"
        }

    elif chart_type == "bar":
        return {
            "categories": ["Category A", "Category B", "Category C", "Category D", "Category E"],
            "values": generate_realistic_categorical(5),
            "data_type": "categorical",
            "unit": "billions USD or percentage"
        }

    elif chart_type == "pie":
        return {
            "categories": ["Segment 1", "Segment 2", "Segment 3", "Segment 4"],
            "values": generate_pie_data(4),  # Must sum to 100%
            "data_type": "proportion",
            "unit": "percentage"
        }

    elif chart_type == "scatter":
        return {
            "x": "risk metric",
            "y": "return metric",
            "data_type": "correlation",
            "points": generate_scatter_data(50),
            "trend": "positive correlation"
        }

    elif chart_type == "heatmap":
        return {
            "rows": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            "columns": ["Metric A", "Metric B", "Metric C", "Metric D"],
            "values": generate_heatmap_data(5, 4),
            "data_type": "matrix",
            "range": [0, 100]
        }

    # Add more chart types as needed

def generate_realistic_timeseries(n_points):
    """Generate realistic looking time series data"""
    import numpy as np

    # Start value
    start = np.random.uniform(100, 500)

    # Growth rate with noise
    growth_rate = 1.15  # 15% average growth
    noise = 0.1

    values = [start]
    for i in range(1, n_points):
        change = growth_rate + np.random.normal(0, noise)
        values.append(values[-1] * change)

    return [int(v) for v in values]

def generate_graphviz_spec(theme):
    """Generate Graphviz diagram specification"""

    return {
        "diagram_type": "flowchart" or "network" or "hierarchy",
        "nodes": [
            {"id": "node1", "label": "Component 1", "color": "#D6D6EF"},
            {"id": "node2", "label": "Component 2", "color": "#CCCCEB"},
            {"id": "node3", "label": "Component 3", "color": "#C1C1E8"}
        ],
        "edges": [
            {"from": "node1", "to": "node2", "label": "Flow", "style": "solid"},
            {"from": "node2", "to": "node3", "label": "Process", "style": "dashed"}
        ],
        "layout": "TB"  # Top to bottom
    }
```

### Step 6: Generate Content Slides
```python
def generate_content_slide(week_num, session_num, slide_num, theme):
    """Generate non-chart content slide"""

    # Vary slide types
    slide_types = ["two-column", "definition", "comparison", "process"]
    slide_type = select_slide_type(slide_num, theme)

    if slide_type == "two-column":
        return {
            "slide_number": slide_num,
            "type": "two-column",
            "title": f"[Slide Title Related to {theme}]",
            "left_header": "Key Concepts",
            "left_bullets": [
                "Concept or point 1",
                "Concept or point 2",
                "Concept or point 3",
                "Concept or point 4"
            ],
            "right_header": "Applications",
            "right_bullets": [
                "Application or example 1",
                "Application or example 2",
                "Application or example 3"
            ],
            "bottom_note": "Summary or key takeaway"
        }

    elif slide_type == "definition":
        return {
            "slide_number": slide_num,
            "type": "definition",
            "title": "[Term or Concept]",
            "definition": "Formal definition of the concept",
            "properties": [
                "Property 1",
                "Property 2",
                "Property 3"
            ],
            "examples": [
                {"label": "Example 1", "description": "Description"},
                {"label": "Example 2", "description": "Description"}
            ],
            "bottom_note": "Practical implications"
        }

    elif slide_type == "comparison":
        return {
            "slide_number": slide_num,
            "type": "comparison",
            "title": "Comparison: [A vs B]",
            "left_header": "Approach A",
            "left_items": [
                {"type": "advantage", "text": "Advantage 1"},
                {"type": "advantage", "text": "Advantage 2"},
                {"type": "disadvantage", "text": "Limitation 1"}
            ],
            "right_header": "Approach B",
            "right_items": [
                {"type": "advantage", "text": "Advantage 1"},
                {"type": "disadvantage", "text": "Limitation 1"},
                {"type": "disadvantage", "text": "Limitation 2"}
            ],
            "bottom_note": "Selection criteria and trade-offs"
        }

    elif slide_type == "process":
        return {
            "slide_number": slide_num,
            "type": "process",
            "title": "[Process or Workflow Name]",
            "steps": [
                {"number": 1, "title": "Step 1", "description": "What happens"},
                {"number": 2, "title": "Step 2", "description": "What happens"},
                {"number": 3, "title": "Step 3", "description": "What happens"},
                {"number": 4, "title": "Step 4", "description": "What happens"}
            ],
            "bottom_note": "Key considerations for this process"
        }

    return slide
```

### Step 7: Validate and Output
```python
def validate_content_outline(outline):
    """Validate complete outline meets specifications"""

    errors = []
    warnings = []

    # Check totals
    total_slides = sum(week["slides_count"] for week in outline["weeks"])
    total_charts = sum(week["charts_count"] for week in outline["weeks"])

    expected_slides = sum(params["slides_per_week"])
    expected_charts = sum(params["charts_per_week"])

    if total_slides != expected_slides:
        errors.append(f"Slide count mismatch: {total_slides} vs {expected_slides} expected")

    if total_charts < expected_charts * 0.9:  # Allow 10% under
        warnings.append(f"Chart count low: {total_charts} vs {expected_charts} target")

    # Check ratios per week
    for week in outline["weeks"]:
        ratio = week["charts_count"] / week["slides_count"]
        if ratio < params["chart_ratio"]:
            errors.append(f"Week {week['week_number']} chart ratio too low: {ratio:.1%}")

    # Check for missing specifications
    for week in outline["weeks"]:
        for session in week["sessions"]:
            for slide in session["slides"]:
                if slide["type"] == "chart" and "chart_spec" not in slide:
                    errors.append(f"Week {week['week_number']} slide {slide['slide_number']} missing chart spec")

    return errors, warnings

def save_outline(outline, filename="content_outline_full.yaml"):
    """Save validated outline to YAML"""

    import yaml

    with open(filename, "w") as f:
        yaml.dump(outline, f, default_flow_style=False, sort_keys=False,
                  allow_unicode=True, width=120)

    return filename
```

---

## Output Schema: content_outline_full.yaml

```yaml
course_title: "Green Finance Professional Course"
total_weeks: 8
total_hours: 108

weeks:
  - week_number: 1
    title: "Week 1: Green Finance Foundations"
    theme: "Foundations and Ecosystem"
    learning_objectives:
      - "Understand the evolution and drivers of green finance"
      - "Analyze the green finance ecosystem and key participants"
      - "Identify major green financial instruments and their characteristics"
      - "Apply financial fundamentals to green investment analysis"

    sessions:
      - session_number: 1
        title: "Session 1: Introduction to Green Finance"
        duration_hours: 3.5

        slides:
          - slide_number: 1
            type: "title"
            title: "Introduction to Green Finance"
            content: null

          - slide_number: 2
            type: "two-column"
            title: "What is Green Finance?"
            left_header: "Definition"
            left_bullets:
              - "Financial instruments and services"
              - "Support environmental sustainability"
              - "Climate change mitigation and adaptation"
              - "Measurable environmental impact"
            right_header: "Key Drivers"
            right_bullets:
              - "Paris Agreement commitments"
              - "Regulatory pressure (EU Taxonomy)"
              - "Investor demand for ESG"
              - "Climate risk awareness"
            bottom_note: "Green finance is rapidly becoming mainstream as climate awareness grows"

          - slide_number: 3
            type: "chart"
            title: "Global Green Finance Market Growth"
            chart_spec:
              chart_id: "week1_chart1"
              type: "line"
              tool: "python"
              description: "Growth trajectory of global green finance market 2015-2024"
              title: "Global Green Finance Market Growth\n2015-2024"
              data:
                x: "years (2015-2024)"
                y: "volume in billions USD"
                data_type: "time series"
                simulated_values: [300, 420, 580, 850, 1150, 1300, 1650, 1450, 1750, 2100]
                trend: "15% CAGR with 2022 dip"
              styling:
                color: "mlpurple"
                fill: true
                alpha: 0.3
                linewidth: 2.5
                markers: true
            bottom_note: "Market shows 15% CAGR despite 2022 volatility due to geopolitical factors"

          - slide_number: 4
            type: "two-column"
            title: "Evolution of Green Finance"
            left_header: "Historical Development"
            left_bullets:
              - "2007: First green bond (EIB)"
              - "2014: Green Bond Principles"
              - "2015: Paris Agreement catalyst"
              - "2020: EU Taxonomy launched"
            right_header: "Current Landscape 2024"
            right_bullets:
              - "$2.1T total market size"
              - "100+ countries with issuances"
              - "Mainstream institutional adoption"
              - "Expanding to developing markets"
            bottom_note: "Green finance has evolved from niche to mainstream in less than two decades"

      - session_number: 2
        title: "Session 2: Green Finance Ecosystem"
        duration_hours: 3.5

        slides:
          - slide_number: 5
            type: "title"
            title: "The Green Finance Ecosystem"
            content: null

          - slide_number: 6
            type: "chart"
            title: "Green Finance Ecosystem Map"
            chart_spec:
              chart_id: "week1_chart2"
              type: "flowchart"
              tool: "graphviz"
              description: "Key participants and flows in green finance ecosystem"
              title: "Green Finance Ecosystem Map"
              graphviz_spec:
                diagram_type: "flowchart"
                nodes:
                  - {id: "providers", label: "Capital Providers\n\n- Institutional Investors\n- Asset Managers\n- Banks\n- DFIs\n- Retail Investors", color: "#C1C1E8"}
                  - {id: "intermediaries", label: "Intermediaries\n\n- Investment Banks\n- Underwriters\n- Rating Agencies\n- Verifiers\n- Exchanges", color: "#CCCCEB"}
                  - {id: "recipients", label: "Capital Recipients\n\n- Governments\n- Corporations\n- Project Developers\n- Municipalities\n- Financial Institutions", color: "#D6D6EF"}
                  - {id: "standards", label: "Standard-Setters\n\n- ICMA\n- Climate Bonds Initiative\n- ISSB\n- EU Commission\n- NGFS", color: "#C1C1E8"}
                edges:
                  - {from: "providers", to: "intermediaries", label: "Capital", style: "solid"}
                  - {from: "intermediaries", to: "recipients", label: "Financing", style: "solid"}
                  - {from: "standards", to: "intermediaries", label: "Standards &\nGuidelines", style: "dashed"}
                  - {from: "standards", to: "recipients", label: "Compliance\nRequirements", style: "dashed"}
                  - {from: "recipients", to: "providers", label: "Returns &\nImpact", style: "dotted"}
                layout: "TB"
            bottom_note: "The ecosystem requires coordination among diverse participants with different incentives"

          # ... Continue with remaining slides for this session

    slides_count: 30
    charts_count: 10

  - week_number: 2
    title: "Week 2: Green Bonds and Sustainable Debt"
    theme: "Core Instruments and Markets"
    # ... (similar detailed structure)

  # ... Continue for weeks 3-8

totals:
  slides: 246
  charts: 85
  sessions: 32
  hours: 108
  chart_ratio: 0.346

validation:
  slides_target_met: true
  charts_target_met: true
  ratio_satisfied: true
  all_specs_complete: true
```

---

## Example: Full Week Specification

See above YAML for complete Week 1 example with all slides and chart specifications.

---

## Success Criteria

### Agent succeeds when:
1. ✓ content_outline_full.yaml created
2. ✓ All {weeks} weeks specified
3. ✓ Slide counts match targets (±2 slides per week acceptable)
4. ✓ Chart ratio ≥33% for each week
5. ✓ All chart specs have complete data specifications
6. ✓ All slides have bottom notes
7. ✓ Logical progression across weeks
8. ✓ No content gaps or redundancy
9. ✓ YAML is valid and parseable

### Agent fails when:
1. ✗ Chart ratio <30% for any week
2. ✗ Missing data specifications for charts
3. ✗ Slide counts off by >10% from targets
4. ✗ Content gaps (missing topics)
5. ✗ Invalid YAML output

---

## Performance

### Expected Execution
- Guidelines loading: < 5 seconds
- Week 1 generation: 3-5 minutes (most detailed)
- Weeks 2-8 generation: 2-3 minutes each
- Validation: < 30 seconds
- YAML output: < 10 seconds
- **Total: 20-30 minutes** (for 8-week course)

### Resource Usage
- Memory: 100-200MB (large YAML structure)
- Disk: 500KB-1MB (detailed YAML file)
- CPU: Moderate (content generation)

---

*Content Planner Agent Specification v1.0*
