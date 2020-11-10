# Meeting
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

To create a meeting, create a document, e.g., `/meeting.ttl` and add the following triples to it:

```turtle
</meeting.ttl#this>            a                  mee:Meeting .
</meeting.ttl#this>            dc:author          </profile/card#me> .
</meeting.ttl#this>            dc:created         "2018-07-06T21:36:04Z"^^XML:dateTime .
</meeting.ttl#this>            flow:participation :id1555491215455 .
</meeting.ttl#this>            ui:backgroundColor "#ddddcc"^^XML:color .
</meeting.ttl#this>            mee:toolList       </meeting.ttl#this> .
</meeting.ttl#id1555491215455> ic:dtstart         "2019-04-17T08:53:35Z"^^XML:dateTime .
</meeting.ttl#id1555491215455> flow:participant   </profile/card#me> .
</meeting.ttl#id1555491215455> ui:backgroundColor "#c0d2fe" .
```

To add some details, pick a name like "Weekly Meeting" (note the use of `ical:summary` instead of `dc:title` here), a start and end date/time, a comment like "Discuss weekly things", and a location like "Utrecht", and add them using the ical namespace:

```turtle
</meeting.ttl#this> ical:summary  "Weekly Meeting" .
</meeting.ttl#this> ical:comment  "Discuss weekly things"; .
</meeting.ttl#this> ical:dtstart  "2019-04-19"^^XML:date; .
</meeting.ttl#this> ical:dtend    "2019-04-20"^^XML:date; .
</meeting.ttl#this> ical:location "Utrecht"; .
```

To add material to the meeting (let's say `https://example.com/agenda-meeting.html`), pick a timestamp like `1555492506279`, remove the old `mee:toolList` triple which only contained `</meeting.ttl#this>`, and add the following triples:

```turtle
</meeting.ttl#this>            mee:toolList    </meeting.ttl#this> ,
                                               </meeting.ttl#id1555492030413> . # updated from earlier
</meeting.ttl#id1555492506279> a               mee:Tool .
</meeting.ttl#this>            flow:attachment <https://example.com/agenda-meeting.html> .
</meeting.ttl#id1555492506279> mee:target      <https://example.com/agenda-meeting.html> .
</meeting.ttl#id1555492506279> rdf:label       "Agenda" .
</meeting.ttl#id1555492506279> mee:view        "iframe" .
```
