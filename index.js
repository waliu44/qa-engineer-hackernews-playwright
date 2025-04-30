const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/newest');

  const articles = await page.$$('tr.athing');

  if (articles.length !== 100) {
    console.log(`Expected 100 articles, but found ${articles.length}`);
    await new Promise(resolve => setTimeout(resolve, 5000)); // <-- wait 5 seconds
    await browser.close();
    return;
  } else {
    console.log('Found 100 articles, continuing...');
  }

  const timestamps = [];

  for (let i = 0; i < 100; i++) {
    const article = articles[i];
    const articleId = await article.getAttribute('id');
    const subtextSelector = `#score_${articleId} ~ .subtext span.age a`;
    const timeElement = await page.$(subtextSelector);

    if (timeElement) {
      const timeHref = await timeElement.getAttribute('href');
      const timeMatch = timeHref.match(/(\d+)$/);

      if (timeMatch) {
        timestamps.push(parseInt(timeMatch[1]));
      }
    }
  }

  const isSorted = timestamps.every((time, index) => {
    return index === 0 || time <= timestamps[index - 1];
  });

  if (isSorted) {
    console.log('Articles are sorted from newest to oldest!');
  } else {
    console.log(' Articles are NOT sorted correctly.');
  }

  // Wait 5 seconds before closing so the page stays visible
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
})();
