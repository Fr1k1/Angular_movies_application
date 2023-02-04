const konst= require("../../konstante.js");
const jwt = require("jsonwebtoken")

exports.kreirajToken = function(korisnik){
	let token = jwt.sign({ korime: korisnik.korime }, konst.tajniKljucJWT, { expiresIn: "15s" });
    return token;
}



exports.ispisiDijelove = function(token){
	let dijelovi = token.split(".");
	let zaglavlje =  dekodirajBase64(dijelovi[0]);
	let tijelo =  dekodirajBase64(dijelovi[1]);
	let potpis =  dekodirajBase64(dijelovi[2]);
}

exports.dajTijelo = function(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}

function dekodirajBase64(data){
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}
