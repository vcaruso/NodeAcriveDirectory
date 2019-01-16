var RageAd = require("./enipri");

var eni = new RageAd.Eni( RageAd.Domain.ENIGela);

/*
eni.on("authenticate",function(error,result){

    printResult("authenticate",error,result);
    


});
*/

eni.authenticate("co24165","1505Silvia1984",function(error,result){

    printResult("authenticate",error,result);

});

eni.userExist("gl00021",function(error,result){

    printResult("userExist('gl00021') - "+"gl00021",error,result);

});

eni.findUser("co24165",function(error,result){

    printResult("findUser('gl00021')",error,result);

});


eni.findUsers("ENWS05",function(error,result){

    printResult("findUsers('CO24')",error,result);

});



eni.findUsersByName("Cafa filippo",function(error,result){

    printResult("findUsersByName('Caruso')",error,result);

});


eni.isUserMemberOf("co24165","Services.Internet.StandardUsers",function(error,result){

    printResult("isUserMemberOf('co24165')",error,result);

});

eni.getUserGroupMembership("co24165",function(error,result){

    printResult("getUserGroupMembership('co24165')",error,result);

});



function printResult(functionName,err,result){
    if(result)
    {
        console.log("---------------------------Result Of     "+ functionName +"--------------------------------")
        console.log(JSON.stringify(result));
        console.log("---------------------------End Result Of "+ functionName +"--------------------------------")
        
        console.log("");
        console.log("");
        console.log("");
    }
    if(err){
        console.log("---------------------------Error Of     "+ functionName +"---------------------------------")
        console.log(JSON.stringify(err));
        console.log("---------------------------End Error Of "+ functionName +"---------------------------------")
        console.log("");
        console.log("");
        console.log("");
    }
}

/*
function doStuff() {
    console.log("----");
  };
  
  function run() {
    setInterval(doStuff, 30000);
  };
  
  run();

  */