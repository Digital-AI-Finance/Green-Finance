# Guidelines Expert Agent
## Course Generator Guidelines Validator and Configuration Expert

### Agent Type
`course-guidelines-expert`

### Purpose
Loads, validates, and extracts specifications from COURSE_GENERATOR_v2.md. Ensures all technical requirements are met and outputs a validated configuration file for downstream agents.

---

## System Prompt

```
You are the Guidelines Expert Agent, specialized in validating and extracting course generation specifications.

Your role is to:
1. Read and parse COURSE_GENERATOR_v2.md
2. Validate all technical specifications
3. Check prerequisites (template, dependencies)
4. Extract configuration parameters
5. Output validated YAML configuration

You are an expert in:
- LaTeX/Beamer configuration
- Academic course structure
- Chart generation (matplotlib, graphviz)
- Quality control metrics
- File system validation

CRITICAL RULES:
- ALWAYS read COURSE_GENERATOR_v2.md completely
- Validate template_beamer_final.tex exists and is readable
- Extract ALL color definitions (must have mlpurple, mllavender variants)
- Verify layout rules (column widths, bullet limits)
- Check quality criteria (chart ratios, slide counts)
- Output ONLY valid YAML (no syntax errors)
- Report any missing or invalid specifications

VALIDATION CHECKLIST:
✓ template_beamer_final.tex exists
✓ COURSE_GENERATOR_v2.md readable
✓ All color codes defined (9 colors minimum)
✓ Chart ratio specified (≥0.33)
✓ Layout rules complete
✓ Quality metrics defined
✓ Dependencies available (latex, python, graphviz)

OUTPUT FORMAT:
- File: guidelines_validated.yaml
- Structure: Course config, technical specs, colors, layout, quality
- Include: All extracted specifications ready for content planner
- Validate: YAML syntax correct before saving

ERROR HANDLING:
- Missing template → Report error, suggest location
- Invalid YAML in guidelines → Show parse error
- Missing specifications → Report gaps, use defaults if safe
- Dependency unavailable → Report which tool missing
```

---

## User Instruction Template

### Standard Usage (Called by Orchestrator)
```
Load and validate COURSE_GENERATOR_v2.md guidelines for this course:

Course Topic: {topic}
Target Weeks: {weeks}
Custom Config: {config_override}

Extract and validate:
1. Technical specifications (LaTeX, colors, fonts)
2. Chart requirements (ratio, types, tools)
3. Layout rules (columns, bullets, overflow)
4. Quality criteria (metrics, validation)

Output a validated configuration file: guidelines_validated.yaml

Include in output:
- All color definitions (mlpurple, mllavender variants)
- Chart generation templates
- Slide layout templates
- Overflow prevention rules
- Quality validation criteria

Report any issues found in guidelines.
```

### Manual Usage (Direct Invocation)
```
Validate course generator guidelines and create configuration:

Source: COURSE_GENERATOR_v2.md
Output: guidelines_validated.yaml

Check for:
- Template availability
- Complete color scheme
- Layout specifications
- Quality metrics
- Tool dependencies

Report validation status and any warnings.
```

---

## Agent Behavior Specification

### Step 1: Read Guidelines Document
```python
def read_guidelines():
    """Read COURSE_GENERATOR_v2.md completely"""

    try:
        with open("COURSE_GENERATOR_v2.md", "r", encoding="utf-8") as f:
            content = f.read()

        # Parse sections
        sections = {
            "configuration": extract_config_block(content),
            "technical": extract_technical_specs(content),
            "colors": extract_color_definitions(content),
            "layout": extract_layout_rules(content),
            "quality": extract_quality_metrics(content),
            "chart_templates": extract_chart_templates(content),
            "error_handling": extract_error_procedures(content)
        }

        return sections, None

    except FileNotFoundError:
        return None, "COURSE_GENERATOR_v2.md not found in current directory"

    except Exception as e:
        return None, f"Error reading guidelines: {str(e)}"
```

### Step 2: Validate Template
```python
def validate_template():
    """Check template_beamer_final.tex"""

    checks = {}

    # Existence
    checks["template_exists"] = os.path.exists("template_beamer_final.tex")

    if not checks["template_exists"]:
        return False, "template_beamer_final.tex not found"

    # Readable
    try:
        with open("template_beamer_final.tex", "r") as f:
            template_content = f.read()
        checks["template_readable"] = True
    except:
        return False, "template_beamer_final.tex not readable"

    # Contains required elements
    required = [
        r"\documentclass.*beamer",
        r"\usetheme{Madrid}",
        r"\definecolor{mlpurple}",
        r"\definecolor{mllavender}",
        r"\\newcommand{\\bottomnote}"
    ]

    for pattern in required:
        if not re.search(pattern, template_content):
            return False, f"Template missing required element: {pattern}"

    checks["template_valid"] = True
    return True, "Template validated successfully"
```

### Step 3: Extract Color Scheme
```python
def extract_colors(content):
    """Extract all color definitions from guidelines"""

    # Expected colors from template
    required_colors = [
        "mlpurple",
        "mllavender",
        "mllavender2",
        "mllavender3",
        "mllavender4",
        "mlgreen",
        "mlorange",
        "mlred",
        "mlgray"
    ]

    colors = {}

    # Parse from COURSE_GENERATOR_v2.md
    color_section = extract_section(content, "python_colors:")
    for color_name in required_colors:
        # Find hex code for this color
        match = re.search(rf"{color_name}.*?(#[0-9A-Fa-f]{{6}})", color_section)
        if match:
            colors[color_name] = match.group(1)
        else:
            # Missing color - use default or error
            colors[color_name] = get_default_color(color_name)

    # Validate all required colors present
    missing = [c for c in required_colors if c not in colors or not colors[c]]

    if missing:
        return None, f"Missing color definitions: {missing}"

    return colors, None
```

### Step 4: Extract Layout Rules
```python
def extract_layout_rules(content):
    """Extract layout specifications"""

    layout = {}

    # Find layout section in YAML config
    yaml_match = re.search(r"layout:\s*\n((?:    .*\n)*)", content)
    if yaml_match:
        layout_yaml = yaml_match.group(1)

        # Parse YAML (safe because we control the source)
        import yaml
        layout = yaml.safe_load(f"layout:\n{layout_yaml}")["layout"]
    else:
        # Use defaults from documentation
        layout = {
            "default": "two-column",
            "column_width": 0.48,
            "max_bullets_per_column": 6,
            "max_bullets_single": 8,
            "overflow_action": "auto-split",
            "chart_width": 0.9,
            "figure_size": [10, 6]
        }

    return layout
```

### Step 5: Extract Quality Metrics
```python
def extract_quality_metrics(content):
    """Extract quality control specifications"""

    metrics = {
        "chart_ratio_min": 0.33,
        "slides_per_week": [30, 32, 30, 30, 30, 32, 30, 32],
        "charts_per_week": [10, 11, 10, 10, 10, 11, 10, 11],
        "overflow_tolerance": 0,
        "compilation_max_retries": 3,
        "chart_generation_max_fails": 0.2  # Allow 20% failure
    }

    # Try to extract from guidelines
    ratio_match = re.search(r"chart_ratio:\s*([0-9.]+)", content)
    if ratio_match:
        metrics["chart_ratio_min"] = float(ratio_match.group(1))

    # Extract slides per week
    slides_match = re.search(r"slides_per_week:\s*\[([\d,\s]+)\]", content)
    if slides_match:
        metrics["slides_per_week"] = [int(x.strip()) for x in slides_match.group(1).split(",")]

    return metrics
```

### Step 6: Validate Dependencies
```python
def validate_dependencies():
    """Check required tools are available"""

    dependencies = {}

    # LaTeX
    dependencies["latex"] = check_command_available("pdflatex")

    # Python and packages
    dependencies["python"] = check_command_available("python")
    if dependencies["python"]:
        dependencies["matplotlib"] = check_python_package("matplotlib")
        dependencies["seaborn"] = check_python_package("seaborn")
        dependencies["numpy"] = check_python_package("numpy")
        dependencies["pandas"] = check_python_package("pandas")

    # Graphviz
    dependencies["graphviz"] = check_command_available("dot")

    missing = [k for k, v in dependencies.items() if not v]

    if missing:
        return False, f"Missing dependencies: {missing}"

    return True, "All dependencies available"

def check_command_available(cmd):
    """Check if command is in PATH"""
    import shutil
    return shutil.which(cmd) is not None

def check_python_package(package):
    """Check if Python package is installed"""
    try:
        __import__(package)
        return True
    except ImportError:
        return False
```

### Step 7: Generate Validated YAML
```python
def generate_validated_yaml(sections, colors, layout, metrics, template_status, deps_status):
    """Create guidelines_validated.yaml"""

    config = {
        "course": {
            "title": user_provided_title or "Academic Course",
            "weeks": user_provided_weeks or 8,
            "hours_per_week": "13-14",
            "total_hours": (user_provided_weeks or 8) * 13.5
        },

        "technical": {
            "template": "template_beamer_final.tex",
            "theme": "Madrid",
            "font_size": "8pt",
            "aspect_ratio": 169,
            "pdf_version": 5
        },

        "colors": colors,  # From step 3

        "python_colors": {
            "primary": colors["mlpurple"],
            "secondary": colors["mllavender"],
            "light": colors["mllavender2"],
            "lighter": colors["mllavender3"],
            "lightest": colors["mllavender4"],
            "success": colors["mlgreen"],
            "warning": colors["mlorange"],
            "danger": colors["mlred"],
            "neutral": colors["mlgray"]
        },

        "layout": layout,  # From step 4

        "quality": metrics,  # From step 5

        "chart_generation": {
            "tools": {
                "python": {
                    "enabled": deps_status.get("matplotlib", False),
                    "packages": ["matplotlib", "seaborn", "numpy", "pandas"],
                    "figure_size": layout.get("figure_size", [10, 6]),
                    "dpi": 300,
                    "format": "pdf"
                },
                "graphviz": {
                    "enabled": deps_status.get("graphviz", False),
                    "command": "dot",
                    "format": "pdf"
                }
            }
        },

        "validation": {
            "template_valid": template_status,
            "dependencies_met": all(deps_status.values()),
            "guidelines_complete": True,
            "ready_for_generation": template_status and all(deps_status.values())
        },

        "timestamps": {
            "validated_at": datetime.now().isoformat(),
            "guidelines_version": "2.0"
        }
    }

    # Write YAML
    import yaml
    with open("guidelines_validated.yaml", "w") as f:
        yaml.dump(config, f, default_flow_style=False, sort_keys=False)

    return "guidelines_validated.yaml"
```

### Step 8: Generate Report
```markdown
def generate_validation_report():
    """Create summary of validation process"""

    report = f"""
# Guidelines Validation Report
Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## Validation Results

### Prerequisites
- Template (template_beamer_final.tex): {status_icon(template_valid)}
- Guidelines (COURSE_GENERATOR_v2.md): {status_icon(guidelines_valid)}

### Technical Specifications
- Color scheme: {status_icon(colors_complete)} ({len(colors)} colors defined)
- Layout rules: {status_icon(layout_complete)}
- Quality metrics: {status_icon(metrics_complete)}

### Dependencies
- LaTeX (pdflatex): {status_icon(deps["latex"])}
- Python: {status_icon(deps["python"])}
  - matplotlib: {status_icon(deps["matplotlib"])}
  - seaborn: {status_icon(deps["seaborn"])}
  - numpy: {status_icon(deps["numpy"])}
  - pandas: {status_icon(deps["pandas"])}
- Graphviz (dot): {status_icon(deps["graphviz"])}

### Configuration Extracted
- Course weeks: {config["course"]["weeks"]}
- Slides per week: {config["quality"]["slides_per_week"]}
- Charts per week: {config["quality"]["charts_per_week"]}
- Chart ratio minimum: {config["quality"]["chart_ratio_min"]*100}%

### Ready for Generation
{status_icon(ready)} {"All checks passed - ready to proceed" if ready else "Issues found - review before proceeding"}

## Output Files
- guidelines_validated.yaml: {file_size("guidelines_validated.yaml")}

## Next Steps
{"✓ Proceed to Content Planning Agent" if ready else "✗ Fix issues above before proceeding"}
    """

    return report
```

---

## Output Schema: guidelines_validated.yaml

```yaml
course:
  title: "Course Title"
  weeks: 8
  hours_per_week: "13-14"
  total_hours: 108

technical:
  template: "template_beamer_final.tex"
  theme: "Madrid"
  font_size: "8pt"
  aspect_ratio: 169
  pdf_version: 5

colors:
  mlpurple: "#3333B2"
  mllavender: "#ADADE0"
  mllavender2: "#C1C1E8"
  mllavender3: "#CCCCEB"
  mllavender4: "#D6D6EF"
  mlgreen: "#2CA02C"
  mlorange: "#FF7F0E"
  mlred: "#D62728"
  mlgray: "#7F7F7F"

python_colors:
  primary: "#3333B2"
  secondary: "#ADADE0"
  light: "#C1C1E8"
  lighter: "#CCCCEB"
  lightest: "#D6D6EF"
  success: "#2CA02C"
  warning: "#FF7F0E"
  danger: "#D62728"
  neutral: "#7F7F7F"

layout:
  default: "two-column"
  column_width: 0.48
  max_bullets_per_column: 6
  max_bullets_single: 8
  overflow_action: "auto-split"
  chart_width: 0.9
  figure_size: [10, 6]

quality:
  chart_ratio_min: 0.33
  slides_per_week: [30, 32, 30, 30, 30, 32, 30, 32]
  charts_per_week: [10, 11, 10, 10, 10, 11, 10, 11]
  overflow_tolerance: 0
  compilation_max_retries: 3
  chart_generation_max_fails: 0.2

chart_generation:
  tools:
    python:
      enabled: true
      packages: ["matplotlib", "seaborn", "numpy", "pandas"]
      figure_size: [10, 6]
      dpi: 300
      format: "pdf"
    graphviz:
      enabled: true
      command: "dot"
      format: "pdf"

validation:
  template_valid: true
  dependencies_met: true
  guidelines_complete: true
  ready_for_generation: true

timestamps:
  validated_at: "2024-11-20T10:30:00"
  guidelines_version: "2.0"
```

---

## Error Handling

### Error 1: COURSE_GENERATOR_v2.md Not Found
```
Error: Cannot locate COURSE_GENERATOR_v2.md
Location checked: D:\Joerg\Research\slides\GreenFinance\COURSE_GENERATOR_v2.md

Action: STOP execution
Message: "Guidelines file not found. Please ensure COURSE_GENERATOR_v2.md exists in the working directory."
Recovery: None (user must provide file)
```

### Error 2: template_beamer_final.tex Missing
```
Error: Template file not found
Location checked: D:\Joerg\Research\slides\GreenFinance\template_beamer_final.tex

Action: STOP execution
Message: "Template required for course generation. Cannot proceed without template_beamer_final.tex"
Recovery: None (user must provide template)
```

### Error 3: Incomplete Color Definitions
```
Warning: Missing color definitions
Missing: [mllavender3, mllavender4]

Action: Use defaults
Message: "Some colors missing from guidelines. Using defaults:
  mllavender3: #CCCCEB
  mllavender4: #D6D6EF"
Recovery: Continue with defaults, note in validation report
```

### Error 4: Dependencies Missing
```
Warning: Required dependencies not available
Missing: [graphviz]

Action: Note limitation
Message: "Graphviz not available. Chart generation will be limited to Python matplotlib/seaborn only."
Recovery: Continue but disable graphviz charts in configuration
```

### Error 5: Invalid YAML in Guidelines
```
Error: Cannot parse configuration section
Line: 45 in COURSE_GENERATOR_v2.md
Issue: YAML syntax error (invalid indentation)

Action: Attempt manual extraction
Message: "Configuration section has syntax errors. Attempting to extract values manually..."
Recovery: Use regex parsing instead of YAML parser
```

---

## Testing Scenarios

### Test 1: Complete Guidelines
```
Input: Valid COURSE_GENERATOR_v2.md + template_beamer_final.tex
Expected: guidelines_validated.yaml with all fields populated
Status: PASS if all validations succeed
```

### Test 2: Missing Template
```
Input: COURSE_GENERATOR_v2.md only (no template)
Expected: Error report, no YAML output
Status: PASS if error caught and reported correctly
```

### Test 3: Partial Dependencies
```
Input: Guidelines present, LaTeX available, Python missing
Expected: YAML with python.enabled: false
Status: PASS if limitation noted in validation report
```

### Test 4: Custom Configuration
```
Input: Guidelines + user override (weeks: 6)
Expected: YAML with weeks: 6, adjusted slides/charts arrays
Status: PASS if overrides applied correctly
```

---

## Success Criteria

### Agent succeeds when:
1. ✓ guidelines_validated.yaml created
2. ✓ YAML is valid (parseable)
3. ✓ All required sections present
4. ✓ Color scheme complete (9 colors)
5. ✓ Layout rules defined
6. ✓ Quality metrics extracted
7. ✓ Validation status accurate

### Agent reports issues when:
1. ⚠ Template not found (STOP)
2. ⚠ Guidelines not found (STOP)
3. ⚠ Dependencies missing (CONTINUE with warning)
4. ⚠ Incomplete specifications (CONTINUE with defaults)

---

## Performance

### Expected Execution
- Read time: < 5 seconds
- Validation: < 30 seconds
- YAML generation: < 5 seconds
- **Total: < 1 minute**

### Resource Usage
- Memory: < 50MB
- Disk: < 10KB (YAML output)
- CPU: Minimal (parsing only)

---

*Guidelines Expert Agent Specification v1.0*
