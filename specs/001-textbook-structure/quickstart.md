# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

**Date**: 2025-12-31
**Feature**: 001-textbook-structure
**Purpose**: Setup and usage instructions for readers, contributors, and instructors

---

## For Readers

### Navigating the Textbook

**Sidebar Navigation**:
- **Modules** (top level): Four main modules organized by learning theme
- **Chapters** (nested): 13 weekly chapters + front matter + capstone + appendices
- **Search** (top right): Algolia-powered full-text search across all content

**Chapter Structure** (every chapter follows this pattern):
1. **Learning Objectives**: What you'll learn by the end
2. **Conceptual Explanation**: High-level mental model before implementation
3. **Architecture Diagrams**: Visual representations with textual descriptions
4. **Tooling & Stack**: Technologies and dependencies for this chapter
5. **Step-by-Step Implementation**: Hands-on coding with complete examples
6. **Common Pitfalls**: Debugging tips and frequent errors
7. **Assessment/Mini-Project**: Practice exercise to validate understanding
8. **Summary**: Key takeaways and RAG-optimized recap

**Icons and Callouts**:
- 🎯 **Learning Objective**: Measurable outcome
- 💡 **Concept**: Key idea or mental model
- ⚠️ **Safety Warning**: Hardware safety or ethical consideration
- 🔧 **Implementation**: Code or hands-on step
- 🐛 **Common Pitfall**: Frequent error and solution

### Using AI-Native Features

**RAG Queries** (if RAG chatbot is available):
- Ask questions like: "How do I implement inverse kinematics?"
- System retrieves relevant chapter sections with context
- Responses include links to source chapters

**Glossary Hover** (interactive feature):
- Hover over technical terms to see inline definitions
- Click term to navigate to full glossary entry
- Glossary links related terms for deeper exploration

**Code Download**:
- Every code block has a "Download" button (top right)
- Downloads complete file with dependencies documented
- Files organized by week in `/static/code/` directory

**Personalization** (bonus feature, if enabled):
- Set your background (ML-focused, controls-focused, hardware-focused, generalist)
- System fast-tracks familiar topics, expands unfamiliar ones
- Example: ML-focused learners skip "Neural Network Basics", expand "Control Theory"

**Urdu Translation** (bonus feature, if enabled):
- Language switcher in top navigation bar
- Toggles between English and Urdu
- Code blocks remain in English with translated comments
- Technical terms preserved (e.g., "ROS 2", "SLAM", "Isaac Sim")

### Prerequisites

**Required Knowledge**:
- Python programming (intermediate level)
- Basic understanding of neural networks (no deep expertise needed)
- Command-line interface (Bash/terminal basics)

**Recommended Hardware**:
- Ubuntu 22.04+ (native or WSL2 on Windows)
- 16GB+ RAM
- GPU (NVIDIA preferred but optional - Gazebo fallback available)

**Optional Hardware** (for advanced chapters):
- NVIDIA Jetson Orin (for hardware deployment chapters)
- Webcam or RealSense camera (for vision chapters)

**Software to Install** (covered in "Prerequisites" chapter):
- ROS 2 Humble or Iron (instructions provided)
- Python 3.10+ with pip
- Docker (for containerized examples)
- Git (for version control)

### Learning Paths

**Full Course** (13 weeks):
- Read all chapters sequentially (Module 1 → 2 → 3 → 4)
- Complete all assessments and mini-projects
- Build capstone project (autonomous navigation system)

**Fast Track** (4-6 weeks for experienced roboticists):
- Skip Weeks 1-2 if familiar with Physical AI concepts
- Focus on Modules 3-4 (Intelligence & Deployment)
- Jump to capstone project

**AI/ML Focus** (for ML practitioners new to robotics):
- **Must-read**: Weeks 1-3 (foundations), Week 8 (VLA models), Weeks 12-13 (deployment)
- **Optional**: Weeks 4-6 (perception/control - leverage existing ML knowledge)

**Controls Focus** (for controls engineers new to AI):
- **Must-read**: Week 1 (Physical AI overview), Weeks 8-10 (AI planning), Weeks 12-13
- **Optional**: Weeks 4-6 (leverage existing controls knowledge)

---

## For Contributors

### Setting Up Local Development

**1. Clone Repository**:
```bash
git clone https://github.com/[org]/physical-ai-textbook.git
cd physical-ai-textbook
```

**2. Install Dependencies**:
```bash
# Install Node.js 18+ (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install project dependencies
npm install
```

**3. Run Local Dev Server**:
```bash
npm start
# Opens browser to http://localhost:3000
# Auto-reloads on file changes
```

**4. Build for Production**:
```bash
npm run build
# Outputs to ./build/ directory
```

### Chapter Authoring Workflow

**1. Copy Chapter Template**:
```bash
cp .templates/chapter-template.md docs/module-X/week-XX-topic-name.md
```

**2. Fill Frontmatter** (YAML at top of file):
```yaml
---
id: week-XX
title: "Your Chapter Title"
description: "Brief summary (50-300 chars)"
module: "Module X: Module Name"
week: XX
learningObjectives:
  - "Objective 1"
  - "Objective 2"
  - "Objective 3"
prerequisites: []
keywords: [keyword1, keyword2, keyword3]
difficulty: beginner
estimatedTime: 90
lastUpdated: 2025-12-31
---
```

**3. Write Content** (follow H2 section structure):
- Learning Objectives
- Conceptual Explanation
- Architecture Diagrams
- Tooling & Stack
- Step-by-Step Implementation
- Common Pitfalls
- Assessment/Mini-Project
- Summary

**4. Validate Frontmatter**:
```bash
npm run validate:frontmatter docs/module-X/week-XX-topic-name.md
# Checks against content-schema.yaml
```

**5. Lint Markdown**:
```bash
npm run lint:markdown
# Runs markdownlint on all .md files
```

**6. Validate Code Examples**:
```bash
# Syntax check for Python code
npm run validate:code

# Manual testing for robotics code
python3 static/code/week-XX/example.py
```

**7. Create Pull Request**:
```bash
git checkout -b feature/week-XX-topic-name
git add docs/module-X/week-XX-topic-name.md
git commit -m "Add Week XX: Topic Name chapter"
git push origin feature/week-XX-topic-name
# Open PR on GitHub
```

### Content Guidelines

**Diagrams**:
- Place in `/static/img/module-X/`
- Prefer SVG format (scalable, accessible)
- Always include textual description BEFORE image
- Alt-text: 50-100 chars
- Long description: 150-300 words

**Code Examples**:
- Use triple backticks with language identifier: ```python
- Include all imports at top of code block
- Add comments explaining non-obvious logic
- Provide setup instructions in text before code
- Test code manually before committing

**Links**:
- External links: Full URLs with descriptive text
- Internal links: Relative paths with section anchors
  - Example: `[See Week 3: Kinematics](../module-1-foundations/week-03-kinematics-dynamics.md#forward-kinematics)`
- No generic "click here" or "see above" - always use descriptive link text

**Glossary Terms**:
- On first use in a chapter, link to glossary:
  - Example: `[SLAM](/glossary#slam) is a technique for...`
- Add new terms to `docs/glossary.md` with proper schema

### Pre-Commit Hooks

Automatic validation runs before each commit:
- Markdown linting (markdownlint)
- YAML frontmatter validation (content-schema.yaml)
- Python code syntax checking (ruff)
- Broken link detection (linkinator)

**Install Pre-Commit**:
```bash
pip install pre-commit
pre-commit install
```

---

## For Instructors

### Customizing Learning Paths

**Scenario 1: 4-Week Short Course**

Select chapters:
- Week 1: Physical AI Overview
- Week 5: Vision Systems (or Week 2: ROS 2 Fundamentals)
- Week 8: VLA Models
- Week 12: Sim-to-Real Transfer

**Rationale**: Covers foundations, perception, intelligence, and deployment without deep dives into controls or manipulation.

**Scenario 2: Hardware-Free Course** (simulation only)

Include:
- All chapters EXCEPT Week 13 (Jetson Deployment)
- Use Gazebo or Isaac Sim for all implementation sections
- Capstone project runs entirely in simulation

**Rationale**: 80% of learning objectives achievable without physical hardware.

**Scenario 3: ML Practitioners Track**

Focus on:
- Week 1 (Physical AI intro)
- Weeks 8-10 (AI planning, VLA models, HRI)
- Weeks 11-13 (Simulation and deployment)

**Rationale**: Assumes students know ML basics, focuses on robotics-specific AI topics.

### Assessment Rubrics

Each chapter's assessment/mini-project evaluates:

**Technical Correctness** (50%):
- Does code run without errors?
- Are outputs correct?
- Are dependencies properly installed?

**Conceptual Understanding** (30%):
- Can student explain design choices?
- Are edge cases handled?
- Does implementation match requirements?

**Code Quality** (20%):
- Readable code with comments?
- Follows PEP 8 (Python) or language standards?
- Proper error handling?

**Grading Scale**:
- **Excellent** (90-100%): All criteria met, code runs perfectly, clear explanations
- **Good** (75-89%): Minor bugs, mostly correct, good understanding
- **Satisfactory** (60-74%): Code runs with fixes, basic understanding
- **Needs Improvement** (<60%): Major issues, requires revision

### Tracking Student Progress (Manual Methods)

**Weekly Checkpoints**:
- Students submit completed assessments via GitHub (one repo per student)
- Instructors review code and provide feedback via GitHub Issues
- Track completion in spreadsheet or LMS

**Capstone Project Milestones**:
1. **Milestone 1** (after Module 2): Perception system working in simulation
2. **Milestone 2** (after Module 3): Planning and decision-making integrated
3. **Milestone 3** (after Module 4): Full autonomous navigation deployed

**Office Hours Topics**:
- ROS 2 installation and troubleshooting
- Simulation environment setup (Gazebo/Isaac Sim)
- Debugging hardware deployment issues
- Capstone project guidance

---

## Troubleshooting

**Issue**: Docusaurus dev server won't start
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Issue**: Code examples fail to run
**Solution**:
1. Check dependencies: `pip list` (Python) or `apt list --installed` (system)
2. Verify ROS 2 environment: `source /opt/ros/humble/setup.bash`
3. Check file paths and permissions

**Issue**: Search not working
**Solution**:
- Algolia indexing may take 24 hours after deployment
- Check Algolia dashboard for index status

**Issue**: Diagrams not loading
**Solution**:
- Verify file path in Markdown: `/static/img/module-X/diagram.svg`
- Check file exists in repository
- Clear browser cache

**Issue**: Translation toggle missing
**Solution**:
- Urdu translation is bonus feature, may not be fully implemented
- Check i18n configuration in `docusaurus.config.ts`

---

## Resources

**Official Documentation**:
- Docusaurus: https://docusaurus.io/docs
- ROS 2: https://docs.ros.org/en/humble/
- NVIDIA Isaac Sim: https://docs.omniverse.nvidia.com/isaacsim/latest/

**Community Support**:
- GitHub Issues: [Report bugs or request features](https://github.com/[org]/physical-ai-textbook/issues)
- Discussions: [Ask questions](https://github.com/[org]/physical-ai-textbook/discussions)

**Contributing**:
- See `CONTRIBUTING.md` for detailed guidelines
- Code of Conduct: `CODE_OF_CONDUCT.md`

---

**Quickstart Status**: ✅ COMPLETE
**Next**: Update agent context and create PHR
