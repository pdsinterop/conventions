# Chat
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

To create a chat conversation, create a document, e.g., `/chat.ttl`, and add the following triples to it:

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

LongChat is similar to Chat, except that it uses LDP containers to discover the triples that describe the chat conversation,
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