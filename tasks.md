# Tasks
Task tracking, todo lists, issue tracking, project management, etc

## [0data Hello World](https://hello.0data.app/solid/)

> [!NOTE]  
> Requests root access.

Uses [custom module](https://github.com/0dataapp/hello/blob/main/solid/solid-rest-api/solid.js) writing to `/tasks/`:

```turtle
a schema:Action ;
schema:actionStatus schema:PotentialActionStatus ;
schema:description "alfa" .
```

# Tasks

## [Do Again List](http://static.karl.berlin/doagain)

Uses [custom module](https://github.com/karlb/doagain/blob/master/remotestorage-doagain.js) writing to `/doagain/doagain.json`:

```json
{
  "entries": [
    {
      "description": "bravo",
      "completed": false,
      "editing": false,
      "id": 1,
      "doneAt": [],
      "tags": []
    },
    {
      "description": "alfa",
      "completed": false,
      "editing": false,
      "id": 2,
      "doneAt": [],
      "tags": [
        "charlie"
      ]
    }
  ],
  "field": "",
  "uid": 3,
  "visibility": "charlie",
  "@context": "http://remotestorage.io/spec/modules/doagain/doagain-store"
}
```

## Solid OS

See https://github.com/SolidOS/issue-pane

When you create an issue tracker, it creates a folder on your pod, with an index.ttl and a state.ttl file in there, for instance:

* https://michielbdejong.solidcommunity.net/shops/Tracker/id1718099958673/index.ttl

```turtle
@prefix : <#>.
@prefix dc: <http://purl.org/dc/elements/1.1/>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix wf: <http://www.w3.org/2005/01/wf/flow#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix c: </profile/card#>.

:this
    a wf:Tracker;
    dc:author c:me;
    dc:created
    "2024-06-11T09:59:31Z"^^xsd:dateTime, "2024-06-11T09:59:32Z"^^xsd:dateTime;
    wf:assigneeClass foaf:Person;
    wf:initialState wf:Open;
    wf:issueClass wf:Task;
    wf:stateStore <state.ttl>.
```

* https://michielbdejong.solidcommunity.net/shops/Tracker/id1718099958673/state.ttl

```turtle
@prefix : <#>.
@prefix dc: <http://purl.org/dc/elements/1.1/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix sioc: <http://rdfs.org/sioc/ns#>.
@prefix wf: <http://www.w3.org/2005/01/wf/flow#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix ind: <index.ttl#>.
@prefix c: </profile/card#>.

ind:this wf:stateStore <>.

:Iss1718100013562
    a wf:Open;
    dc:title "get coffee";
    dct:created "2024-06-11T10:00:13Z"^^xsd:dateTime;
    wf:description "description\n";
    wf:message :Msg1718100029761;
    wf:tracker ind:this.
:Msg1718100029761
    dct:created "2024-06-11T10:00:29Z"^^xsd:dateTime;
    sioc:content "comment";
    foaf:maker c:me.
```

## SolidFocus (current model)

Checked against [Task.schema.ts](https://github.com/NoelDeMartin/solid-focus/blob/53e6fddb0fec1e8cc9373b0106b138c99ae444a0/src/models/Task.schema.ts) and [Task.ts](https://github.com/NoelDeMartin/solid-focus/blob/53e6fddb0fec1e8cc9373b0106b138c99ae444a0/src/models/Task.ts), release 0.3.3. Earlier observations on this page used `lifecycle:Task` and `rdfs:label`; they do **not** describe this current schema. This review does not establish whether older data is automatically migrated.

The current task has both `schema:Action` and `ical:Vtodo` types. The Schema.org namespace is HTTPS. The model enables Soukai history and disables tombstones; preservation of that history needs its own review before another writer replaces Soukai.

| App field | Predicate / behaviour |
| --- | --- |
| name | `schema:name`, with an `ical:summary` alias |
| description | `schema:description` |
| status | IRI-valued `schema:actionStatus` |
| priority | Numeric `ical:priority` |
| dueDate | `ical:due` |
| completedAt | `ical:completed` |

The app's completion getter checks completedAt. Before saving, it sets actionStatus to CompletedActionStatus when completedAt is present, otherwise PotentialActionStatus. Toggling completion sets or clears completedAt. Do not discard either the timestamp or status IRI during conversion; inconsistent imported values need an explicit reconciliation policy. A task can also be edited, prioritised, given a deadline, completed/undone and deleted; the old statement that only create/delete might exist is obsolete.

Example using the overview prefixes plus HTTPS Schema.org:

```turtle
@prefix schema: <https://schema.org/> .

</workspace/list/task#it>
    a schema:Action, ical:Vtodo ;
    schema:name "Cook ramen" ;
    ical:summary "Cook ramen" ;
    schema:description "Use fresh noodles" ;
    schema:actionStatus schema:CompletedActionStatus ;
    ical:priority 1 ;
    ical:due "2026-11-20T10:00:00Z"^^xsd:dateTime ;
    ical:completed "2026-11-18T10:00:00Z"^^xsd:dateTime .
```

The example illustrates task fields; its path is not a required discovery location. Workspace/list discovery and document boundaries remain unverified in this audit. The earlier concern about crawling the Pod is historical and must not be treated as evidence of current behaviour; see [the existing discovery issue](https://github.com/pdsinterop/conventions/issues/26).

The [shared tasks reader](https://github.com/pondersource/data-modules/tree/a92c18610ad87a9f2f52732b7b45d95550e0060e/tasks/vanilla) now reads dual-typed tasks and these fields. Its fallback name order is schema:name, ical:summary, then the older description-only representation used by 0data. It is read-only for this format: the module's SolidOS issue/comment writers are not compatible replacements for SolidFocus writes. Lists, workspaces, history and live browser round-trip validation remain pending.

## Projectron

See https://github.com/hackers4peace/projectron

## Solid Data Module

See https://github.com/solid-contrib/data-modules/tree/main/tasks (under construction)

## Other

For data formats used outside Solid, see also https://github.com/federatedbookkeeping/task-tracking (under development)
