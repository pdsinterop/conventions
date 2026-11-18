# Meeting

This describes the SolidOS meeting pane, checked against [meeting-pane 4.1.0](https://github.com/SolidOS/meeting-pane/blob/a90c85c427d39cfa15ec8013aeeb370523e0b0b3/src/meetingPane.js), specifically `mintNew`, `makeToolNode` and `renderMain`. Use the [overview prefixes](./overview.md).

## Creation and document layout

By default the pane creates `index.ttl#this` under the chosen base container. A caller may supply another instance IRI. The instance has type `mee:Meeting`, `dc:created`, and `dc:author` when a user is available. The initial background is written as `xsd:color`: this is the implementation's datatype IRI, not a claim that XML Schema defines a color datatype.

Most importantly, `mee:toolList` points to an **ordered RDF collection**, initially containing the meeting itself. It is not a set of repeated `mee:toolList` values and not a direct self-link.

```turtle
</meeting/index.ttl#this>
    a mee:Meeting ;
    dc:author </profile/card#me> ;
    dc:created "2026-11-18T09:00:00Z"^^xsd:dateTime ;
    ui:backgroundColor "#ddddcc"^^xsd:color ;
    mee:toolList ( </meeting/index.ttl#this> ) .
```

Participation is managed separately through the shared participation UI; it is not inserted by `mintNew`. Do not require a participation record merely to recognise a meeting.

## Details

The [pane's details form](https://github.com/SolidOS/meeting-pane/blob/a90c85c427d39cfa15ec8013aeeb370523e0b0b3/src/meetingDetailsForm.ttl) binds the title to `ical:summary`, location to `ical:location`, and start/end to `ical:dtstart` / `ical:dtend`. These fields are optional details, not mint-time requirements.

```turtle
</meeting/index.ttl#this>
    ical:summary "Weekly meeting" ;
    ical:location "Utrecht" ;
    ical:dtstart "2026-11-19T09:00:00Z"^^xsd:dateTime ;
    ical:dtend "2026-11-19T10:00:00Z"^^xsd:dateTime .
```

## Tools and attachments

To add an iframe attachment, replace the existing collection with a collection containing its previous members followed by the tool node. Preserve order and existing tool metadata. The pane writes `rdfs:label`, not `rdf:label`.

```turtle
</meeting/index.ttl#this>
    mee:toolList ( </meeting/index.ttl#this> </meeting/index.ttl#agenda> ) ;
    flow:attachment <https://example.com/agenda.html> .
</meeting/index.ttl#agenda>
    a mee:Tool ;
    mee:target <https://example.com/agenda.html> ;
    rdfs:label "Agenda" ;
    mee:view "iframe" .
```

A tool's target can live in another document. For newly created embedded tools, `saveAppDocumentLinkAndAddNewThing` writes `mee:parentMeeting` in the target's document. Do not assume the meeting document contains the target tool's whole data model.

## Compatibility notes

The current source contains both `mee:attendeeGroup` and the misspelled `mee:particpantGroup` in different participant UI paths. They must not be silently treated as one canonical predicate without a migration policy. This page does not prescribe a replacement group schema. Sharing and authentication are separate from this RDF shape: possessing a tool link does not grant access to its target.
