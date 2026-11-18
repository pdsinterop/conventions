# Movies

## Media Kraken

Checked against [Movie](https://github.com/pondersource/media-kraken/blob/3eb02c5f5471d214cefd4fa94992a37d9b4f8f5e/src/models/soukai/Movie.ts), [WatchAction](https://github.com/pondersource/media-kraken/blob/3eb02c5f5471d214cefd4fa94992a37d9b4f8f5e/src/models/soukai/WatchAction.ts) and [SolidUser](https://github.com/pondersource/media-kraken/blob/3eb02c5f5471d214cefd4fa94992a37d9b4f8f5e/src/models/users/SolidUser.ts). These describe Media Kraken's model, not every movie app.

### Discovery and document boundaries

The app follows the user's private type index and finds a `solid:TypeRegistration` with `solid:forClass schema:Movie` and `solid:instanceContainer`. On creation it registers both Movie and WatchAction against the same movies container, chosen from the profile's first storage URL. Follow the profile/type-index links rather than requiring one type-index filename.

Movies are separate LDP documents. The current model mints a movie fragment in its document; watch actions belong to the movie and are saved in the same document. A watch action is not a separately contained LDP resource (`ldpResource = false`). Legacy fragmentless identifiers and document mismatches have an explicit migration path in the app.

### Fields

The namespace is **https://schema.org/** (HTTPS), which differs from the HTTP namespace used by some other apps.

| App field | RDF predicate | Model meaning |
| --- | --- | --- |
| Movie type | `rdf:type schema:Movie` | Identifies the movie |
| title | `schema:name` | Required by the app model |
| description | `schema:description` | Optional string |
| releaseDate | `schema:datePublished` | Optional date |
| posterUrl | `schema:image` | Optional IRI-valued key |
| externalUrls | `schema:sameAs` | Multiple IRI-valued keys |
| WatchAction type | `rdf:type schema:WatchAction` | A recorded viewing |
| object | `schema:object` | Required link to the movie |
| startTime / endTime | `schema:startTime` / `schema:endTime` | Viewing dates |

The app's `watched` flag is derived from the presence of loaded WatchAction records. There is no separate boolean `schema:watched` field. Multiple viewings can be represented by multiple actions.

Example (using overview prefixes plus an explicit HTTPS Schema.org prefix):

```turtle
@prefix schema: <https://schema.org/> .

</movies/metropolis#it>
    a schema:Movie ;
    schema:name "Metropolis" ;
    schema:image <https://example.com/poster.jpg> ;
    schema:sameAs <https://example.com/catalog/metropolis> ;
    dct:created "2026-11-18T09:00:00Z"^^xsd:dateTime ;
    dct:modified "2026-11-18T09:00:00Z"^^xsd:dateTime .
</movies/metropolis#viewing1>
    a schema:WatchAction ;
    schema:object </movies/metropolis#it> ;
    schema:startTime "2026-11-18T09:00:00Z"^^xsd:dateTime ;
    schema:endTime "2026-11-18T11:00:00Z"^^xsd:dateTime ;
    dct:created "2026-11-18T11:00:00Z"^^xsd:dateTime .
```

### Shared-module coverage and compatibility

The [Solid Data Module movies reader](https://github.com/pondersource/data-modules/tree/49bbc7fb230936ec198a6cd19ca30566ed755809/movies/vanilla) reads expanded JSON-LD Movie and WatchAction nodes. It tolerates absent optional fields and accepts both IRI and legacy literal values for link fields. This reader tolerance does not make literal-valued links the preferred writer format.

It retains movie IDs and the action's `listingId`, enabling the relationship to be checked. `listingId` is a module API field, not an RDF predicate. The historical `listingUr` TypeScript name was a declaration typo.

The module remains read-only: it does not implement type-index discovery, writing, deletion or migration. Media Kraken still uses Soukai at runtime. See [app acceptance work](https://github.com/pondersource/media-kraken/pull/1); a passing parser fixture alone does not certify browser interoperability.

No corresponding remoteStorage movie schema has been verified here. A backend adapter must preserve action multiplicity, identifiers, dates and links before formats can be considered interchangeable.
