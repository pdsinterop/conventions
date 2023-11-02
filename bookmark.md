# Bookmark

Used `https://github.com/jeff-zucker/linked-bookmarks` as reference


```turtle
@prefix : <#> .
@prefix bk: <http://www.w3.org/2002/01/bookmark#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.

bk:hasTopic :fiction;
a bk:BookMark;
rdfs:label "Ancient Texts";
bk:recalls <https://archive.org>
```