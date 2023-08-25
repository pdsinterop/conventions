# Profile
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

## Profile document

To add information to your webid profile, you can use the following triples. Suppose your webid is `/profile/card#me`, then your profile document is `/profile/card` (without the `#me`). Add the following triples to it:

```turtle
</profile/card> a                 foaf:PersonalProfileDocument .
</profile/card> foaf:maker        </profile/card#me> .
</profile/card> foaf:primaryTopic </profile/card#me> .
```

## You as a person

Now say your name is "John Doe", then add these triples to your profile document to publish your identity as a person:

```turtle
</profile/card#me> a         foaf:Person .
</profile/card#me> a         schema:Person .
</profile/card#me> foaf:name "John Doe" .
</profile/card#me> http://www.w3.org/2006/vcard/ns#organization-name "My Company" .
</profile/card#me> http://www.w3.org/2006/vcard/ns#hasEmail "m@m.com" .
</profile/card#me> http://www.w3.org/2006/vcard/ns#bday "1990-01-01T01:00:00" .
</profile/card#me> http://www.w3.org/2006/vcard/ns#hasTelephone "+00 000 000 000" .
```

## Linking to your pod

Say your pod is at `/pod`, with the LDN inbox at `/pod/inbox/`, to link from your identity to your pod:

```turtle
</profile/card#me> solid:account </pod> .
</profile/card#me> pim:storage   </pod> .
</profile/card#me> ldp:inbox     </pod/inbox/> .
```

## Preferences

To publish some of your generic preferences to apps, use:

```turtle
</profile/card#me> pim:preferencesFile    </settings/prefs.ttl> .
</profile/card#me> solid:publicTypeIndex  </settings/publicTypeIndex.ttl> .
</profile/card#me> solid:privateTypeIndex </settings/privateTypeIndex.ttl> .
```
