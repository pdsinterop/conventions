# Notepad
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

To create a new bookmark at `/bookmarks/index.ttl`, add the following triples into it:

```turtle
</bookmarks/index.ttl#this> a          http://www.w3.org/2002/01/bookmark#Bookmark .
</bookmarks/index.ttl#this> http://purl.org/dc/terms/title   "google" .
</bookmarks/index.ttl#this> http://www.w3.org/2002/01/bookmark#recalls   "https://www.google.com" .
```
And this is a sample SPARQL Query to Create a new bookmark

```sparql
INSERT DATA {<https://soltanireza65.solidcommunity.net/bookmarks/index.ttl#f9313e55-8382-4684-9ae0-2d3c68d1ea23> <http://purl.org/dc/terms/title> "google";
    <http://www.w3.org/2002/01/bookmark#recalls> "https://www.google.com";
    a <http://www.w3.org/2002/01/bookmark#Bookmark>.};
```