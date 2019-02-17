const request = require('request-promise');

const options = {
    uri: 'https://epic.gsfc.nasa.gov/api/natural',
    headers: {
        'User-Agent': 'epic-api-fetcher'
    },
    json: true
};

const currentImageListing = () => {
  request(options)
    .then(function (body) {
      retrieveImagesFromJSON(body);
    })
    .catch(function (err) {
      throw err;
    });
};

const retrieveImagesFromJSON = (body) => {
  console.log(body);
};
