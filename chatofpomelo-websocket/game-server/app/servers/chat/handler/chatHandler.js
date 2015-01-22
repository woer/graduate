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

    var message=roomList.pushMessage(msg.rid,msg.message,msg.user);
	var param = {
        message: message
	};
    var userlist=roomList.getUserList(msg.rid);
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
    var roomLists=roomList.addUser(msg.rid,msg.username);
    var param = {
        route: 'onChoose',
       roomList: roomLists
    };

    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('onChoose', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }

    next(null, {
        roomList: roomLists
    });
}
handler.doReady=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var user=roomList.doReady(msg.rid,msg.name);
    console.log(user)
    var param = {
        user: user

    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('onReady', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }


    next(null);
}

handler.doStart=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var aroomlist=roomList.doStart(msg.rid);
    console.dir(aroomlist.user)
    var param = {
        roomList: aroomlist
    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('doStart', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }
    next(null);
}
handler.unReady=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var user=roomList.unReady(msg.rid,msg.name);
    var param = {
        user: user
    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('unReady', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }
    next(null);
}
























