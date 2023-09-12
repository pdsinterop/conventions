# Chat
_NB1: this currently mainly describes how Solid OS stores data on a Solid Pod._

_NB2: See the [client-client spec for chat](https://solid.github.io/chat/) which is more complete and more recent than this doc!_

# Old convention description from before the [client-client spec for chat](https://solid.github.io/chat/) follows

## ShortChat
To create a ShortChat conversation, create a document, e.g., `/chat.ttl`, and add the following triples to it:

```turtle
</chat.ttl#this> a          mee:LongChat .
</chat.ttl#this> dc:author  </profile/card#me> .
</chat.ttl#this> dc:created "2018-07-06T21:36:04Z"^^XML:dateTime .
</chat.ttl#this> dc:title   "Chat channel" .
```

To add a message in the chat conversation, for instance where you say "hi", generate a timestamp like `1555487418787` and add the following triples to `/chat.ttl`:

```turtle
</chat.ttl#Msg1555487418787> dct:created  "2019-04-17T07:50:18Z"^^XML:dateTime .
</chat.ttl#Msg1555487418787> sioc:content "hi" .
</chat.ttl#Msg1555487418787> foaf:maker   </profile/card#me> .
```

Note that for historical reasons, for the chat conversation as a whole, we use `dc:created` and `dc:author`, whereas for the individual chat messages we use `dct:created` and `foaf:maker`.

### Long Chat

LongChat is similar to ShortChat, except that it uses LDP containers to discover the triples that describe the chat conversation,
instead of having all the triples in one `chat.ttl` doc.
To create a chat conversation, pick a timestamp, e.g., `1555491215455`, create an LDP container, for instance `/long-chat/`, and in there, create an index document, e.g., `/long-chat/index.ttl`. To the index document, add the following triples:

```turtle
</long-chat/index.ttl#this>            a                    mee:LongChat .
</long-chat/index.ttl#this>            dc:author            </profile/card#me> .
</long-chat/index.ttl#this>            dc:created           "2018-07-06T21:36:04Z"^^XML:dateTime .
</long-chat/index.ttl#this>            dc:title             "Chat channel" .
</long-chat/index.ttl#this>            flow:participation   :id1555491215455 .
</long-chat/index.ttl#this>            ui:sharedPreferences :SharedPreferences .
</long-chat/index.ttl#id1555491215455> ic:dtstart           "2019-04-17T08:53:35Z"^^XML:dateTime .
</long-chat/index.ttl#id1555491215455> flow:participant     </profile/card#me> .
</long-chat/index.ttl#id1555491215455> ui:backgroundColor   "#c0d2fe" .
```

To add a message in the LongChat conversation, for instance where you say "hi", pick a filename, for instance, `/long-chat/2019/04/17/chat.ttl`, generate a timestamp like `1555487418787` and add the following triples to `/long-chat/2019/04/17/chat.ttl`:

```turtle
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> dct:created  "2019-04-17T07:50:18Z"^^XML:dateTime .
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> sioc:content "hi" .
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> foaf:maker   </profile/card#me> .
</long-chat/index.ttl#this>                       flow:message </long-chat/2019/04/17/chat.ttl#Msg1555487418787> .
```

Note that there is no need to make `/long-chat/2019/04/17/chat.ttl` discoverable from `/long-chat/index.ttl`, since it can be discovered by following the LDP Container member listings for `/long-chat/`, `/long-chat/2019/`, `/long-chat/2019/04/`, and `/2019/04/17/`.

Also note that here too, for the chat conversation as a whole, we use `dc:created` and `dc:author`, whereas for the individual chat messages we use `dct:created` and `foaf:maker`.

## One-to-One Chat

One-to-One chat on top of Solid is used by [snap-solid](https://github.com/ledgerloops/snap-solid).
It differs from ShortChat and LongChat in that it stores messages on the pod of the sender,
not on the pod of the chat initiator.

### A note about existing implementations
The TripleDoc-based [code for this](https://github.com/ledgerloops/snap-solid/blob/c4eb218/src/solid-models/SolidContact.ts)
was put into a subfolder of snap-solid, called solid-models. The solid-models project was cancelled
in favour of [solid-logic](https://github.com/solid/solid-logic), which contains the non-visual parts of Solid-UI.

### How it works
The two participants (call them Alice and Bob) first have to become friends.
For this, Alice adds a folder to her pod, which will become her inbox for Bob.
She gives herself Read/Write/Control access to it (accessTo+default),
gives Bob append access to it (accesTo only),
and (importantly) doesn't give anyone else access to it (other than maybe read access).
That way, she knows that if she sees a document in this container, and she doesn't
remember putting it there herself, it must have come from Bob. If she doesn't trust herself ;)
she could even give herself read-only access instead of Read/Write/Control, so the container
can really only be written to by Bob.

She then sends a [friend request](https://github.com/ledgerloops/snap-solid/blob/c4eb218/src/solid-models/PodData.ts#L217-L220)
to Bob's global `ldp.inbox`, linked from Bob's [profile document](https://pdsinterop.org/conventions/profile/#linking-to-your-pod).
Example:
```turtle
<#this> a <https://www.w3.org/ns/activitystreams#Follow> ;
    solid:p2pInbox <https://alice.com/bob/inbox/> ;
    solid:webId <https://alice.com/profile/card#me> ;
    solid:nick "Call me Al" .
```
Alice includes a link to her inbox for Bob in the friend request.
Bob creates a one-to-one inbox for Alice on his pod and
[responds](https://github.com/ledgerloops/snap-solid/blob/c4eb218/src/solid-models/PodData.ts#L424) with a friend request
to Alice's global inbox. So the message that requests a friendship is identical to the message that accepts it.
Example:
```turtle
<#this> a <https://www.w3.org/ns/activitystreams#Follow> ;
    solid:p2pInbox <https://bob.com/alice/inbox/> ;
    solid:webId <https://bob.com/profile/card#me> ;
    solid:nick "Call me Bobbie" .
```

Once both one-to-one inboxes exist and both counterparties know about them, they can send messages to each other.
Each message is stored twice, once posted to the other person's one-to-one inbox, and once on the sender's own pod.

### Chat message contents
The contents of these messages could be anything, for instance a human-readable text, using the `sioc:content` predicate:

```turtle
<#this> sioc:content "Hi, Bob!" .
```

#### SNAP messages
For now, the only known use of one-to-one chat is for [SNAP messages](https://github.com/ledgerloops/snap-solid/blob/ec7fc18/src/SnapContact.ts#L132-L150), example:
```turtle
<#this>
  snap:transId 1;
  snap:newState snap:Proposing ;
  snap:amount 15 ;
  snap:condition "3ge44fgef34343734" ;
  snap:preimage "3ge44fgef34343734" ;
  snap:expiresAt "2019-04-17T07:50:18Z"^^XML:dateTime .
  ```
