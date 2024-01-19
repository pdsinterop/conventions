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

## Projectron

See https://github.com/hackers4peace/projectron

## Solid Data Module

See https://github.com/solid-contrib/data-modules/tree/main/tasks (under construction)

## Other

For data formats used outside Solid, see also https://github.com/federatedbookkeeping/task-tracking (under development)
