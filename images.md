The following documents the way Prov4ITData modelled the resources from different service providers (i.e. Flickr, Imgur, Google).

Their toolchain is extensible to a wide variety of services.
They opted to initially support [Flickr](#Flickr) and [Imgur](#Imgur).
Both services share a common purpose: uploading and sharing image-content.
However, despite this commonality, they differ in various aspects such as the underlying data model and how the resources should be accessed.
Additionally, we support the [Google People API](#google-people-api).
This latter connector has a similar access method to Imgur (JSON Web API via OAuth 2.0), but contains data in a very different data model.

There are four different resources to model

- A single Image resource
- An Image Gallery that contains Image resources
- A Collection that contains Image Gallery resources
- A contact person

#### Schema.org

##### Image

Images can be mapped to `schema:ImageObject`-resources, which inherits properties from `schema:MediaObject` that can be used for describing the height, width, and more.

##### Image Gallery

An Image Gallery can be represented using `schema:ImageGallery`. Furthermore, the images it contains can be linked using the `schema:hasPart` property.

##### Collection

A Collection can be modeled through a `schema:Collection`, which can be linked to its Image Gallery resources through the `schema:hasPart` property.

#### DCAT

##### Image

We can model an Image as a `dcat:Distribution`.

> `dcat:Distribution`
> A specific representation of a dataset. A dataset might be available in multiple serializations that may differ in various ways, including natural language, media-type or format, schematic organization, temporal and spatial resolution, level of detail or profiles (which might specify any or all of the above).

The `dcat:Distribution` class has the following properties

- `title`
- `description`
- `issued`: date of issuance (e.g publication)
- [`dcat:accessURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url) *SHOULD* be used for the URL of a service or location that can provide access to this distribution, typically through a Web form, query or API call.
- [`dcat:downloadURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url) is preferred for direct links to downloadable resources.
- `dcat:mediaType`: The media type of the distribution as defined by IANA
- `dct:format`: The file format of the distribution.
- `dcat:accessService`, pointing to a `dcat:DataService`

##### Image gallery

We can model an Image Gallery as a `dcat:Dataset`, which can point to **zero or more** `dcat:Distribution`s.

##### Collection

[DCAT] contains a `dcat:Catalog` class, a curated collection of metadata about resources (e.g., datasets and data services in the context of a data catalog).
A `dcat:Catalog` can be linked to **zero or more** `dcat:Dataset`s.

### Flickr

Flickr is an online photo management and sharing application.
Its resources are made available through the [Flickr API][Flickr-API]. Flickr follows the [OAuth1.0a] protocol which requires that requests to protected resources are signed using the Consumer Secret and Token Secret. By specifying the protocol in the [RML Mapping][RML-mapping] the [RMLMapper-JAVA] takes care of the necessary steps for creating requests to protected resources. This also contributes to the extensibility of our solution: when a service decides to change to another protocol, only changes to the [RML Mapping][RML-mapping] must be made. Hence, avoiding the need for rebuilding code.

#### Using Schema.org

- A Flickr Photo resource can be mapped to a `schema:ImageObject`.
- A Flickr Photoset resource can be mapped to instances of `schema:ImageGallery`. The table below shows how its properties are mapped.
- A Flickr Collection, which can contain Albums/Photosets, can be mapped using the `schema:Collection` class. The table below shows how its properties are mapped.

| Flickr Photoset resource | `schema:ImageGallery` |
| ------------------------ | --------------------- |
| `id`                     | `schema:identifier`   |
| `title._content`         | `schema:name`         |
| `description._content`   | `schema:description`  |

| Flickr Collection resource | `schema:Collection`  |
| -------------------------- | -------------------- |
| `id`                       | `schema:identifier`  |
| `title`                    | `schema:name`        |
| `description`              | `schema:description` |

#### Using DCAT

- An image resource can be modeled by a `dcat:Distribution`
- A Flickr Album can contain image resources
- A Flickr Collection can contain Flickr Albums, which contain image resources. Therefore, a Flickr Collection can be modeled by a `dcat:Catalog` which can be linked to **zero or more** `dcat:Dataset`s (Albums)

### Imgur

Imgur, an image hosting and sharing website, enables its users to quickly upload and share images and GIFs on social media platforms (e.g. Reddit, Twitter, etc.).
Unlike the Flickr API, the [Imgur API][Imgur-API] uses OAuth 2.0.
When making requests for protected resources it suffices to add a bearer token to the HTTP headers.

The data fields mapped from the Imgur image resources are

- `id`: a unique identifier for that image
- `link`: the URL to the image
- `description`: the description of the image
- `views`: the number of views
- `height`: height of the image
- `width`: width of the image

#### Using Schema.org

An Imgur image can be mapped to a `schema:ImageObject`, along with the following properties:

| Imgur image resource | `schema:ImageObject`          |     |
| -------------------- | ----------------------------- | --- |
| `id`                 | `schema:identifier`           |     |
| `title`              | `schema:name`                 |     |
| `description`        | `schema:description`          |     |
| `link`               | `schema:url`                  | *   |
|                      | `schema:image`                | *   |
| `type`               | `schema:encodingFormat`       |     |
| `height`             | `schema:height`               |     |
| `width`              | `schema:width`                |     |
| `views`              | `schema:interactionStatistic` |     |

> *Multiple properties are suitable for mapping the `link` property.

#### Using DCAT

- An image resource can be modeled by a `dcat:Distribution`.
- A Imgur Album can contain image resources, and can be modeled by `dcat:Dataset`.
- An Imgur Gallery can contain Imgur Albums, which contain image resources. Therefore, an Imgur Gallery can be modeled by a `dcat:Catalog` which can be linked to **zero or more** `dcat:Dataset`s (Albums).
