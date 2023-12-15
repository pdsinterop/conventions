# Tasks

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
