const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ignore Favicon request
app.use((request, response, next) => {
  if (request.url === 'favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.end();
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.info('Application runing at port 3000');
});

app.get('/', (request, response) => {
  response.send('Application open and runing');
});

app.get('/voxel_ratings', async (request, response) => {
  const data = await scraping();
  response.json(data);
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

const scraping = () => {
  const url = 'https://www.voxel.com.br/analises';
  
   axios.get(url)
    .then(response => {
      const data = getData(response.data)
      return data;
    })
    .catch(error => error);
};


