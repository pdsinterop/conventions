# Notepad
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

To create a new notepad at `/notepad.ttl`, add the following triples into it:

```turtle
</notepad.ttl#this> a          pim:Notepad .
</notepad.ttl#this> dc:author  </profile/card#me> .
</notepad.ttl#this> dc:created "2019-04-17T08:05:19Z"^^XML:dateTime .
</notepad.ttl#this> dc:title   "Shared Notes" .
```

Now to indicate that his notepad is empty, add an empty first line to it:

```turtle
</notepad.ttl#this>  pim:next   </notepad.ttl#this_line0> .
</notepad.ttl#line0> dc:author  </profile/card#me> .
</notepad.ttl#line0> dc:content "" .
```

Now indicate that this is the last line, set this line's `pim:next` to the notepad itself:

```turtle
</notepad.ttl#line0> pim:next </notepad.ttl#this> .
```

To add a line to the notepad, for instance 'Alfa', first update the content of the first line, by replacing

```turtle
</notepad.ttl#line0> dc:content "" .
```

with

```turtle
</notepad.ttl#line0> dc:content "Alfa" .
```

and then add a new participation line below it, where the user can type their next line; pick a timestamp, for instance `1555488949899`, and add the following triples:

```turtle
</notepad.ttl#this>            flow:participation </notepad.ttl#id1555488949899> .
</notepad.ttl#id1555488949899> flow:participant   </profile/card#me> .
</notepad.ttl#id1555488949899> ical:dtstart       "2019-04-17T08:05:22Z"^^XML:dateTime .
</notepad.ttl#id1555488949899> ui:backgroundColor "#c0d2fe" .
```

Note that the first line still is the only line in the document, apart from the participation line. To add a second line, start making proper use of the `pim:next` attribute, by linking the first line to the second line, and then linking the second line back up to the notepad as a whole. The participation line stays as it is. The result will then look like this:

## Main notepad

```turtle
</notepad.ttl#this> a                  pim:Notepad .
</notepad.ttl#this> dc:author          </profile/card#me> .
</notepad.ttl#this> dc:created         "2019-04-17T08:05:19Z"^^XML:dateTime .
</notepad.ttl#this> dc:title           "Shared Notes" .
</notepad.ttl#this> pim:next           </notepad.ttl#this_line0> .
</notepad.ttl#this> flow:participation :id1555488949899 .
```

## Participation

```turtle
</notepad.ttl#id1555488949899> flow:participant   </profile/card#me> .
</notepad.ttl#id1555488949899> ical:dtstart       "2019-04-17T08:05:22Z"^^XML:dateTime .
</notepad.ttl#id1555488949899> ui:backgroundColor "#c0d2fe" .
```

## First line

```turtle
</notepad.ttl#line0> dc:author  </profile/card#me> .
</notepad.ttl#line0> dc:content "Alfa" .
</notepad.ttl#line0> pim:next   :id1555489499814  .
```

## Second line

```turtle
</notepad.ttl#id1555489499814> dc:author  </profile/card#me> .
</notepad.ttl#id1555489499814> dc:content "Bravo" .
</notepad.ttl#id1555489499814> pim:next   </notepad.ttl#this> .
```

# [Litewrite](https://litewrite.net)

Uses [litewrite/remotestorage-module-documents](https://github.com/litewrite/remotestorage-module-documents) writing to `/documents/notes/`:

```json
{
  "title": "alfa",
  "content": "alfa\n\nbravo",
  "lastEdited": 1701435915451,
  "public": null,
  "cursorPos": 11,
  "id": "2d8ce0cb-b640-461b-844c-c8663cc42537",
  "@context": "http://remotestorage.io/spec/modules/documents/text"
}
```

# [Notes Together](https://notestogether.hominidsoftware.com)

Uses [custom module](https://github.com/DougReeder/notes-together/blob/main/src/RemoteNotes.js) (compatible with Litewrite) writing to `/documents/notes/`:

```json
{
  "title": "• echo",
  "content": "<ol><li><input type=\"checkbox\" />echo</li></ol><p></p>",
  "lastEdited": 1701436763996,
  "date": "2023-12-01T13:19:16.734Z",
  "isLocked": false,
  "mimeType": "text/html;hint=SEMANTIC",
  "id": "2ff847fc-a687-467d-badc-1bf97f0969f8",
  "@context": "http://remotestorage.io/spec/modules/documents/note"
}
```

> [!NOTE]  
> When editing data saved from Litewrite in the previous section, some of the non-content fields have been lost or changed.

```json
{
  "title": "delta\nbravo",
  "content": "delta\n\nbravo",
  "lastEdited": 1701436457428,
  "date": "2023-12-01T13:14:05.792Z",
  "isLocked": false,
  "id": "2d8ce0cb-b640-461b-844c-c8663cc42537",
  "@context": "http://remotestorage.io/spec/modules/documents/note"
}
```

# [Encryptic](https://app.encryptic.org)

Uses [custom module](https://github.com/encryptic-team/encryptic/blob/master/src/scripts/components/sync/remotestorage/Module.js) writing to `/encryptic/$USERNAME/notes/`:

```json
{
  "encryptedData": "-----BEGIN PGP MESSAGE-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nwcBMA2zxuA9e0BM+AQf+NTE02XpYWuU8TOpTRn+wg5Qn7eHfoA/Pl6TqAiSf\r\n//glR84H5wiQv/JJuG2PXZ8wsy1M2S3Fnaqh8G74/iUdi73uOxb5kS38Qk5g\r\nzjzSKZHSWO28Sxj+Aqb7uPpCLMwv7HAu57zPsxhjnYoHUolqGAIduNWYP4eC\r\nycnV1MRXlZWzhsPlHOsHKw5AnUg7Dbvz4yrmbPteSxJWqWiFIXKTK8btjQmx\r\nhlDz3e9AZpOTZTEKkueJ5p+ykKkgal1PwIxBo4MxqJr4cIzTYAgSOAyX6kdS\r\nkTFLcq2G3jzO0sdgeyJPL5q7TMQ88JsGKQ9qeDJo9HY15R5mpYWZ4LBSzlpK\r\nYNLA0gGzFpfQ8sZ0m42hHARQADGyzl8k6wr/ZO6+Yfscwwrt44tP5HleM4kM\r\n+5+aLY5KX462Oa0iGG01PJCW3iilgInqQf8/wbbIwx99fWzZRJhpGEE1CTJH\r\naq7BTTBtwUAPhcJWb7seHD752CdS5m0IKl/aAMTHScN3SljBGnvczJhs3WUV\r\n60uRE/xxQz4uPdDNChP2DlCvD1Ith0fSTqtMmM/x1DiAoO3Fj6ehoqXxvLv6\r\nGYLdhDEBwl7YH2GhuK9OtIOmgSqdeQkI/b/Fvx4Oj+8nRyK5Zys5f5s3P3FB\r\n69wY8Z9sMUuCJa5jNqXr6Gazq8H8z3Rm2dPIxRZxJ+kzTr3Z+1uQQhGy7FNg\r\nf9EP33hNCQ4Tfo4VCq8og8bie7hsz730prIX01lrb/poK8JztyiHtYMb2jmh\r\nQiZb+4brIkQf2tSeR246iICKZwuoTE/9rx93vWbFoyGpThnPFTcKGE8hvKUE\r\nBX96elhY0tzg3bXUsuOHAZbDdIqE6Bb19L3wLs5qtUQqJGS6XxPEaDXONC9K\r\nSQ==\r\n=dyiO\r\n-----END PGP MESSAGE-----\r\n",
  "updated": 1701437563118,
  "created": 1701437532877,
  "taskAll": 0,
  "taskCompleted": 0,
  "notebookId": "0",
  "isFavorite": 0,
  "trash": 0,
  "files": [],
  "sharedWith": [],
  "sharedBy": "alfa",
  "type": "notes",
  "id": "094304e0-904e-11ee-9444-89ac1ca7ec37",
  "@context": "http://remotestorage.io/spec/modules/encryptic/notes"
}
```

Also writes to `/encryptic/$USERNAME/tags/`:

```json
{
  "encryptedData": "-----BEGIN PGP MESSAGE-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nwcBMA2zxuA9e0BM+AQf/Tu4Jox+vQxV2fAygzIdRQZXEvUNuBLvAY/jwhKld\r\nqua9P9kPkVm5a+OqNjFal46Ccgfw5aNbt3w4n8yPP5aPoBBHxPQd88Du9fxe\r\nTn/GkP8kG1SxtN9+rNAT1J/Gp9Mc+PtU5Ku7JB7FYRucWtvBh1pmUIvHRT3M\r\nhrFJQN3td3VYWEI1kjJ9pui2vAd03APEtWlp39X4PSQ038IWmnhnydX6ckLQ\r\nfYxY+JTQ9c+u4ukvIellTAaUH19GKSChevNydtfXd/3KJsf9cb1I8OEvoxPf\r\naSeU8gvRWjZIQvzgatgdMYEpVe87UDx671P/ZC1dAvuiv1nCiz6bayw158lj\r\ny9LAuAHp7b+3mIIe65YhUKhHdrHIHixda9/ZfwQwQGGWqWMtQ+9w4vOIvNiA\r\nS560M692Qc7bHdoifq/dUqDAjx6tHrh0Mz8LAj/obyRdBvqXMtGv6uxkbBkA\r\ns+zIPxTgi5Ak8iBTfZhUVlGAxNVDjiuYWyGPNNIeK7cVfiBVHTdaiH6+EBXc\r\n5t1jdwRZCtI2maa5MQTC8pQ0OFCclQkfFdvbDhywKLiWoDAdf+y1a0C5MdLA\r\naxTzoasQwPUvf4OvejtLnjVp2oxZFh4YF3TaZ+fjT+O8846c3kAcumVqDguN\r\nL5qJg5cD2OIykpTuYOie/3JB3FQQaJylDYYjPoiZkP5dlMj9mt1cxxhYG0aM\r\nLg6ciGzcht8JhTjqS7DqBe0vkX24jlRQdtGc8opgN3ksOpFIt+e9EBkanzdO\r\nx2hCQttpybznsPDpxDW3LT7zRzs7WN6Ch+H55skD7TjEIsn+zrYKfNV6ObUM\r\n594Bs6ADCfAdb2QKe1fgSViugFM=\r\n=AtF2\r\n-----END PGP MESSAGE-----\r\n",
  "updated": 1701438016360,
  "created": 1701438016360,
  "count": 0,
  "trash": 0,
  "type": "tags",
  "id": "-1791806854596657849-774024691093389715-160062204918003686491529221860-287399026",
  "@context": "http://remotestorage.io/spec/modules/encryptic/tags"
}
```

# [Laverna](https://laverna.cc)

Uses [custom module](https://github.com/Laverna/laverna/blob/master/app/scripts/modules/remotestorage/module.js) writing to `/laverna/notes-db/notes/`:

```json
{
  "title": "alfa",
  "content": "bravo",
  "updated": 1701438445120,
  "created": 1701438444239,
  "taskAll": 0,
  "taskCompleted": 0,
  "notebookId": "0",
  "tags": [],
  "isFavorite": 0,
  "trash": 0,
  "files": [],
  "type": "notes",
  "id": "6029d6ad-4b94-0bc4-682e-951c42f3acba",
  "@context": "http://remotestorage.io/spec/modules/laverna/notes"
}
```

# [Snowfall](https://snowfall.vercel.app)

Uses [custom module](https://github.com/71/snowfall/blob/master/client/common/remoteStorage.ts) writing to `/snowfall/notes.yaml`:

```json
notes:
  - text: alfa
    children:
      - text: bravo
  - text: delta
```

# [Hyperdraft](https://hyperdraft.rosano.ca)

Uses [custom module](https://github.com/rosano/hyperdraft/blob/master/os-app/_shared/KVCNote/main.js) writing to `/wikiavec/kvc_notes/$DAY/$ID/main`:

```json
{
  "KVCNoteBody": "alfa\n\nbravo",
  "KVCNoteModificationDate": "2023-12-01T14:06:08.182Z",
  "KVCNoteCreationDate": "2023-12-01T14:06:05.802Z",
  "KVCNoteID": "01HGJV6VZAPPAZ7VBMJ7FCGY3P"
}
```

# [Notepod](https://notepod.vincenttunru.com)

> [!NOTE]  
> Requests root access.

Uses [custom mobule](https://gitlab.com/vincenttunru/notepod/-/blob/master/src/services/addNote.ts?ref_type=heads) writing to `/$ID.ttl`:

```turtle
@prefix : </1e16eda0-9995-11ee-8100-2bec63e97603.ttl#>.
@prefix schema: <http://schema.org/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

:17024576300408220454257988783
    a schema:TextDigitalDocument;
    schema:dateCreated "2023-12-13T08:53:50Z"^^xsd:dateTime;
    schema:text "alfa\nbravo".
```

and to `/settings/publicTypeIndex.ttl`:

```turtle
@prefix : </1e16eda0-9995-11ee-8100-2bec63e97603.ttl#>.
@prefix schema: <http://schema.org/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

:17024576300408220454257988783
    a schema:TextDigitalDocument;
    schema:dateCreated "2023-12-13T08:53:50Z"^^xsd:dateTime;
    schema:text "alfa\nbravo".
```

# [dokieli](https://dokie.li)

> [!NOTE]  
> Requests root access.

Uses files writing to `/$ID`.
