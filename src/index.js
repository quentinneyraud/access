import defaultConfig from './config.default'
import { getRulesByPreset } from './rules'
import { mergeExistingKey } from './utils'
import puppeteer from 'puppeteer'

export default (config) => {
  config = Object.assign({}, defaultConfig, config)

  console.log(config)

  // let rules = config.presets.reduce((acc, preset) => {
  //   return acc.concat(...getRulesByPreset(preset))
  // }, [])

  // config.rules = rules


}


// (async () => {
//   const browser = await puppeteer.launch();

//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000');
//   const client = await page.target().createCDPSession();
//   await page.waitFor(1000)

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


// })();


/**
 * Logic flow
 */

// read CLI args
// configfile path, adress to test, verbosity level, report on file or on terminal, exclude paths, exclude pattern paths, report only errors or warning

// read and validate .rcfile
// all CLI args should be on rcfile. CLI args > rcfile args

// Go on each page, get all useful infos and pass them to each rules
// get object from each rule containing like this:
// {
//   ok: false,
//   message: 'Erreur de alt dans les images',
//   errors: [{
//     line: 3,
//     message: 'Il manque un alt'
//   }, {
//     line: 5,
//     message: 'Alt empty'
//   }]
// }

// abstract puppeteer ?
// with layer on top
// GetHTML() onResource() ...
