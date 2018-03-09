const https = require('https');
const request = require('request');


class Botcarefour {
  constructor (longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /**
   * Initialize
   * @return {Error | string} result
   */
  init (callback) {
    const options = { method: 'GET',
  url: 'https://api.fr.carrefour.io/v1/openapi/stores',
  qs: 
   { longitude: this.longitude,
     latitude: this.latitude,
     radius: '10000',
   },
  headers: 
   { accept: 'application/json',
     'x-ibm-client-secret': 'cJ5rG8fO8tV1jI3cO7gJ3qP3pM3pG4rV8mQ0yI5qX0bP0aR5oW',
     'x-ibm-client-id':  '64d77f04-4ad0-4dc4-a32e-f8cad1426369'
   } 
 };
    request(options, function (error, response, body) {
  if (error) return  console.error('Failed: %s', error.message);
  //console.log( body);
  callback(body);
  });
   
  }
  /**
   * Run
   * @return {Error | string} result
   */
  run () {
    var sync = true;
    this.init(result => {
      //console.log(result);
      this.setJson(result);
      sync = false;
      
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json =  JSON.parse(json) ;
  }

  getJson () {
    return this.json;
  }
  getAdress(i){
    return this.json.list[i].address;
  }
};

  

const test = new Botcarefour(2.3823087999999997 , 48.896551699999996);
test.run( );
console.log(test.getAdress(0));


