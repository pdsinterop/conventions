# Addressbook
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

You can create an addressbook containing persons and groups, by adding triples to RDF documents on your pod.
To create an addressbook, create a document for it, e.g., `/address-book/index.ttl`, and add the following triples to that document:

```turtle
</address-book/index.ttl#this> a         vcard:AddressBook .
</address-book/index.ttl#this> dc:title  "New address Book" .
</address-book/index.ttl#this> acl:owner </profile/card#me> .
```

You can create separate documents for the people index and for the groups index, as long as you link to those from the main `/address-book/index.ttl` document in the following ways:

```turtle
</address-book/index.ttl#this> vcard:nameEmailIndex </address-book/peopleIndex.ttl> .
</address-book/index.ttl#this> vcard:groupIndex     </address-book/groupIndex.ttl> .
```

To indicate that a person `/johnDoe.ttl` with full name "John Doe" is in addressbook `/address-book/index.ttl`, add the following triples:

```turtle
</johnDoe.ttl#this> vcard:inAddressBook </address-book/index.ttl#this> . # (NB: needs to be in /address-book/peopleIndex.ttl)
</johnDoe.ttl#this> a                   vcard:Individual .
</johnDoe.ttl#this> vcard:fn            "John Doe" .
```

To indicate that addressbook `/address-book/index.ttl` has a group called "Colleagues", add the following triples:

```turtle
</address-book/index.ttl#this>      vcard:includesGroup </address-book/colleagues.ttl#this> . # (NB: needs to be in /address-book/groupIndex.ttl)
</address-book/colleagues.ttl#this> a                   vcard:Group .
</address-book/colleagues.ttl#this> vcard:fn            "Colleagues" .
```

To indicate that `johnDoe.ttl#this` has a certain WebId's, [Solid OS uses](https://github.com/solid/contacts-pane/blob/v2.4.6/webidControl.js#L40-L42):
```turtle
</johnDoe.ttl#this>
  vcard:url [ a vcard:WebID ; vcard:value <https://johndoe.com/#me> ] ;
  vcard:url [ a vcard:WebID ; vcard:value <https://johndoe.org/#me> ] .
```
To deal with contacts whose WebID changes, add the new one, then remove the old one. Just like how you would deal with a contact who gets a new phone number, basically.

## Contacts imported through Prov4ITData


### Google People API

Using the [Google People API](https://developers.google.com/people?hl=en) we can transfer our Google contacts.

> Please note that this use case can be extended easily to [other Google Products](https://developers.google.com/products?hl=en).

#### Using Schema.org

A Google contact can be mapped to a `schema:Person`, along with the following properties:

| Google contact resource | `schema:Person`          |
| ----------------------- | ------------------------ |
| `givenName`             | `schema:givenName`       |
| `familyName`            | `schema:familyName`      |
| `displayName`           | `schema:alternativeName` |



[PROV4ITDaTa-demo-HTML]: https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/WWW21COMPANION/136/7b7ad165-8c01-11eb-8d84-166a08e17233/OUT/www21companion-136.html
[PROV4IDaTa-demo-pdf]: https://biblio.ugent.be/publication/8704820/file/8704821.pdf

[RML-mapping]: #rml-mapping-documents
[provenance]: #automatic-data-provenance-generation

[Comunica]: https://comunica.dev/
[DCAT]: https://www.w3.org/TR/vocab-dcat-2/
[DTP]: https://datatransferproject.dev/
[FAIR]: https://www.go-fair.org/
[Flickr]: https://www.flickr.com/about
[Flickr-API]: https://www.flickr.com/services/developer/api/
[HTTPS]: https://www.ietf.org/rfc/rfc2818.txt
[Google People API]: https://developers.google.com/people?hl=en
[Imgur]: https://imgur.com/
[Imgur-API]: https://apidocs.imgur.com/
[KGC]: https://www.knowledgegraph.tech/
[KGC-PDF]: assets/presentation-kgc2021.pdf
[KGC-VIDEO]: https://knowledgegraphconference.vhx.tv/packages/kgc-21-attendees/videos/ben-de-meester-prov4itdata-flexible-knowledge-graph-generation-within-reach
[LDP]: https://www.w3.org/TR/ldp/
[OAuth]: https://oauth.net/
[OAuth1.0a]: https://oauth.net/core/1.0a/
[OpenIDConnect]: https://openid.net/connect/
[PIMS]: https://edps.europa.eu/data-protection/our-work/subjects/personal-information-management-system_en
[PROV-O]: https://www.w3.org/TR/prov-o/
[RDF]: https://www.w3.org/TR/rdf-concepts/
[REST]: https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
[R2RML]: https://www.w3.org/TR/r2rml/
[RML.io]: https://rml.io
[RML-spec]: http://rml.io/spec.html
[RMLMapper-JAVA]: https://github.com/RMLio/rmlmapper-java
[RMLMapper-api]: https://github.com/RMLio/rmlmapper-webapi-js
[Schema.org]: https://schema.org/docs/full.html
[Solid]: https://inrupt.com/solid/
[Turtle]: https://www.w3.org/TR/turtle/
[WWW2021]: https://www2021.thewebconf.org/
[WWW2021-PDF]: assets/presentation-www2021.pdf
[WWW2021-VIDEO]: https://youtu.be/vwobfnAuxf0

