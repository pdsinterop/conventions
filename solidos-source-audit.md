# SolidOS source audit

Reviewed 2026-11-18. This is an implementation coverage record, not a conformance certification. A source inspection is not an authenticated browser round-trip test.

| Area | Evidence | Status |
| --- | --- | --- |
| Pane registration | [solid-panes 5.1.0 registry](https://github.com/SolidOS/solid-panes/blob/617cc9d2e1579554c43d51cecf7b3e8f0d466e82/src/registerPanes.js) | Inspected: several writers now live in separate pane packages. |
| [Chat](./chat.md) | [chat-pane 4.1.0](https://github.com/SolidOS/chat-pane/tree/4a245abf680a16272cbc8afb07f4b50548ad20e1/src) | Corrected ShortChat class, message links and deprecation; shared UI daily storage/participation still pending. |
| [Meeting](./meeting.md) | [meeting-pane 4.1.0 writer](https://github.com/SolidOS/meeting-pane/blob/a90c85c427d39cfa15ec8013aeeb370523e0b0b3/src/meetingPane.js), [form](https://github.com/SolidOS/meeting-pane/blob/a90c85c427d39cfa15ec8013aeeb370523e0b0b3/src/meetingDetailsForm.ttl) | Corrected ordered tool collection, labels, document boundaries, mint-time fields and participant-group inconsistency. |
| [Address book](./addressbook.md) | Registry imports contacts-pane | Writer, indexes, group membership and shared contacts-module coverage pending. |
| [Notepad](./notepad.md) | [padPane 5.1.0](https://github.com/SolidOS/solid-panes/blob/617cc9d2e1579554c43d51cecf7b3e8f0d466e82/src/pad/padPane.ts) | Corrected namespace, content predicate, line IRIs and circular ordering; shared UI participation/concurrency pending. |
| [Tasks](./tasks.md) | Registry imports issue-pane | Tracker configuration, state documents, comments and task-module mapping pending. |
| [Profile](./profile.md) | Registry imports profile-pane | Storage/type-index discovery and editable predicates pending. |
| [Finance](./finance.md) | Registry registers transaction and financial-period panes | Transaction/classification and period queries pending. |
| Schedule and trip | Registry registers local schedule and trip panes | No format review completed. |
| Playlist and activity streams | Registry registers playlist and activitystreams panes | No format review completed. |
| Generic RDF, source, folder, media, sharing | Registry has corresponding views | Distinguish generic rendering/server metadata/access control from an app-specific data model. |

## Review method

For each format, record the actual package and immutable commit, class used to select the pane, creation defaults, document boundaries, predicates and RDF term kinds, ordering and cardinality, discovery path, update behaviour, and permission requirements. Distinguish fields written at creation from optional UI fields and reader compatibility paths. An implementation's typo or custom datatype must be described honestly rather than silently normalised.

Examples should be parseable with the declared namespace context. The automated check covers overview, meeting, the SolidOS notepad section and the newly reviewed chat section; historical chat excerpts are explicitly excluded until their originating implementations are reviewed. Parsing demonstrates syntax, not live interoperability.

Next validation should load fixtures through the appropriate Solid Data Modules, edit in the pane, read again through the module, then reverse the direction. Verify graph meaning (including RDF list order and document placement), unknown-triple preservation, authenticated persistence after a fresh session, and unauthorised access. No new module scope is approved by this audit.

## Backend convergence

Keep the logical model separate from Solid RDF serialization, discovery and access control. Document a remoteStorage JSON representation only after checking the corresponding module's actual schema and round-trip behaviour. Do not infer equivalent models merely from matching app categories. Record missing fields and lossy mappings before proposing a shared backend-independent component.
