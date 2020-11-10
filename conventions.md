# Data Conventions
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

This document describes how apps and services store your data on your personal data store, for instance as triples in RDF documents on your Solid pod.
As most Solid pods will have at least some data on them that was edited through the databrowser,
these conventions are a good place to start when you develop third-party apps. In the future, we'll
see how this document can grow into a bigger participatory wiki of data shape conventions for Solid.

For short-hand, we will use the following namespace prefixes here:

```turtle
@prefix     ab: <http://www.w3.org/ns/pim/ab#> .
@prefix    acl: <http://www.w3.org/ns/auth/acl#> .
@prefix     dc: <http://purl.org/dc/elements/1.1/> .
@prefix    dct: <http://purl.org/dc/terms/> .
@prefix   flow: <http://www.w3.org/2005/01/wf/flow#> .
@prefix   foaf: <http://xmlns.com/foaf/0.1/> .
@prefix   ical: <http://www.w3.org/2002/12/cal/ical#> .
@prefix    ldp: <http://www.w3.org/ns/ldp#> .
@prefix    mee: <http://www.w3.org/ns/pim/meeting#> .
@prefix    pim: <http://www.w3.org/ns/pim/space#> .
@prefix     qu: <http://www.w3.org/2000/10/swap/pim/qif#>
@prefix    rdf: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix   sioc: <http://rdfs.org/sioc/ns#> .
@prefix  solid: <http://www.w3.org/ns/solid/terms#> .
@prefix   stat: <http://www.w3.org/ns/posix/stat#> .
@prefix     ui: <http://www.w3.org/ns/ui#> .
@prefix  vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix    xsd: <http://www.w3.org/2001/XMLSchema#> .
```

One of the most important RDF documents on your pod is your profile, which is the document that people get when they dereference your webid. We'll look at that first. After that, we'll look at each of the tools that can be created with the databrowser's + button: Addressbook, Notepad, Chat, LongChat, Meeting, Event, Link, Document, Folder, and Source.

## Profile
See [profile](./profile.md)

## Address Book

See [addressbook](./addressbook.md)

## Notepad
See [notepad](./notepad.md)

## Chat
See [chat](./chat.md)

## Meeting

See [meeting](./meeting.md)

## Finance

See [finance](./finance.md)

## Schedulable Event

// TODO

## Link

// TODO

## Dokieli Document

A 'Dokieli Document' is an HTML document with some linked-data annotations, but otherwise just HTML. So the 'Dokieli Document' tool does not store data in triples in RDF sources like most other tools do, but instead allows you to run an online HTML editor right on your pod. When you click 'Save' in the Dokieli editor, the HTML document is written to your pod using a http PUT request, and in that sense this editor makes use of the LDP (read-write web) functionalities of your pod. You can also use Dokieli as a third-party app, on https://dokie.li.

## Folder

When you add a 'Folder' tool, the databrowser creates a new LDP container. As an example, here are the triples that describe an LDP container `/foo/` with subcontainer `/foo/sub/` and member document `/foo/bar.ttl`:

```turtle
</foo/> a            ldp:BasicContainer .
</foo/> a            ldp:Container .
</foo/> a            ldp:Resource .
</foo/> dct:modified "2019-04-17T08:42:16Z"^^XML:dateTime .
</foo/> stat:mtime   1555490536.16 .
</foo/> stat:size    4096 .
</foo/> ldp:contains </foo/sub/> .
</foo/> ldp:contains </foo/bar.ttl> .
```

## Source

When you add a 'Source' tool to a container, it creates an empty document as an LDP resource. The content type will be guessed from the extension; for instance, `source.ttl` will be a Turtle document, `source.txt` will be `text/plain`, etc.
