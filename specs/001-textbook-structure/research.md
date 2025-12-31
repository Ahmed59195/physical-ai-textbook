# Research Findings: Physical AI & Humanoid Robotics Textbook

**Date**: 2025-12-31
**Feature**: 001-textbook-structure
**Purpose**: Resolve technical unknowns and establish implementation best practices

---

## 1. Docusaurus Best Practices for Technical Documentation

**Decision**: Use Docusaurus 3.x with sidebar depth of 2 levels, pagination disabled, and split bundles by module

**Rationale**:
- Docusaurus 3.x offers improved performance via React Server Components and better code splitting
- Sidebar depth of 2 (Modules → Chapters) balances discoverability with navigation simplicity
- Disabling pagination keeps chapters independent and avoids enforced linear reading
- Module-based bundle splitting (one bundle per module) optimizes initial load while keeping related content together

**Alternatives Considered**:
1. **Docusaurus 2.x**: Mature but slower builds and larger bundles for sites with 50k+ words
2. **Deep sidebar (3+ levels)**: Clutters navigation, reduces discoverability of chapters
3. **Aggressive pagination**: Breaks modularity principle (users forced into linear paths)

**Implementation Details**:
- Configure `docusaurus.config.ts` with:
  ```typescript
  {
    presets: [
      ['@docusaurus/preset-classic', {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          editUrl: 'https://github.com/[org]/[repo]/edit/main/',
        },
      }],
    ],
    webpack: {
      jsLoader: (isServer) => ({
        loader: require.resolve('esbuild-loader'),
        options: {
          loader: 'tsx',
          target: isServer ? 'node12' : 'es2017',
        },
      }),
    },
  }
  ```
- Algolia configuration for search (free DocSearch tier):
  ```yaml
  algolia:
    appId: [APP_ID]
    apiKey: [PUBLIC_API_KEY]
    indexName: physical-ai-textbook
    contextualSearch: true
    searchParameters:
      facetFilters: ['language:en', 'version:latest']
  ```

**References**:
- https://docusaurus.io/docs/next/performance
- https://docusaurus.io/docs/search#using-algolia-docsearch
- https://github.com/facebook/docusaurus/discussions/7747 (large docs optimization)

---

## 2. RAG-Optimized Content Structure

**Decision**: Use semantic HTML5 tags, YAML frontmatter with 8-10 metadata fields, H2-H4 heading hierarchy, and 300-500 word chunk target

**Rationale**:
- Semantic HTML5 (`<article>`, `<section>`, `<aside>`) provides structure that RAG systems can parse
- YAML frontmatter enables metadata extraction without content parsing (faster indexing)
- H2-H4 hierarchy (no H5-H6) creates clear semantic boundaries for chunking algorithms
- 300-500 word chunks balance context completeness with retrieval precision (research shows optimal embedding window)

**Alternatives Considered**:
1. **Flat HTML without semantic tags**: Harder for RAG to identify section boundaries
2. **Minimal frontmatter (title only)**: Loses SEO and RAG indexing opportunities
3. **Deep heading hierarchy (H2-H6)**: Creates too many small chunks, reduces context quality
4. **Smaller chunks (100-200 words)**: Higher retrieval precision but lower context quality

**Implementation Details**:

YAML Frontmatter Schema:
```yaml
---
id: week-01              # Unique chapter ID
title: Physical AI Overview
description: Introduction to Physical AI...
module: Module 1: Foundations
week: 1
learningObjectives:
  - Understand what Physical AI is
  - Differentiate between digital and embodied AI
  - Identify real-world Physical AI applications
prerequisites: []
keywords: [physical-ai, embodied-intelligence, robotics, sim-to-real]
difficulty: beginner
estimatedTime: 90       # minutes
lastUpdated: 2025-12-31
---
```

Heading Hierarchy Example:
```markdown
# Chapter Title (H1 - auto-generated from frontmatter)

## Learning Objectives (H2)

## Conceptual Explanation (H2)

### Core Concepts (H3)

#### Physical AI Definition (H4)

## Step-by-Step Implementation (H2)

### Setup Environment (H3)

### Write First ROS Node (H3)
```

Chunking Strategy:
- Primary chunks: H2 sections (entire "Learning Objectives" section = 1 chunk)
- Secondary chunks: H3 subsections (if H2 section >1000 words, split at H3)
- Metadata for each chunk: chapter ID, section title, keywords, prerequisites

**References**:
- https://www.pinecone.io/learn/chunking-strategies/
- https://www.llamaindex.ai/blog/evaluating-the-ideal-chunk-size-for-a-rag-system-using-llamaindex-6207e5d3fec5
- https://arxiv.org/abs/2312.06648 (RAG embedding optimization)

---

## 3. Accessibility Standards for Technical Diagrams

**Decision**: SVG diagrams with embedded text descriptions, alt-text (50-100 chars), long descriptions (150-300 words), and ARIA labels

**Rationale**:
- SVG allows embedding accessible text within the diagram (screen readers can read it)
- Alt-text provides brief summary (WCAG 2.1 Level A requirement)
- Long descriptions provide full understanding without visuals (Level AA requirement)
- ARIA labels enable custom navigation for complex diagrams

**Alternatives Considered**:
1. **PNG diagrams only**: Not as accessible, no text embedding, scaling issues
2. **Alt-text only (no long descriptions)**: Violates WCAG 2.1 AA for complex images
3. **Canvas-based interactive diagrams**: Not screen reader compatible

**Implementation Details**:

Textual Description Template (appears BEFORE diagram in Markdown):
```markdown
## Architecture Diagrams

### ROS 2 Node Communication Flow

**Diagram Description** (for screen readers and RAG systems):

This diagram illustrates communication between three ROS 2 nodes: Sensor Publisher,
Processing Node, and Actuator Subscriber.

**Components**:
- Sensor Publisher: Green box on the left, publishes sensor data to "/sensor_topic"
- Processing Node: Blue box in the center, subscribes to "/sensor_topic", processes data,
  publishes control commands to "/control_topic"
- Actuator Subscriber: Orange box on the right, subscribes to "/control_topic",
  actuates motors

**Data Flow**:
1. Sensor Publisher emits LaserScan messages at 10 Hz
2. Processing Node receives LaserScan, runs obstacle detection algorithm
3. Processing Node outputs Twist commands (linear/angular velocity)
4. Actuator Subscriber receives Twist, controls wheel motors

**Key Relationships**:
- Unidirectional data flow (left to right)
- Publish-subscribe pattern (decoupled nodes)
- Topic-based communication (no direct node-to-node connections)

![ROS 2 Node Communication Flow](/img/module-1/ros2-nodes-flow.svg "ROS 2 communication between sensor, processing, and actuator nodes")
```

SVG Accessibility Structure:
```xml
<svg role="img" aria-labelledby="ros2-flow-title ros2-flow-desc" xmlns="...">
  <title id="ros2-flow-title">ROS 2 Node Communication Flow</title>
  <desc id="ros2-flow-desc">
    Communication flow between three ROS 2 nodes: Sensor Publisher (green),
    Processing Node (blue), and Actuator Subscriber (orange). Data flows
    left-to-right via publish-subscribe topics.
  </desc>
  <!-- SVG content -->
</svg>
```

Accessibility Checklist (enforced in CI):
- [ ] Textual description appears before image
- [ ] Alt-text is 50-100 characters
- [ ] Long description is 150-300 words
- [ ] SVG has `<title>` and `<desc>` tags
- [ ] SVG has `role="img"` and `aria-labelledby`
- [ ] Color is not the only visual indicator (use patterns, labels)
- [ ] Text in diagram has 4.5:1 contrast ratio (WCAG AA)

**References**:
- https://www.w3.org/WAI/tutorials/images/complex/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role
- https://www.w3.org/TR/WCAG21/ (Level AA compliance)

---

## 4. Internationalization (i18n) for Urdu Translation

**Decision**: Docusaurus i18n plugin with manual translation, RTL CSS, isolated LTR code blocks, and preserved technical terms

**Rationale**:
- Docusaurus i18n plugin provides built-in RTL support and language switching
- Manual translation ensures technical accuracy (machine translation fails on robotics terms)
- Isolating code blocks in LTR prevents RTL CSS from breaking syntax
- Preserving English technical terms (e.g., "ROS 2", "Isaac Sim") avoids mistranslation

**Alternatives Considered**:
1. **Automated translation (Google Translate API)**: Poor quality for technical content, high error rate
2. **Separate Urdu site (different repo)**: Maintenance burden, content drift between English and Urdu
3. **Crowdin/Transifex (translation platforms)**: Overkill for hackathon, adds dependency

**Implementation Details**:

i18n Plugin Configuration (`docusaurus.config.ts`):
```typescript
{
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      ur: {
        label: 'اردو',
        direction: 'rtl',
        htmlLang: 'ur-PK',
      },
    },
  },
}
```

Directory Structure:
```
docs/
  module-1-foundations/
    week-01-physical-ai-overview.md    # English version
i18n/
  ur/
    docusaurus-plugin-content-docs/
      current/
        module-1-foundations/
          week-01-physical-ai-overview.md    # Urdu translation
```

RTL CSS with Code Block Isolation:
```css
/* Applied automatically for Urdu locale */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Preserve LTR for code blocks */
html[dir="rtl"] code,
html[dir="rtl"] pre,
html[dir="rtl"] .language-* {
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
}
```

Translation Guidelines:
1. Translate all body text and headings
2. Preserve technical terms: "ROS 2", "Gazebo", "Isaac Sim", "PyTorch", "SLAM", "IMU"
3. Preserve code blocks and code comments (English only)
4. Preserve URLs and file paths
5. Translate YAML frontmatter labels (but preserve `id` and `keywords`)

Example Urdu Frontmatter:
```yaml
---
id: week-01              # Preserved
title: فزیکل اے آئی کا جائزہ    # Translated
description: فزیکل اے آئی کا تعارف...    # Translated
module: ماڈیول ۱: بنیادیں    # Translated
week: 1                  # Preserved
learningObjectives:      # Translated content
  - سمجھیں کہ فزیکل اے آئی کیا ہے
  - ڈیجیٹل اور Embodied AI میں فرق کریں
keywords: [physical-ai, embodied-intelligence, robotics]    # Preserved
---
```

**References**:
- https://docusaurus.io/docs/i18n/introduction
- https://rtlstyling.com/posts/rtl-styling (RTL CSS best practices)
- https://www.w3.org/International/questions/qa-html-dir (HTML dir attribute)

---

## 5. GitHub Pages Deployment Optimization

**Decision**: Image compression (WebP with PNG fallback), lazy loading for images/iframes, code splitting by module, and Cloudflare CDN for static assets

**Rationale**:
- WebP reduces image size by 25-35% vs PNG (browser support >95%)
- Lazy loading defers offscreen content, reducing initial page weight
- Code splitting by module reduces first bundle from ~2MB to ~400KB
- Cloudflare CDN offloads bandwidth from GitHub Pages (100GB/month limit)

**Alternatives Considered**:
1. **No optimization**: Risks exceeding GitHub Pages 100GB bandwidth limit
2. **AVIF format**: Better compression than WebP but lower browser support (~80%)
3. **Self-hosted CDN (AWS CloudFront)**: Costs money, adds complexity

**Implementation Details**:

Image Compression Workflow:
```bash
# Convert PNG to WebP with quality 80 (balanced)
cwebp -q 80 input.png -o output.webp

# Generate PNG fallback (optimized with pngquant)
pngquant --quality=65-80 input.png --output fallback.png
```

HTML for WebP with Fallback:
```html
<picture>
  <source srcset="/img/diagram.webp" type="image/webp">
  <img src="/img/diagram.png" alt="Diagram description" loading="lazy">
</picture>
```

Code Splitting Configuration (`docusaurus.config.ts`):
```typescript
{
  webpack: {
    jsLoader: 'esbuild-loader',
  },
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],
}
```

GitHub Actions Deployment Workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Optimize images
        run: |
          npm install -g @squoosh/cli
          squoosh-cli --webp '{"quality":80}' static/img/**/*.{png,jpg}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

Cloudflare CDN Setup (optional, for large files):
- Upload `static/code/` directory (downloadable code examples) to Cloudflare R2
- Update links in Markdown: `[Download code](/code/week-01.zip)` → `[Download code](https://cdn.example.com/code/week-01.zip)`

Performance Budget:
- Initial page load: <3 seconds on 3G connection
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Total bundle size: <500KB (per module)
- Image sizes: <200KB (diagrams), <100KB (icons)

**References**:
- https://developers.google.com/speed/webp
- https://web.dev/browser-level-image-lazy-loading/
- https://github.com/peaceiris/actions-gh-pages
- https://www.cloudflare.com/products/r2/ (object storage)

---

## 6. Code Example Validation & Testing

**Decision**: Syntax linting (Ruff for Python, shellcheck for Bash), import validation, manual smoke testing on Jetson Orin for critical examples

**Rationale**:
- Syntax linting catches 80%+ of errors without runtime environment (fast CI)
- Import validation ensures dependencies are listed and available (avoids "ModuleNotFoundError")
- Manual smoke testing on real hardware validates critical deployment examples (sim-to-real, Jetson)
- Full ROS 2 + Isaac Sim CI environment is impractical (10+ minute builds, expensive runners)

**Alternatives Considered**:
1. **Dockerized ROS 2 CI**: Too slow (10-15 min per commit), expensive GitHub Actions runners
2. **Mock-based unit testing**: Over-engineering for documentation code, maintenance burden
3. **No validation**: High risk of broken examples, poor user experience

**Implementation Details**:

Pre-Commit Hook Configuration (`.pre-commit-config.yaml`):
```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.9
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/shellcheck-py/shellcheck-py
    rev: v0.9.0.6
    hooks:
      - id: shellcheck

  - repo: local
    hooks:
      - id: validate-python-imports
        name: Validate Python imports
        entry: python .github/scripts/validate-imports.py
        language: python
        files: \.py$
```

Import Validation Script (`.github/scripts/validate-imports.py`):
```python
#!/usr/bin/env python3
import ast
import sys
from pathlib import Path

# Allowed imports (ROS 2 + standard library + common packages)
ALLOWED_MODULES = {
    'rclpy', 'geometry_msgs', 'sensor_msgs', 'nav_msgs',
    'numpy', 'torch', 'cv2', 'matplotlib',
    'os', 'sys', 'time', 'math', 'typing',
}

def validate_imports(file_path):
    with open(file_path) as f:
        tree = ast.parse(f.read())

    for node in ast.walk(tree):
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            module = node.module if isinstance(node, ast.ImportFrom) else node.names[0].name
            root_module = module.split('.')[0] if module else None

            if root_module and root_module not in ALLOWED_MODULES:
                print(f"Error in {file_path}: Unrecognized import '{root_module}'")
                print(f"Add to ALLOWED_MODULES or update dependencies.md")
                return False
    return True

if __name__ == '__main__':
    failed = []
    for file in Path('static/code').rglob('*.py'):
        if not validate_imports(file):
            failed.append(file)

    if failed:
        print(f"\n{len(failed)} file(s) failed import validation")
        sys.exit(1)
```

Manual Testing Checklist (for critical examples):
- [ ] Week 2: Basic ROS 2 publisher/subscriber (tested on Ubuntu 22.04 + ROS 2 Humble)
- [ ] Week 7: Manipulation example (tested in Gazebo simulation)
- [ ] Week 11: Isaac Sim basic scene (tested with Isaac Sim 2023.1)
- [ ] Week 13: Jetson Orin deployment (tested on Jetson Orin Nano)

Code Example Metadata (embedded in frontmatter):
```markdown
---
id: week-01
# ... other frontmatter
codeExamples:
  - file: ros2_hello_world.py
    language: python
    tested: true
    environment: Ubuntu 22.04 + ROS 2 Humble
    dependencies: [rclpy]
  - file: launch_simulation.sh
    language: bash
    tested: false
    environment: Gazebo 11
    note: Requires gazebo_ros_pkgs installation
---
```

**References**:
- https://docs.astral.sh/ruff/ (Python linter)
- https://www.shellcheck.net/ (Bash linter)
- https://pre-commit.com/ (pre-commit framework)

---

## Summary

All 6 research tasks completed. Key decisions:

1. **Docusaurus 3.x** with 2-level sidebar, split bundles by module
2. **YAML frontmatter** (8-10 fields), H2-H4 hierarchy, 300-500 word chunks
3. **SVG diagrams** with alt-text, long descriptions, ARIA labels (WCAG 2.1 AA)
4. **Docusaurus i18n** for Urdu, RTL CSS, LTR code blocks, preserved technical terms
5. **WebP images**, lazy loading, code splitting, Cloudflare CDN for bandwidth
6. **Syntax linting + import validation** in CI, manual smoke testing for critical examples

Next: Generate data-model.md, contracts/, and quickstart.md (Phase 1)
