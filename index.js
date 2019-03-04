const request = require('request-promise');
const fs = require('fs');
const moment = require('moment');
const downloadDir = './downloads';

const addDir = (dirPath) => { // create dir if it does not exist
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }
};

const fetchLatestImages = () => { // Download current images listed by API
  const options = {
  uri: 'https://epic.gsfc.nasa.gov/api/natural',
  headers: {
    'User-Agent': 'epic-api-fetcher'
  },
  json: true
  };
  addDir(downloadDir);
  request(options)
    .then(function (body) {
      retrieveImagesFromJSON(body);
    })
    .catch(function (err) {
      throw err;
    });
};

const fetchImagesByDate = (date) => {
  const uriString = `https://epic.gsfc.nasa.gov/api/natural/date/${date}`;
  const options = {
  uri: uriString,
  headers: {
    'User-Agent': 'epic-api-fetcher'
  },
  json: true
  };
  if (!validDate(date)) {
    throw 'Invalid date. Please enter date in YYYY-MM-DD format';
  }
  else {
    request(options)
      .then(function (body) {
        retrieveImagesFromJSON(body);
      })
      .catch(function (err) {
        throw err;
      });
  }
}

const retrieveImagesFromJSON = (json) => {
  const date = json[0].date.substring(0, 10);
  addDir(downloadDir + "/" + date);
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const imageCount = json.length;
  const baseUrl = 'https://epic.gsfc.nasa.gov/archive/natural';
  for (let i = 0; i < imageCount; i = i + 1){
    let imageName = json[i].image + ".png";
    let imagePath = `/${year}/${month}/${day}/png/${imageName}`;
    let imageURI = baseUrl + imagePath;
    let filePath = `${downloadDir}/${date}/${imageName}`;
    request(imageURI).pipe(fs.createWriteStream(filePath));
    console.log(imageURI);
  }
};

const validDate = (dateString) => {
  // return true if dateString is in YYYY-MM-DD format
  return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

module.exports = { fetchLatestImages, fetchImagesByDate };
