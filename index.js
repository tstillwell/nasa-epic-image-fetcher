const request = require('request-promise');
const fs = require('fs');
const downloadDir = './downloads';

const addDir = (dirPath) => {
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }
};

const fetchImages = () => {
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
  const options = {
  uri: 'https://epic.gsfc.nasa.gov/api/natural',
  headers: {
    'User-Agent': 'epic-api-fetcher'
  },
  json: true
  };
  if (!validDate(date)) {
    console.log('Invalid date. Please enter date in YYYY-MM-DD format');
  }
  else {
    
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

fetchImages();