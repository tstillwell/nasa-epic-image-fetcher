# nasa-epic-image-fetcher

Node module used to download images of Earth retrieved by NASA's 
Deep Space Climate Observatory
Earth Polychromatic Imaging Camera (EPIC) instrument.

## Installation
clone this repo then run

`npm install`

## Script Usage

To download the latest images run

`npm run fetch-latest`

By default, images are saved to a 'downloads' folder
in the project directory.

## Module Usage

To use as a node module

`const epicFetcher = require('./nasa-epic-image-fetcher');`

There are two functions available

`epicFetcher.fetchLatestImages()`

Downloads the most recently published images.

`epicFetcher.fetchImagesByDate(date)`

where date is a date string in the format 'YYYY-MM-DD'

Downloads available images for the specified date.

## NASA EPIC API documentation

> https://api.nasa.gov/api.html#EPIC

> https://epic.gsfc.nasa.gov/about/api
