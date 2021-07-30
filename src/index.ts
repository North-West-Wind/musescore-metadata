import * as cheerio from "cheerio";
import * as rp from "request-promise-native";

interface MusescoreUser {
    id: number;
    name: string;
    url: string;
    image: string;
    is_pro: boolean;
    is_staff: boolean;
    is_moderator: boolean;
    cover_url: string;
    date_created: number;
    _links: { self: { href: string } };
}

interface Metadata {
    id: number;
    title: string;
    thumbnail: string;
    parts: string[];
    url: string;
    user: MusescoreUser;
    duration: string;
    pageCount: number;
    created: number;
    updated: number;
    description: string;
    tags: string[];
    firstPage: string;
}

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
    const store = findValueByPrefix((<any> found).attribs, "data-");
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

export default async function muse(url: string) {
    const response = await rp({ uri: url, resolveWithFullResponse: true });
    if (Math.floor(response.statusCode / 100) !== 2) throw new Error(`Received HTTP status code ${response.statusCode} when fetching data.`);
    return <Metadata> parseBody(response.body);
}