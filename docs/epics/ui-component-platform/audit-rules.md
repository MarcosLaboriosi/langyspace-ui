# Architecture audit rules

Every diagnostic has stable rule ID, path, line, message and remediation. `failures` remains a
formatted string array for v1 compatibility; structured consumers can use `diagnostics`.

| ID      | Contract                                     | Default remediation                              |
| ------- | -------------------------------------------- | ------------------------------------------------ |
| LSUI001 | local 360-degree wait spinner                | use Spinner or action loading                    |
| LSUI002 | unclassified keyframes/domain motion         | register exact owned, expiring motion            |
| LSUI003 | native/styled button outside its owner       | use product action boundary or Pressable         |
| LSUI004 | private package subpath                      | import the public entrypoint                     |
| LSUI005 | direct Button bypasses product composition   | use the approved local wrapper                   |
| LSUI006 | removed Button prop                          | select Button or IconButton                      |
| LSUI007 | copied action union                          | derive from public types                         |
| LSUI008 | styled canonical action overrides its recipe | keep only external layout or add semantic prop   |
| LSUI009 | descendant selector overrides action recipe  | remove or register exact temporary exception     |
| LSUI010 | cross-component private style import         | compose through the component entrypoint         |
| LSUI011 | layer dependency inversion                   | move contract down or invert ownership           |
| LSUI012 | free cosmetic prop in this library           | use closed semantic variant or local composition |

Fixtures cover all 12 IDs, aliased/multiline imports, multiline unions, config validation and a
positive surface. Regex remains intentionally narrow; the alias fixture did not require a runtime
TypeScript parser or a new package dependency. AST should be introduced only when a concrete valid
format produces a false negative that cannot be fixed without broad matching.
