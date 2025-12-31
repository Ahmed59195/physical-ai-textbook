# Data Model: Physical AI & Humanoid Robotics Textbook

**Date**: 2025-12-31
**Feature**: 001-textbook-structure
**Purpose**: Define content entities, relationships, and schemas

---

## Entity Diagram (Textual)

```
Module (1) ──< contains >── (many) Chapter
Chapter (1) ──< references >── (many) GlossaryEntry
Chapter (1) ──< includes >── (many) CodeExample
Chapter (1) ──< includes >── (many) Diagram
Chapter (many) ──< prerequisite-of >── (many) Chapter
PersonalizationProfile (1) ──< influences >── (many) Chapter
```

---

## Entity Definitions

### 1. Chapter

**Description**: Represents a weekly learning unit with structured content sections

**Attributes**:
- `id`: string, unique identifier (e.g., "week-01", "capstone")
- `title`: string, human-readable chapter name
- `description`: string, brief summary for SEO and RAG (50-300 chars)
- `module`: string, parent module name
- `week`: number, 1-13 (null for front-matter/appendices)
- `learningObjectives`: array of strings, 3-5 measurable outcomes
- `prerequisites`: array of Chapter IDs
- `keywords`: array of strings, for search/RAG indexing
- `difficulty`: enum ("beginner", "intermediate", "advanced")
- `estimatedTime`: number, reading + exercise time in minutes
- `lastUpdated`: ISO 8601 date string
- `contentSections`: object with H2 section content

**Content Structure** (Markdown H2 sections):
1. Learning Objectives
2. Conceptual Explanation
3. Architecture Diagrams
4. Tooling & Stack
5. Step-by-Step Implementation
6. Common Pitfalls
7. Assessment/Mini-Project
8. Summary

**Relationships**:
- Belongs to one Module
- References zero or more prerequisite Chapters
- Contains many CodeExamples
- Contains many Diagrams
- References many GlossaryEntries

**Validation Rules**:
- `id` must match pattern `^(week-[0-9]{2}|front-matter-.+|capstone|appendix-.+)$`
- `learningObjectives` must have 3-5 items
- `keywords` must have at least 3 items
- `estimatedTime` must be >= 15 minutes

**Example**:
```yaml
---
id: week-01
title: "Physical AI Overview: From Digital to Embodied Intelligence"
description: "Introduction to Physical AI, its distinction from digital AI, and real-world applications in humanoid robotics."
module: "Module 1: Foundations"
week: 1
learningObjectives:
  - "Define Physical AI and differentiate it from purely digital AI systems"
  - "Identify key challenges in embodied intelligence (perception, control, sim-to-real)"
  - "Evaluate real-world Physical AI applications in industry and research"
prerequisites: []
keywords: [physical-ai, embodied-intelligence, robotics, sim-to-real, humanoid-robots]
difficulty: beginner
estimatedTime: 90
lastUpdated: 2025-12-31
---
```

---

### 2. Module

**Description**: Collection of related chapters forming a learning unit

**Attributes**:
- `name`: string, module title
- `description`: string, module overview
- `chapters`: array of Chapter IDs
- `order`: number, 1-4
- `estimatedWeeks`: number, total weeks for module

**Relationships**:
- Contains multiple Chapters (1-to-many)

**Validation Rules**:
- `order` must be 1-4
- `chapters` array must not be empty

**Example**:
```json
{
  "name": "Module 1: Foundations",
  "description": "Introduction to Physical AI, ROS 2 fundamentals, and robot kinematics/dynamics",
  "chapters": ["week-01", "week-02", "week-03"],
  "order": 1,
  "estimatedWeeks": 3
}
```

---

### 3. GlossaryEntry

**Description**: Technical term definition with context and cross-references

**Attributes**:
- `term`: string, technical term (e.g., "SLAM", "Inverse Kinematics")
- `definition`: string, concise explanation (50-150 words)
- `context`: string, where/why this term is used
- `relatedTerms`: array of strings, cross-references to other GlossaryEntries
- `chapterReferences`: array of Chapter IDs where term appears
- `category`: enum ("robotics", "ai-ml", "control", "hardware", "simulation", "deployment")

**Relationships**:
- Referenced by multiple Chapters (many-to-many)
- Cross-references other GlossaryEntries (self-referential)

**Validation Rules**:
- `term` must be unique across glossary
- `definition` length: 50-150 words
- `chapterReferences` must contain valid Chapter IDs

**Example**:
```yaml
term: "Sim-to-Real Transfer"
definition: "The process of deploying a policy or algorithm trained in simulation to a physical robot. Challenges include domain randomization, sensor noise modeling, and bridging the 'reality gap' between simulated and real-world physics."
context: "Critical technique in Physical AI to accelerate training without expensive real-world data collection. Used extensively in reinforcement learning for robotics."
relatedTerms: ["Domain Randomization", "Reality Gap", "Reinforcement Learning"]
chapterReferences: ["week-11", "week-12", "week-13", "capstone"]
category: "simulation"
```

---

### 4. CodeExample

**Description**: Runnable code snippet with metadata for validation and download

**Attributes**:
- `filename`: string, code file name (e.g., "ros2_publisher.py")
- `language`: enum ("python", "bash", "yaml", "cpp", "xml")
- `description`: string, what this code does
- `dependencies`: array of strings, required packages
- `environment`: string, execution environment (e.g., "Ubuntu 22.04 + ROS 2 Humble")
- `testable`: boolean, can this be auto-validated?
- `tested`: boolean, has this been manually tested?
- `downloadable`: boolean, available as standalone file?
- `codeContent`: string, full code content

**Relationships**:
- Belongs to one Chapter (many-to-one)

**Validation Rules**:
- `language` must be one of supported languages
- `dependencies` must list all imports (validated in CI)
- If `testable` is true, code must pass syntax linting

**Example**:
```yaml
filename: "ros2_hello_world.py"
language: "python"
description: "Basic ROS 2 publisher that sends 'Hello World' messages at 1 Hz"
dependencies: ["rclpy", "std_msgs"]
environment: "Ubuntu 22.04 + ROS 2 Humble"
testable: true
tested: true
downloadable: true
codeContent: |
  #!/usr/bin/env python3
  import rclpy
  from rclpy.node import Node
  from std_msgs.msg import String

  class HelloWorldPublisher(Node):
      def __init__(self):
          super().__init__('hello_world_publisher')
          self.publisher_ = self.create_publisher(String, 'hello', 10)
          self.timer = self.create_timer(1.0, self.timer_callback)

      def timer_callback(self):
          msg = String()
          msg.data = 'Hello World!'
          self.publisher_.publish(msg)
          self.get_logger().info(f'Publishing: "{msg.data}"')

  def main(args=None):
      rclpy.init(args=args)
      node = HelloWorldPublisher()
      rclpy.spin(node)
      node.destroy_node()
      rclpy.shutdown()

  if __name__ == '__main__':
      main()
```

---

### 5. Diagram

**Description**: Visual representation with accessibility metadata

**Attributes**:
- `filename`: string, image file path relative to /static/img/
- `textDescription`: string, full textual description (150-300 words)
- `caption`: string, brief caption (20-50 words)
- `altText`: string, screen reader text (50-100 chars)
- `format`: enum ("svg", "png", "jpg", "webp")
- `sourceFile`: string, optional link to editable source (e.g., .drawio, .svg)
- `components`: array of strings, list of diagram components
- `dataFlow`: string, description of data/control flow

**Relationships**:
- Belongs to one Chapter (many-to-one)

**Validation Rules**:
- `textDescription` length: 150-300 words
- `altText` length: 50-100 chars
- `format` must be accessible (SVG preferred, PNG/JPG with alt-text required)
- If format is SVG, must include `<title>` and `<desc>` tags

**Example**:
```yaml
filename: "module-1/ros2-node-communication.svg"
textDescription: |
  This diagram illustrates communication between three ROS 2 nodes in a robotics system.

  Components:
  - Sensor Publisher (green): Publishes LaserScan messages to "/sensor_topic" at 10 Hz
  - Processing Node (blue): Subscribes to "/sensor_topic", runs obstacle detection, publishes Twist commands to "/control_topic"
  - Actuator Subscriber (orange): Subscribes to "/control_topic", controls wheel motors

  Data Flow:
  1. Sensor Publisher emits LaserScan data from LiDAR sensor
  2. Processing Node receives LaserScan, detects obstacles using ray-casting
  3. Processing Node outputs Twist (linear/angular velocity) based on obstacle proximity
  4. Actuator Subscriber translates Twist into motor commands (PWM signals)

  Key Relationships:
  - Unidirectional data flow (left-to-right)
  - Publish-subscribe pattern (nodes are decoupled, communicate via topics)
  - No direct node-to-node connections (all communication via ROS 2 middleware)
caption: "ROS 2 publish-subscribe communication pattern between sensor, processing, and actuator nodes"
altText: "ROS 2 nodes connected via topics: sensor publishes data, processing node transforms it, actuator executes commands"
format: "svg"
sourceFile: "module-1/ros2-node-communication.drawio"
components: ["Sensor Publisher", "Processing Node", "Actuator Subscriber", "/sensor_topic", "/control_topic"]
dataFlow: "Sensor → Processing → Actuator (unidirectional, topic-based)"
```

---

### 6. PersonalizationProfile (Bonus Feature)

**Description**: Learner background configuration for adaptive content rendering

**Attributes**:
- `learnerBackground`: enum ("ml-focused", "controls-focused", "hardware-focused", "generalist")
- `skipSections`: array of section identifiers (H2 headings to fast-track)
- `deepDiveSections`: array of section identifiers (H2 headings to expand with extra content)
- `preferredSimulator`: enum ("gazebo", "isaac-sim", "unity")
- `hasHardwareAccess`: boolean (Jetson Orin available?)

**Relationships**:
- Influences Chapter content rendering (conditional sections)

**Validation Rules**:
- `skipSections` and `deepDiveSections` must not overlap
- Section identifiers must match H2 headings in Chapter

**Example**:
```json
{
  "learnerBackground": "ml-focused",
  "skipSections": ["Control Theory Basics", "PID Tuning"],
  "deepDiveSections": ["Neural Network Policies", "Reinforcement Learning"],
  "preferredSimulator": "isaac-sim",
  "hasHardwareAccess": false
}
```

---

## Relationships and Cardinality

| Entity 1 | Relationship | Entity 2 | Cardinality |
|----------|--------------|----------|-------------|
| Module | contains | Chapter | 1:N |
| Chapter | prerequisite-of | Chapter | N:N (self-referential) |
| Chapter | includes | CodeExample | 1:N |
| Chapter | includes | Diagram | 1:N |
| Chapter | references | GlossaryEntry | N:N |
| GlossaryEntry | related-to | GlossaryEntry | N:N (self-referential) |
| PersonalizationProfile | influences | Chapter | 1:N |

---

## Storage and Access Patterns

**Content Storage**:
- Chapters: Markdown files in `/docs/` directory, YAML frontmatter for metadata
- Modules: Defined in `sidebars.ts` (Docusaurus configuration)
- GlossaryEntries: Single `glossary.md` file with YAML frontmatter per entry
- CodeExamples: Embedded in Markdown as code blocks, optionally exported to `/static/code/`
- Diagrams: SVG/PNG files in `/static/img/`, metadata in Chapter frontmatter or separate YAML

**Indexing for RAG**:
- Primary index: Chapter frontmatter (YAML → JSON → vector embeddings)
- Secondary index: H2 sections within chapters (extracted via heading markers)
- Tertiary index: GlossaryEntries (term → definition → embeddings)

**Access Patterns**:
1. **Sequential learning**: Read chapters in module order (Module 1 → 2 → 3 → 4)
2. **Random access**: Jump to specific chapter via search or sidebar
3. **Prerequisite traversal**: Follow prerequisite links to earlier chapters
4. **Keyword search**: Query index by keywords, retrieve relevant chapters/sections
5. **RAG query**: Semantic search via embeddings, retrieve top-K chunks with context

---

## Schema Evolution and Versioning

**Frontmatter Versioning**:
- Track schema version in `_schemaVersion` field (e.g., "1.0")
- Breaking changes increment version (e.g., 1.0 → 2.0)
- Migration scripts provided for schema upgrades

**Backward Compatibility**:
- Optional fields can be added without version bump
- Required fields trigger version increment
- Deprecated fields marked with `_deprecated: true`, removed after 2 versions

**Example Versioned Frontmatter**:
```yaml
---
_schemaVersion: "1.0"
id: week-01
title: Physical AI Overview
# ... other fields
---
```

---

**Data Model Status**: ✅ COMPLETE
**Next**: Generate contracts/ (YAML schemas) and quickstart.md
