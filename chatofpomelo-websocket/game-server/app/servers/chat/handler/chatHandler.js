var chatRemote = require('../remote/chatRemote');
var roomList= require('../../../entity/room');
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;
handler.priSend=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var param = {
        message: msg.message,
        username:msg.user
    };
    var userlist = roomList.getBlackUserList(msg.rid,msg.action);
    for (var i = 0; i < userlist.length; i++) {
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('onPriSend', param, [
            {
                uid: tuid,
                sid: "connector-server-2"
            }
        ]);
    }
    next(null);

}
handler.toChoose=function(msg, session, next){
    console.log(msg.beChooseName+"===========被选择的人的名字");
    var channelService = this.app.get('channelService');

    if(msg.myaction=='警察'){
        var userlist = roomList.getBlackUserList(msg.rid,msg.action);
        var re=roomList.setPoliceChoose(msg.rid,msg.beChooseName,msg.chooseName)
    }
    if(msg.myaction=='杀手'){
        var userlist = roomList.getBlackUserList(msg.rid,msg.action);
        var re=roomList.setKillerChoose(msg.rid,msg.beChooseName,msg.chooseName)
    }
    var param = {
        tips:re
    };
    for (var i = 0; i < userlist.length; i++) {
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('onTip', param, [
            {
                uid: tuid,
                sid: "connector-server-2"
            }
        ]);
    }
    next(null);




}
handler.send = function(msg, session, next) {
	var channelService = this.app.get('channelService');
    var message=roomList.pushMessage(msg.rid,msg.message,msg.user);
	var param = {
        message: message
	};
        var userlist = roomList.getUserList(msg.rid);
        for (var i = 0; i < userlist.length; i++) {
            var tuid = userlist[i] + '*room';
            channelService.pushMessageByUids('onSend', param, [
                {
                    uid: tuid,
                    sid: "connector-server-2"
                }
            ]);
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
handler.doLight=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var message=roomList.getLightTip(msg.rid);
    var param = {
        message: message,
        user:roomList.getRoomList()[msg.rid].user
    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('doLight', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }
    next(null);

}
handler.ChooseKill=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var message=roomList.getLightTip();
    var param = {
        message: message
    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('doLight', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }
    next(null);

}






















