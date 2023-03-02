// scriptテスト
// config.xmlの検索、.envの確認 
module.exports = function (context) {
  if (!context.opts.platforms.includes('android')) return;

  const path = require('path');
  console.log('---start cordova-config.js');

  // process.envはmonaca環境のenvになるので、パス指定で読み取り
  const env = require('dotenv').config({ path: path.resolve(__dirname, '.env') });
  const scheme = env.parsed.APP_API_ENDPOINT_SCHEMA;
  console.log(`APP_API_ENDPOINT_SCHEMA ${scheme}`);

  const lib = require('cordova').cordova_lib;
  const configPath = path.join(__dirname, '/config.xml');
  // eslint-disable-next-line new-cap, no-path-concat
  const config = new lib.configparser(configPath);
  console.log('config.doc._root.attrib', config.doc._root.attrib);

  // const platforms = config.doc.find('platform');
  const schemeElement = config.doc.find("platform[@name='android']/preference[@name='scheme']");
  console.log('schemeElement', schemeElement);
  // schemeElement?.attrib.value = 'https';
  // console.log('platforms', platforms._children);
  /*
  for (let element in platforms) {
  // for (let index in platforms?._children) {
    console.log(`element`, element);
    console.log(`element.attrib`, element.attrib);
  }
  */
  // config.write();
  console.log('---end of cordova-config.js');
};
