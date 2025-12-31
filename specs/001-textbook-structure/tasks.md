# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/001-textbook-structure/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test tasks included (not requested in specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Textbook root**: `textbook/` directory at repository root
- **Content**: `textbook/docs/` for all Markdown chapters
- **Static assets**: `textbook/static/` for images and code
- **Source code**: `textbook/src/` for React components
- **Configuration**: `textbook/` root for config files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling setup

- [ ] T001 Create textbook/ directory structure at repository root
- [ ] T002 Initialize Docusaurus 3.x project with TypeScript in textbook/
- [ ] T003 [P] Configure package.json with required dependencies (Docusaurus 3.x, React 18+, TypeScript 5.x) in textbook/package.json
- [ ] T004 [P] Configure tsconfig.json for TypeScript compilation in textbook/tsconfig.json
- [ ] T005 [P] Set up markdownlint configuration in textbook/.markdownlint.json
- [ ] T006 [P] Set up pre-commit hooks for validation in .pre-commit-config.yaml
- [ ] T007 Create GitHub Actions workflow for GitHub Pages deployment in .github/workflows/deploy.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Configure Docusaurus with site metadata and theme in textbook/docusaurus.config.ts
- [ ] T009 Configure sidebar structure for 4 modules + front matter + appendices in textbook/sidebars.ts
- [ ] T010 [P] Create chapter template file with 8 required sections in .templates/chapter-template.md
- [ ] T011 [P] Create frontmatter validation script against content-schema.yaml in scripts/validate-frontmatter.js
- [ ] T012 [P] Create diagram accessibility checklist template in .templates/diagram-accessibility-checklist.md
- [ ] T013 [P] Set up Algolia DocSearch configuration in textbook/docusaurus.config.ts
- [ ] T014 [P] Configure image optimization pipeline (WebP conversion) in textbook/docusaurus.config.ts
- [ ] T015 Create landing page with textbook overview in textbook/docs/index.md
- [ ] T016 [P] Create glossary page structure in textbook/docs/glossary.md
- [ ] T017 [P] Set up code validation script (Python syntax linting) in scripts/validate-code.sh

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Progressive Learning Path (Priority: P1) 🎯 MVP

**Goal**: Deliver core structured learning from foundational concepts to simulation deployment (Weeks 1-4)

**Independent Test**: Student completes Weeks 1-4 chapters sequentially and builds first simulated robot in Gazebo/Isaac Sim

### Implementation for User Story 1 (Weeks 1-4)

- [ ] T018 [P] [US1] Write Front Matter: Introduction to Physical AI in textbook/docs/front-matter/introduction.md
- [ ] T019 [P] [US1] Write Front Matter: AI-Native Features Usage Guide in textbook/docs/front-matter/ai-native-features.md
- [ ] T020 [P] [US1] Write Front Matter: Hardware & Software Prerequisites in textbook/docs/front-matter/prerequisites.md

**Module 1: Foundations (Weeks 1-3)**

- [ ] T021 [US1] Write Week 1: Physical AI Overview in textbook/docs/module-1-foundations/week-01-physical-ai-overview.md
- [ ] T022 [P] [US1] Create Week 1 diagrams (Physical AI architecture, digital vs embodied comparison) in textbook/static/img/module-1/
- [ ] T023 [P] [US1] Create Week 1 code examples (basic Python environment setup) in textbook/static/code/week-01/
- [ ] T024 [US1] Write Week 2: ROS 2 Fundamentals in textbook/docs/module-1-foundations/week-02-ros2-fundamentals.md
- [ ] T025 [P] [US1] Create Week 2 diagrams (ROS 2 node communication, publish-subscribe pattern) in textbook/static/img/module-1/
- [ ] T026 [P] [US1] Create Week 2 code examples (ROS 2 publisher/subscriber, launch files) in textbook/static/code/week-02/
- [ ] T027 [US1] Write Week 3: Kinematics & Dynamics in textbook/docs/module-1-foundations/week-03-kinematics-dynamics.md
- [ ] T028 [P] [US1] Create Week 3 diagrams (kinematic chains, forward/inverse kinematics, dynamic models) in textbook/static/img/module-1/
- [ ] T029 [P] [US1] Create Week 3 code examples (forward kinematics, inverse kinematics solvers) in textbook/static/code/week-03/

**Module 2: Perception & Control (Week 4 for MVP)**

- [ ] T030 [US1] Write Week 4: Sensors & Perception in textbook/docs/module-2-perception-control/week-04-sensors-perception.md
- [ ] T031 [P] [US1] Create Week 4 diagrams (sensor types, perception pipeline, LiDAR/camera integration) in textbook/static/img/module-2/
- [ ] T032 [P] [US1] Create Week 4 code examples (sensor data processing, point cloud visualization) in textbook/static/code/week-04/

- [ ] T033 [P] [US1] Validate all Week 1-4 frontmatter against content-schema.yaml
- [ ] T034 [P] [US1] Validate all Week 1-4 code examples with syntax linting
- [ ] T035 [US1] Test Week 1-4 learning path (sequential reading, code reproduction, assessment completion)

**Checkpoint**: At this point, User Story 1 MVP should be fully functional and testable independently (Weeks 1-4 complete)

---

## Phase 4: User Story 1 Extended - Complete Progressive Learning (Priority: P1)

**Goal**: Complete remaining weeks (5-13) to deliver full structured learning path

**Independent Test**: Student completes all 13 weeks and builds capstone autonomous navigation system

### Implementation for User Story 1 (Weeks 5-13 + Capstone)

**Module 2: Perception & Control (Weeks 5-7)**

- [ ] T036 [P] [US1] Write Week 5: Vision Systems in textbook/docs/module-2-perception-control/week-05-vision-systems.md
- [ ] T037 [P] [US1] Create Week 5 diagrams and code examples in textbook/static/img/module-2/ and textbook/static/code/week-05/
- [ ] T038 [P] [US1] Write Week 6: Control Theory in textbook/docs/module-2-perception-control/week-06-control-theory.md
- [ ] T039 [P] [US1] Create Week 6 diagrams and code examples in textbook/static/img/module-2/ and textbook/static/code/week-06/
- [ ] T040 [P] [US1] Write Week 7: Manipulation in textbook/docs/module-2-perception-control/week-07-manipulation.md
- [ ] T041 [P] [US1] Create Week 7 diagrams and code examples in textbook/static/img/module-2/ and textbook/static/code/week-07/

**Module 3: Intelligence & Planning (Weeks 8-10)**

- [ ] T042 [P] [US1] Write Week 8: Vision-Language-Action (VLA) Models in textbook/docs/module-3-intelligence-planning/week-08-vla-models.md
- [ ] T043 [P] [US1] Create Week 8 diagrams and code examples in textbook/static/img/module-3/ and textbook/static/code/week-08/
- [ ] T044 [P] [US1] Write Week 9: Task Planning with LLMs in textbook/docs/module-3-intelligence-planning/week-09-task-planning.md
- [ ] T045 [P] [US1] Create Week 9 diagrams and code examples in textbook/static/img/module-3/ and textbook/static/code/week-09/
- [ ] T046 [P] [US1] Write Week 10: Human-Robot Interaction in textbook/docs/module-3-intelligence-planning/week-10-human-robot-interaction.md
- [ ] T047 [P] [US1] Create Week 10 diagrams and code examples in textbook/static/img/module-3/ and textbook/static/code/week-10/

**Module 4: Deployment & Integration (Weeks 11-13)**

- [ ] T048 [P] [US1] Write Week 11: Simulation Environments in textbook/docs/module-4-deployment-integration/week-11-simulation-environments.md
- [ ] T049 [P] [US1] Create Week 11 diagrams and code examples in textbook/static/img/module-4/ and textbook/static/code/week-11/
- [ ] T050 [P] [US1] Write Week 12: Sim-to-Real Transfer in textbook/docs/module-4-deployment-integration/week-12-sim-to-real-transfer.md
- [ ] T051 [P] [US1] Create Week 12 diagrams and code examples in textbook/static/img/module-4/ and textbook/static/code/week-12/
- [ ] T052 [P] [US1] Write Week 13: Jetson Orin Deployment in textbook/docs/module-4-deployment-integration/week-13-jetson-deployment.md
- [ ] T053 [P] [US1] Create Week 13 diagrams and code examples in textbook/static/img/module-4/ and textbook/static/code/week-13/

**Capstone Project**

- [ ] T054 [US1] Write Capstone: Autonomous Navigation System in textbook/docs/capstone/autonomous-navigation-system.md
- [ ] T055 [P] [US1] Create Capstone diagrams (system architecture, navigation pipeline) in textbook/static/img/capstone/
- [ ] T056 [P] [US1] Create Capstone code examples (complete navigation stack) in textbook/static/code/capstone/

**Appendices**

- [ ] T057 [P] [US1] Write Appendix: Hardware Setup Guide in textbook/docs/appendices/hardware-setup-guide.md
- [ ] T058 [P] [US1] Write Appendix: Cloud vs Local Labs in textbook/docs/appendices/cloud-vs-local-labs.md
- [ ] T059 [P] [US1] Write Appendix: Troubleshooting in textbook/docs/appendices/troubleshooting.md

- [ ] T060 [P] [US1] Validate all Week 5-13 frontmatter and code examples
- [ ] T061 [US1] Build comprehensive glossary from all chapter keywords in textbook/docs/glossary.md
- [ ] T062 [US1] Test complete 13-week learning path (Weeks 1-13 + capstone)

**Checkpoint**: All 13 chapters complete, student can build autonomous navigation system

---

## Phase 5: User Story 2 - AI-Powered Personalized Learning (Priority: P2)

**Goal**: Enable RAG-based concept retrieval and adaptive content rendering

**Independent Test**: AI agent retrieves accurate answers to "How do I implement inverse kinematics for a 7-DOF arm?" without reading entire textbook

### Implementation for User Story 2

- [ ] T063 [P] [US2] Design content chunk boundaries (300-500 words per chunk) and document in specs/001-textbook-structure/rag-chunking-strategy.md
- [ ] T064 [P] [US2] Add semantic HTML5 tags (article, section, aside) to chapter template in .templates/chapter-template.md
- [ ] T065 [P] [US2] Add schema.org microdata to chapter frontmatter for RAG indexing
- [ ] T066 [P] [US2] Implement GlossaryTerm React component with hover definitions in textbook/src/components/GlossaryTerm.tsx
- [ ] T067 [P] [US2] Implement CodeBlock React component with download feature in textbook/src/components/CodeBlock.tsx
- [ ] T068 [P] [US2] Create RAG embedding test script (validates retrieval accuracy) in scripts/test-rag-retrieval.py
- [ ] T069 [US2] Test RAG retrieval with 50 sample queries against embedded content (target >95% accuracy)
- [ ] T070 [P] [US2] Add personalization metadata to chapter frontmatter (learnerBackground, skipSections) per personalization-schema.yaml
- [ ] T071 [P] [US2] Implement PersonalizationHook React component for adaptive content in textbook/src/components/PersonalizationHook.tsx
- [ ] T072 [US2] Test personalized content rendering (ML-focused vs controls-focused paths)

**Checkpoint**: AI agents can retrieve concepts accurately, content adapts to learner background

---

## Phase 6: User Story 3 - Modular Chapter Access (Priority: P2)

**Goal**: Enable independent chapter access with explicit prerequisites and cross-references

**Independent Test**: Student jumps to Week 8 (VLA models), understands content using only that chapter and linked prerequisites

### Implementation for User Story 3

- [ ] T073 [P] [US3] Add explicit prerequisite links to all chapter frontmatter (prerequisites field)
- [ ] T074 [P] [US3] Convert all vague cross-references ("see above") to explicit semantic links with section anchors
- [ ] T075 [P] [US3] Add inline glossary definitions for all technical terms (first use in each chapter)
- [ ] T076 [P] [US3] Implement breadcrumb navigation in Docusaurus theme in textbook/src/theme/DocItem/
- [ ] T077 [P] [US3] Add "Prerequisites" callout box to beginning of each chapter (auto-generated from frontmatter)
- [ ] T078 [US3] Test modular access: read Week 8 independently, verify prerequisites are sufficient
- [ ] T079 [US3] Test instructor scenario: 4-week short course (Weeks 1, 5, 8, 12) works coherently

**Checkpoint**: Chapters are independently accessible, prerequisites explicitly documented

---

## Phase 7: User Story 4 - Hands-On Implementation & Deployment (Priority: P1)

**Goal**: Enable sim-to-real deployment workflow with hardware guidance

**Independent Test**: Student deploys navigation policy from simulation to Jetson Orin hardware

### Implementation for User Story 4

- [ ] T080 [P] [US4] Add "Common Pitfalls" section to all Weeks 11-13 chapters (sim-to-real debugging)
- [ ] T081 [P] [US4] Add "Safety Warnings" callouts to all hardware deployment sections in Weeks 11-13 and appendices
- [ ] T082 [P] [US4] Add emergency stop procedures to hardware appendix in textbook/docs/appendices/hardware-setup-guide.md
- [ ] T083 [P] [US4] Create Jetson Orin setup guide with dependency installation in textbook/docs/appendices/hardware-setup-guide.md
- [ ] T084 [P] [US4] Create sim-to-real troubleshooting guide (latency, sensor calibration, actuator limits) in textbook/docs/appendices/troubleshooting.md
- [ ] T085 [US4] Manual test: deploy Capstone navigation code to Jetson Orin hardware
- [ ] T086 [US4] Validate safety requirements (emergency stop, collision avoidance, human detection)

**Checkpoint**: Students can deploy from simulation to hardware with clear safety guidance

---

## Phase 8: User Story 5 - Multilingual & Accessible Learning (Priority: P3)

**Goal**: Enable Urdu translation and screen reader accessibility

**Independent Test**: Urdu-speaking student reads Week 1 in Urdu, or visually impaired student navigates with screen reader

### Implementation for User Story 5

**Accessibility (WCAG 2.1 AA Compliance)**

- [ ] T087 [P] [US5] Add alt-text (50-100 chars) to all diagrams across all chapters
- [ ] T088 [P] [US5] Add long textual descriptions (150-300 words) before all diagrams
- [ ] T089 [P] [US5] Add ARIA labels to all SVG diagrams (<title> and <desc> tags)
- [ ] T090 [P] [US5] Ensure semantic HTML structure (proper heading hierarchy H1-H4) in all chapters
- [ ] T091 [US5] Run WAVE accessibility audit on deployed site (target: WCAG 2.1 AA compliance)

**Internationalization (Urdu Translation - Bonus)**

- [ ] T092 [P] [US5] Configure Docusaurus i18n plugin for Urdu (RTL support) in textbook/docusaurus.config.ts
- [ ] T093 [P] [US5] Create RTL stylesheet for Urdu with LTR code block isolation in textbook/src/css/rtl.css
- [ ] T094 [P] [US5] Translate Week 1 chapter to Urdu (manual translation, preserve technical terms) in textbook/i18n/ur/docusaurus-plugin-content-docs/current/module-1-foundations/week-01-physical-ai-overview.md
- [ ] T095 [P] [US5] Translate Week 2 chapter to Urdu in textbook/i18n/ur/docusaurus-plugin-content-docs/current/module-1-foundations/week-02-ros2-fundamentals.md
- [ ] T096 [US5] Test Urdu translation rendering (RTL layout, code blocks remain LTR, technical terms preserved)
- [ ] T097 [US5] Test screen reader navigation (all chapters accessible via NVDA/JAWS)

**Checkpoint**: Textbook is WCAG 2.1 AA compliant, Urdu translation proof-of-concept complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T098 [P] Optimize images (WebP compression, lazy loading) across all chapters in textbook/static/img/
- [ ] T099 [P] Run broken link checker across entire site using linkinator
- [ ] T100 [P] Optimize bundle size (code splitting by module) in textbook/docusaurus.config.ts
- [ ] T101 [P] Run Lighthouse CI audit (target: <3s load time, >90 performance score)
- [ ] T102 [P] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T103 [P] Create 90-second hackathon demo video script
- [ ] T104 Record 90-second demo video showcasing textbook features
- [ ] T105 [P] Create hackathon presentation slides (problem, solution, demo, impact)
- [ ] T106 Validate syllabus compliance (all 13 weeks match Panaversity course outline)
- [ ] T107 Validate hardware feasibility (test Jetson Orin setup, simulation environments)
- [ ] T108 Validate hackathon scoring alignment (AI-native features, content quality, deployment)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 MVP (Phase 3)**: Depends on Foundational completion - Delivers Weeks 1-4
- **User Story 1 Extended (Phase 4)**: Depends on US1 MVP - Completes Weeks 5-13 + Capstone
- **User Story 2 (Phase 5)**: Depends on US1 MVP (needs content to enhance)
- **User Story 3 (Phase 6)**: Depends on US1 Extended (needs all chapters for cross-references)
- **User Story 4 (Phase 7)**: Depends on US1 Extended (needs Weeks 11-13 + appendices)
- **User Story 5 (Phase 8)**: Depends on US1 MVP (can start accessibility on partial content)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Requires US1 MVP content (Weeks 1-4 minimum)
- **User Story 3 (P2)**: Requires US1 Extended (all 13 chapters for complete cross-referencing)
- **User Story 4 (P1)**: Requires US1 Extended (Weeks 11-13 + appendices)
- **User Story 5 (P3)**: Can start after US1 MVP (accessibility applies to any content)

### Within Each User Story

- **US1 MVP**: Sequential chapter writing (Week 1 → 2 → 3 → 4), diagrams and code in parallel per week
- **US1 Extended**: Weeks 5-13 can be written in parallel (different files, no dependencies)
- **US2**: All enhancement tasks are parallelizable (different components)
- **US3**: Prerequisite updates parallelizable per chapter, cross-reference fixes sequential
- **US4**: Documentation tasks parallelizable, manual testing sequential
- **US5**: Accessibility tasks parallelizable per chapter, translation sequential per chapter

### Parallel Opportunities

- All Setup tasks (T003-T007) can run in parallel
- All Foundational tasks marked [P] (T010-T017) can run in parallel within Phase 2
- Within US1 MVP: Diagrams and code for each week can be created in parallel with writing
- Within US1 Extended: Weeks 5-13 chapters can be written in parallel by different authors
- Within US2: All component implementations (T064-T071) can run in parallel
- Within US3: All chapter updates (T073-T077) can run in parallel
- Within US5: All accessibility fixes (T087-T090) can run in parallel per chapter

---

## Parallel Example: User Story 1 MVP (Weeks 1-4)

```bash
# Sequential: Write chapters in order
Task T021: Write Week 1
Task T024: Write Week 2
Task T027: Write Week 3
Task T030: Write Week 4

# Parallel per week: While writing Week 1, create diagrams and code
Task T021: Write Week 1 (main thread)
Task T022: Create Week 1 diagrams (parallel thread 1)
Task T023: Create Week 1 code examples (parallel thread 2)

# Then move to Week 2 with same pattern
```

---

## Implementation Strategy

### MVP First (User Story 1 MVP - Weeks 1-4 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T017) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 MVP (T018-T035) - Weeks 1-4 only
4. **STOP and VALIDATE**: Test Weeks 1-4 independently
5. Deploy to GitHub Pages, demo for hackathon

**MVP Deliverable**: Functional textbook with Weeks 1-4, front matter, basic RAG structure, deployable on GitHub Pages

### Incremental Delivery (All P1 User Stories)

1. Complete Setup + Foundational → Foundation ready
2. Complete US1 MVP (Weeks 1-4) → Test independently → Deploy/Demo (MVP!)
3. Complete US1 Extended (Weeks 5-13 + Capstone) → Test full learning path → Deploy/Demo
4. Complete US4 (Sim-to-Real Deployment) → Test hardware deployment → Deploy/Demo
5. Each phase adds value without breaking previous functionality

### Full Delivery (All User Stories Including Bonuses)

1. Complete all P1 stories (US1, US4)
2. Add US2 (AI-native enhancements: RAG, personalization)
3. Add US3 (Modular access improvements)
4. Add US5 (Accessibility + Urdu translation)
5. Polish and finalize

### Parallel Team Strategy

With multiple team members:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - **Author A**: US1 MVP (Weeks 1-2)
   - **Author B**: US1 MVP (Weeks 3-4)
   - **Developer C**: US2 setup (React components)
3. After US1 MVP complete:
   - **Author A**: Weeks 5-7
   - **Author B**: Weeks 8-10
   - **Author C**: Weeks 11-13
   - **Developer D**: US5 accessibility
4. Stories complete independently and integrate

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Focus on MVP (Weeks 1-4) first for hackathon demo
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

**Total Task Count**: 108 tasks
- Setup: 7 tasks
- Foundational: 10 tasks
- User Story 1 MVP: 18 tasks
- User Story 1 Extended: 27 tasks
- User Story 2: 10 tasks
- User Story 3: 7 tasks
- User Story 4: 7 tasks
- User Story 5: 11 tasks
- Polish: 11 tasks

**Parallel Opportunities**: 62 tasks marked [P] (57% parallelizable)

**Suggested MVP Scope**: Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (US1 MVP Weeks 1-4) = 35 tasks for functional hackathon demo
