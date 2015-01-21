var chatRemote = require('../remote/chatRemote');
var roomList= require('../../../entity/room');
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;


handler.send = function(msg, session, next) {
	var rid = session.get('rid');
	var username = session.uid.split('*')[0];
	var channelService = this.app.get('channelService');
	var param = {
		msg: msg.content,
		from: username,
		target: msg.target
	};
	channel = channelService.getChannel(rid, false);

	//the target is all users
	if(msg.target == '*') {
		channel.pushMessage('onChat', param);
	}
	//the target is specific user
	else {
		var tuid = msg.target + '*' + rid;
		var tsid = channel.getMember(tuid)['sid'];
		channelService.pushMessageByUids('onChat', param, [{
			uid: tuid,
			sid: tsid
		}]);
	}
	next(null, {
		route: msg.route
	});
};
handler.get=function(msg, session, next){
    var roomLists=roomList.getRoomList();
    console.log(roomLists)
    next(null, {
        roomList: roomLists
    });
}
handler.chooseRoom=function(msg, session, next){

    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var roomLists=roomList.addUser(msg.rid,msg.username);
    console.log(roomLists)
    var param = {
       roomList: roomLists
    };

    channel.pushMessage('onChoose', param);




    next(null, {
        roomList: roomLists
    });
}




























