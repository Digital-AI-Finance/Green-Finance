# Slide Generator Agent
## Complete LaTeX Slide and Chart Generation Engine

### Agent Type
`academic-slide-generator`

### Purpose
Generates all course materials from content specifications: Python chart scripts, Graphviz diagrams, LaTeX slides, compiles PDFs, and validates outputs. Final production agent that creates deliverable course materials.

---

## System Prompt

```
You are the Slide Generator Agent, specialized in transforming content specifications into professional academic course materials.

Your role is to:
1. Generate executable chart scripts (Python + Graphviz)
2. Execute all chart generation and validate outputs
3. Generate complete LaTeX slide files
4. Compile slides to PDF
5. Validate all outputs (slides, charts, compilation)
6. Create generation logs

You are an expert in:
- Python matplotlib/seaborn chart generation
- Graphviz DOT language for diagrams
- LaTeX/Beamer slide authoring
- Template integration (template_beamer_final.tex)
- PDF compilation and error handling
- File system operations and validation

CRITICAL RULES:
- Read both YAML files: guidelines_validated.yaml + content_outline_full.yaml
- Use template_beamer_final.tex preamble exactly
- ALL charts must use template colors (mlpurple/mllavender)
- Include COLORS dictionary in every Python script
- Maximum 6 bullets per column (overflow prevention)
- Every slide must have \bottomnote{}
- File naming: YYYYMMDD_HHMM_Week{N}_{Title}.tex
- Generate charts BEFORE LaTeX (dependencies)
- Retry compilation up to 3 times
- Move auxiliary files to temp/
- Generate detailed logs

CHART GENERATION:
- Python scripts: Use matplotlib with template colors
- Figure size: (10, 6) for 16:9 aspect ratio
- DPI: 300 for quality
- Format: PDF only
- Error handling: Create placeholders if generation fails
- Validate: Check PDF exists and is readable

LATEX GENERATION:
- Copy template preamble exactly
- Use proper \includegraphics for charts
- Implement overflow prevention
- Add \bottomnote to every frame
- Follow layout specifications from guidelines
- Use proper escaping (& → \&, # → \#, etc.)

COMPILATION:
- Run pdflatex -interaction=nonstopmode
- Retry up to 3 times on failure
- Capture and parse error messages
- Check output PDF exists and has correct page count
- Clean auxiliary files (move to temp/)

VALIDATION:
- Count slides per week
- Verify all charts embedded (no missing images)
- Check chart ratio per week
- Validate file sizes reasonable
- No compilation errors or warnings
- Log everything

ERROR RECOVERY:
- Chart fails → Create placeholder, log error, continue
- LaTeX error → Parse error, attempt fix, retry
- Overflow → Auto-split slide if possible
- Missing file → Report specific file, stop if critical
```

---

## User Instruction Template

### Standard Usage (Called by Orchestrator)
```
Generate complete course slides and charts for all {weeks} weeks:

Input Files:
- guidelines_validated.yaml (technical specs)
- content_outline_full.yaml (detailed content)
- template_beamer_final.tex (styling template)

Course: {topic}

For each week (1-{weeks}):
1. Create all chart generation scripts:
   - Python scripts in charts/week{N}/ using matplotlib/seaborn
   - Graphviz .dot files using template colors
   - Include COLORS dictionary matching mlpurple/mllavender theme
   - Generate realistic simulated data
   - Save as PDFs with proper formatting

2. Generate LaTeX slide file:
   - File: {YYYYMMDD}_Week{N}_{Title}.tex
   - Use template_beamer_final.tex preamble
   - Follow layout rules (2-column, max 6 bullets)
   - Embed charts with \includegraphics
   - Add \bottomnote to every slide
   - Implement overflow prevention

3. Compile to PDF:
   - Run pdflatex (up to 3 attempts)
   - Move auxiliary files to temp/
   - Verify PDF generated and readable

4. Validate output:
   - Count slides in PDF
   - Verify charts embedded (no missing images)
   - Check for overflow warnings
   - Validate chart ratio

Generate all {weeks} weeks sequentially. Report progress and any errors.

Final output:
- {weeks} PDF files (Week1-{weeks}_*.pdf)
- {total_charts} chart PDFs in charts/week1-{weeks}/
- All source .tex and chart scripts
- generation.log with detailed progress
```

---

## Agent Behavior Specification

### Step 1: Load Specifications
```python
def load_specifications():
    """Load both YAML configuration files"""

    import yaml

    # Guidelines
    with open("guidelines_validated.yaml", "r") as f:
        guidelines = yaml.safe_load(f)

    # Content outline
    with open("content_outline_full.yaml", "r") as f:
        content = yaml.safe_load(f)

    # Extract key parameters
    specs = {
        "course_title": content["course_title"],
        "weeks": content["total_weeks"],
        "colors": guidelines["python_colors"],
        "template": guidelines["technical"]["template"],
        "layout": guidelines["layout"],
        "quality": guidelines["quality"],
        "week_data": content["weeks"]
    }

    return specs
```

### Step 2: Generate Chart Scripts (Python)
```python
def generate_python_chart_script(chart_spec, week_num, colors):
    """Generate executable Python script for chart"""

    script = f'''import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from datetime import datetime

# Template colors (CRITICAL: Must match beamer theme)
COLORS = {{
    'primary': '{colors["primary"]}',  # mlpurple
    'secondary': '{colors["secondary"]}',  # mllavender
    'light': '{colors["light"]}',
    'lighter': '{colors["lighter"]}',
    'lightest': '{colors["lightest"]}',
    'success': '{colors["success"]}',
    'warning': '{colors["warning"]}',
    'danger': '{colors["danger"]}',
    'neutral': '{colors["neutral"]}'
}}

def generate_chart():
    """
    Chart: {chart_spec["description"]}
    Week: {week_num}
    Type: {chart_spec["type"]}
    """
    try:
        # Set style
        plt.style.use('seaborn-v0_8')

        # Create figure (16:9 aspect ratio for beamer)
        fig, ax = plt.subplots(figsize=(10, 6))

        # Generate data
        {generate_data_code(chart_spec)}

        # Create visualization
        {generate_plot_code(chart_spec)}

        # Styling
        ax.set_xlabel('{chart_spec["data"]["x"]}', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_ylabel('{chart_spec["data"]["y"]}', fontsize=12, fontweight='bold', fontfamily='sans-serif')
        ax.set_title('{chart_spec["title"]}', fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'])
        ax.grid(True, alpha=0.3, linestyle='--', color=COLORS['neutral'])

        # Background
        ax.set_facecolor('#FAFAFA')
        fig.patch.set_facecolor('white')

        # Save
        output_path = '{chart_spec["chart_id"]}.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight',
                    facecolor='white', edgecolor='none')
        print(f"SUCCESS: Generated {{output_path}}")
        plt.close()
        return True

    except Exception as e:
        print(f"ERROR: Failed to generate chart: {{e}}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = generate_chart()
    exit(0 if success else 1)
'''

    return script

def generate_data_code(chart_spec):
    """Generate data loading/simulation code"""

    data = chart_spec["data"]

    if chart_spec["type"] == "line":
        return f'''
        years = np.array({data["simulated_values"][:len(data["simulated_values"])]})
        x_labels = {list(range(2015, 2015 + len(data["simulated_values"])))}
        values = years
        '''

    elif chart_spec["type"] == "bar":
        return f'''
        categories = {data["categories"]}
        values = np.array({data["values"]})
        '''

    elif chart_spec["type"] == "pie":
        return f'''
        labels = {data["categories"]}
        sizes = {data["values"]}
        '''

    elif chart_spec["type"] == "scatter":
        return f'''
        np.random.seed(42)
        x = np.random.randn({data["points"]})
        y = 0.8 * x + np.random.randn({data["points"]}) * 0.3
        '''

    return "# Data code here"

def generate_plot_code(chart_spec):
    """Generate plotting code"""

    if chart_spec["type"] == "line":
        return f'''
        ax.plot(x_labels, values, color=COLORS['primary'], linewidth=2.5, marker='o', markersize=8)
        ax.fill_between(x_labels, values, alpha=0.3, color=COLORS['primary'])
        '''

    elif chart_spec["type"] == "bar":
        return f'''
        bars = ax.bar(range(len(categories)), values, color=COLORS['primary'], edgecolor='black', linewidth=0.7)
        ax.set_xticks(range(len(categories)))
        ax.set_xticklabels(categories, rotation=45, ha='right')
        for bar, val in zip(bars, values):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + max(values)*0.02,
                   f'{{val:.0f}}', ha='center', va='bottom', fontsize=9, fontweight='bold')
        '''

    elif chart_spec["type"] == "pie":
        return f'''
        colors_list = [COLORS['primary'], COLORS['secondary'], COLORS['light'], COLORS['lighter']]
        ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90,
               colors=colors_list[:len(sizes)], textprops={{'fontsize': 10, 'fontweight': 'bold'}})
        '''

    elif chart_spec["type"] == "scatter":
        return f'''
        ax.scatter(x, y, c=COLORS['primary'], alpha=0.6, s=50, edgecolors='white', linewidth=0.5)
        # Add trend line
        z = np.polyfit(x, y, 1)
        p = np.poly1d(z)
        ax.plot(x, p(x), color=COLORS['secondary'], linewidth=2, linestyle='--', label='Trend')
        ax.legend()
        '''

    return "# Plot code here"
```

### Step 3: Generate Chart Scripts (Graphviz)
```python
def generate_graphviz_script(chart_spec, week_num):
    """Generate Graphviz DOT file"""

    gv_spec = chart_spec["graphviz_spec"]

    dot = f'''digraph {chart_spec["chart_id"].replace("_", "")} {{
    // Template-aligned styling
    rankdir={gv_spec["layout"]};
    node [shape=box, style="rounded,filled", fontname="Arial", fontsize=10];
    edge [fontname="Arial", fontsize=9];

    // Color scheme matching beamer mllavender theme
    node [fillcolor="#D6D6EF"];  // mllavender4

    // Nodes
'''

    for node in gv_spec["nodes"]:
        dot += f'    {node["id"]} [label="{node["label"]}", fillcolor="{node["color"]}"];\n'

    dot += '\n    // Edges\n'

    for edge in gv_spec["edges"]:
        style = f', style="{edge["style"]}"' if edge.get("style") else ""
        label = f', label="{edge["label"]}"' if edge.get("label") else ""
        dot += f'    {edge["from"]} -> {edge["to"]} [fontsize=9{label}{style}];\n'

    dot += f'''
    // Title
    labelloc="t";
    label="{chart_spec["title"]}";
    fontsize=14;
    fontname="Arial Bold";
    fontcolor="#3333B2";  // mlpurple
}}
'''

    return dot
```

### Step 4: Execute Chart Generation
```python
def generate_all_charts(specs):
    """Generate all chart files for all weeks"""

    log = []
    success_count = 0
    fail_count = 0

    for week in specs["week_data"]:
        week_num = week["week_number"]
        log.append(f"\n=== Generating charts for Week {week_num} ===")

        # Ensure directory exists
        chart_dir = f"charts/week{week_num}"
        os.makedirs(chart_dir, exist_ok=True)

        # Collect all charts from all sessions
        charts = []
        for session in week["sessions"]:
            for slide in session["slides"]:
                if slide["type"] == "chart":
                    charts.append(slide["chart_spec"])

        # Generate each chart
        for chart_spec in charts:
            chart_id = chart_spec["chart_id"]
            log.append(f"  Generating {chart_id}...")

            try:
                if chart_spec["tool"] == "python":
                    # Generate Python script
                    script_content = generate_python_chart_script(chart_spec, week_num, specs["colors"])
                    script_path = f"{chart_dir}/{chart_id}.py"

                    with open(script_path, "w") as f:
                        f.write(script_content)

                    # Execute script
                    result = subprocess.run(["python", script_path],
                                          capture_output=True, text=True, timeout=60)

                    if result.returncode == 0:
                        log.append(f"    SUCCESS: {chart_id}.pdf")
                        success_count += 1
                    else:
                        log.append(f"    ERROR: {result.stderr}")
                        create_placeholder_chart(f"{chart_dir}/{chart_id}.pdf")
                        fail_count += 1

                elif chart_spec["tool"] == "graphviz":
                    # Generate DOT file
                    dot_content = generate_graphviz_script(chart_spec, week_num)
                    dot_path = f"{chart_dir}/{chart_id}.dot"

                    with open(dot_path, "w") as f:
                        f.write(dot_content)

                    # Execute dot
                    pdf_path = f"{chart_dir}/{chart_id}.pdf"
                    result = subprocess.run(["dot", "-Tpdf", dot_path, "-o", pdf_path],
                                          capture_output=True, text=True, timeout=30)

                    if result.returncode == 0:
                        log.append(f"    SUCCESS: {chart_id}.pdf")
                        success_count += 1
                    else:
                        log.append(f"    ERROR: {result.stderr}")
                        create_placeholder_chart(pdf_path)
                        fail_count += 1

            except Exception as e:
                log.append(f"    EXCEPTION: {str(e)}")
                fail_count += 1

    log.append(f"\nChart generation complete: {success_count} succeeded, {fail_count} failed")

    return log, success_count, fail_count

def create_placeholder_chart(output_path):
    """Create placeholder PDF if chart generation fails"""

    try:
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots(figsize=(10, 6))
        ax.text(0.5, 0.5, 'Chart Placeholder\n[Generation Failed]',
                ha='center', va='center', fontsize=20,
                color='#7F7F7F', fontfamily='sans-serif')
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        ax.axis('off')
        ax.set_facecolor('#D6D6EF')
        plt.savefig(output_path, format='pdf', bbox_inches='tight')
        plt.close()
    except:
        pass  # Can't even create placeholder
```

### Step 5: Generate LaTeX Slides
```python
def generate_latex_file(week, specs):
    """Generate complete LaTeX file for one week"""

    week_num = week["week_number"]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M_")
    title_clean = week["title"].replace(" ", "").replace(":", "")
    filename = f"{timestamp}Week{week_num}_{title_clean}.tex"

    # Start with template preamble
    latex = get_template_preamble(specs)

    # Document info
    latex += f'''
\\title{{{week["title"]}}}
\\subtitle{{{specs["course_title"]}}}
\\author{{Course Instructor}}
\\date{{\\today}}

\\begin{{document}}

% Title slide
\\begin{{frame}}[plain]
\\titlepage
\\end{{frame}}

'''

    # Generate slides from content
    slide_counter = 1
    for session in week["sessions"]:
        # Session title slide
        latex += generate_session_title_slide(session)

        # Content slides
        for slide in session["slides"]:
            if slide["slide_number"] == 1:  # Skip, already did session title
                continue

            latex += generate_slide_latex(slide, week_num, specs)
            slide_counter += 1

    latex += '''\\end{document}
'''

    # Write file
    with open(filename, "w", encoding="utf-8") as f:
        f.write(latex)

    return filename

def get_template_preamble(specs):
    """Copy exact preamble from template_beamer_final.tex"""

    # Read template
    with open(specs["template"], "r", encoding="utf-8") as f:
        template_content = f.read()

    # Extract preamble (everything before \begin{document})
    preamble = template_content.split(r'\begin{document}')[0]

    # Remove template-specific title/author/date
    preamble = re.sub(r'\\title\{.*?\}', '', preamble, flags=re.DOTALL)
    preamble = re.sub(r'\\subtitle\{.*?\}', '', preamble, flags=re.DOTALL)
    preamble = re.sub(r'\\author\{.*?\}', '', preamble, flags=re.DOTALL)
    preamble = re.sub(r'\\institute\{.*?\}', '', preamble, flags=re.DOTALL)
    preamble = re.sub(r'\\date\{.*?\}', '', preamble, flags=re.DOTALL)

    return preamble

def generate_slide_latex(slide, week_num, specs):
    """Generate LaTeX code for one slide"""

    if slide["type"] == "two-column":
        return generate_two_column_slide(slide, specs)
    elif slide["type"] == "chart":
        return generate_chart_slide(slide, week_num, specs)
    elif slide["type"] == "definition":
        return generate_definition_slide(slide, specs)
    elif slide["type"] == "comparison":
        return generate_comparison_slide(slide, specs)
    elif slide["type"] == "process":
        return generate_process_slide(slide, specs)
    else:
        return generate_generic_slide(slide, specs)

def generate_two_column_slide(slide, specs):
    """Two-column layout slide"""

    # Check bullet counts (overflow prevention)
    left_bullets = slide.get("left_bullets", [])
    right_bullets = slide.get("right_bullets", [])

    max_bullets = specs["layout"]["max_bullets_per_column"]

    if len(left_bullets) > max_bullets or len(right_bullets) > max_bullets:
        # Need to split - implement auto-split logic
        return split_two_column_slide(slide, specs)

    latex = f'''\\begin{{frame}}[t]{{{escape_latex(slide["title"])}}}
\\begin{{columns}}[T]
\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["left_header"])}}}
\\begin{{itemize}}
'''

    for bullet in left_bullets:
        latex += f'\\item {escape_latex(bullet)}\n'

    latex += '''\\end{itemize}

\\column{0.48\\textwidth}
\\textbf{''' + escape_latex(slide["right_header"]) + '''}
\\begin{itemize}
'''

    for bullet in right_bullets:
        latex += f'\\item {escape_latex(bullet)}\n'

    latex += '''\\end{itemize}
\\end{columns}

\\bottomnote{''' + escape_latex(slide["bottom_note"]) + '''}
\\end{frame}

'''

    return latex

def generate_chart_slide(slide, week_num, specs):
    """Chart display slide"""

    chart_id = slide["chart_spec"]["chart_id"]
    chart_path = f"charts/week{week_num}/{chart_id}.pdf"

    latex = f'''\\begin{{frame}}[t]{{{escape_latex(slide["title"])}}}
\\begin{{center}}
\\includegraphics[width=0.9\\textwidth]{{{chart_path}}}
\\end{{center}}

\\bottomnote{{{escape_latex(slide["bottom_note"])}}}
\\end{{frame}}

'''

    return latex

def escape_latex(text):
    """Escape special LaTeX characters"""

    if not text:
        return ""

    # Escape special characters
    replacements = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}'
    }

    for char, escaped in replacements.items():
        text = text.replace(char, escaped)

    return text
```

### Step 6: Compile PDFs
```python
def compile_latex_to_pdf(tex_file, max_retries=3):
    """Compile LaTeX to PDF with retries"""

    log = []
    log.append(f"\nCompiling {tex_file}...")

    for attempt in range(1, max_retries + 1):
        log.append(f"  Attempt {attempt}/{max_retries}")

        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", tex_file],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )

        # Check if PDF generated
        pdf_file = tex_file.replace(".tex", ".pdf")
        if os.path.exists(pdf_file) and os.path.getsize(pdf_file) > 1000:
            log.append(f"  SUCCESS: {pdf_file} generated")

            # Clean auxiliary files
            clean_auxiliary_files(tex_file)

            return True, log

        # Parse error if failed
        if result.stderr or result.returncode != 0:
            error_msg = parse_latex_error(result.stdout)
            log.append(f"  ERROR: {error_msg}")

            if attempt < max_retries:
                log.append(f"  Retrying...")

    log.append(f"  FAILED after {max_retries} attempts")
    return False, log

def clean_auxiliary_files(tex_file):
    """Move auxiliary files to temp/ directory"""

    base_name = os.path.splitext(os.path.basename(tex_file))[0]
    extensions = [".aux", ".log", ".out", ".nav", ".toc", ".snm"]

    os.makedirs("temp", exist_ok=True)

    for ext in extensions:
        aux_file = f"{base_name}{ext}"
        if os.path.exists(aux_file):
            shutil.move(aux_file, f"temp/{aux_file}")

def parse_latex_error(output):
    """Extract meaningful error from LaTeX output"""

    # Look for error lines
    lines = output.split('\n')
    for i, line in enumerate(lines):
        if '!' in line or 'Error' in line:
            # Get context (next 3 lines)
            context = '\n'.join(lines[i:i+4])
            return context

    return "Unknown compilation error"
```

### Step 7: Validate Outputs
```python
def validate_week_output(week_num, expected_slides, expected_charts):
    """Validate all outputs for one week"""

    validation = {
        "week": week_num,
        "pdf_exists": False,
        "pdf_pages": 0,
        "charts_generated": 0,
        "charts_expected": expected_charts,
        "charts_embedded": False,
        "chart_ratio": 0.0,
        "file_size_mb": 0.0,
        "errors": []
    }

    # Check PDF exists
    pdf_files = glob.glob(f"Week{week_num}_*.pdf")
    if pdf_files:
        pdf_file = pdf_files[0]
        validation["pdf_exists"] = True

        # Count pages (using PyPDF2 or similar)
        try:
            page_count = count_pdf_pages(pdf_file)
            validation["pdf_pages"] = page_count

            # Check file size
            file_size = os.path.getsize(pdf_file) / (1024 * 1024)  # MB
            validation["file_size_mb"] = round(file_size, 2)
        except Exception as e:
            validation["errors"].append(f"Cannot read PDF: {str(e)}")

    # Count generated charts
    chart_pdfs = glob.glob(f"charts/week{week_num}/*.pdf")
    validation["charts_generated"] = len(chart_pdfs)

    # Calculate ratio
    if validation["pdf_pages"] > 0:
        validation["chart_ratio"] = validation["charts_generated"] / validation["pdf_pages"]

    # Check if all charts embedded (no missing images)
    validation["charts_embedded"] = validation["charts_generated"] >= expected_charts * 0.9

    # Check against expectations
    if validation["pdf_pages"] < expected_slides * 0.9:
        validation["errors"].append(f"Slide count low: {validation['pdf_pages']} vs {expected_slides} expected")

    if validation["chart_ratio"] < 0.30:
        validation["errors"].append(f"Chart ratio low: {validation['chart_ratio']:.1%}")

    return validation
```

---

## Success Criteria

### Agent succeeds when:
1. ✓ All {weeks} PDF files generated
2. ✓ All charts generated (≥90% success rate)
3. ✓ PDFs compile without errors
4. ✓ Page counts match targets (±10%)
5. ✓ Chart ratio ≥30% per week
6. ✓ All charts embedded (no missing images)
7. ✓ File sizes reasonable (5-20MB per week)
8. ✓ Auxiliary files cleaned up

### Agent fails when:
1. ✗ Less than 75% of PDFs generated
2. ✗ Chart generation <60% success rate
3. ✗ Compilation errors not resolved after retries
4. ✗ Chart ratio <25% for multiple weeks

---

## Performance

### Expected Execution
- Chart generation: 5-10 minutes (85 charts)
- LaTeX generation: 3-5 minutes (8 files)
- PDF compilation: 8-12 minutes (8 compilations)
- Validation: 1-2 minutes
- **Total: 17-30 minutes** (full course)

### Resource Usage
- CPU: High during compilation (pdflatex)
- Memory: 500MB-1GB
- Disk: 200-300MB total output
- Network: None

---

*Slide Generator Agent Specification v1.0*
