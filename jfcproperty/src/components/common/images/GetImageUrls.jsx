const glob = require('glob');

const getImageUrls = () => {
  const files = glob.sync('./public/assets/images/property/rand/*');
  const urls = files.map(file => `/${file}`);
  return urls;
};

module.exports = getImageUrls;
