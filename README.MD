# Musescore Metadata

Fetch score metadata from Musescore link.

## Usage

```js
// Using require
const { muse } = require("musescore-metadata");
// Using import
import { muse } from "musescore-metadata";
const metadata = await muse(/* Musescore link */);
```
Version v2 also added support for Musescore Sets
```js
const { museSet } = require("musescore-metadata");
```

## Example

### Code
```js
const { muse } = require("musescore-metadata");
const metadata = await muse("https://musescore.com/user/31734019/scores/5573180");
console.log(metadata);
```
### Sample Output
```json
{
  "id": 5573180,
  "title": 'Surviv.io Saloon Music',
  "file_score_title": 'Surviv.io Saloon Music',
  "subtitle": '',
  "description": 'Solo',
  "can_manage_score": false,
  "parts": 1,
  "parts_names": [ 'Piano' ],
  "thumbnails": {
    "small": 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png@180x252?no-cache=1641618629&bgclr=ffffff',
    "medium": 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png@300x420?no-cache=1641618629&bgclr=ffffff',
    "large": 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png@500x660?no-cache=1641618629&bgclr=ffffff',
    "original": 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png?no-cache=1641618629'
  },
  "share": {
    "publicUrl": 'https://musescore.com/user/31734019/scores/5573180',
    "embedUrl": 'https://musescore.com/user/31734019/scores/5573180/embed',
    "url": 'https%3A%2F%2Fmusescore.com%2Fuser%2F31734019%2Fscores%2F5573180',
    "title": 'Surviv.io+Saloon+Music',
    "isShowSecretUrl": false
  },
  "user": {
    "id": 31734019,
    "name": 'NorthWestWind',
    "url": 'https://musescore.com/user/31734019',
    "image": 'https://musescore.com/static/musescore/userdata/avatar/b/a/6/31734019.jpg@150x150?cache=1640325529',
    "is_pro": false,
    "is_staff": false,
    "is_moderator": false,
    "cover_url": 'https://musescore.com/static/musescore/userdata/cover/f/a/4/31734019.jpg?cache=1638884608',
    "date_created": 1554279087,
    "is_publisher": false,
    "_links": { self: [Object] }
  },
  "url": 'https://musescore.com/user/31734019/scores/5573180',
  "duration": '00:31',
  "composer_name": 'Composer',
  "pages_count": 1,
  "date_created": 1558102538,
  "date_updated": 1641618629,
  "favorite_count": 27,
  "comments_count": 9,
  "instruments": [ { name: 'Piano', url_to_search: '/sheetmusic/piano', count: 1 } ],
  "hits": 1438,
  "is_draft": false,
  "processing": 'ready',
  "revisions_count": 1,
  "revision_id": 12211412,
  "has_custom_video": false,
  "has_custom_audio": false,
  "is_private": 0,
  "is_origin": false,
  "is_public_domain": false,
  "truncated_description": "I can't find any piano sheet on the internet so I created it myself :D\r\n\r\nAlso, you can now download the PDFs from https: [url state=primary href="https://musescore.com/user/31734019/scores/5573180"]Read more[/url]',
  "instrumentations": [
    {
      "url_to_search": '/sheetmusic/solo',
      "id": 114,
      "name": 'Solo',
      "parent_id": 0,
      "weight": 0,
      "is_active": 1,
      "is_auto": 1,
      "uri": 'solo'
    }
  ],
  "rating": {
    "rating": 4.57,
    "count": 18,
    "count_to_visible": 0,
    "stats": [ [Object], [Object], [Object], [Object] ],
    "user_rating": null,
    "abusive_ban_time": null,
    "abusive_ban_time_remain": null
  },
  "publisher": null,
  "is_official": false,
  "body": "I can't find any piano sheet on the internet so I created it myself :D\r\n\r\nAlso, you can now download the PDFs from https://northwestwind.ml/scores/',
  "tags": [ 'Surviv.io' ],
  "is_downloadable": 1,
  "is_blocked": false,
  "license": 'cc-by-nc-sa',
  "instrumentation_id": 114,
  "is_original": false,
  "measures": 19,
  "keysig": 'F major, D minor',
  "license_id": 7,
  "license_version": '4.0',
  "song_name": 'Swing Door Saloon',
  "artist_name": 'Squirky Music Library',
  "_links": {
    "self": { href: 'https://musescore.com/user/31734019/scores/5573180' }
  },
  "firstPage": 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png'
}
```