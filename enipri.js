///
/// Modulo per il controllo Active Directory dell'Utente
///
///

var ActiveDirectory = require("activedirectory");
var util = require("util");
var events = require("events");







var EniAd = function (Domain) {



    self = this;

    this.configEni = {
        url : 'ldap://10.107.147.126',
        baseDN : 'dc=eni,dc= pri',
        username: 'co24165@eni.pri',
        password: '1505Silvia1984'
    }
    this.configEniGela = {
        url : 'ldap://10.107.147.126',
        baseDN : 'OU=Gela - Raffineria,OU=Eni Divisione Refining&Marketing,dc=eni,dc= pri',
        username: 'co24165@eni.pri',
        password: '1505Silvia1984'
    }
    this.configEninet = {
        url : 'ldap://10.107.135.252',
        baseDN : 'dc=eni,dc=intranet',
        username: 'co24165@eni.pri',
        password: '1505Silvia1984'
    }

    this.ad = null;
    switch(Domain){
        case "ENI":
            this.ad = new ActiveDirectory(this.configEni);
            break;
        case "ENIGela":
            this.ad = new ActiveDirectory(this.configEniGela);
            break;
        case "ENINET":
            this.ad = new ActiveDirectory(this.configEninet);
            break;

    }
    
    

}

EniAd.prototype = new events.EventEmitter();


/**
 * 
 * @param {*} userid La Useird senza Dominio
 * @param {*} password  La Password
 * @param {*} callBack  Optional il callback da chiamare 
 */
EniAd.prototype.authenticate = function(userid,password,callBack){
    
   
    this.ad.authenticate(userid+"@eni.pri",password,function(err,result){

        if(callBack)
            callBack(err,result);
        self.emit("authenticate",err,result);
        
    });
    
}


/**
 * 
 * @param {*} userid La userid da controllare
 * @param {*} callBack La funzione da eseguire come callback
 */
EniAd.prototype.userExist = function(userid,callBack){

    this.ad.userExists(userid,function(error,exists){

        if(callBack)
            callBack(error,exists);
        self.emit("exists",error,exists);

    });

}

/**
 * 
 * @param {*} userid La userid cercata
 * @param {*} callBack la funzione da eseguire dopo la ricerca
 */
EniAd.prototype.findUser = function(userid,callBack){

    this.ad.findUser(userid,function(err,result){

        if(callBack)
            callBack(err,result);
        self.emit("findUser",err,result);

    });

};


EniAd.prototype.findUsers = function(userid,callBack) {

    var query = "cn=*"+userid+"*";

    this.ad.findUsers(query,function(err,result){

        if(callBack){
           callBack(err,result) 
        }
        self.emit("findUsers",err,result);

    });

}

/**
 * 
 * @param {*} userName Il nome dell'utente 
 * @param {*} callBack  La funzione da eseguire al termine
 */
EniAd.prototype.findUsersByName = function(userName,callBack) {

    var query = "displayName="+userName+"*";

    this.ad.findUsers(query,function(err,result){

        if(callBack){
           callBack(err,result) 
        }
        self.emit("findUsers",err,result);

    });

}

/**
 * 
 * @param {*} userid L'utente di cui si vuole sapere se appartiene al gruppo
 * @param {*} groupname Il gruppo di cui si vuole conoscere l'appartenenza
 * @param {*} callback La funzione da richiamare
 */
EniAd.prototype.isUserMemberOf = function(userid,groupname,callback){

    this.ad.isUserMemberOf(userid,groupname,function(error,result){

        if(callback)
            callback(error,result);
        self.emit("isUserMemberOf",error,result);

    });

}

/**
 * 
 * @param {*} userid L'utente di cui si vuole sapere i gruppi 
 * @param {*} callBack La funzione da richiamare al termine
 */
EniAd.prototype.getUserGroupMembership = function(userid,callBack){


    this.ad.getGroupMembershipForUser(userid,function(err,result){

        if(callBack)
            callBack(err,result);
        self.emit("UserGroupMembership",err,result);

    });

};

module.exports = {

    Domain: {ENI:"ENI",ENIGela:"ENIGela",ENINET:"ENINET"},
    Eni: EniAd

}





