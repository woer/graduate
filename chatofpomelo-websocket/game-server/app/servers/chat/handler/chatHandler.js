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
	var channelService = this.app.get('channelService');
    var userlist=roomList.getUserList(msg.rid);
    console.log(userlist);
    var message=roomList.pushMessage(msg.rid,msg.message,msg.user);
	var param = {
        message: message
	};
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        		channelService.pushMessageByUids('onSend', param, [{
			uid: tuid,
			sid: "connector-server-2"
		}]);
    }
	next(null);
};

handler.chooseRoom=function(msg, session, next){

    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', true);
    var roomLists=roomList.addUser(msg.rid,msg.username);
    var param = {
        route: 'onChoose',
       roomList: roomLists
    };
    channel.pushMessage(param);

    next(null, {
        roomList: roomLists
    });
}
handler.doReady=function(msg, session, next){
    console.log(msg.rid+msg.name)
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var roomLists=roomList.doReady(msg.rid,msg.name);
    console.log(roomLists)
    var param = {
        roomList: roomLists
    };

    channel.pushMessage('onReady', param);

    next(null, {
        roomList: roomLists
    });
}

handler.doStart=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var roomLists=roomList.doStart(msg.rid);
    console.log(roomLists)
    var param = {
        roomList: roomLists
    };

    channel.pushMessage('doStart', param);

    next(null, {
        roomList: roomLists
    });
}

























