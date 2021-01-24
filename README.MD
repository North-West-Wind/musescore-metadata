# Musescore Metadata

Fetch score metadata from Musescore link.

## Usage

```js
const muse = require("musescore-metadata");
const metadata = await muse(/* Musescore link */);
```

## Example

### Code
```js
const muse = require("musescore-metadata");
const metadata = await muse("https://musescore.com/user/31734019/scores/5573180");
console.log(metadata);
```
### Output
```json
{
  id: 5573180,
  title: 'Surviv.io Saloon Music',
  thumbnail: 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png@500x660?no-cache=1607777113&bgclr=ffffff',
  parts: [ 'Piano' ],
  url: 'https://musescore.com/user/31734019/scores/5573180',
  user: {
    id: 31734019,
    name: 'NorthWestWind',
    url: 'https://musescore.com/user/31734019',
    image: 'https://musescore.com/static/musescore/userdata/avatar/default.jpg@150x150?cache=0',
    is_pro: false,
    is_staff: false,
    cover_url: 'https://musescore.com/static/musescore/userdata/cover/f/a/4/31734019.jpg?cache=0',
    date_created: 1554279087,
    _links: { self: [Object] }
  },
  duration: '00:35',
  pageCount: 1,
  created: 1558102538,
  updated: 1607777113,
  description: "I can't find any piano sheet on the internet so I created it myself :D",
  tags: [ 'Surviv.io' ],
  firstPage: 'https://musescore.com/static/musescore/scoredata/g/7cb72b8453d52b7f20417371678185640950a3c4/score_0.png'
}
```