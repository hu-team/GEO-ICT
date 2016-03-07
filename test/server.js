
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8989");

// Test Case
describe("Basic response codes",function(){

  it("should return http code 200 on index request", function (done) {
    server
    .get("/1/1/2/2")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("should return http code 200",function(done){
    server
    .get("/1/1/2/2")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

});




// Test Case: Coordinates tests
describe("Testing distances",function(){

  var input = [
    [ 51.50344938606154, -0.1229561158615433, 52.37987006843646, 4.842485644105237],
    [37.7927179966777, -122.4554170705756, 55.7535529731822, 37.64350870442227],
    [10.0, 178.0, 10.0, -178.0],
    [90.0, 0.0, -90.0, -0.0],
    [89.9, 180.0, 89.9, 0.0],
    [89.9, 170.0, 89.9, -170.0]
  ];

  var expected = [
    354.0,
    9444.0,
    438.0,
    20020.0,
    22.24,
    3.862
  ];

  input.forEach(function (item, idx) {
    const expect = expected[idx].toFixed(9);

    it("should equal the given test results", function (done) {

      server
      .get("/"+item[0]+"/"+item[1]+"/"+item[2]+"/"+item[3])
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        parseFloat(res.body.distance).toFixed(9).should.be.approximately(expect, 0.1);
        done();
      });
    });
  });
});
