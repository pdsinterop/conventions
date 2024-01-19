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

## Solid-Focus

See https://github.com/NoelDeMartin/solid-focus/blob/master/src/models/soukai/Task.ts

Solid Focus gives tasks a UUID  inside lists, inside workspaces:
https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76
We don't know exactly how the app discovers existing workspaces/lists/tasks; at some point
it seems to be crawling the whole pod, but we'll dig into this question, see
https://github.com/pdsinterop/conventions/issues/26.

While the workspace/list/task hierarchy is represented by the folder structure on the pod, the 
rest of the data about a task is stored in the tasks's RDF document using the following model:
```
<https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76> <http://www.w3.org/2000/01/rdf-schema#label> "do something" .
<https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76> <http://purl.org/dc/terms/created> "2024-01-19T08:39:35Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76> <http://purl.org/dc/terms/modified> "2024-01-19T08:39:35Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76> a <http://purl.org/vocab/lifecycle/schema#Task> .
<https://me.solidcommunity.net/my-workspace/my-list/0892486a-04ce-46ca-8ee9-fabf9fdf2d76> a <http://www.w3.org/ns/ldp#Resource> .
```

TODO: document if Solid-Focus supports status tracking and/or commenting, or only create/delete.

## Projectron

See https://github.com/hackers4peace/projectron

## Solid Data Module

See https://github.com/solid-contrib/data-modules/tree/main/tasks (under construction)

## Other

For data formats used outside Solid, see also https://github.com/federatedbookkeeping/task-tracking (under development)
