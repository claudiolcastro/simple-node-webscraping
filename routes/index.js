const express = require('express');
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (request, response) => {
  response.send('Application open and runing');
});

router.get('/voxel_ratings', async (request, response) => {
  const url = 'https://www.voxel.com.br/analises';
  axios.get(url)
    .then(resp => {
      response.json(getVoxelRatings(resp.data));
    })
    .catch(error => error);

});

router.get('/musal_aircrafts', async (request, response) => {
  const url = 'http://www2.fab.mil.br/musal/index.php/anvs';
  axios.get(url)
    .then(resp => {
      response.json(getMusalAirCrafts(resp.data));
    })
    .catch(error => error);

});

const getVoxelRatings = html => {
  data = [];
  const $ = cheerio.load(html);
  $('.games-data').each((i, elm) => {
    data.push({
      game_title: $(elm).find('.games-data-content').find('a.games-title-wrapper').attr('title'),
      voxel_game_rating: $(elm).find('.game-rate').find('.game-rate-content').text()
    });
  });
  return data;
};

const getMusalAirCrafts = html => {
  data = [];
  const $ = cheerio.load(html);
  $('.list-title').each((i, elm) => {
    data.push({
      aircraft_name: $(elm).find('a').text(),
      aircraft_url: `http://www2.fab.mil.br${$(elm).find('a').attr('href')}`
    });
  });
  return data;
};


module.exports = router;
