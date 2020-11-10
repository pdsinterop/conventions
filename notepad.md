# Notepad
_NB: this currently mainly describes how Solid OS stores data on a Solid Pod._

To create a new notepad at `/notepad.ttl`, add the following triples into it:

```turtle
</notepad.ttl#this> a          pim:Notepad .
</notepad.ttl#this> dc:author  </profile/card#me> .
</notepad.ttl#this> dc:created "2019-04-17T08:05:19Z"^^XML:dateTime .
</notepad.ttl#this> dc:title   "Shared Notes" .
```

Now to indicate that his notepad is empty, add an empty first line to it:

```turtle
</notepad.ttl#this>  pim:next   </notepad.ttl#this_line0> .
</notepad.ttl#line0> dc:author  </profile/card#me> .
</notepad.ttl#line0> dc:content "" .
```

Now indicate that this is the last line, set this line's `pim:next` to the notepad itself:

```turtle
</notepad.ttl#line0> pim:next </notepad.ttl#this> .
```

To add a line to the notepad, for instance 'first line', first update the content of the first line, by replacing

```turtle
</notepad.ttl#line0> dc:content "" .
```

with

```turtle
</notepad.ttl#line0> dc:content "first line" .
```

and then add a new participation-line below it, where the user can type their next line; pick a timestamp, for instance `1555488949899`, and add the following triples:

```turtle
</notepad.ttl#this>            flow:participation </notepad.ttl#id1555488949899> .
</notepad.ttl#id1555488949899> flow:participant   </profile/card#me> .
</notepad.ttl#id1555488949899> ical:dtstart       "2019-04-17T08:05:22Z"^^XML:dateTime .
</notepad.ttl#id1555488949899> ui:backgroundColor "#c0d2fe" .
```

Note that the first line still is the only line in the document, apart from the participation line. To add a second line, start making proper use of the `pim:next` attribute, by linking the first line to the second line, and then linking the second line back up to the notepad as a whole. The participation line stays as it is. The result will then look like this:

## Main notepad

```turtle
</notepad.ttl#this> a                  pim:Notepad .
</notepad.ttl#this> dc:author          </profile/card#me> .
</notepad.ttl#this> dc:created         "2019-04-17T08:05:19Z"^^XML:dateTime .
</notepad.ttl#this> dc:title           "Shared Notes" .
</notepad.ttl#this> pim:next           </notepad.ttl#this_line0> .
</notepad.ttl#this> flow:participation :id1555488949899 .
```

## Participation

```turtle
</notepad.ttl#id1555488949899> flow:participant   </profile/card#me> .
</notepad.ttl#id1555488949899> ical:dtstart       "2019-04-17T08:05:22Z"^^XML:dateTime .
</notepad.ttl#id1555488949899> ui:backgroundColor "#c0d2fe" .
```

## First line

```turtle
</notepad.ttl#line0> dc:author  </profile/card#me> .
</notepad.ttl#line0> dc:content "first line" .
</notepad.ttl#line0> pim:next   :id1555489499814  .
```

## Second line

```turtle
</notepad.ttl#id1555489499814> dc:author  </profile/card#me> .
</notepad.ttl#id1555489499814> dc:content "second line" .
</notepad.ttl#id1555489499814> pim:next   </notepad.ttl#this> .
```
