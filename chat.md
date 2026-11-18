# Chat

SolidOS has two distinct channel classes. Checked against [chat-pane 4.1.0 shortChatPane](https://github.com/SolidOS/chat-pane/blob/4a245abf680a16272cbc8afb07f4b50548ad20e1/src/shortChatPane.ts) and [longChatPane](https://github.com/SolidOS/chat-pane/blob/4a245abf680a16272cbc8afb07f4b50548ad20e1/src/longChatPane.ts). See also the [client-client chat specification](https://solid.github.io/chat/). Implementation observations here are not a claim that every chat app follows that specification.

## ShortChat (deprecated creation)

The short-chat pane recognises `mee:Chat`, not `mee:LongChat`. Its default new instance is `index.ttl#this`; callers may supply another IRI. Creating short chats is deprecated and prompts for confirmation, while viewing existing short chats and embedded comments remains supported.

Using the [overview prefixes](./overview.md):

```turtle
</chat/index.ttl#this> a mee:Chat ;
    dc:title "Chat" ;
    dc:created "2026-11-18T09:00:00Z"^^xsd:dateTime ;
    dc:author </profile/card#me> .
```

The channel metadata uses `dc:created` and `dc:author`. The message shape uses `dct:created`, `foaf:maker` and `sioc:content`. Include the `flow:message` link: the pane counts those links and uses them to locate a message document. Merely placing an unlinked message in a document is insufficient for that path.

```turtle
</chat/index.ttl#this> flow:message </chat/index.ttl#Msg1> .
</chat/index.ttl#Msg1>
    dct:created "2026-11-18T09:01:00Z"^^xsd:dateTime ;
    sioc:content "hi" ;
    foaf:maker </profile/card#me> .
```

## LongChat

The long-chat pane mints `mee:LongChat`, a title, creation timestamp and author when available. Its shared UI manages messages and participation. Do not require participation or shared-preference records as part of the minimal mint-time shape.

The dated daily message layout and container traversal described by the chat specification must be reviewed separately from channel creation. This audit has checked the pane entry point, not the shared UI's complete write and discovery paths; those details remain pending in the [audit](./solidos-source-audit.md).

## Historical descriptions (not revalidated)

The following material describes other apps and older observations. It is retained for compatibility research, not presented as a current SolidOS requirement.

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

## [Liqid Chat](https://liqid.chat)

> [!NOTE]  
> Requests root access

Uses [custom module?](https://github.com/o-development/ochat-client/tree/master/src/chat) writing to `/chats/`:

```turtle
:dd5e723f-7a61-4b59-9d51-70cf804e71fc
    dct:created "2023-12-14T13:29:16.759Z"^^xsd:dateTime;
    sioc:content "hello!";
    foaf:maker c:me;
    terms:liqidChatSignedCredential
```
