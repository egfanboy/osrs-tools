const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');

function formatItem(item) {
    let str = item;

    if (item.includes('potion')) {
        str = `${str}(3)`;
    }

    str = str.replace(/\_/g, ' ');
    str = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

    return str;
}

(async () => {
    const index = process.argv.findIndex(v => v === '-r');

    const items = process.argv.slice(index + 1, process.argv.length);

    const browser = await puppeteer.launch();

    const sources = (await Promise.all(
        items.map(async item => {
            const page = await browser.newPage();
            await page.goto(`https://oldschool.runescape.wiki/w/${item}`);

            const src = await page.evaluate(
                el => el.getAttribute('src'),
                await page.$(`img[alt="${formatItem(item)}.png"]`)
            );
            return { src, item };
        })
    )).reduce((acc, { src, item }) => {
        acc[item] = src;
        return acc;
    }, {});

    console.log('Adding the following to your clipboard', JSON.stringify(sources, null, 2));
    clipboardy.writeSync(JSON.stringify(sources, null, 2));

    await browser.close();
})();

process.on('unhandledRejection', error => {
    console.error(`The following error occured: ${error.message}`);
    process.exit(1);
});
