const request = require('request');
const fs = require('fs');


const args = process.argv.splice(2);
const urlToFetch = args[0];
const fileLocation = args[1];

const fetchWebpage = function(url, cb) {
  let responseObj = {};
  request(url, (error, response, body) => {
    if (!error) {
      responseObj.size = response.headers['content-length'];
      responseObj.body = body;
      cb(responseObj);
    }
  });
};

fetchWebpage(urlToFetch, (res)=>{
  fs.writeFile(
    `websites/${fileLocation}`,
    res.body,
    function(err) {
      if (err) return console.log(err);
      console.log(`Downloaded and saved ${res.size} bytes to ${fileLocation}.`);
    });
});