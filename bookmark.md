# Bookmark

Used `https://github.com/jeff-zucker/linked-bookmarks` as reference

implemented in `https://github.com/pondersource/soukai-solid-data-modules`

```turtle
@prefix : <#>.
@prefix bookm: <./>.
@prefix bk: <http://www.w3.org/2002/01/bookmark#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.

bookm:6c6f7127-785e-4627-a278-c528a2d7c50a
    a bk:Bookmark;
    rdfs:label "Google";
    bk:hasTopic :fiction;
    bk:recalls <https://www.google.com>.
```