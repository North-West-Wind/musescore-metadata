(async() => {
    const muse = require(".");
    const metadata = await muse("https://musescore.com/user/31734019/scores/5573180");
    console.log(metadata);
})();