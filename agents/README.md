# Multi-Agent Academic Course Generation System
## Complete Documentation for 4-Agent Architecture

Version: 1.0
Date: November 2024
Author: Course Generation System Design

---

## Executive Summary

This system implements a **4-agent architecture** for fully automated academic course generation:

- **1 Master Orchestrator** coordinates three specialized agents
- **3 Specialized Agents** handle guidelines, content planning, and slide generation
- **Fully Autonomous** execution with no human checkpoints required
- **Complete Output**: 8-week course with 240+ slides and 85+ charts in ~30 minutes

### Key Features
- Template-aligned styling (Madrid theme with mlpurple/mllavender colors)
- Mixed Python (matplotlib) and Graphviz chart generation
- LaTeX/Beamer slide authoring with overflow prevention
- PDF compilation with error handling
- Comprehensive quality validation

---

## Quick Start

### Prerequisites
```bash
1. LaTeX distribution (pdflatex command available)
2. Python 3.8+ with matplotlib, seaborn, numpy, pandas
3. Graphviz (dot command available)
4. template_beamer_final.tex in working directory
5. COURSE_GENERATOR_v2.md in working directory
```

### Basic Usage
```
# Invoke the orchestrator
Task(
  subagent_type: "academic-course-orchestrator",
  description: "Generate Green Finance course",
  prompt: "Generate complete 8-week course on Green Finance with all materials"
)

# Wait ~30 minutes

# Review output
- Week1-8 PDFs (8 files)
- charts/week1-8/ (85+ charts)
- quality_report.md
```

---

## System Architecture

### Agent Hierarchy

```
User Request
     ↓
┌────────────────────────────────────┐
│   Course Orchestrator Agent        │  Master coordinator
│   - Spawns specialized agents      │
│   - Manages file handoffs          │
│   - Validates outputs              │
│   - Generates quality reports      │
└─────┬──────────┬──────────┬────────┘
      │          │          │
      ↓          ↓          ↓
┌─────────┐ ┌──────────┐ ┌───────────┐
│Guidelines│ │ Content  │ │   Slide   │
│ Expert  │ │ Planner  │ │Generator  │
│         │ │          │ │           │
│Validates│ │Designs   │ │Generates  │
│specs    │ │outline   │ │materials  │
└────┬────┘ └────┬─────┘ └─────┬─────┘
     │           │              │
     ↓           ↓              ↓
guidelines  content_      Week1-8.pdf
_validated  outline_      + charts/
.yaml       full.yaml
```

### Communication Protocol

**File-Based Handoffs:**
1. Guidelines Expert → `guidelines_validated.yaml`
2. Content Planner → `content_outline_full.yaml`
3. Slide Generator → PDFs + charts + logs
4. Orchestrator → `quality_report.md`

---

## Agent Specifications

### 1. Course Orchestrator Agent
**Type:** `academic-course-orchestrator`
**Purpose:** Master coordinator
**Inputs:** User request with course topic
**Outputs:** Complete course + quality report
**Execution Time:** 30-40 minutes (full course)

**Responsibilities:**
- Validate prerequisites
- Spawn specialized agents sequentially
- Validate inter-agent communication files
- Handle errors and retries
- Generate comprehensive quality report

**File:** `AGENT_1_CourseOrchestrator.md`

---

### 2. Guidelines Expert Agent
**Type:** `course-guidelines-expert`
**Purpose:** Validate and extract specifications
**Inputs:** COURSE_GENERATOR_v2.md + template_beamer_final.tex
**Outputs:** guidelines_validated.yaml
**Execution Time:** 1-3 minutes

**Responsibilities:**
- Read and parse course generator guidelines
- Validate template exists and is correct
- Extract all technical specifications (colors, layouts, metrics)
- Check dependencies (LaTeX, Python, Graphviz)
- Output structured YAML configuration

**File:** `AGENT_2_GuidelinesExpert.md`

---

### 3. Content Planner Agent
**Type:** `course-content-planner`
**Purpose:** Design comprehensive course content
**Inputs:** guidelines_validated.yaml + course topic
**Outputs:** content_outline_full.yaml
**Execution Time:** 8-12 minutes

**Responsibilities:**
- Design course structure (8 weeks, 32 sessions)
- Create learning objectives per week
- Specify all ~246 slides with titles and content
- Design all ~85 charts with complete data specifications
- Generate realistic simulated data ranges
- Ensure logical progression and pedagogical depth

**File:** `AGENT_3_ContentPlanner.md`

---

### 4. Slide Generator Agent
**Type:** `academic-slide-generator`
**Purpose:** Generate all course materials
**Inputs:** Both YAMLs + template
**Outputs:** 8 PDFs + 85 chart files + logs
**Execution Time:** 17-25 minutes

**Responsibilities:**
- Generate Python chart scripts (matplotlib/seaborn)
- Generate Graphviz diagram scripts
- Execute all chart generation
- Generate LaTeX slide files
- Compile PDFs (with retries)
- Validate outputs (page counts, chart ratios)
- Clean auxiliary files

**File:** `AGENT_4_SlideGenerator.md`

---

## File Structure

```
D:/Joerg/Research/slides/GreenFinance/
│
├── agents/                                    # Agent specifications
│   ├── README.md                              # This file
│   ├── AGENT_1_CourseOrchestrator.md          # Master coordinator spec
│   ├── AGENT_2_GuidelinesExpert.md            # Guidelines validator spec
│   ├── AGENT_3_ContentPlanner.md              # Content designer spec
│   ├── AGENT_4_SlideGenerator.md              # Materials generator spec
│   ├── SCHEMAS_Communication.yaml             # Data exchange formats
│   ├── INTEGRATION_Guide.md                   # Implementation instructions
│   └── USAGE_Examples.md                      # Practical scenarios
│
├── COURSE_GENERATOR_v2.md                     # Course generation guidelines
├── template_beamer_final.tex                  # Styling template
│
├── guidelines_validated.yaml                  # Generated by Agent 2
├── content_outline_full.yaml                  # Generated by Agent 3
├── quality_report.md                          # Generated by Orchestrator
├── generation.log                             # Generated by Agent 4
│
├── 20241120_1030_Week1_GreenFinanceFoundations.pdf
├── 20241120_1045_Week2_GreenBondsDebt.pdf
├── ... (Week 3-8 PDFs)
│
├── charts/
│   ├── week1/
│   │   ├── week1_chart1.py                    # Python chart script
│   │   ├── week1_chart1.pdf                   # Generated chart
│   │   ├── week1_chart2.dot                   # Graphviz script
│   │   ├── week1_chart2.pdf                   # Generated diagram
│   │   └── ... (10 charts total)
│   ├── week2-8/
│   └── ...
│
├── temp/                                      # Auxiliary LaTeX files
│   ├── *.aux
│   ├── *.log
│   └── ...
│
└── previous/                                  # Backups of previous versions
```

---

## Communication Schemas

### guidelines_validated.yaml
```yaml
course: {title, weeks, hours_per_week, total_hours}
technical: {template, theme, font_size, aspect_ratio, pdf_version}
colors: {mlpurple, mllavender, mllavender2, ..., mlgreen, mlorange}
python_colors: {primary, secondary, light, ..., success, warning}
layout: {default, column_width, max_bullets_per_column, ...}
quality: {chart_ratio_min, slides_per_week[], charts_per_week[], ...}
chart_generation: {python: {...}, graphviz: {...}}
validation: {template_valid, dependencies_met, ready_for_generation}
```

### content_outline_full.yaml
```yaml
course_title: string
total_weeks: integer
weeks:
  - week_number: integer
    title: string
    learning_objectives: [string]
    sessions:
      - session_number: integer
        slides:
          - slide_number: integer
            type: "two-column" | "chart" | "definition" | ...
            # Type-specific fields
            chart_spec: (if type == "chart")
              chart_id: string
              type: "line" | "bar" | "pie" | ...
              tool: "python" | "graphviz"
              data: {...}
              styling: {...}
totals: {slides, charts, ratio}
```

See `SCHEMAS_Communication.yaml` for complete specifications.

---

## Integration Methods

### Method 1: Custom Subagent Types (Recommended)
Integrate as Claude Code subagent types for seamless Task tool invocation.

```javascript
// Register in Claude Code agent system
Task({
  subagent_type: "academic-course-orchestrator",
  prompt: "Generate course..."
});
```

### Method 2: Skills
Implement as Claude Code skills for user-invokable commands.

```bash
/skill course-orchestrator "Generate Green Finance course"
```

### Method 3: Slash Commands
Create lightweight slash commands that load agent prompts.

```bash
/generate-course Green Finance
```

See `INTEGRATION_Guide.md` for complete implementation instructions.

---

## Usage Examples

### Example 1: Basic Course Generation
```
Task(subagent_type: "academic-course-orchestrator",
     prompt: "Generate 8-week Green Finance course")

Output:
- 8 PDFs (248 pages total)
- 83 charts
- quality_report.md (SUCCESS status)
- 34 minutes execution time
```

### Example 2: Custom Configuration
```
Task(subagent_type: "academic-course-orchestrator",
     prompt: "Generate 6-week Sustainable Investment course
              with custom config: weeks=6, slides_per_week=[28,30,28,30,28,30]")

Output:
- 6 PDFs
- 57 charts
- Adjusted metrics
```

### Example 3: Incremental Workflow
```
# Step 1: Validate guidelines
Task(subagent_type: "course-guidelines-expert",
     prompt: "Validate guidelines")

# Step 2: Review guidelines_validated.yaml

# Step 3: Generate content outline
Task(subagent_type: "course-content-planner",
     prompt: "Generate content for Green Finance")

# Step 4: Review content_outline_full.yaml, edit if needed

# Step 5: Generate slides
Task(subagent_type: "academic-slide-generator",
     prompt: "Generate all materials from outline")
```

See `USAGE_Examples.md` for 10+ detailed scenarios.

---

## Quality Metrics

### Target Metrics
- **Slides per week:** 30-32 (total: 240-256)
- **Charts per week:** 10-11 (total: 83-88)
- **Chart ratio:** ≥33% (1/3 of slides)
- **Compilation success:** 100%
- **Chart generation success:** ≥90%
- **Execution time:** <35 minutes
- **File sizes:** 5-20MB per week PDF

### Validation Checks
- ✓ All 8 week PDFs generated
- ✓ Correct page counts (±10%)
- ✓ Charts properly embedded (no missing images)
- ✓ Template colors consistent
- ✓ No overflow warnings
- ✓ No compilation errors

---

## Error Handling

### Error Types

1. **Prerequisites Missing** → STOP, report to user
2. **Guidelines Invalid** → Retry with fixes, use defaults if possible
3. **Content Generation Incomplete** → Complete missing pieces or retry
4. **Chart Generation Fails** → Create placeholders, log errors, continue
5. **LaTeX Compilation Fails** → Parse error, retry with fixes (up to 3x)
6. **Quality Check Warnings** → Report but continue (non-fatal)

### Recovery Strategies

- **Automatic**: Retry once with error fixes
- **Placeholder**: Create fallback content if generation fails
- **Incremental**: Resume from last successful point
- **Logging**: Detailed logs for debugging

---

## Performance

### Typical Execution (8-Week Course)

```
Stage                          | Duration  | Output
-------------------------------|-----------|---------------------------
Prerequisites Check            |  < 1 min  | Validation status
Guidelines Expert              |  1-3 min  | guidelines_validated.yaml
Content Planner                |  8-12 min | content_outline_full.yaml
Chart Generation (85 charts)   |  6-10 min | 85 PDFs in charts/
LaTeX Generation (8 files)     |  3-5 min  | 8 .tex files
PDF Compilation (8 PDFs)       |  8-12 min | 8 PDFs
Quality Validation             |  1-2 min  | quality_report.md
-------------------------------|-----------|---------------------------
Total                          | 27-45 min | Complete course
Average                        |  ~35 min  |
```

### Resource Usage
- **CPU:** High during PDF compilation
- **Memory:** 500MB-1GB
- **Disk:** ~300MB total output
- **Network:** None (all local)

---

## Customization

### Adjustable Parameters

**Course Structure:**
- Number of weeks (default: 8)
- Hours per week (default: 13-14)
- Slides per week (default: 30-32)
- Sessions per week (default: 4)

**Chart Specifications:**
- Chart ratio (default: 0.33 = 33%)
- Chart types (line, bar, pie, scatter, heatmap, flowchart)
- Tool preference (Python vs Graphviz)
- Color scheme (use template colors or custom)

**Layout Rules:**
- Column widths (default: 0.48)
- Max bullets per column (default: 6)
- Overflow handling (auto-split or manual)

**Quality Thresholds:**
- Minimum chart ratio
- Acceptable failure rate
- Page count tolerance

See individual agent specifications for full customization options.

---

## Troubleshooting

### Common Issues

**Issue:** Agent not found
**Solution:** Verify agent specifications exist in `agents/` directory

**Issue:** YAML parsing error
**Solution:** Validate YAML syntax, check for proper indentation

**Issue:** Charts don't match template colors
**Solution:** Verify COLORS dictionary uses template colors (mlpurple, mllavender)

**Issue:** LaTeX compilation fails
**Solution:** Check temp/*.log files for specific errors, verify template exists

**Issue:** Execution timeout
**Solution:** Generate weeks in batches or increase timeout limit

See `USAGE_Examples.md` for detailed troubleshooting scenarios.

---

## Development Roadmap

### Version 1.0 (Current)
- ✓ 4-agent architecture operational
- ✓ Full course generation (8 weeks)
- ✓ Template integration
- ✓ Quality control
- ✓ Error handling

### Version 1.1 (Planned)
- Progress monitoring dashboard
- Parallel week generation
- Incremental compilation
- Enhanced error recovery

### Version 2.0 (Future)
- Web interface for non-technical users
- Cloud deployment support
- Multi-language support
- AI-assisted content generation
- Collaborative editing

---

## Contributing

To extend or modify the system:

1. **Add New Chart Types:**
   - Update Content Planner's chart type selection
   - Add chart generation code in Slide Generator
   - Update schemas with new type specification

2. **Add New Slide Layouts:**
   - Define layout in template_beamer_final.tex
   - Add layout type to Content Planner
   - Implement LaTeX generation in Slide Generator

3. **Customize Quality Metrics:**
   - Modify guidelines_validated.yaml schema
   - Update Orchestrator validation logic
   - Adjust quality_report.md template

4. **Optimize Performance:**
   - Implement parallel processing
   - Add caching mechanisms
   - Optimize chart generation scripts

---

## Technical Requirements

### Software Dependencies
```
LaTeX:
  - pdflatex (from MiKTeX or TeX Live)
  - Beamer package
  - Standard LaTeX packages (graphicx, booktabs, etc.)

Python 3.8+:
  - matplotlib >= 3.5
  - seaborn >= 0.11
  - numpy >= 1.21
  - pandas >= 1.3
  - PyYAML >= 5.4

Graphviz:
  - dot command (version 2.40+)

Operating System:
  - Windows 10/11, macOS 10.15+, or Linux
  - 8GB+ RAM recommended
  - 2GB+ free disk space
```

### File Requirements
```
Required in working directory:
  - template_beamer_final.tex (Madrid theme template)
  - COURSE_GENERATOR_v2.md (generation guidelines)

Optional:
  - Previous course materials for reference
  - Custom color schemes
  - Additional LaTeX packages
```

---

## License and Attribution

This multi-agent course generation system is provided for educational purposes.

- System Design: 2024
- Version: 1.0
- Compatible with: Claude Code, Claude API
- Documentation: Complete specification in 7 files

### Credits
- Template: Based on template_beamer_final.tex (Madrid theme)
- Color Scheme: mlpurple/mllavender professional theme
- Chart Library: matplotlib/seaborn (BSD License)
- Diagram Tool: Graphviz (EPL License)

---

## Contact and Support

For questions, issues, or contributions:
- Review documentation in `agents/` directory
- Check `USAGE_Examples.md` for practical scenarios
- See `INTEGRATION_Guide.md` for implementation help
- Consult individual agent specifications for technical details

---

## Summary

This multi-agent system provides a **complete, automated solution** for academic course generation:

**Key Benefits:**
- **Fully Automated**: No manual intervention required
- **High Quality**: Template-aligned, professional output
- **Fast**: 30-35 minutes for complete 8-week course
- **Flexible**: Customizable for different courses and styles
- **Reliable**: Error handling and quality validation built-in
- **Documented**: Comprehensive specifications and examples

**Deliverables:**
- 8 week PDFs (240+ slides)
- 85+ chart visualizations
- All source files (.tex, .py, .dot)
- Quality report
- Generation logs

**Next Steps:**
1. Review `INTEGRATION_Guide.md` for implementation
2. Check `USAGE_Examples.md` for practical scenarios
3. Examine individual agent specifications
4. Start with basic course generation example
5. Customize for your specific needs

---

*Multi-Agent Course Generation System v1.0 - Complete Documentation*
