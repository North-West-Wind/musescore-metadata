import { museSet } from "../src";

// Newer Super Mario Bros. Wii set
// I'm saving this to a file for reading: npx tsx tests/muse-set.ts > set.json
museSet("https://musescore.com/user/33470610/sets/5122760").then(res => console.log(JSON.stringify(res)));