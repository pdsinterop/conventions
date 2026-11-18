import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { Parser } from 'n3';

const overview = readFileSync('overview.md', 'utf8');
const prefixes = overview.match(/\x60\x60\x60turtle\n([\s\S]*?)\x60\x60\x60/)[1];
let blocks = 0;
const graphs = {};
for (const name of ['overview.md', 'meeting.md', 'chat.md']) {
  const text = readFileSync(name, 'utf8').split('## Historical descriptions')[0];
  graphs[name] = [];
  for (const match of text.matchAll(/\x60\x60\x60turtle\n([\s\S]*?)\x60\x60\x60/g)) {
    const quads = new Parser({ baseIRI: 'https://pod.example/' }).parse(prefixes + '\n' + match[1]);
    graphs[name].push(quads);
    blocks++;
  }
}
assert.equal(blocks, 7, 'all reviewed examples must be checked');
const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const meeting = 'http://www.w3.org/ns/pim/meeting#';
const minted = graphs['meeting.md'][0];
const list = minted.find(q => q.predicate.value === meeting + 'toolList').object;
assert.equal(list.termType, 'BlankNode', 'toolList must point to an RDF collection');
assert(minted.some(q => q.subject.equals(list) && q.predicate.value === rdf + 'first'));
assert(graphs['chat.md'][0].some(q => q.predicate.value === rdf + 'type' && q.object.value === meeting + 'Chat'));
assert(graphs['chat.md'][1].some(q => q.predicate.value === 'http://www.w3.org/2005/01/wf/flow#message'));
console.log('Validated ' + blocks + ' reviewed Turtle examples and collection/chat regressions');
