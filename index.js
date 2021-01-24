const cheerio = require("cheerio");
const rp = require("request-promise-native");

function findValueByPrefix(object, prefix) {
    for (const property in object) if (object[property] && property.toString().startsWith(prefix)) return object[property];
    return undefined;
}

function parseBody(body) {
    const $ = cheerio.load(body);
    const meta = $('meta[property="og:image"]')[0];
    const image = meta.attribs.content;
    const firstPage = image.split("@")[0];
    const stores = Array.from($('div[class^="js-"]'));
    const found = stores.find(x => x.attribs && x.attribs.class && x.attribs.class.match(/^js-\w+$/) && findValueByPrefix(x.attribs, "data-"));
    const store = findValueByPrefix(found.attribs, "data-");
    if (!store) throw new Error("Cannot find store.");
    const data = JSON.parse(store).store.page.data;
    const id = data.score.id;
    const title = data.score.title;
    const thumbnail = data.score.thumbnails.large;
    const parts = data.score.parts_names;
    const url = data.score.share.publicUrl;
    const user = data.score.user;
    const duration = data.score.duration;
    const pageCount = data.score.pages_count;
    const created = data.score.date_created;
    const updated = data.score.date_updated;
    const description = data.score.truncated_description;
    const tags = data.score.tags;
    return { id, title, thumbnail, parts, url, user, duration, pageCount, created, updated, description, tags, firstPage };
}

async function getData(url) {
    const response = await rp({ uri: url, resolveWithFullResponse: true });
    if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
    return parseBody(response.body);
}

module.exports = getData;