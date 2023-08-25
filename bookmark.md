# Bookmark
_NB: take a  look at https://github.com/mark-book/markbook for more reference

To create a new bookmark at `/bookmarks/index.ttl`, add the following triples into it:

```turtle
</bookmarks/index.ttl#this> a          http://www.w3.org/2002/01/bookmark#Bookmark .
</bookmarks/index.ttl#this> http://purl.org/dc/terms/title   "google" .
</bookmarks/index.ttl#this> http://www.w3.org/2002/01/bookmark#recalls   "https://www.google.com" .
```