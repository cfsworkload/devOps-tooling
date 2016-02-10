var chai = require("chai"),
    expect = chai.expect;
var mosca = require('mosca');

before(function() {

})

after(function() {
  
})

describe( "Mosca Server", function(done){

    describe( "create mosca server", function(){
        it( "server should start", function(done){
            var output;
            var mqttServe = new mosca.Server({});
            mqttServe.on('ready', setup);
            function setup() {
            		// if you get here the mosca server is up and running
  					output="Mosca server is up and running";
  					expect(output).to.equal("Mosca server is up and running");
    				done();
			}
         });
    });
});