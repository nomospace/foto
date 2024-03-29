var Crawler = require("crawler").Crawler;

var c = new Crawler({
  "maxConnections": 10,

  // This will be called for each crawled page
  "callback": function(error, result, $) {

    // $ is a jQuery instance scoped to the server-side DOM of the page
//    $("#content a:link").each(function(a) {
//      c.queue(a.href);
//    });
  }
});

// Queue just one URL, with default callback
c.queue("http://phoot.163.com/qatest2");

// Queue a list of URLs
//c.queue(["http://jamendo.com/", "http://tedxparis.com"]);

// Queue URLs with custom callbacks & parameters
c.queue([
  {
    "uri": "http://photo.163.com/qatest2",
    "jQuery": false,

    // The global callback won't be called
    "callback": function(error, result) {
      console.log(result.body);
//      console.log("Grabbed", result.body.length, "bytes");
    }
  }
]);
