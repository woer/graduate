var chatRemote = require('../remote/chatRemote');
var roomList= require('../../../entity/rooms');
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
    console.log(msg.lastChoose+"===========上一把被选择的人的名字");
    var channelService = this.app.get('channelService');
    var lastChoose={
    };
    if(msg.myaction=='警察'){
        var userlist = roomList.getBlackUserList(msg.rid,msg.action);
        var res=roomList.setPoliceChoose(msg.rid,msg.beChooseName,msg.chooseName);
        var re=res.policeChoose;
        if(msg.lastChoose){
            lastChoose=roomList.getLastChose(msg.rid,msg.lastChoose,1);
        }

    }
    if(msg.myaction=='杀手'){
        var userlist = roomList.getBlackUserList(msg.rid,msg.action);
        var res=roomList.setKillerChoose(msg.rid,msg.beChooseName,msg.chooseName);
        var re=res.killerChose;
        if(msg.lastChoose){
            lastChoose=roomList.getLastChose(msg.rid,msg.lastChoose,2);
        }
    }



    var param = {
        tips:re,
        voteWho:{
            position:roomList.getPositionByName(msg.rid,msg.chooseName),
            choosewho:msg.beChooseName
        },
        beVoted:{
            position:roomList.getPositionByName(msg.rid,msg.beChooseName),
            PoliceChoosed:roomList.getPoliceNumByName(msg.rid,msg.beChooseName),
            KillerChoosed:roomList.getKillerNumByName(msg.rid,msg.beChooseName)
        },
        lastChoose:lastChoose
    };

    console.dir(param);
    for (var i = 0; i < userlist.length; i++) {


        var tuid = userlist[i] + '*room';
        console.log(tuid)
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
    if(msg.alive) {
       var channelService = this.app.get('channelService');
        var message = roomList.pushMessage(msg.rid, msg.message, msg.user);
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
    }
    else{
        var channelService = this.app.get('channelService');
        var message = roomList.lastword(msg.rid, msg.message, msg.user);
        var param = {
            message: message,
            name:msg.user
        };
        console.log(param.message)
        var userlist = roomList.getUserList(msg.rid);
        for (var i = 0; i < userlist.length; i++) {
            var tuid = userlist[i] + '*room';
            channelService.pushMessageByUids('lastword', param, [
                {
                    uid: tuid,
                    sid: "connector-server-2"
                }
            ]);
        }
        next(null);
    }
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
    roomList.resetUser(msg.rid);
    if(message.policeTip) {
        var x = message.policeTip + "的身份是：" + message.policeAction
        console.log(x);
    }
    var over=roomList.gameover(msg.rid);
    console.log("---------------"+over)
    var param = {
        message: x,
        user:roomList.getRoomList()[msg.rid].user,
        remain:roomList.getRoomList()[msg.rid].remain,
        gameover:over
    };
console.dir(param.user);
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
    console.log("choosekill")
    if(msg.lastChoose){
        lastChoose=roomList.allLastChose(msg.rid,msg.lastChoose);
    }
   var user=roomList.allKiller(msg.rid,msg.beChooseName,msg.chooseName)
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var param = {
        user: user
    };
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('doKill', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }
    next(null);

}
handler.doBlack=function(msg, session, next){
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel('room', false);
    var name=roomList.chooseKiller(msg.rid);
    console.log("被选出来的凶手"+name);
if(name){
    roomList.killOneByName(msg.rid,name)
}

    roomList.resetUser(msg.rid);
    var over=roomList.gameover(msg.rid)
    console.log("00000000"+over)
    var param = {
        user:roomList.getRoomList()[msg.rid].user,
        remain:roomList.getRoomList()[msg.rid].remain,
        gameover:over
    };
    console.dir(param.user);
    var userlist=roomList.getUserList(msg.rid);
    for(var i=0;i<userlist.length;i++){
        var tuid = userlist[i] + '*room';
        channelService.pushMessageByUids('doBlock', param, [{
            uid: tuid,
            sid: "connector-server-2"
        }]);
    }

    next(null);

}





















