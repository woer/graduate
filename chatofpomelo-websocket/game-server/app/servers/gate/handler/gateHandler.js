var dispatcher = require('../../../util/dispatcher');
var User = require('../../../mongoose/user');
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.queryEntry = function(msg, session, next) {
    console.log("gate")
	var connectors = this.app.getServersByType('connector');
	if(!connectors || connectors.length === 0) {
		next(null, {
			code: 500
		});
		return;
	}
var user=new User({
    name:msg.name,
    pass:msg.pass,
    email:msg.email,
    header:''
})

    user.save(function(err,user){
        next(null, {
            code: 200
        });
    })


};
handler.loginValidate=function(msg, session, next){

User.loginValidate(msg.name,function(err,user){
    if(err){
        next(null, {
            code: 200,
            login:""
        });
    }

if(user) {
    if (user.pass === msg.pass) {
        next(null, {
            code: 200,
            login: "success",
            name:msg.name,
            header:'img/17.jpg'
        });

    } else{
        next(null, {
            code: 200,
            login:""
        });
    }
}
    else{
       next(null, {
           code: 200,
           login:""
       });
   }
})


}
























































