---
id: 0002
title: Textbook Implementation Plan
stage: plan
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5
feature: 001-textbook-structure
branch: 001-textbook-structure
user: system
command: /sp.plan
labels: ["plan", "textbook", "physical-ai", "docusaurus", "architecture"]
links:
  spec: specs/001-textbook-structure/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-textbook-structure/plan.md
  - specs/001-textbook-structure/research.md
  - specs/001-textbook-structure/data-model.md
  - specs/001-textbook-structure/quickstart.md
  - specs/001-textbook-structure/contracts/content-schema.yaml
  - specs/001-textbook-structure/contracts/glossary-schema.yaml
  - specs/001-textbook-structure/contracts/code-example-schema.yaml
  - specs/001-textbook-structure/contracts/personalization-schema.yaml
tests:
  - N/A (planning phase, no code to test)
---

## Prompt

Create a step-by-step plan to build this book using Spec-Kit Plus and Claude Code.

Phase 1: Repository & Tooling
- Initialize Spec-Kit Plus project
- Configure Docusaurus for textbook layout
- Set up GitHub Pages deployment

Phase 2: Core Content Generation
- Write chapters module-by-module
- Ensure syllabus alignment
- Optimize text for RAG ingestion

Phase 3: AI-Native Enhancements
- Design content chunk boundaries
- Add semantic markers for AI agents
- Prepare content for personalization & translation

Phase 4: Advanced Features (Bonus)
- Embed RAG chatbot architecture
- Plan Claude Subagents and reusable skills
- Personalization hooks per chapter
- Urdu translation toggles

Phase 5: Finalization
- QA for technical accuracy
- Optimize navigation
- Prepare demo flow for 90-second video

Output:
- A fully deployable AI-native textbook
- Hackathon-ready project structure

## Response snapshot

Created comprehensive implementation plan for Physical AI & Humanoid Robotics textbook with complete Phase 0 (research) and Phase 1 (design) artifacts.

**Technical Architecture**:
- **Platform**: Docusaurus 3.x static site generator
- **Content**: Markdown with YAML frontmatter, 13 weekly chapters across 4 modules
- **Deployment**: GitHub Pages (free tier)
- **Search**: Algolia DocSearch (free for open source)
- **AI-Native**: Semantic HTML, metadata schemas, RAG-optimized chunking (300-500 words)

**Constitution Compliance**: ✅ ALL 6 PRINCIPLES PASS
- I. AI-Native First: Markdown + YAML frontmatter, semantic HTML, complete code context
- II. Concept-Simulation-Reality: Theory → Simulation → Real-world chapter structure
- III. Modular & Searchable: Independent chapters, explicit cross-references, glossary integration
- IV. Practical Over Theoretical: Code examples required, equations + implementation, startup case studies
- V. Clear Mental Models: Conceptual explanation before implementation, textual diagram descriptions
- VI. Responsible Robotics: Safety warnings, ethical discussions, military/surveillance exclusions

**Phase 0 Research Findings** (6 tasks completed):
1. **Docusaurus Best Practices**: 2-level sidebar, split bundles by module, esbuild loader
2. **RAG Optimization**: YAML frontmatter (8-10 fields), H2-H4 hierarchy, 300-500 word chunks
3. **Accessibility**: SVG diagrams, alt-text (50-100 chars), long descriptions (150-300 words), WCAG 2.1 AA
4. **i18n for Urdu**: Docusaurus i18n plugin, RTL CSS, LTR code blocks, preserved technical terms
5. **GitHub Pages Optimization**: WebP images, lazy loading, code splitting, Cloudflare CDN
6. **Code Validation**: Syntax linting (Ruff), import validation, manual smoke testing

**Phase 1 Design Artifacts** (4 files generated):
1. **data-model.md**: 6 entities (Chapter, Module, GlossaryEntry, CodeExample, Diagram, PersonalizationProfile)
2. **contracts/** (4 YAML schemas): content-schema, glossary-schema, code-example-schema, personalization-schema
3. **quickstart.md**: Complete guide for readers, contributors, and instructors

**Project Structure**:
```
textbook/
├── docs/                    # 13 weekly chapters + front matter + appendices
├── static/                  # Images, downloadable code
├── src/components/          # React components (GlossaryTerm, CodeBlock, Diagram)
├── docusaurus.config.ts     # Docusaurus configuration
└── .github/workflows/       # GitHub Pages deployment
```

**Implementation Phases** (high-level, tasks.md to follow):
- Phase 1: Repository & Tooling (Docusaurus setup, linting, CI/CD)
- Phase 2: Core Content (13 chapters module-by-module)
- Phase 3: Front Matter & Appendices (intro, prerequisites, capstone, hardware guides)
- Phase 4: AI-Native Enhancements (RAG optimization, glossary hover, personalization)
- Phase 5: Advanced Features (chatbot architecture, Urdu translation)
- Phase 6: Finalization (QA, performance, hackathon demo)

**Key Architectural Decisions**:
1. Static site generation (Docusaurus) over dynamic app (zero backend, free hosting)
2. Markdown + YAML frontmatter (RAG-friendly, version-controllable)
3. Algolia DocSearch (free, sub-second search)
4. SVG diagrams (scalable, accessible)
5. Syntax linting + manual testing (pragmatic for documentation code)
6. Manual Urdu translation (quality over automated translation)

**Risk Mitigation**:
1. Content volume: Prioritize P1 chapters (Weeks 1-4 + capstone) for MVP
2. Code validation: Syntax linting in CI, manual testing on Jetson Orin
3. RAG quality: Research early, test with sample chapters, iterate
4. Accessibility: Research WCAG standards, create templates, audit before launch
5. Bandwidth limits: Image compression, CDN for large files

## Outcome

- ✅ Impact: Complete implementation plan with technical architecture, constitution compliance, and 6 research tasks resolved. Phase 0 (research.md) and Phase 1 (data-model.md, contracts/, quickstart.md) artifacts generated.
- 🧪 Tests: No code tests (planning phase). Validation: Constitution Check passed all 6 principles, research decisions documented with rationales.
- 📁 Files: Created plan.md (709 lines), research.md (6 decisions), data-model.md (6 entities), quickstart.md (3 audience sections), 4 YAML schemas
- 🔁 Next prompts: Run `/sp.tasks` to generate detailed task breakdown with dependencies, priorities, and parallelization opportunities
- 🧠 Reflection: Plan successfully balances ambitious scope (13 chapters, AI-native features, bonus translations) with pragmatic implementation (static site, free hosting, manual validation). Docusaurus architecture aligns perfectly with constitution (modular, searchable, AI-native). Research phase resolved all technical unknowns (RAG chunking, i18n, accessibility, deployment optimization).

## Evaluation notes (flywheel)

- Failure modes observed: None - planning completed successfully
- Graders run and results (PASS/FAIL): PASS - Constitution Check validated all 6 principles, research tasks resolved, data model and contracts defined
- Prompt variant (if applicable): N/A - Initial planning
- Next experiment (smallest change to try): Proceed to `/sp.tasks` to validate that plan translates into actionable, dependency-ordered tasks without requiring plan amendments
