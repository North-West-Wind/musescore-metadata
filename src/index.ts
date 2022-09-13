import * as cheerio from "cheerio";
import * as rp from "request-promise-native";
import { MuseScore } from "./interfaces/common";
import { MuseSearch } from "./interfaces/search";
import { MuseSet, MuseSetOption } from "./interfaces/set";

function findValueByPrefix(object: any, prefix: string) {
    for (const property in object) if (object[property] && property.toString().startsWith(prefix)) return object[property];
    return undefined;
}

function parseBody(body: string) {
    const $ = cheerio.load(body);
    const meta = $('meta[property="og:image"]')[0];
    const image = meta.attribs.content;
    const firstPage = image.split("@")[0];
    const stores = Array.from($('div[class^="js-"]'));
    const found = stores.find(x => x.attribs && x.attribs.class && x.attribs.class.match(/^js-\w+$/) && findValueByPrefix(x.attribs, "data-"));
    const store = findValueByPrefix((<any>found).attribs, "data-");
    if (!store) throw new Error("Cannot find store.");
    return Object.assign(JSON.parse(store).store.page.data.score, { firstPage });
}

function parseSet(body: string) {
    const $ = cheerio.load(body);
    const stores = Array.from($('div[class^="js-"]'));
    const found = stores.find(x => x.attribs && x.attribs.class && x.attribs.class.match(/^js-\w+$/) && findValueByPrefix(x.attribs, "data-"));
    const store = findValueByPrefix((<any>found).attribs, "data-");
    if (!store) throw new Error("Cannot find store.");
    const data = JSON.parse(store).store.page.data;
    return Object.assign(data.set, { user: data.user, scores: data.scores, pagination: data.pagination });
}

function parseSearch(body: string) {
    const $ = cheerio.load(body);
    const stores = Array.from($('div[class^="js-"]'));
    const found = stores.find(x => x.attribs && x.attribs.class && x.attribs.class.match(/^js-\w+$/) && findValueByPrefix(x.attribs, "data-"));
    const store = findValueByPrefix((<any>found).attribs, "data-");
    if (!store) throw new Error("Cannot find store.");
    const parsed = JSON.parse(store).store;
    delete parsed.user;
    delete parsed.notifications;
    delete parsed.page.experiments;
    parsed.page.data.filters.parts = parsed.page.data.filters.parts.map((x: any) => ({ id: x.id, count: parseInt(x.count), name: x.name }));
    parsed.page.data.filters.genres = parsed.page.data.filters.genres.map((x: any) => ({ id: x.id, count: parseInt(x.count), name: x.name, key_word: x.key_word, uri: x.uri }));
    return parsed;
}

async function muse(url: string) {
    const response = await rp({ uri: url, resolveWithFullResponse: true });
    if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
    return <MuseScore>parseBody(response.body);
}

async function museSet(url: string, option: MuseSetOption = {}) {
    if (option.all) url = url.split("?")[0];
    else if (option.page) url = url.split("?")[0] + "?page=" + option.page;
    const response = await rp({ uri: url, resolveWithFullResponse: true });
    if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
    const parsed = <MuseSet>parseSet(response.body);
    if (!option.all || parsed.pagination.totalCount < parsed.pagination.defaultPageSize) return parsed;
    for (let ii = 2; ii <= Math.ceil(parsed.pagination.totalCount / parsed.pagination.defaultPageSize); ii++) {
        const response = await rp({ uri: url + "?page=" + ii, resolveWithFullResponse: true });
        if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
        const more = <MuseSet>parseSet(response.body);
        parsed.scores = parsed.scores.concat(more.scores);
    }
    return parsed;
}

async function museSearch(query: string) {
    const response = await rp({ uri: `https://musescore.com/sheetmusic?text=${encodeURIComponent(query)}`, resolveWithFullResponse: true });
    if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
    return <MuseSearch>parseSearch(response.body);
}

export { muse, museSet, museSearch };