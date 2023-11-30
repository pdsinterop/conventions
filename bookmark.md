# Bookmark

## RDF Class
There are several formats for bookmarks. All of them (so far) use `http://www.w3.org/2002/01/bookmark#Bookmark` as the RDF class.

## Link
The link a bookmarks points to can be stored in a number of ways:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#recalls> <http://example.com>`
* `<bookmark> <http://www.w3.org/2002/01/bookmark#recalls> "http://example.com"`

## Label
The label of the bookmark can also be stored in a number of ways:
* `<bookmark> <http://www.w3.org/2000/01/rdf-schema#label> "Example Website"`
* `<bookmark> <http://purl.org/dc/terms/title#title> "Example Website"`

## Topic (optional)
Apart from each having their own label, bookmarks can be organised by topic. There are a number of ways to store those:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#hasTopic> "Birds"` ([Reza Soltani's Bookmarks app](https://github.com/soltanireza65/soukai-solid-app) use this)
* `<bookmark> <http://www.w3.org/2002/01/bookmark#hasTopic> <https://YOU.example.org/birds.ttl#Birds>`

In the latter case, the topic would be a `bookmark#Topic`, see [Jeff Zucker's docs about this](https://github.com/jeff-zucker/linked-bookmarks/blob/4fe5331084c8230a9d8477ad3388316151c6891d/README.md?plain=1#L10-L18):
```
  @prefix bk: <http://www.w3.org/2002/01/bookmark#> .

  <https://ME.example.org/animals.ttl#Animals>
    a bk:Topic .
  <https://YOU.example.org/birds.ttl#Birds>
    a bk:topic ;
    bk:subTopicOf <https://ME.example.org/animals.ttl#Animals> .
```
## Created (optional)
* `<bookmark> <http://purl.org/dc/terms/created> "2023-11-21T14:16:16Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`

## Creator (optional)
There are two ways to link to the creator of a bookmark:
* `<bookmark> <http://purl.org/dc/terms/creator> <https://michielbdejong.solidcommunity.net/profile/card#me> .`
* `<bookmark> <http://xmlns.com/foaf/0.1/maker> <https://michielbdejong.solidcommunity.net/profile/card#me> .`

## Primary Key (optional)
Some apps add a unique identifier separate from the subject URI, like:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#id> "b93d9944-d54d-42f6-a39b-6ea3f9217763" .`
* There is also the use of <http://purl.org/dc/terms/title#references> in [mark-book](https://github.com/mark-book/markbook/blob/123fadd211d9a42c43e2d9a5e7eeba81bb6b3fd6/bin/reddit.js#L32) but we're not entirely sure how that works.
