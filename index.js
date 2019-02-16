const request = require('request');
const endpoint = 'https://epic.gsfc.nasa.gov/api/natural';

const currentImageListing = () => {
  request(endpoint, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
};
