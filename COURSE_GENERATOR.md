# Universal Course Generator System
## Configuration-Driven Academic Course Creation Framework

### Purpose
This document provides a complete, reusable system for generating professional academic courses with lectures, charts, and comprehensive materials. The system is configuration-driven, quality-controlled, and highly automated.

### Prerequisites
- **Software Required:**
  - LaTeX distribution (MiKTeX/TeX Live)
  - Python 3.x with matplotlib, seaborn, numpy, pandas
  - Graphviz (dot command available)
  - PDF viewer
- **Template Files:**
  - `template_beamer_final.tex` (in course directory)
  - 8pt Madrid theme beamer setup
- **Directory Structure:**
  - Working directory: `D:\Joerg\Research\slides\[CourseName]\`
  - Charts subdirectory: `charts/week1-8/`
  - Archive directory: `previous/`
  - Temp directory: `temp/`

---

## CONFIGURATION BLOCK

```yaml
# Course Configuration - Edit this section for your course
course_config:
  # Basic Information
  title: "Green Finance Professional Certificate"
  subtitle: "Intensive 8-Week Program"
  institution: "University Name"

  # Course Structure
  total_weeks: 8
  hours_per_week: 13-14
  total_hours: 108

  # Slide Specifications
  slides_per_week: [30, 32, 30, 30, 30, 32, 30, 32]  # Per week
  chart_ratio: 0.33  # 1/3 of slides must be charts
  charts_per_week: [10, 11, 10, 10, 10, 11, 10, 11]  # Calculated from ratio

  # Technical Settings
  template: "template_beamer_final.tex"
  beamer_theme: "Madrid"
  aspect_ratio: 169
  font_size: 8pt

  # Visual Style
  colors:
    primary: "mlpurple"      # RGB(51,51,178)
    secondary: "mllavender"   # RGB(173,173,224)
    accent: "mlgreen"         # RGB(44,160,44)
    warning: "mlorange"       # RGB(255,127,14)

  # Layout Rules
  layout:
    default: "two-column"
    column_width: 0.48
    max_bullets_per_column: 6
    max_bullets_single: 8
    overflow_action: "auto-split"

  # File Naming
  naming:
    timestamp_format: "YYYYMMDD_HHMM_"
    week_prefix: "Week"
    chart_prefix: "chart"
    use_descriptive_names: true

  # Quality Settings
  quality_control:
    validate_before_compile: true
    check_overflow: true
    verify_chart_ratio: true
    test_compilation: true
    generate_logs: true
```

---

## WEEKLY CONTENT SPECIFICATIONS

```yaml
week_specifications:
  week_1:
    title: "Green Finance Foundations"
    sessions: 4
    topics:
      - "Introduction to Green Finance"
      - "Green Finance Ecosystem"
      - "Financial Instruments"
      - "Financial Fundamentals"
    charts:
      python:
        - market_growth_timeline
        - instrument_breakdown
        - regional_distribution
        - performance_comparison
        - investment_gap_analysis
        - sector_allocation
        - risk_return_scatter
      graphviz:
        - ecosystem_flowchart
        - participant_network
        - regulatory_framework

  week_2:
    title: "Green Bonds and Sustainable Debt"
    sessions: 4
    topics:
      - "Green Bond Markets"
      - "Issuance and Verification"
      - "Pricing and Greenium"
      - "Sustainability-Linked Bonds"
    charts:
      python:
        - bond_issuance_growth
        - greenium_analysis
        - geographic_distribution
        - sector_breakdown
        - pricing_comparison
        - yield_curves
        - maturity_profile
      graphviz:
        - issuance_process
        - verification_framework
        - slb_structure
        - bond_lifecycle

  # ... Continue for weeks 3-8
```

---

## EXECUTION PIPELINE

### STEP 1: Configuration Validation
```python
def validate_configuration():
    """
    Validates all configuration parameters before execution
    Returns: Boolean success status
    """
    checks = {
        "weeks_defined": len(week_specifications) == course_config.total_weeks,
        "charts_ratio": all(charts[i]/slides[i] >= 0.30 for i in range(weeks)),
        "template_exists": os.path.exists(course_config.template),
        "dependencies": check_latex() and check_python() and check_graphviz(),
        "directory_writable": os.access(".", os.W_OK)
    }

    for check, passed in checks.items():
        print(f"[{'PASS' if passed else 'FAIL'}] {check}")

    return all(checks.values())
```

### STEP 2: Directory Structure Creation
```bash
# Create all required directories
mkdir -p charts/week{1..8}
mkdir -p previous
mkdir -p temp
mkdir -p output

# Log creation
echo "Directory structure created: $(date)" > generation.log
```

### STEP 3: Chart Generation System

#### Python Chart Template
```python
# charts/week{N}/chart_{M}_{description}.py
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import datetime

def generate_chart():
    """
    Chart: {description}
    Week: {N}
    Number: {M} of {total}
    """
    try:
        # Set consistent style
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        # Generate realistic simulated data
        # [Chart-specific code here]

        # Consistent formatting
        ax.set_xlabel('X Label', fontsize=12, fontweight='bold')
        ax.set_ylabel('Y Label', fontsize=12, fontweight='bold')
        ax.set_title('Chart Title\nSubtitle', fontsize=14, fontweight='bold')
        ax.grid(True, alpha=0.3, linestyle='--')

        # Save with error handling
        output_path = f'chart_{M}_{description}.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight')
        print(f"SUCCESS: Generated {output_path}")
        return True

    except Exception as e:
        print(f"ERROR: Failed to generate chart_{M}: {e}")
        # Create placeholder if failed
        create_placeholder(f'chart_{M}_{description}.pdf')
        return False

if __name__ == "__main__":
    success = generate_chart()
    exit(0 if success else 1)
```

#### Graphviz Template
```dot
// charts/week{N}/framework_{M}_{description}.dot
digraph Framework {
    // Consistent styling
    rankdir=TB;
    node [shape=box, style="rounded,filled", fontname="Arial", fontsize=10];
    edge [fontname="Arial", fontsize=9];

    // Color scheme matching beamer theme
    node [fillcolor="#E8E6F5"];  // mllavender4

    // Framework nodes
    // [Framework-specific content]

    // Title
    labelloc="t";
    label="Framework Title";
    fontsize=14;
    fontname="Arial Bold";
}
```

### STEP 4: Slide Generation Rules

#### Overflow Detection Algorithm
```python
def check_overflow(content_lines, max_bullets=6):
    """
    Detects potential overflow and splits content
    """
    if len(content_lines) <= max_bullets:
        return [content_lines]  # No split needed

    # Split into multiple slides
    slides = []
    for i in range(0, len(content_lines), max_bullets):
        slides.append(content_lines[i:i+max_bullets])

    return slides
```

#### LaTeX Generation Template
```latex
% Auto-generated slide with overflow protection
\begin{frame}[t]{Slide Title}
\begin{columns}[T]
\column{0.48\textwidth}
\textbf{Left Header}
\begin{itemize}
% Maximum 6 items (auto-split if more)
\item Point 1
\item Point 2
\item Point 3
\item Point 4
\item Point 5
\item Point 6
\end{itemize}

\column{0.48\textwidth}
\textbf{Right Header}
\begin{itemize}
% Maximum 6 items (auto-split if more)
\item Point A
\item Point B
\item Point C
\item Point D
\item Point E
\end{itemize}
\end{columns}
\bottomnote{Context or key takeaway for this slide}
\end{frame}
```

### STEP 5: Compilation Pipeline

```bash
# Compilation with error handling
for week in {1..8}; do
    echo "Compiling Week $week..."

    # Generate all charts first
    for chart in charts/week$week/*.py; do
        python "$chart" || echo "WARNING: $chart failed"
    done

    for chart in charts/week$week/*.dot; do
        dot -Tpdf "$chart" -o "${chart%.dot}.pdf" || echo "WARNING: $chart failed"
    done

    # Compile LaTeX with retry
    for attempt in {1..3}; do
        if pdflatex "Week${week}_*.tex"; then
            echo "SUCCESS: Week $week compiled"
            break
        else
            echo "RETRY: Attempt $attempt failed for Week $week"
        fi
    done

    # Cleanup
    mv *.aux *.log *.out *.nav *.toc temp/ 2>/dev/null || true
done
```

### STEP 6: Quality Validation

```markdown
## Quality Control Checklist

### Pre-Generation Validation
- [ ] Configuration file valid
- [ ] All dependencies installed (LaTeX, Python, Graphviz)
- [ ] Template file accessible
- [ ] Directory permissions OK
- [ ] Previous backup created

### During Generation Monitoring
- [ ] Chart generation progress: [■■■■■■■□□□] 70/95
- [ ] Python charts successful: 68/75
- [ ] Graphviz diagrams successful: 19/20
- [ ] Slide generation progress: [■■■■■□□□□□] 120/240
- [ ] Overflow warnings: 0
- [ ] Compilation errors: 0

### Post-Generation Verification
- [ ] All 8 week PDFs generated
- [ ] Chart ratio verified (≥33% per week)
- [ ] Total slide count: 240 ± 10
- [ ] Total chart count: 95 ± 5
- [ ] No overflow errors in logs
- [ ] All PDFs open correctly
- [ ] Backup archived with timestamp

### Quality Metrics Report
```
Week | Slides | Charts | Ratio | Status
-----|--------|--------|-------|--------
  1  |   30   |   10   | 33.3% |   ✓
  2  |   32   |   11   | 34.4% |   ✓
  3  |   30   |   10   | 33.3% |   ✓
  4  |   30   |   10   | 33.3% |   ✓
  5  |   30   |   10   | 33.3% |   ✓
  6  |   32   |   11   | 34.4% |   ✓
  7  |   30   |   10   | 33.3% |   ✓
  8  |   32   |   11   | 34.4% |   ✓
-----|--------|--------|-------|--------
Total|  246   |   83   | 33.7% |   ✓
```
```

---

## ERROR HANDLING PROCEDURES

### Common Errors and Solutions

#### 1. Chart Generation Failures
```python
# Error: matplotlib import error
# Solution: Install required packages
pip install matplotlib seaborn numpy pandas

# Error: Chart data generation fails
# Solution: Create placeholder and continue
def create_placeholder(filename):
    # Generate simple placeholder PDF
    fig, ax = plt.subplots()
    ax.text(0.5, 0.5, 'Chart Placeholder\n[Generation Failed]',
            ha='center', va='center', fontsize=20)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    plt.savefig(filename, format='pdf')
```

#### 2. LaTeX Compilation Errors
```bash
# Error: Undefined control sequence
# Solution: Check for missing packages
# Add to preamble:
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{adjustbox}
\usepackage{amsmath}

# Error: Overfull vbox
# Solution: Content overflow - split slide
# Automatic detection in generation script
```

#### 3. Overflow Detection
```python
# Automatic overflow prevention
def generate_slide_content(items, max_per_slide=12):
    if len(items) <= max_per_slide:
        return create_single_slide(items)
    else:
        slides = []
        for i in range(0, len(items), max_per_slide):
            part = items[i:i+max_per_slide]
            slide_num = i//max_per_slide + 1
            total_slides = (len(items)-1)//max_per_slide + 1
            slides.append(create_slide_part(part, slide_num, total_slides))
        return '\n'.join(slides)
```

---

## USAGE INSTRUCTIONS

### Basic Usage
```bash
# 1. Navigate to course directory
cd "D:\Joerg\Research\slides\GreenFinance"

# 2. Edit configuration section in this file
# Modify course_config and week_specifications

# 3. Run validation
python -c "exec(open('COURSE_GENERATOR.md').read().split('```python')[1].split('```')[0])"

# 4. Execute generation
./generate_course.sh  # Or run commands manually

# 5. Monitor progress
tail -f generation.log

# 6. Review output
ls -la Week*.pdf
```

### Advanced Usage

#### Partial Generation (Single Week)
```bash
# Generate only Week 3
python generate_week.py --week 3 --config course_config.yaml
```

#### Custom Configuration
```python
# Override default settings
custom_config = {
    'slides_per_week': 25,
    'chart_ratio': 0.40,
    'theme': 'Berlin'
}
generate_course(config_override=custom_config)
```

#### Parallel Generation
```bash
# Generate multiple weeks in parallel
parallel -j 4 "python generate_week.py --week {}" ::: {1..8}
```

---

## TROUBLESHOOTING GUIDE

### Issue: Charts not embedding in slides
**Symptoms:** PDF shows missing image placeholders
**Diagnosis:** Path issues or PDF version incompatibility
**Solution:**
```latex
% Use relative paths
\includegraphics[width=0.9\textwidth]{charts/week1/chart_1.pdf}

% If PDF version issue, add:
\pdfminorversion=5
```

### Issue: Slides overflow despite limits
**Symptoms:** Content cut off at bottom of slides
**Diagnosis:** Font size or itemize spacing
**Solution:**
```latex
% Reduce itemize spacing
\setlength{\itemsep}{0pt}
\setlength{\parskip}{0pt}

% Or use smaller font for dense slides
{\footnotesize
\begin{itemize}
\item Content here
\end{itemize}
}
```

### Issue: Compilation takes too long
**Symptoms:** Single week takes >10 minutes
**Diagnosis:** Complex charts or inefficient LaTeX
**Solution:**
- Pre-compile charts as PDFs (not regenerate each time)
- Use draft mode for testing: `\documentclass[draft]{beamer}`
- Disable hyperref during development

---

## SUCCESS METRICS

### Completion Criteria
A successful course generation meets these criteria:

1. **Structure**
   - ✓ All 8 weeks generated
   - ✓ 240+ total slides
   - ✓ 95+ charts created
   - ✓ Directory structure intact

2. **Quality**
   - ✓ No compilation errors
   - ✓ No overflow warnings
   - ✓ Chart ratio ≥30% per week
   - ✓ All PDFs readable

3. **Content**
   - ✓ Consistent formatting
   - ✓ Bottom notes on all slides
   - ✓ Section dividers present
   - ✓ Charts properly embedded

4. **Performance**
   - ✓ Generation time <30 minutes
   - ✓ File sizes reasonable (<50MB per week)
   - ✓ Charts vector quality (PDF)

### Performance Benchmarks
```
Task                  | Target Time | Actual Time | Status
----------------------|-------------|-------------|--------
Chart Generation      |  10 min     |             |
Slide Generation      |  10 min     |             |
LaTeX Compilation     |   8 min     |             |
Quality Validation    |   2 min     |             |
----------------------|-------------|-------------|--------
Total                 |  30 min     |             |
```

---

## AUTOMATION SCRIPT

### Master Generation Script
```bash
#!/bin/bash
# generate_course.sh - Complete course generation pipeline

echo "====================================="
echo "COURSE GENERATOR - STARTING"
echo "Time: $(date)"
echo "====================================="

# Configuration
COURSE_NAME="GreenFinance"
WEEKS=8
LOG_FILE="generation_$(date +%Y%m%d_%H%M).log"

# Function: Validate environment
validate_environment() {
    echo "[1/7] Validating environment..."
    command -v pdflatex >/dev/null 2>&1 || { echo "ERROR: LaTeX not found"; exit 1; }
    command -v python >/dev/null 2>&1 || { echo "ERROR: Python not found"; exit 1; }
    command -v dot >/dev/null 2>&1 || { echo "ERROR: Graphviz not found"; exit 1; }
    echo "Environment OK"
}

# Function: Create structure
create_structure() {
    echo "[2/7] Creating directory structure..."
    for i in $(seq 1 $WEEKS); do
        mkdir -p "charts/week$i"
    done
    mkdir -p previous temp output
    echo "Structure created"
}

# Function: Generate charts
generate_charts() {
    echo "[3/7] Generating charts..."
    local success=0
    local failed=0

    for week in $(seq 1 $WEEKS); do
        echo "  Week $week charts..."
        for script in charts/week$week/*.py; do
            if [ -f "$script" ]; then
                if python "$script" >> "$LOG_FILE" 2>&1; then
                    ((success++))
                else
                    ((failed++))
                    echo "    WARNING: $script failed"
                fi
            fi
        done

        for dot_file in charts/week$week/*.dot; do
            if [ -f "$dot_file" ]; then
                if dot -Tpdf "$dot_file" -o "${dot_file%.dot}.pdf" >> "$LOG_FILE" 2>&1; then
                    ((success++))
                else
                    ((failed++))
                    echo "    WARNING: $dot_file failed"
                fi
            fi
        done
    done

    echo "Charts complete: $success successful, $failed failed"
}

# Function: Generate slides
generate_slides() {
    echo "[4/7] Generating slide LaTeX files..."
    # Python script would generate LaTeX here
    python generate_slides.py --weeks $WEEKS --config course_config.yaml
    echo "Slides generated"
}

# Function: Compile PDFs
compile_pdfs() {
    echo "[5/7] Compiling PDFs..."
    for week in $(seq 1 $WEEKS); do
        echo "  Compiling Week $week..."
        for tex_file in Week${week}_*.tex; do
            if [ -f "$tex_file" ]; then
                for attempt in {1..3}; do
                    if pdflatex -interaction=nonstopmode "$tex_file" >> "$LOG_FILE" 2>&1; then
                        echo "    SUCCESS: $tex_file"
                        break
                    elif [ $attempt -eq 3 ]; then
                        echo "    ERROR: Failed to compile $tex_file after 3 attempts"
                    fi
                done
            fi
        done
    done

    # Cleanup auxiliary files
    mv *.aux *.log *.out *.nav *.toc temp/ 2>/dev/null || true
    echo "PDF compilation complete"
}

# Function: Validate quality
validate_quality() {
    echo "[6/7] Running quality validation..."

    # Count slides and charts
    total_slides=0
    total_charts=0

    for week in $(seq 1 $WEEKS); do
        if [ -f "Week${week}_*.pdf" ]; then
            # Would use pdfinfo or similar to count pages
            slides=30  # Placeholder
            charts=$(ls charts/week$week/*.pdf 2>/dev/null | wc -l)
            ratio=$(echo "scale=2; $charts * 100 / $slides" | bc)

            echo "  Week $week: $slides slides, $charts charts ($ratio%)"
            total_slides=$((total_slides + slides))
            total_charts=$((total_charts + charts))
        fi
    done

    echo "Total: $total_slides slides, $total_charts charts"

    # Check ratio
    if [ $total_charts -ge 80 ]; then
        echo "Quality check: PASSED"
    else
        echo "Quality check: WARNING - Low chart ratio"
    fi
}

# Function: Archive results
archive_results() {
    echo "[7/7] Archiving results..."
    timestamp=$(date +%Y%m%d_%H%M)
    archive_dir="archive_${timestamp}"

    mkdir -p "$archive_dir"
    cp Week*.pdf "$archive_dir/"
    cp -r charts "$archive_dir/"
    cp "$LOG_FILE" "$archive_dir/"

    echo "Results archived to $archive_dir"
}

# Main execution
main() {
    validate_environment
    create_structure
    generate_charts
    generate_slides
    compile_pdfs
    validate_quality
    archive_results

    echo "====================================="
    echo "COURSE GENERATION COMPLETE"
    echo "Time: $(date)"
    echo "Log: $LOG_FILE"
    echo "====================================="
}

# Run with error handling
main 2>&1 | tee -a "$LOG_FILE"
exit_code=${PIPESTATUS[0]}
exit $exit_code
```

---

## VERSION HISTORY

### Version 1.0 (Current)
- Initial configuration-driven system
- Quality control integration
- Automated overflow detection
- Comprehensive error handling
- Full documentation

### Planned Improvements (v2.0)
- Web interface for configuration
- Real-time progress dashboard
- Cloud compilation support
- Multi-language support
- AI-assisted content generation

---

## LICENSE AND ATTRIBUTION

This course generation system is provided as-is for educational purposes.
Template based on academic best practices and beamer documentation.

Generated: November 2024
System Version: 1.0
Compatible with: LaTeX 2024, Python 3.8+, Graphviz 2.40+

---

*End of Course Generator Documentation*