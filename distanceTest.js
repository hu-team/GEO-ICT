var expect = require("chai").expect;
var assert = require("chai").assert;
var distance = require("./Distance.js");
var delta = 0.1;
var data1 = [
  {
    lat1: 51.50344938606154,
    long1: -0.1229561158615433,
    lat2: 52.37987006843646,
    long2: 4.842485644105237,
    a: 354.0
  },
  {
    lat1: 37.7927179966777,
    long1: -122.4554170705756,
    lat2: 55.7535529731822,
    long2: 37.64350870442227,
    a: 9444.0
  },
  {
    lat1: 10.0,
    long1: 178.0,
    lat2: 10.0,
    long2: -178.0,
    a: 438.0
  },
  {
    lat1: 10.0,
    long1: 178.0,
    lat2: 10.0,
    long2: -178.0,
    a: 438.0
  },
  {
    lat1: 90.0,
    long1: 0.0,
    lat2: -90.0,
    long2: -0.0,
    a: 20020.0
  },
  {
    lat1: 89.9,
    long1: 180.0,
    lat2: 89.9,
    long2: 0.0,
    a: 22.24
  },
  {
    lat1: 89.9,
    long1: 170.0,
    lat2: 89.9,
    long2: -170.0,
    a: 3.862
  }
]


data1.forEach(function(v, i){
  _ServiceTest(data1[i].lat1, data1[i].long1, data1[i].lat2, data1[i].long2, data1[i].a);
});

function _ServiceTest(lat1, long1, lat2, long2, a){
  describe("Distance Calculator", function(){
    it("Calculate distance between lat1 long1 lat2 long2", function(){
      var testdata = distance(lat1, long1, lat2, long2);
      assert.closeTo(testdata, a, delta, 'Ok!');
    });
  });
}
