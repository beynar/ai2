# GanttChart performance envelope

GanttChart resolves hierarchy, dependency analysis, workload, and one shared virtual row
model from immutable controlled collections. The tree and timeline mount the same bounded
row window, while the time header and task layer mount only the horizontal viewport plus
overscan. Pointer-frame sampling reads cached schedule and layout indexes rather than
rebuilding the graph on each pointer event.

## Measured data point

This is a reproducible data point, not a supported maximum or a cross-device benchmark.

- Date: 2026-07-28
- Browser: Headless Chrome 149.0.7827.55
- Environment: Apple M4 Pro, 48 GB memory, macOS 26.5.1, 1,280 × 720 CSS-pixel viewport
- Build: SvelteKit production build served through `vite preview`
- Data: 100 expanded summaries, 4,900 scheduled leaf tasks, and 10,000 unique acyclic
  finish-start dependencies; month zoom, 32 px rows, and overscan 8
- Method: navigate from a fresh page, wait for the first virtual row, then measure each
  operation through three animation frames. Scroll and mutation use five samples; zoom
  uses four; collapse and expand use three each. The table reports medians and the maximum
  mounted counts observed for that operation.

| Operation                          | Median time | Rows | Task controls | Link controls | Header cells |
| ---------------------------------- | ----------: | ---: | ------------: | ------------: | -----------: |
| Initial SSR navigation + hydration |  4,758.6 ms |   26 |            26 |             0 |           19 |
| Scroll first ↔ last task           |    104.6 ms |   27 |            27 |            78 |           18 |
| Zoom month ↔ week                  |     98.3 ms |   24 |            24 |            48 |           30 |
| Collapse all                       |  2,150.2 ms |   24 |            24 |             0 |           18 |
| Expand all                         |  2,152.7 ms |   34 |            34 |           105 |           18 |
| Immutable leaf-task mutation       |  4,217.9 ms |   34 |            34 |           105 |           18 |

The mounted DOM remains bounded by the visible row/time windows rather than the 5,000
definitions or 10,000 links. Full controlled mutations, collapse, and expansion still
recompute the correctness-first hierarchy and schedule graph; their measured multi-second
cost is the current large-project performance limit. Consumers should profile their own
calendar density, dependency topology, snippets, workload settings, browser, and hardware.
