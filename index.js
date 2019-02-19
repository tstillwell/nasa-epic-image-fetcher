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

const retrieveImagesFromJSON = (json) => {
  const imageCount = json.length;
  const baseUrl = 'https://epic.gsfc.nasa.gov/archive/natural';
  for (var i = 0; i < imageCount; i = i + 1){
    let date = json[i].date;
    console.log(json[i]);
  }
};
