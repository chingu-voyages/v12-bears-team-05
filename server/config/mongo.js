var _db;
var mongo = {
    setMongo : function(db) { _db = db },
    getMongo : function(){ return _db}

}

module.exports = mongo;