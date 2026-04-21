---
name: agent-customization
summary: "Workflow skill for creating/updating VS Code Copilot agent customization files (.instructions.md, .prompt.md, .agent.md, SKILL.md)."
description: |
  Use when: you need a repeatable, workspace-scoped method to create or refine Copilot customization assets.
  Includes: workflow steps, decision points, validation checklist, and example prompts.
  Excludes: non-agent personal code logic unrelated to .instructions/.prompt/.agent/SKILL.
---

# agent-customization skill

## Goal
Standardize a step-by-step workflow that turns a user request into a validated Copilot customization file in the repository.

## Step-by-step process

1. Review conversation context
   - Identify requested artifact type: instructions, prompt, agent, skill, or hooks.
   - Capture explicit constraints: workspace path, personal vs team scope, targeted file patterns.
   - If unclear, ask user for outcome details (what should the asset do?).

2. Determine scope
   - Workspace-scoped: prefer `.github/` directories (e.g. `.github/skills`, `.github/instructions`).
   - User-scoped: OS-level prompt location (e.g. `%APPDATA%\Code\User\prompts`).

3. Decide primitive
   - If broad, reusable multi-step task → `SKILL.md`.
   - If single command with inputs → `.prompt.md`.
   - If file-level guidance → `.instructions.md` with `applyTo` glob.
   - If context-isolated tool flow or stage gating → `.agent.md`.

4. Create file
   - Add YAML frontmatter with `name`, `description`, `summary`.
   - Provide concise, actionable examples.
   - Include optional section: `Example prompt(s)`, `Validation checks`.

5. Validate
   - Confirm file exists and is parseable.
   - Validate YAML frontmatter (no tabs, correct markers, quoted text where needed).
   - Verify description matches expected trigger language.

6. Return concise results
   - New file path(s).
   - What was generated.
   - Suggested follow-up questions.

## Decision points and branching logic

- If user asks for code implementation rules (e.g. `playwright.config.ts`), ask: should this be agent guidance or direct code patch?  
- If user indicates a new workflow across repos, default to workspace-level skill path.
- If user explicitly asks for minimal change, use existing asset pattern and edit in-place rather than new file.

## Quality criteria and completion checks

- Includes frontmatter with name, summary, description.
- Contains scoped guidance for this repo and for general usage.
- Provides at least one example prompt.
- File path set in `.github/skills/agent-customization/SKILL.md`.
- Output uses cross-references to existing instruction templates.

## Example prompts

- "Create a `.instructions.md` for Cypress best practices in this project."
- "Set up a new `.agent.md` to run lint/format fix pre-commit in VS Code Copilot."  

## Next suggestions

- Add companion `.prompt.md` for this skill with a fill-in template.
- Add `.github/instructions/agent-customization.instructions.md` for global guideline enforcement.
