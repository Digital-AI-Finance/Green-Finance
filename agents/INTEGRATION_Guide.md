# Multi-Agent Course Generator Integration Guide
## Implementing the 4-Agent Architecture in Claude Code

### Overview
This guide explains how to integrate the 4-agent course generation system into Claude Code, with both **subagent** and **skill** implementations.

---

## Architecture Summary

```
User Request
     ↓
[Course Orchestrator] ← Master coordinator
     ├─→ [Guidelines Expert] → guidelines_validated.yaml
     ├─→ [Content Planner] → content_outline_full.yaml
     └─→ [Slide Generator] → Week1-8.pdf + charts/
```

**Flow**: Sequential coordination with file-based communication
**Automation**: Fully autonomous (no human checkpoints)
**Scope**: Complete course (8 weeks, 240+ slides, 85+ charts)

---

## Implementation Method 1: Custom Subagent Types

### Step 1: Define Subagent Types

These would be added to Claude Code's agent registry. While we cannot directly modify Claude Code's internal registry, this shows the conceptual structure:

```javascript
// Conceptual structure for Claude Code agent registry
const courseGenerationAgents = {
  "academic-course-orchestrator": {
    description: "Master coordinator for academic course generation. Spawns Guidelines, Content Planner, and Slide Generator agents. Manages full pipeline with quality control.",
    system_prompt: readFile("agents/AGENT_1_CourseOrchestrator.md"),
    tools: ["All"],  // Access to all tools including Task
    can_spawn: ["course-guidelines-expert", "course-content-planner", "academic-slide-generator"],
    autonomous: true,
    timeout: "60 minutes",
    max_context: "200k tokens"
  },

  "course-guidelines-expert": {
    description: "Validates COURSE_GENERATOR_v2.md and extracts technical specifications. Outputs guidelines_validated.yaml for downstream agents.",
    system_prompt: readFile("agents/AGENT_2_GuidelinesExpert.md"),
    tools: ["Read", "Write", "Bash", "Glob"],
    autonomous: true,
    timeout: "10 minutes",
    max_context: "50k tokens"
  },

  "course-content-planner": {
    description: "Generates comprehensive content outlines for all weeks with detailed slide and chart specifications. Creates content_outline_full.yaml.",
    system_prompt: readFile("agents/AGENT_3_ContentPlanner.md"),
    tools: ["Read", "Write"],
    autonomous: true,
    timeout: "30 minutes",
    max_context: "150k tokens"
  },

  "academic-slide-generator": {
    description: "Generates all course materials: Python chart scripts, Graphviz diagrams, LaTeX slides, compiles PDFs. Final production agent.",
    system_prompt: readFile("agents/AGENT_4_SlideGenerator.md"),
    tools: ["Read", "Write", "Bash", "Glob"],
    autonomous: true,
    timeout: "45 minutes",
    max_context: "100k tokens"
  }
};
```

### Step 2: Usage with Task Tool

Once registered, agents are invoked using the Task tool:

```javascript
// User invokes orchestrator
Task({
  subagent_type: "academic-course-orchestrator",
  description: "Generate Green Finance course",
  prompt: `Generate complete 8-week course on Green Finance using:
    - COURSE_GENERATOR_v2.md (guidelines)
    - template_beamer_final.tex (styling)
    - Coordinate all 3 specialized agents
    - Generate full course with quality report`
});

// Orchestrator internally spawns other agents
Task({
  subagent_type: "course-guidelines-expert",
  description: "Validate guidelines",
  prompt: "Load and validate COURSE_GENERATOR_v2.md..."
});

Task({
  subagent_type: "course-content-planner",
  description: "Generate content outline",
  prompt: "Create comprehensive content for 8 weeks..."
});

Task({
  subagent_type: "academic-slide-generator",
  description: "Generate all materials",
  prompt: "Generate all slides and charts for 8 weeks..."
});
```

---

## Implementation Method 2: Skills

### Step 1: Create Skill Files

Create skill files in `.claude/skills/` directory:

**File: `.claude/skills/course-orchestrator.md`**

```markdown
---
name: course-orchestrator
description: Master coordinator for academic course generation. Generates complete courses with slides, charts, and materials.
---

# Course Orchestrator Skill

## Purpose
Coordinate the generation of complete academic courses through specialized agents.

## System Prompt
{{ readFile("D:/Joerg/Research/slides/GreenFinance/agents/AGENT_1_CourseOrchestrator.md") }}

## Usage
Invoke this skill when you need to generate a complete academic course.

## Input Required
- Course topic
- Number of weeks (default: 8)
- Custom configuration (optional)

## Output Provided
- All week PDFs (8 files)
- All charts (85+ PDFs)
- Quality report
- Generation logs

## Example
```
Generate a complete 8-week course on Green Finance
```
```

**File: `.claude/skills/course-guidelines.md`**

```markdown
---
name: course-guidelines
description: Validates course generator guidelines and creates technical configuration
---

# Guidelines Expert Skill

## Purpose
Validate COURSE_GENERATOR_v2.md and extract specifications.

## System Prompt
{{ readFile("D:/Joerg/Research/slides/GreenFinance/agents/AGENT_2_GuidelinesExpert.md") }}

## Usage
Typically called by orchestrator, but can be used standalone to validate guidelines.

## Input Required
- COURSE_GENERATOR_v2.md
- template_beamer_final.tex

## Output Provided
- guidelines_validated.yaml

## Example
```
Validate course generator guidelines for Green Finance course
```
```

**File: `.claude/skills/course-content-planner.md`**

```markdown
---
name: course-content-planner
description: Creates detailed content outlines with all slide and chart specifications
---

# Content Planner Skill

## Purpose
Generate comprehensive content specifications for all weeks.

## System Prompt
{{ readFile("D:/Joerg/Research/slides/GreenFinance/agents/AGENT_3_ContentPlanner.md") }}

## Usage
Typically called by orchestrator after guidelines validation.

## Input Required
- guidelines_validated.yaml
- Course topic and structure

## Output Provided
- content_outline_full.yaml

## Example
```
Generate content outline for 8-week Green Finance course
```
```

**File: `.claude/skills/course-slide-generator.md`**

```markdown
---
name: course-slide-generator
description: Generates all course materials including charts, slides, and compiled PDFs
---

# Slide Generator Skill

## Purpose
Transform content specifications into deliverable course materials.

## System Prompt
{{ readFile("D:/Joerg/Research/slides/GreenFinance/agents/AGENT_4_SlideGenerator.md") }}

## Usage
Typically called by orchestrator after content planning complete.

## Input Required
- guidelines_validated.yaml
- content_outline_full.yaml
- template_beamer_final.tex

## Output Provided
- Week1-8 PDF files
- charts/week1-8/ directories with all charts
- generation.log

## Example
```
Generate all slides and charts from content_outline_full.yaml
```
```

### Step 2: Invoke Skills

Users can invoke skills directly or via orchestrator:

```
# Direct skill invocation
/skill course-orchestrator "Generate 8-week Green Finance course"

# Or step by step
/skill course-guidelines "Validate guidelines for Green Finance"
/skill course-content-planner "Create content outline"
/skill course-slide-generator "Generate all materials"
```

---

## Implementation Method 3: Slash Commands (Lightweight)

For simpler integration, create slash commands that load agent prompts:

**File: `.claude/commands/generate-course.md`**

```markdown
---
description: Generate complete academic course with all materials
---

You are the Course Orchestrator Agent. Your specifications are in:
D:/Joerg/Research/slides/GreenFinance/agents/AGENT_1_CourseOrchestrator.md

Generate a complete course following these steps:
1. Validate guidelines (spawn Guidelines Expert)
2. Create content outline (spawn Content Planner)
3. Generate all materials (spawn Slide Generator)
4. Validate and report

The user will provide the course topic.
```

**Usage:**
```
/generate-course Green Finance
```

---

## Directory Structure

```
D:/Joerg/Research/slides/GreenFinance/
├── agents/
│   ├── AGENT_1_CourseOrchestrator.md
│   ├── AGENT_2_GuidelinesExpert.md
│   ├── AGENT_3_ContentPlanner.md
│   ├── AGENT_4_SlideGenerator.md
│   ├── SCHEMAS_Communication.yaml
│   ├── INTEGRATION_Guide.md (this file)
│   └── USAGE_Examples.md
│
├── .claude/
│   ├── skills/
│   │   ├── course-orchestrator.md
│   │   ├── course-guidelines.md
│   │   ├── course-content-planner.md
│   │   └── course-slide-generator.md
│   └── commands/
│       └── generate-course.md
│
├── COURSE_GENERATOR_v2.md
├── template_beamer_final.tex
│
├── guidelines_validated.yaml (generated)
├── content_outline_full.yaml (generated)
├── quality_report.md (generated)
├── generation.log (generated)
│
├── charts/
│   ├── week1/
│   │   ├── week1_chart1.py
│   │   ├── week1_chart1.pdf
│   │   └── ...
│   └── week2-8/
│
├── Week1_*.pdf (generated)
├── Week2_*.pdf (generated)
└── ... (Week 3-8)
```

---

## Agent Communication Flow

### File-Based Communication Protocol

1. **Orchestrator starts** → Validates prerequisites
2. **Spawn Guidelines Expert** → Output: `guidelines_validated.yaml`
3. **Orchestrator validates** YAML → Passes to next agent
4. **Spawn Content Planner** → Input: `guidelines_validated.yaml` → Output: `content_outline_full.yaml`
5. **Orchestrator validates** outline → Passes to next agent
6. **Spawn Slide Generator** → Inputs: Both YAMLs + template → Outputs: PDFs + charts
7. **Orchestrator validates** outputs → Generates `quality_report.md`

### Error Handling Flow

```
Agent fails
    ↓
Orchestrator catches error
    ↓
Check error type
    ├─→ Recoverable? → Retry once with fixes
    └─→ Not recoverable? → Log error, report to user
```

---

## Testing the Integration

### Test 1: Guidelines Validation Only
```bash
# Test Guidelines Expert agent independently
Task(subagent_type: "course-guidelines-expert",
     prompt: "Validate guidelines for Green Finance course")

# Expected output:
# - guidelines_validated.yaml created
# - No errors in validation
```

### Test 2: Content Planning Only
```bash
# Requires guidelines_validated.yaml to exist first
Task(subagent_type: "course-content-planner",
     prompt: "Generate content outline for Green Finance, 8 weeks")

# Expected output:
# - content_outline_full.yaml created
# - 8 weeks with 246 slides specified
# - 85 charts specified
```

### Test 3: Single Week Generation
```bash
# Test Slide Generator on just Week 1
Task(subagent_type: "academic-slide-generator",
     prompt: "Generate Week 1 only from content_outline_full.yaml")

# Expected output:
# - Week1_*.pdf created
# - charts/week1/ populated with 10 charts
# - No compilation errors
```

### Test 4: Full Pipeline
```bash
# Test complete orchestrator
Task(subagent_type: "academic-course-orchestrator",
     prompt: "Generate complete Green Finance course, 8 weeks")

# Expected output:
# - All 8 PDFs created
# - All 85 charts generated
# - quality_report.md shows SUCCESS
# - Execution time 25-35 minutes
```

---

## Configuration Options

### Custom Course Configuration

Override defaults by providing custom config to orchestrator:

```yaml
custom_config:
  weeks: 6  # Instead of 8
  slides_per_week: [28, 30, 28, 30, 28, 30]
  chart_ratio: 0.35  # Instead of 0.33
  theme_colors: "mlpurple"  # Confirmed
```

**Usage:**
```
Task(subagent_type: "academic-course-orchestrator",
     prompt: "Generate course with custom config: {custom_config}")
```

### Partial Generation

Generate only specific weeks:

```
Task(subagent_type: "academic-slide-generator",
     prompt: "Generate weeks 3-5 only from existing content outline")
```

---

## Troubleshooting

### Issue: Agent not found
**Solution:** Ensure agent is registered in Claude Code system. Check that agent MD files exist in `agents/` directory.

### Issue: YAML communication fails
**Solution:** Validate YAML syntax using:
```python
import yaml
with open("guidelines_validated.yaml") as f:
    yaml.safe_load(f)  # Should not raise errors
```

### Issue: Chart generation fails
**Solution:**
1. Check Python/matplotlib installed
2. Check Graphviz installed
3. Verify COLORS dictionary in scripts
4. Check `generation.log` for specific errors

### Issue: LaTeX compilation fails
**Solution:**
1. Check pdflatex available
2. Verify template exists
3. Check for LaTeX syntax errors in .tex files
4. Review compilation logs in temp/

### Issue: Orchestrator timeout
**Solution:** Increase timeout setting or generate weeks in batches instead of all at once.

---

## Performance Optimization

### Parallel Chart Generation
Modify Slide Generator to generate charts in parallel:

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(generate_chart, spec)
               for spec in all_chart_specs]
    results = [f.result() for f in futures]
```

### Incremental Compilation
Cache compiled charts and only regenerate changed content:

```python
if chart_needs_update(chart_spec):
    generate_chart(chart_spec)
else:
    use_cached_chart(chart_spec)
```

### Resource Management
- Limit concurrent PDF compilations to 2-3
- Clear matplotlib figures after each chart
- Use incremental LaTeX compilation where possible

---

## Security Considerations

1. **Input Validation**: Validate all user-provided course topics and configurations
2. **File System Access**: Restrict file operations to designated directories
3. **Command Injection**: Sanitize all inputs passed to subprocess commands
4. **Resource Limits**: Enforce timeouts and memory limits for each agent

---

## Future Enhancements

1. **Web Interface**: Create dashboard for monitoring progress
2. **Cloud Deployment**: Enable running on cloud infrastructure
3. **Version Control**: Integrate with git for course versioning
4. **Collaboration**: Allow multiple users to contribute content
5. **AI Content Generation**: Use LLM to generate initial content drafts

---

*Integration Guide v1.0*
