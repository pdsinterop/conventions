# Bookmark

## RDF Class
There are several formats for bookmarks. All of them (so far) use `http://www.w3.org/2002/01/bookmark#Bookmark` as the RDF class.

### Link
The link a bookmarks points to can be stored in a number of ways:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#recalls> <http://example.com>` (preferred)
* `<bookmark> <http://www.w3.org/2002/01/bookmark#recalls> "http://example.com"`

### Label
The label of the bookmark can also be stored in a number of ways:
* `<bookmark> <http://www.w3.org/2000/01/rdf-schema#label> "Example Website"` (preferred)
* `<bookmark> <http://purl.org/dc/terms/title#title> "Example Website"`

### Topic (optional)
Apart from each having their own label, bookmarks can be organised by topic. There are a number of ways to store those:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#hasTopic> "Birds"` ([Reza Soltani's Bookmarks app](https://github.com/soltanireza65/soukai-solid-app) use this)
* `<bookmark> <http://www.w3.org/2002/01/bookmark#hasTopic> <https://YOU.example.org/birds.ttl#Birds>` (preferred)

In the latter case, the topic would be a `bookmark#Topic`, see [Jeff Zucker's docs about this](https://github.com/jeff-zucker/linked-bookmarks/blob/4fe5331084c8230a9d8477ad3388316151c6891d/README.md?plain=1#L10-L18):
```
  @prefix bk: <http://www.w3.org/2002/01/bookmark#> .

  <https://ME.example.org/animals.ttl#Animals>
    a bk:Topic .
  <https://YOU.example.org/birds.ttl#Birds>
    a bk:topic ;
    bk:subTopicOf <https://ME.example.org/animals.ttl#Animals> .
```

### Created (optional)
* `<bookmark> <http://purl.org/dc/terms/created> "2023-11-21T14:16:16Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`
* Soukai stores created_at and updated_at on a separate metadata object, as follows:

```
@prefix : <#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix bookm: <./>.
@prefix boo: <http://www.w3.org/2002/01/bookmark#>.
@prefix crdt: <https://vocab.noeldemartin.com/crdt/>.

bookm:b93d9944-d54d-42f6-a39b-6ea3f9217763
    a boo:Bookmark;
    rdfs:label "sdf";
    boo:hasTopic "sdfg";o
    boo:id "b93d9944-d54d-42f6-a39b-6ea3f9217763";
    boo:recalls <http://example.com>.
bookm:b93d9944-d54d-42f6-a39b-6ea3f9217763-metadata
    a crdt:Metadata;
    crdt:createdAt "2023-11-21T12:50:32.051Z"^^xsd:dateTime;
    crdt:resource bookm:b93d9944-d54d-42f6-a39b-6ea3f9217763;
    crdt:updatedAt "2023-11-21T12:50:32.051Z"^^xsd:dateTime.
```

### Creator (optional)
There are two ways to link to the creator of a bookmark:
* `<bookmark> <http://purl.org/dc/terms/creator> <https://michielbdejong.solidcommunity.net/profile/card#me> .`
* `<bookmark> <http://xmlns.com/foaf/0.1/maker> <https://michielbdejong.solidcommunity.net/profile/card#me> .`

### Primary Key (optional)
Some apps add a unique identifier separate from the subject URI, like:
* `<bookmark> <http://www.w3.org/2002/01/bookmark#id> "b93d9944-d54d-42f6-a39b-6ea3f9217763" .`
* There is also the use of <http://purl.org/dc/terms/title#references> in [mark-book](https://github.com/mark-book/markbook/blob/123fadd211d9a42c43e2d9a5e7eeba81bb6b3fd6/bin/reddit.js#L32) but we're not entirely sure how that works.

## [Webmarks](https://webmarks.5apps.com)

Uses [@remotestorage/module-bookmarks](https://www.npmjs.com/package/@remotestorage/module-bookmarks) writing to `/bookmarks/archive/`:

```json
{
  "url": "https://www.google.com",
  "title": "Google",
  "description": "alfa",
  "tags": [
    "bravo"
  ],
  "createdAt": "2023-11-30T15:02:09.711Z",
  "updatedAt": "2023-11-30T15:08:29.561Z",
  "id": "a9308a39c5294b0b9269d0c650d8c5f1",
  "@context": "http://remotestorage.io/spec/modules/bookmarks/archive-bookmark"
}
```

## [Joybox](https://joybox.rosano.ca)

Uses [custom module](https://github.com/rosano/joybox/blob/master/os-app/_shared/JBXDocument/main.js) writing to `/joybox/jbx_documents/`:

```json
{
  "JBXDocumentURL": "https://alsarahthenubatones.bandcamp.com/album/silt",
  "JBXDocumentName": "Alsarah & the Nubatones: Silt",
  "JBXDocumentNotes": "",
  "JBXDocumentTags": [
    "#listen"
  ],
  "JBXDocumentCreationDate": "2023-11-30T15:26:46.811Z",
  "JBXDocumentModificationDate": "2023-11-30T15:26:46.811Z",
  "JBXDocumentID": "01HGGDDWGV1A9KFYMNWKFY63ZP",
  "JBXDocumentEmbedURL": "https://bandcamp.com/EmbeddedPlayer/v=2/album=704487352/size=large/tracklist=false/artwork=small/",
  "JBXDocumentImageURL": "https://f4.bcbits.com/img/a3732065656_5.jpg",
  "JBXDocumentDidFetch": true
}
```

## [BookmarkVault](https://chromewebstore.google.com/detail/bookmarkvault/fhgbcoincldpdmelkhhanmdlfgafmnma)

> [!NOTE]  
> Data stored is encrypted; module is direct REST calls; perhaps extension owns the data and remoteStorage considered a form of 'backup'.

Uses [custom module](https://gitlab.com/zookatron/bookmarkvault/-/blob/master/src/background/remotestorage.ts) writing to `/bookmarkvault/`:

```json
{
  "version": "0.1.2",
  "passphraseHash": "pbkdf2:Z7GnrZdSIQnuQokSQaVEAQ==:hwxlDGlGPwdc7jt1m+384dr3YK7JM8EFX1y3/lblqR4=",
  "data": "aes:yv5f7hFd2V0r51MyfcuO0Q==:EX4AWldZiwxBL2ZZONYZYwxAmA0Runl2pYXvH3l6m64wJrPiiM9oZp1F24njtBZ5A6TOk1iBhcIvyp2RsOSWoOMJ5oryjPG6fJfjxnzwr3atNRxUoQYOlU2cxaVlqSDgFc3oxSTz2beIyhCI5pCknL3vlEwdjpSIgKejlsNVo6+G6tKJKV2cbZ9IXy32bumfHBX6j/i6xHQpa7/NhxXbxA=="
}
```

## [poddit](https://vincenttunru.gitlab.io/poddit)

> [!NOTE]  
> Requests root access

Uses [custom module](https://gitlab.com/vincenttunru/poddit/-/blob/master/src/store/storeBookmark.ts) writing to `/public/poddit.ttl`:

```turtle
@prefix : <#>.
@prefix terms: <http://purl.org/dc/terms/>.
@prefix bookm: <http://www.w3.org/2002/01/bookmark#>.
@prefix XML: <http://www.w3.org/2001/XMLSchema#>.

<> terms:references <#0.716493818605209.ttl>.

<#0.716493818605209.ttl>
    a bookm:Bookmark;
    terms:created "2023-12-13T10:11:12.842Z"^^XML:dateTime;
    terms:title "alfa";
    bookm:recalls "https://google.com".
```

and to `/settings/publicTypeIndex.ttl`:

```turtle
:poddit
    a solid:TypeRegistration;
    solid:forClass bookm:Bookmark;
    solid:instance </public/poddit.ttl>.
```

## [Solid Bookmarks](https://bookmarks.pondersource.net)

> [!NOTE]  
> Requests root access

Uses [custom module?](https://github.com/pondersource/solidBookmarker/blob/main/src/utils/index.ts) writing to `/bookmarks/index.ttl`:

```turtle
:c13dbe2e-a0fe-48d0-a7d7-22a87b86a1f4
a bookm:Bookmark; dct:title "alfa"; bookm:recalls "https://www.google.com".
```

## [Booklice](https://scenaristeur.github.io/booklice/)

> [!NOTE]  
> Requests root access

Uses [custom module](https://github.com/scenaristeur/booklice/blob/main/src/store/modules/solid.js) writing to `/public/bookmarks/`:

```turtle
<#1702557925503> a <https://www.w3.org/ns/activitystreams#Note>;
    <https://www.w3.org/ns/activitystreams#name> "bravo";
    <https://www.w3.org/ns/activitystreams#content> "";
    <https://www.w3.org/ns/activitystreams#url> <https://www.google.com>;
    <https://www.w3.org/ns/activitystreams#actor> <https://rosano.solidcommunity.net/profile/card#me>;
    <https://www.w3.org/ns/activitystreams#published> "2023-12-14T12:45:25.503Z".
```

## [solid-rss](https://rrustom.github.io/solid-rss/)

> [!NOTE]  
> Requests root access

Uses [custom module](https://github.com/RRustom/solid-rss/blob/main/src/helpers/addArticle.js) writing to `/$ID.ttl`:

```turtle
:17025573933468186660586698863
    a schema:WebPage;
    schema:name "Should you add screenshots to documentation?";
    schema:url
    "https://thisisimportant.net/posts/screenshots-in-documentation/".
```

and to `/settings/publicTypeIndex.ttl`:

```turtle
:17025569190558494973613527352
    a solid:TypeRegistration;
    solid:forClass schema:DataFeed;
    solid:instance </503d4940-9a7c-11ee-8100-2bec63e97603.ttl>.
    
:170255691905621628230877571053
    a solid:TypeRegistration;
    solid:forClass schema:WebPage;
    solid:instance </50425250-9a7c-11ee-8100-2bec63e97603.ttl>.
```
