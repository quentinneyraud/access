const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  const client = await page.target().createCDPSession();
  await page.waitFor(1000)

  // taille des ressources
  // page.on('response', d => {
  //   if(!d.headers()['content-length']){
  //     console.log(d.url());
  //   }
  // })


  // lien sans title
  // const result = await page.evaluate(() => {
  //   let links = Array.from(document.querySelectorAll('a'))
  //   links = links.filter(el => el.title === '' || !el.title)

  //   return Promise.resolve(links.map(el => el.className))
  // })
  // console.log(result);

  // listeners de la page
  // const {result} = await client.send('Runtime.evaluate', {expression: 'window'})
	// const {listeners} = await client.send('DOMDebugger.getEventListeners', {objectId: result.objectId})
	// console.log(listeners)


})();
