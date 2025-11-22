# Slide Generator Agent v2.0 - LaTeX Template Extensions
## New Slide Layouts for Learning-Goal-Driven Content

This document extends AGENT_4_SlideGenerator.md with new LaTeX templates for v2.0 features.

---

## New Slide Type: Learning Goal Title

### Purpose
Introduce each learning goal with prominent, centered title slide.

### YAML Specification
```yaml
slide_number: 1
type: "learning_goal_title"
goal_number: 1
goal_statement: "Understand the theoretical framework for green bond pricing"
goal_type: "theoretical"
narrative_role: "Foundation - establishes core concepts"
```

### LaTeX Template
```latex
% Learning Goal Title Slide
\begin{frame}[plain]
\vfill
\centering
\begin{beamercolorbox}[sep=12pt,center]{title}
{\Huge \textbf{Learning Goal {{goal_number}}}}\\[1.5em]
{\Large {{goal_statement}}}\\[1em]
{\normalsize \textcolor{mllavender}{{goal_type} | {{narrative_role}}}}
\end{beamercolorbox}
\vfill
\end{frame}
```

### Python Generation Code
```python
def generate_learning_goal_title_slide(slide, specs):
    """Generate learning goal title slide"""

    latex = f'''% Learning Goal {slide["goal_number"]} Title
\\begin{{frame}}[plain]
\\vfill
\\centering
\\begin{{beamercolorbox}}[sep=12pt,center]{{title}}
{{\\Huge \\textbf{{Learning Goal {slide["goal_number"]}}}}}\\\\[1.5em]
{{\\Large {escape_latex(slide["goal_statement"])}}}\\\\[1em]
{{\\normalsize \\textcolor{{mllavender}}{{{slide["goal_type"]} | {escape_latex(slide["narrative_role"])}}}}}
\\end{{beamercolorbox}}
\\vfill
\\end{{frame}}

'''
    return latex
```

---

## New Slide Type: Mathematical Derivation

### Purpose
Present step-by-step mathematical derivations with clear structure.

### YAML Specification
```yaml
slide_number: 4
type: "mathematical_derivation"
title: "Green Bond Pricing Formula Derivation"
goal_reference: 2
left_header: "Starting Point"
left_content:
  equation: "$P_0 = \\sum_{t=1}^{T} \\frac{C}{(1+r)^t} + \\frac{F}{(1+r)^T}$"
  assumptions:
    - "Constant discount rate $r$"
    - "Fixed coupon $C$"
    - "Face value $F$"
    - "No environmental adjustment yet"
right_header: "Derivation Steps"
right_steps:
  - step: 1
    equation: "$P_0 = C \\sum_{t=1}^{T} (1+r)^{-t} + F(1+r)^{-T}$"
    explanation: "Factor out coupon payments"
  - step: 2
    equation: "$= C \\cdot \\frac{1 - (1+r)^{-T}}{r} + F(1+r)^{-T}$"
    explanation: "Apply geometric series formula"
  - step: 3
    equation: "$= PV(\\text{Coupons}) + PV(\\text{Principal})$"
    explanation: "Present value decomposition"
bottom_note: "[Goal 2] Classical pricing forms basis for green bond valuation"
```

### LaTeX Template
```latex
\begin{frame}[t]{{{title}}}
\begin{columns}[T]
\column{0.48\textwidth}
\textbf{{{left_header}}}

{{equation}}

\textbf{Assumptions:}
\begin{itemize}
{{#assumptions}}
\item {{.}}
{{/assumptions}}
\end{itemize}

\column{0.48\textwidth}
\textbf{{{right_header}}}

\begin{enumerate}
{{#right_steps}}
\item {{explanation}}
\begin{equation*}
{{equation}}
\end{equation*}
{{/right_steps}}
\end{enumerate}
\end{columns}

\bottomnote{{{bottom_note}}}
\end{frame}
```

### Python Generation Code
```python
def generate_mathematical_derivation_slide(slide, specs):
    """Generate mathematical derivation slide with steps"""

    latex = f'''\\begin{{frame}}[t]{{{escape_latex(slide["title"])}}}
\\begin{{columns}}[T]
\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["left_header"])}}}

\\vspace{{0.5em}}
{slide["left_content"]["equation"]}

\\vspace{{0.5em}}
\\textbf{{Assumptions:}}
\\begin{{itemize}}
'''

    for assumption in slide["left_content"]["assumptions"]:
        latex += f'\\item {escape_latex(assumption)}\n'

    latex += '''\\end{itemize}

\\column{0.48\\textwidth}
\\textbf{''' + escape_latex(slide["right_header"]) + '''}

\\begin{enumerate}
'''

    for step_obj in slide["right_steps"]:
        latex += f'''\\item {escape_latex(step_obj["explanation"])}
\\begin{{equation*}}
{step_obj["equation"]}
\\end{{equation*}}
'''

    latex += f'''\\end{{enumerate}}
\\end{{columns}}

\\bottomnote{{{escape_latex(slide["bottom_note"])}}}
\\end{{frame}}

'''
    return latex
```

---

## New Slide Type: Framework Overview

### Purpose
Present theoretical frameworks with structured component breakdown.

### YAML Specification
```yaml
slide_number: 2
type: "framework_overview"
title: "Green Finance Market Structure Theory"
goal_reference: 1
framework_name: "Market Microstructure Framework"
left_header: "Core Theoretical Principles"
left_bullets:
  - "Information asymmetry in environmental claims"
  - "Verification as signaling mechanism"
  - "Market segmentation by investor type"
  - "Liquidity premium for green assets"
right_header: "Framework Components"
right_bullets:
  - "Supply side: Issuers with green projects"
  - "Demand side: ESG-conscious investors"
  - "Intermediaries: Verifiers and underwriters"
  - "Regulators: Standard-setters"
bottom_note: "[Goal 1] Framework explains market dynamics and pricing"
```

### LaTeX Template
```latex
\begin{frame}[t]{{{title}}}
\begin{center}
{\large \textbf{{{framework_name}}}}
\end{center}

\begin{columns}[T]
\column{0.48\textwidth}
\textbf{{{left_header}}}
\begin{itemize}
{{#left_bullets}}
\item {{.}}
{{/left_bullets}}
\end{itemize}

\column{0.48\textwidth}
\textbf{{{right_header}}}
\begin{itemize}
{{#right_bullets}}
\item {{.}}
{{/right_bullets}}
\end{itemize}
\end{columns}

\bottomnote{{{bottom_note}}}
\end{frame}
```

### Python Generation Code
```python
def generate_framework_overview_slide(slide, specs):
    """Generate theoretical framework overview slide"""

    latex = f'''\\begin{{frame}}[t]{{{escape_latex(slide["title"])}}}
\\begin{{center}}
{{\\large \\textbf{{{escape_latex(slide["framework_name"])}}}}}
\\end{{center}}

\\vspace{{0.5em}}

\\begin{{columns}}[T]
\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["left_header"])}}}
\\begin{{itemize}}
'''

    for bullet in slide["left_bullets"]:
        latex += f'\\item {escape_latex(bullet)}\n'

    latex += f'''\\end{{itemize}}

\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["right_header"])}}}
\\begin{{itemize}}
'''

    for bullet in slide["right_bullets"]:
        latex += f'\\item {escape_latex(bullet)}\n'

    latex += f'''\\end{{itemize}}
\\end{{columns}}

\\bottomnote{{{escape_latex(slide["bottom_note"])}}}
\\end{{frame}}

'''
    return latex
```

---

## New Slide Type: Goal Summary

### Purpose
Conclude each learning goal session with achievement check and summary.

### YAML Specification
```yaml
slide_number: 10
type: "goal_summary"
title: "Learning Goal 1: Summary"
goal_number: 1
goal_statement: "Understand the theoretical framework for green bond pricing"
summary_header: "What We Achieved"
summary_points:
  - "Established theoretical basis for green finance markets"
  - "Analyzed market microstructure and participant roles"
  - "Understood information asymmetry and verification"
  - "Connected theory to observed market phenomena"
check_header: "Can You Now..."
check_items:
  - "Explain why green bonds trade at a greenium?"
  - "Describe the role of verification in the market?"
  - "Analyze new instruments using this framework?"
bottom_note: "[Goal 1] Achieved - Ready for quantitative analysis in Goal 2"
```

### LaTeX Template
```latex
\begin{frame}[t]{{{title}}}
\begin{center}
{\Large \textbf{Learning Goal {{goal_number}}: Summary}}\\[0.5em]
{\normalsize \textit{{{goal_statement}}}}
\end{center}

\vspace{0.5em}

\begin{columns}[T]
\column{0.48\textwidth}
\textbf{{{summary_header}}}
\begin{itemize}
{{#summary_points}}
\item \textcolor{mlgreen}{\checkmark} {{.}}
{{/summary_points}}
\end{itemize}

\column{0.48\textwidth}
\textbf{{{check_header}}}
\begin{itemize}
{{#check_items}}
\item {{.}}
{{/check_items}}
\end{itemize}
\end{columns}

\bottomnote{{{bottom_note}}}
\end{frame}
```

### Python Generation Code
```python
def generate_goal_summary_slide(slide, specs):
    """Generate learning goal summary/achievement check slide"""

    latex = f'''\\begin{{frame}}[t]{{{escape_latex(slide["title"])}}}
\\begin{{center}}
{{\\Large \\textbf{{Learning Goal {slide["goal_number"]}: Summary}}}}\\\\[0.5em]
{{\\normalsize \\textit{{{escape_latex(slide["goal_statement"])}}}}}
\\end{{center}}

\\vspace{{0.5em}}

\\begin{{columns}}[T]
\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["summary_header"])}}}
\\begin{{itemize}}
'''

    for point in slide["summary_points"]:
        # Use checkmark symbol (requires \usepackage{amssymb})
        latex += f'\\item \\textcolor{{mlgreen}}{{$\\checkmark$}} {escape_latex(point)}\n'

    latex += f'''\\end{{itemize}}

\\column{{0.48\\textwidth}}
\\textbf{{{escape_latex(slide["check_header"])}}}
\\begin{{itemize}}
'''

    for item in slide["check_items"]:
        latex += f'\\item {escape_latex(item)}\n'

    latex += f'''\\end{{itemize}}
\\end{{columns}}

\\bottomnote{{{escape_latex(slide["bottom_note"])}}}
\\end{{frame}}

'''
    return latex
```

---

## Updated Master Slide Generation Function

### Enhanced generate_slide_latex()
```python
def generate_slide_latex(slide, week_num, specs):
    """
    Generate LaTeX code for one slide (updated for v2.0 slide types)
    """

    # New slide types first
    if slide["type"] == "learning_goal_title":
        return generate_learning_goal_title_slide(slide, specs)

    elif slide["type"] == "goal_summary":
        return generate_goal_summary_slide(slide, specs)

    elif slide["type"] == "mathematical_derivation":
        return generate_mathematical_derivation_slide(slide, specs)

    elif slide["type"] == "framework_overview":
        return generate_framework_overview_slide(slide, specs)

    # Existing slide types
    elif slide["type"] == "two-column":
        return generate_two_column_slide(slide, specs)

    elif slide["type"] == "chart":
        return generate_chart_slide(slide, week_num, specs)

    elif slide["type"] == "definition":
        return generate_definition_slide(slide, specs)

    elif slide["type"] == "comparison":
        return generate_comparison_slide(slide, specs)

    elif slide["type"] == "process":
        return generate_process_slide(slide, specs)

    elif slide["type"] == "title":
        return generate_title_slide(slide, specs)

    else:
        return generate_generic_slide(slide, specs)
```

---

## Enhanced Bottom Note with Goal Reference

### Updated bottomnote Command
```latex
% In preamble (enhanced version)
\newcommand{\bottomnote}[1]{%
\vfill
\vspace{-2mm}
\textcolor{mllavender2}{\rule{\textwidth}{0.4pt}}
\vspace{1mm}
\footnotesize
\textbf{#1}
}

% Usage with goal reference
\bottomnote{[Goal 2] Mathematical derivation establishes pricing framework}
```

### Python Helper
```python
def format_bottom_note_with_goal(text, goal_number):
    """
    Ensure bottom note includes goal reference
    """
    if goal_number and not text.startswith("[Goal"):
        return f"[Goal {goal_number}] {text}"
    return text
```

---

## Additional LaTeX Packages Required

Add to preamble for new features:

```latex
\usepackage{amssymb}  % For checkmark symbol (\checkmark)
\usepackage{mathtools}  % Enhanced math features
```

---

## Slide Type Mapping Summary

| Slide Type | Purpose | When to Use | Key Features |
|------------|---------|-------------|--------------|
| `learning_goal_title` | Introduce goal | Start of each session | Plain, centered, large text |
| `goal_summary` | Summarize achievement | End of each session | Checkmarks, self-assessment questions |
| `mathematical_derivation` | Show math steps | Mathematical goals | Two-column, equations, steps |
| `framework_overview` | Present theory | Theoretical goals | Framework name, components |
| `two-column` (existing) | General content | All goals | Flexible, most common |
| `chart` (existing) | Visualizations | All goals | Full-width or in-column |
| `definition` (existing) | Define concepts | Foundation goals | Definition + examples |
| `comparison` (existing) | Compare options | Applied goals | Side-by-side analysis |

---

## Example: Complete Session in LaTeX

```latex
% Session 1: Learning Goal 1

% Slide 1: Learning Goal Title
\begin{frame}[plain]
\vfill
\centering
\begin{beamercolorbox}[sep=12pt,center]{title}
{\Huge \textbf{Learning Goal 1}}\\[1.5em]
{\Large Understand the market microstructure theory of green finance}\\[1em]
{\normalsize \textcolor{mllavender}{theoretical | Foundation - establishes core concepts}}
\end{beamercolorbox}
\vfill
\end{frame}

% Slides 2-9: Content slides for Goal 1
% (Framework overview, components, analysis, etc.)

% Slide 10: Goal Summary
\begin{frame}[t]{Learning Goal 1: Summary}
\begin{center}
{\Large \textbf{Learning Goal 1: Summary}}\\[0.5em]
{\normalsize \textit{Understand the market microstructure theory of green finance}}
\end{center}

\vspace{0.5em}

\begin{columns}[T]
\column{0.48\textwidth}
\textbf{What We Achieved}
\begin{itemize}
\item \textcolor{mlgreen}{$\checkmark$} Established theoretical framework
\item \textcolor{mlgreen}{$\checkmark$} Analyzed market participants
\item \textcolor{mlgreen}{$\checkmark$} Understood verification mechanisms
\end{itemize}

\column{0.48\textwidth}
\textbf{Can You Now...}
\begin{itemize}
\item Explain why greenium exists?
\item Describe role of verification?
\item Analyze new green instruments?
\end{itemize}
\end{columns}

\bottomnote{[Goal 1] Achieved - Ready for quantitative analysis in Goal 2}
\end{frame}
```

---

*Slide Generator v2.0 LaTeX Templates - Complete*
