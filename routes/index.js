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
      response.json(getData(resp.data));
    })
    .catch(error => error);

});

const getData = html => {
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


module.exports = router;
