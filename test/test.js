var rageAd = require("../enipri");
var assert = require("assert");



describe("Active Directory ENI.PRI Test",function(){    

    var ad = new rageAd.Eni(rageAd.Domain.ENI);

    it("Exists user GL00002",function(done){

        

        ad.userExist("GL00002",function(error,result){


            

            assert.equal(result,true);
                
            
            done();

        });

        

    });

    it("Authenticate CO24165",function(done){

        ad.authenticate("co24165","1505Silvia1984",function(error,result){

            
            assert.equal(result,true);
                
            
            done();

        });

    });

    it("FindUser GL00002",function(done){

        ad.findUser("CO24165",function(error,result){

            
            assert.notEqual(result, null);
            assert.equal(result.displayName === "Abbenante Sebastiano");
            
            done();

        });

    });

    

});

describe("Active Directory ENI.PRI Ramo Gela",function(){


    var adg = new rageAd.Eni(rageAd.Domain.ENIGela);

    it("FindUser GL00002",function(done){

        adg.findUser("CO24165",function(error,result){

            
            assert.notEqual(result, null);
            assert.equal(result.displayName === "Abbenante Sebastiano");
            
            done();

        });

    });


})
