var chai = require("chai"),
    expect = chai.expect;
var request = require('request');
before(function() {

})

after(function() {

})

describe( "Query database to confirm message was sent ", function(){

        it( "send request ... if id property exists message was sent to database", function(done){
              this.timeout(10000);
              output=process.env.url+'/my_sample_db/_all_docs'
              request.get( output , function (err, res, body){
                     expect(res.statusCode).to.equal(200);
                     output = JSON.parse(res.body);
                     expect(output.rows[0].id).to.not.equal(null);
                     done();
               });
         });

});
