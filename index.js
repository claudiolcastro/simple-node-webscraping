const axios = require('axios');
const cheerio = require('cheerio');

const http = require('http'),
  server = http.createServer();

server.on('request', async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('LAST VOXEL GAME RATINGS');
  response.end();
});

server.listen(3000, () => {
  console.log('Node server created at port 3000');
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

  const url = 'https://www.voxel.com.br/analises';
  
  axios.get(url)
    .then(response => {
      console.log(getData(response.data));
    })
    .catch(error => error);


