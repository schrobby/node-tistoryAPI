var XmlParser = require('xml2js').Parser;

var Parser = module.exports.Parser = function(format) {
	this.format = format || 'xml';
	this.xmlParser = new XmlParser({ explicitArray: false });
}

Parser.prototype.parse = function(data, callback) {
	if (this.format === 'xml') {
		this.xmlParser.parseString(data, callback);
	} else {
		var result = "";
		var err = "";

		try { 
			result = JSON.parse(data); 
		} catch (err) {
			err = "Error parsing JSON: " + err.message;
		}
		callback.call(this, err, result);
	}
}

//temporary subdomain.tistory.com fix
module.exports.fixTargetUrl = function (targetUrl) {
    var hashRe = /^(?:https?:\/\/)?([\w-]+)\.tistory\.com\/?/i;
    var groups = targetUrl.match(hashRe);
    if (!groups || !groups[1]) {
        return targetUrl;
    } else {
        return groups[1];
    }
}