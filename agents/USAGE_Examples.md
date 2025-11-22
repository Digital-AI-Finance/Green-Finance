# Multi-Agent Course Generator Usage Examples
## Practical Scenarios and Complete Workflows

### Quick Start
```
1. Ensure prerequisites: template_beamer_final.tex and COURSE_GENERATOR_v2.md exist
2. Invoke orchestrator with course topic
3. Wait 25-35 minutes for complete generation
4. Review quality_report.md
5. Open generated Week1-8 PDFs
```

---

## Example 1: Generate Complete Green Finance Course

### Scenario
Create a full 8-week Green Finance course with all materials.

### User Invocation
```
Task(
  subagent_type: "academic-course-orchestrator",
  description: "Generate Green Finance course",
  prompt: """
  Generate a complete 8-week academic course on Green Finance.

  Course Details:
  - Title: Green Finance Professional Certificate
  - Weeks: 8
  - Hours per week: 13-14
  - Target audience: Finance professionals

  Requirements:
  - Use template_beamer_final.tex for styling
  - Include 1/3 charts (mix Python + Graphviz)
  - Follow COURSE_GENERATOR_v2.md guidelines
  - Generate all slides, charts, and materials

  Coordinate the full generation pipeline and provide a quality report when complete.
  """
)
```

### Expected Output
```
D:/Joerg/Research/slides/GreenFinance/
├── guidelines_validated.yaml
├── content_outline_full.yaml
├── quality_report.md
├── generation.log
├── 20241120_1030_Week1_GreenFinanceFoundations.pdf
├── 20241120_1045_Week2_GreenBondsDebt.pdf
├── ... (Weeks 3-8)
├── charts/
│   ├── week1/
│   │   ├── week1_chart1.pdf
│   │   ├── week1_chart1.py
│   │   └── ... (10 charts)
│   └── week2-8/
└── temp/
    └── (auxiliary files)
```

### Execution Timeline
```
[0:00] Orchestrator starts, validates prerequisites
[0:30] Guidelines Expert agent spawned
[2:00] guidelines_validated.yaml created
[2:10] Content Planner agent spawned
[10:00] content_outline_full.yaml created (8 weeks detailed)
[10:15] Slide Generator agent spawned
[12:00] Chart generation begins (85 charts)
[20:00] Charts complete (83/85 succeeded)
[21:00] LaTeX generation begins
[24:00] PDF compilation begins
[32:00] All 8 PDFs compiled successfully
[33:00] Quality validation running
[34:00] quality_report.md generated
[34:10] Orchestrator completes, returns report
```

### Quality Report Extract
```markdown
# Course Generation Quality Report
Generated: 2024-11-20 11:04:10
Course: Green Finance Professional Certificate

## Summary
- Status: SUCCESS
- Weeks Generated: 8/8
- Total Slides: 248
- Total Charts: 83
- Execution Time: 34 minutes 10 seconds

## Content Quality
Week | Slides | Charts | Ratio | Status
-----|--------|--------|-------|--------
  1  |   30   |   10   | 33.3% |   ✓
  2  |   32   |   10   | 31.3% |   ✓
  3  |   30   |   10   | 33.3% |   ✓
  4  |   31   |   10   | 32.3% |   ✓
  5  |   30   |   11   | 36.7% |   ✓
  6  |   32   |   11   | 34.4% |   ✓
  7  |   31   |   10   | 32.3% |   ✓
  8  |   32   |   11   | 34.4% |   ✓
-----|--------|--------|-------|--------
Total|  248   |   83   | 33.5% |   ✓

## Recommendations
- 2 charts failed generation (placeholders created)
- All PDFs compile successfully
- No overflow warnings
```

---

## Example 2: Generate Custom 6-Week Course

### Scenario
Create a shorter 6-week course on Sustainable Investment Strategies.

### User Invocation
```
Task(
  subagent_type: "academic-course-orchestrator",
  prompt: """
  Generate a 6-week course on Sustainable Investment Strategies.

  Custom Configuration:
    weeks: 6
    slides_per_week: [28, 30, 28, 30, 28, 30]
    charts_per_week: [9, 10, 9, 10, 9, 10]
    chart_ratio: 0.33

  Topics to cover:
  - ESG Integration Fundamentals
  - Portfolio Construction
  - Risk Management
  - Impact Measurement
  - Regulatory Landscape
  - Advanced Strategies

  Use template styling and generate all materials.
  """
)
```

### Expected Output
```
- 6 PDF files (Week1-6)
- ~57 charts total
- Custom content outline
- Adjusted quality metrics
```

---

## Example 3: Validate Guidelines Only

### Scenario
Check if course generator setup is correct before full generation.

### User Invocation
```
Task(
  subagent_type: "course-guidelines-expert",
  prompt: """
  Validate course generator guidelines for Green Finance course.

  Check:
  - template_beamer_final.tex exists and is valid
  - COURSE_GENERATOR_v2.md is complete
  - All color definitions present
  - Dependencies available (LaTeX, Python, Graphviz)
  - Layout rules defined

  Output guidelines_validated.yaml and report any issues.
  """
)
```

### Expected Output
```yaml
# guidelines_validated.yaml

validation:
  template_valid: true
  dependencies_met: true
  guidelines_complete: true
  ready_for_generation: true

# Plus full configuration extracted
```

### Report
```
# Guidelines Validation Report
Generated: 2024-11-20 10:30:00

## Validation Results

### Prerequisites
- Template (template_beamer_final.tex): ✓
- Guidelines (COURSE_GENERATOR_v2.md): ✓

### Technical Specifications
- Color scheme: ✓ (9 colors defined)
- Layout rules: ✓
- Quality metrics: ✓

### Dependencies
- LaTeX (pdflatex): ✓
- Python: ✓
  - matplotlib: ✓
  - seaborn: ✓
  - numpy: ✓
  - pandas: ✓
- Graphviz (dot): ✓

### Ready for Generation
✓ All checks passed - ready to proceed

## Next Steps
✓ Proceed to Content Planning Agent
```

---

## Example 4: Generate Content Outline Only

### Scenario
Create detailed content plan before committing to full generation.

### User Invocation
```
Task(
  subagent_type: "course-content-planner",
  prompt: """
  Create comprehensive content outline for 8-week Green Finance course.

  Input: guidelines_validated.yaml
  Topic: Green Finance
  Weeks: 8

  Generate detailed specifications for:
  - All 8 weeks with learning objectives
  - All 32 sessions (4 per week)
  - All ~248 slides with titles and content
  - All ~85 charts with complete data specifications
  - Realistic simulated data for all visualizations

  Output: content_outline_full.yaml

  Ensure logical progression from foundations to advanced topics.
  """
)
```

### Expected Output
```yaml
# content_outline_full.yaml

course_title: "Green Finance Professional Course"
total_weeks: 8

weeks:
  - week_number: 1
    title: "Week 1: Green Finance Foundations"
    learning_objectives:
      - "Understand the evolution and drivers of green finance"
      - "Analyze the green finance ecosystem"
      - "Identify major instruments"
      - "Apply financial fundamentals"
    sessions:
      - session_number: 1
        slides:
          - slide_number: 1
            type: "title"
            title: "Introduction to Green Finance"
          - slide_number: 2
            type: "two-column"
            title: "What is Green Finance?"
            left_header: "Definition"
            left_bullets: [...]
          - slide_number: 3
            type: "chart"
            chart_spec:
              chart_id: "week1_chart1"
              type: "line"
              data:
                simulated_values: [300, 420, 580, ...]
          # ... all slides specified

totals:
  slides: 246
  charts: 85
  ratio: 0.346
```

---

## Example 5: Generate Slides from Existing Outline

### Scenario
Content outline already exists, just need to generate slides and charts.

### User Invocation
```
Task(
  subagent_type: "academic-slide-generator",
  prompt: """
  Generate all course materials from existing specifications.

  Input Files:
  - guidelines_validated.yaml
  - content_outline_full.yaml
  - template_beamer_final.tex

  For all 8 weeks:
  1. Generate all chart scripts (Python + Graphviz)
  2. Execute chart generation
  3. Generate LaTeX slide files
  4. Compile to PDFs
  5. Validate outputs

  Provide detailed generation log.
  """
)
```

### Expected Output
```
# generation.log

=== Slide Generator Agent Starting ===
Time: 2024-11-20 10:30:00

[Stage 1: Chart Generation]
  Week 1: Generating 10 charts...
    week1_chart1.py: SUCCESS
    week1_chart2.dot: SUCCESS
    ... (10/10 succeeded)
  Week 2: Generating 11 charts...
    ... (11/11 succeeded)
  ...
  Chart generation complete: 83/85 succeeded (2 placeholders)

[Stage 2: LaTeX Generation]
  Generating Week 1...
    20241120_1030_Week1_GreenFinanceFoundations.tex created
  ...
  LaTeX generation complete: 8/8 files created

[Stage 3: PDF Compilation]
  Compiling Week 1...
    Attempt 1: SUCCESS
  ...
  Compilation complete: 8/8 PDFs generated

[Stage 4: Validation]
  Week 1: 30 slides, 10 charts (33.3%) ✓
  ...
  Overall: 248 slides, 83 charts (33.5%) ✓

=== Generation Complete ===
Time: 2024-11-20 11:05:23
Duration: 35 minutes 23 seconds
```

---

## Example 6: Regenerate Single Week

### Scenario
Week 3 had issues, need to regenerate just that week.

### User Invocation
```
Task(
  subagent_type: "academic-slide-generator",
  prompt: """
  Regenerate Week 3 only from content_outline_full.yaml.

  Steps:
  1. Extract Week 3 specifications from outline
  2. Generate all Week 3 charts (10 charts)
  3. Generate Week 3 LaTeX file
  4. Compile to PDF
  5. Validate output

  Report success and any issues encountered.
  """
)
```

### Expected Output
```
Week 3 regenerated successfully:
- 20241120_1145_Week3_ESGIntegration.pdf (30 pages)
- charts/week3/ (10 charts)
- No compilation errors
```

---

## Example 7: Parallel Week Generation (Advanced)

### Scenario
Speed up generation by running multiple weeks in parallel.

### Modified Orchestrator Invocation
```
Task(
  subagent_type: "academic-course-orchestrator",
  prompt: """
  Generate Green Finance course with parallel week processing.

  After content planning complete:
  1. Split weeks into 2 batches: [1-4] and [5-8]
  2. Spawn 2 Slide Generator agents in parallel
  3. Each generates 4 weeks concurrently
  4. Merge results and validate

  Expected speedup: ~40% faster (20-25 min vs 35 min)
  """
)
```

---

## Example 8: Error Recovery Scenario

### Scenario
Generation fails midway, need to resume.

### Initial Attempt
```
Task(subagent_type: "academic-course-orchestrator",
     prompt: "Generate Green Finance course")

# Error after Week 5: LaTeX compilation failed
```

### Recovery
```
Task(
  subagent_type: "academic-slide-generator",
  prompt: """
  Resume course generation from Week 6.

  Context:
  - Weeks 1-5 already generated successfully
  - Week 6-8 still needed
  - All charts for 1-5 exist
  - content_outline_full.yaml has all specifications

  Generate only Weeks 6-8 and validate.
  """
)
```

---

## Example 9: Quality Check Only

### Scenario
Course already generated, just validate quality.

### User Invocation
```
Task(
  subagent_type: "academic-course-orchestrator",
  prompt: """
  Run quality validation only (skip generation).

  Validate existing course materials:
  - All 8 PDFs exist and readable
  - Page counts match targets
  - All charts embedded properly
  - Chart ratios ≥33%
  - File sizes reasonable

  Generate quality_report.md with findings.
  """
)
```

---

## Example 10: Custom Chart Specifications

### Scenario
Generate course with specific chart types/data.

### User Invocation
```
Task(
  subagent_type: "course-content-planner",
  prompt: """
  Create content outline with custom chart focus.

  Special requirements:
  - Week 1: Emphasize time series charts (market trends)
  - Week 2: Focus on categorical comparisons (bond types)
  - Week 3: Include heatmaps (ESG correlations)
  - Week 4: Add risk/return scatter plots
  - Week 5: Project flowcharts (Graphviz)
  - Week 6: Regulatory framework diagrams
  - Week 7: Impact measurement dashboards
  - Week 8: Integration case studies

  Ensure data ranges are realistic and charts tell a story.
  """
)
```

---

## Common Workflows

### Workflow 1: Complete Generation (Most Common)
```
1. Invoke Orchestrator
2. Wait for completion (~30-35 min)
3. Review quality_report.md
4. Open PDFs and verify
5. Done
```

### Workflow 2: Iterative Development
```
1. Validate guidelines first
2. Review guidelines_validated.yaml
3. Generate content outline
4. Review content_outline_full.yaml (make manual edits if needed)
5. Generate slides from outline
6. Review PDFs
7. Regenerate specific weeks if needed
```

### Workflow 3: Batch Processing
```
1. Generate outlines for multiple courses
2. Queue slide generation for all courses
3. Run parallel generation
4. Collect all outputs
```

---

## Troubleshooting Examples

### Problem: Agent Timeout
```
Error: Slide Generator agent exceeded 45-minute timeout

Solution:
Task(subagent_type: "academic-slide-generator",
     prompt: "Generate weeks 1-4 only",
     timeout: 30 minutes)

Then:
Task(subagent_type: "academic-slide-generator",
     prompt: "Generate weeks 5-8 only",
     timeout: 30 minutes)
```

### Problem: Chart Generation Fails
```
Error: 15 charts failed to generate

Solution:
1. Check generation.log for specific errors
2. Verify Python packages installed
3. Check Graphviz available
4. Regenerate failed charts individually:

Task(subagent_type: "academic-slide-generator",
     prompt: "Regenerate only failed charts from generation.log")
```

### Problem: LaTeX Compilation Error
```
Error: Week 4 PDF compilation failed
! Undefined control sequence

Solution:
1. Read temp/Week4_*.log for error line
2. Fix LaTeX syntax in content outline
3. Regenerate Week 4:

Task(subagent_type: "academic-slide-generator",
     prompt: "Regenerate Week 4 only with fixed content")
```

---

## Best Practices

### 1. Always Validate First
```
✓ Run Guidelines Expert before full generation
✓ Review guidelines_validated.yaml
✓ Check all dependencies available
```

### 2. Review Content Outline
```
✓ Generate content outline separately
✓ Review learning objectives and flow
✓ Make manual edits if needed
✓ Then generate slides
```

### 3. Monitor Progress
```
✓ Watch for agent status updates
✓ Check generation.log during execution
✓ Intervene if errors detected early
```

### 4. Backup Existing Work
```
✓ Move previous PDFs to previous/ before regenerating
✓ Keep content outlines versioned
✓ Save quality reports with timestamps
```

### 5. Incremental Generation
```
✓ Generate 2-3 weeks first, validate
✓ If quality good, proceed with remaining weeks
✓ Faster iteration cycles
```

---

*Usage Examples v1.0*
