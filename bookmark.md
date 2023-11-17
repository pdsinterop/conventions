# Bookmark

Used `https://github.com/jeff-zucker/linked-bookmarks` as reference

implemented in `https://github.com/pondersource/soukai-solid-data-modules`

```turtle
@prefix : <#>.
@prefix bookm: <./>.
@prefix bk: <http://www.w3.org/2002/01/bookmark#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.

:it 
    a bk:Bookmark;
    rdfs:label "Google";
    bk:hasTopic :fiction;
    bk:recalls <https://www.google.com>.
```