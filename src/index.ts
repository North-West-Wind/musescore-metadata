import * as cheerio from "cheerio";
import { MuseScore } from "./interfaces/common";
import { MuseSearch, MuseSearchOptions } from "./interfaces/search";
import { MuseSet, MuseSetOption as MuseSetOptions } from "./interfaces/set";
import fetch from "node-fetch";

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
    delete parsed.page.data.filters;
    return parsed;
}

async function muse(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Received HTTP status code ${response.status} when fetching data.`);
    return <MuseScore>parseBody(await response.text());
}

async function museSet(url: string, options: MuseSetOptions = {}) {
    if (options.all) url = url.split("?")[0];
    else if (options.page) url = url.split("?")[0] + "?page=" + options.page;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Received HTTP status code ${response.status} when fetching data.`);
    const parsed = <MuseSet>parseSet(await response.text());
    if (!options.all || parsed.pagination.totalCount < parsed.pagination.defaultPageSize) return parsed;
    for (let ii = 2; ii <= Math.ceil(parsed.pagination.totalCount / parsed.pagination.defaultPageSize); ii++) {
        const response = await fetch(url + "?page=" + ii);
        if (!response.ok) throw new Error(`Received HTTP status code ${response.status} when fetching data.`);
        const more = <MuseSet>parseSet(await response.text());
        parsed.scores = parsed.scores.concat(more.scores);
    }
    return parsed;
}

async function museSearch(query: string, options: MuseSearchOptions = {}) {
    let url = `https://musescore.com/sheetmusic?text=${encodeURIComponent(query)}`;
    if (options.page) url += `page=${options.page}`;
    if (options.sort) url += `sort=${options.sort}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Received HTTP status code ${response.status} when fetching data.`);
    return <MuseSearch>parseSearch(await response.text());
}

export { muse, museSet, museSearch };