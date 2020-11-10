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
