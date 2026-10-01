# Graph Report - outlier-site  (2026-10-01)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 32 nodes · 30 edges · 6 communities (4 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `29a935aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `next` - 3 edges
3. `@supabase/supabase-js` - 2 edges
4. `metadata` - 1 edges
5. `private` - 1 edges
6. `react` - 1 edges
7. `react-dom` - 1 edges
8. `colors` - 1 edges
9. `gradients` - 1 edges
10. `logo` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (6 total, 2 thin omitted)

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (5): name, private, version, react, react-dom

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (4): colors, gradients, logo, typography

### Community 4 - "Community 4"
Cohesion: 0.40
Nodes (5): dependencies, next, react, react-dom, @supabase/supabase-js

### Community 5 - "Community 5"
Cohesion: 0.50
Nodes (4): scripts, build, dev, start

## Knowledge Gaps
- **17 isolated node(s):** `metadata`, `name`, `private`, `version`, `react` (+12 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 21 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 4` to `Community 2`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `scripts` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `next` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `metadata`, `name`, `private` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._