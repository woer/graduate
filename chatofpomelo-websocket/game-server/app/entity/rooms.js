var roomlist= [
    { id:0, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:1, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:2, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[], states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:3, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:4, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[], num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:5, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:6, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:7, roomowner: "",policeChoose:[],killerChose:[],police:[],farmer:[],killer:[],remain:[],num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
]

exports.gameover=function(id){
    console.log(id);
    console.log(roomlist[id].remain)
if(roomlist[id].remain[0]==0){
    resetRoom(id)
    return '杀手'
}
    if(roomlist[id].remain[1]==0){
        resetRoom(id)
        return '警察'
    }
    if(roomlist[id].remain[2]==0){
        resetRoom(id)
        return '杀手'
    }
    return false;
}
function resetRoom(id){
    var user=roomlist[id].user
    roomlist[id].policeChoose=[]
    roomlist[id].killerChose=[]
    roomlist[id].police=[]
    roomlist[id].farmer=[]
    roomlist[id].killer=[]
    roomlist[id].remain=[]
    roomlist[id].message=[]
    roomlist[id].states='等待中'
for(var i=0;i<20;i++){
    user[i].ready=false;
    user[i].alive=false;
    user[i].action="";
    user[i].byPoliceVote=0;
    user[i].byKillerVote=0;
    user[i].allVote=0;
    user[i].voteWho=0;

}

}
exports.doReturn=function(id,name){

    var user=roomlist[id].user;
    console.log("删除前的user"+roomlist[id].roomowner)
    console.dir(user)
    for(var i=0;i<20;i++)
    {
     if(user[i]&&user[i].name==name){
         var users={
             name:"",
             ready:false,
             position:-1,
             action:"",
             alive:false,
             lastWord:"",
             byPoliceVote:0,
             byKillerVote:0,
             allVote:0,
             voteWho:""
         }
         user[i]=users;
         roomlist[id].num--;
         break;
     }


    }
    if(roomlist[id].roomowner==name){
        if(roomlist[id].num==0){
            roomlist[id].roomowner=null;
        }
        else{
            for(var i=0;i<20;i++){
                if(user[i]&&user[i].name){
                    roomlist[id].roomowner=user[i].name;
                    break;
                }
             }
        }
    }
    console.log("删除后的user"+roomlist[id].roomowner)
    console.dir(user)
return roomlist[id];
}

exports.getLightTip=function(id){
    var len=roomlist[id].policeChoose.length;
    var lens=roomlist[id].killerChose.length;
    var message={
        policeTip:"",
        beKilled:"",
        killAction:'',
        policeAction:''
    }
    if(len==1){
        message.policeTip=roomlist[id].policeChoose[0].bechoose;

    }
    if(len==2){
        if(roomlist[id].policeChoose[0].bechoose==roomlist[id].policeChoose[1].bechoose){
            message.policeTip=roomlist[id].policeChoose[0].bechoose;
        }


    }
    if(len==3){
        if(roomlist[id].policeChoose[0].bechoose==roomlist[id].policeChoose[1].bechoose||roomlist[id].policeChoose[0].bechoose==roomlist[id].policeChoose[2].bechoose){
            message.policeTip=roomlist[id].policeChoose[0].bechoose;
        }
        if(roomlist[id].policeChoose[1].bechoose==roomlist[id].policeChoose[2].bechoose){
            message.policeTip=roomlist[id].policeChoose[1].bechoose;
        }

    }
    if(lens==1){
        message.beKilled=roomlist[id].killerChose[0].bechoose;
    }
    if(lens==2){
        if(roomlist[id].killerChose[0].bechoose==roomlist[id].killerChose[1].bechoose){
            message.beKilled=roomlist[id].killerChose[0].bechoose;
        }


    }
    if(lens==3){
        if(roomlist[id].killerChose[0].bechoose==roomlist[id].killerChose[1].bechoose||roomlist[id].killerChose[0].bechoose==roomlist[id].killerChose[2].bechoose){
            message.beKilled=roomlist[id].killerChose[0].bechoose;
        }
        if(roomlist[id].killerChose[1].bechoose==roomlist[id].killerChose[2].bechoose){
            message.beKilled=roomlist[id].killerChose[1].bechoose;
        }

    }
    message.killAction=getActionByName(id,message.beKilled)
    message.policeAction=getActionByName(id,message.policeTip)
    killOneByName(id,message.beKilled);
    return message;
}

function getActionByName(rid,name){
    var action="";
    var user=roomlist[rid].user;
    for(var i=0;i<20;i++){
        if(user[i].name==name){
            action=user[i].action;
            break;
        }
    }

    return action;
}
function killOneByName(id,name){
    console.log(roomlist[id].remain)
    var user=roomlist[id].user
    for(var i=0;i<20;i++){
        if(user[i].name==name){
            user[i].alive=false;
            var police=roomlist[id].remain[0];
            var killer=roomlist[id].remain[1];
            var farmer=roomlist[id].remain[2];
            if(user[i].action=='警察'){
                console.log("警察")
                police--;
            }
            if(user[i].action=='杀手'){
                console.log("杀手")
                killer--;
            }
            if(user[i].action=='平民'){
                console.log("平民")
                farmer--;
            }

            roomlist[id].remain=[police,killer,farmer];
            console.log(roomlist[id].remain)
        }
    }
    exports.chooseKiller=function(id){
        var num=[];
        var max=0;
        var name="";
        var user=roomlist[id].user;
        for(var i=0;i<20;i++){
            if(user[i]){

                if(max<user[i].allVote){
                    max=user[i].allVote;
                    name=user[i].name;
                }else{
                    num.push(user[i].allVote);
                }

            }

        }
        console.log(num);
        console.log(name);
        if(max==0){
            return null;
        }
        for(var i=0;i<num.length;i++){
            if(num[i]==max){
                return null;
            }
        }
        return name;

    }
}
exports.killOneByName=function(id,name){
    killOneByName(id,name);
    var user=roomlist[id].user
}
exports.lastword=function(id,message,username){
    console.log(id+message+username)
    var messages={
        word:message,
        position:-1
    }
    var user=roomlist[id].user;
    for(var i=0;i<20;i++){
        if(user[i]) {
            if (user[i].name == username) {
                messages.position = i
                user[i].lastWord = message;
            }
        }

    }
      return messages;
}


exports.resetUser=function(id){
    var user=roomlist[id].user;
    roomlist[id].policeChoose=[];
    roomlist[id].killerChose=[];
    for(var i=0;i<20;i++){
        if(user[i]){
            user[i].byPoliceVote=0;
            user[i].byKillerVote=0;
            user[i].voteWho="";
            user[i].allVote=0;
        }
    }

}
exports.allLastChose=function(id,name){
    var user=roomlist[id].user;
    for(var i=0;i<20;i++){
        if(user[i]&&user[i].name==name){
            user[i].allVote--;
        }
    }


}



exports.allKiller=function(id,bechosed,whochosed) {
    for (var i = 0; i < 20; i++) {
        if (roomlist[id].user[i].name == bechosed) {
            roomlist[id].user[i].allVote++;
        }
        if (roomlist[id].user[i].name == whochosed) {
            roomlist[id].user[i].voteWho = bechosed;
        }

    }
    return roomlist[id].user
}
exports.getLastChose=function(id,username,action){
    var result={};
    var user=roomlist[id].user
    for(var i=0;i<20;i++){
        if(user[i].name==username){
            if(action==1){
                if(user[i].byPoliceVote!=0){
                    user[i].byPoliceVote--;
                }


            }
            if(action==2){
                if(user[i].byKillerVote!=0) {
                    user[i].byKillerVote--;
                }
            }
            result.position=i;
            result.PoliceChoosed=user[i].byPoliceVote;
            result.KillerChoosed=user[i].byKillerVote;
            break;
        }
    }

    return result;

}


exports.setPoliceChoose=function(id,username,whochoose){
    var len=roomlist[id].policeChoose.length;
    for(var i=0;i<20;i++){
        if(roomlist[id].user[i].name==username){
            roomlist[id].user[i].byPoliceVote++;
        }
        if(roomlist[id].user[i].name==whochoose){
            roomlist[id].user[i].voteWho=username;
        }

    }


    for(var i=0;i<len;i++){
        if(roomlist[id].policeChoose[i].whochoose==whochoose){
            roomlist[id].policeChoose[i].bechoose=username;



            return roomlist[id];
        }
    }
    roomlist[id].policeChoose.push({
        whochoose:whochoose,
        bechoose:username
    });

    console.dir("vote"+roomlist[id].user)
    return roomlist[id];
}
exports.setKillerChoose=function(id,username,whochoose){
    var len=roomlist[id].killerChose.length;
    for(var i=0;i<20;i++){
        if(roomlist[id].user[i].name==username){
            roomlist[id].user[i].byKillerVote++;
        }
        if(roomlist[id].user[i].name==whochoose){
            roomlist[id].user[i].voteWho=username;
        }
    }
    for(var i=0;i<len;i++){
        if(roomlist[id].killerChose[i].whochoose==whochoose){
            roomlist[id].killerChose[i].bechoose=username;
            return roomlist[id];
        }
    }



    roomlist[id].killerChose.push({
        whochoose:whochoose,
        bechoose:username
    });
    return roomlist[id];
}
exports.getPositionByName=function(id,name){
    var user=roomlist[id].user;
    for(var i=0;i<20;i++) {
        if (roomlist[id].user[i].name == name) {
            return roomlist[id].user[i].position;
        }
    }

}

exports.getPoliceNumByName=function(id,name){
    var user=roomlist[id].user;
    for(var i=0;i<20;i++) {
        if (roomlist[id].user[i].name == name) {
            return roomlist[id].user[i].byPoliceVote;
        }
    }

}
exports.getKillerNumByName=function(id,name){
    var user=roomlist[id].user;
    for(var i=0;i<20;i++) {
        if (roomlist[id].user[i].name == name) {
            return roomlist[id].user[i].byKillerVote;
        }
    }

}

exports.getBlackUserList=function(id,action){

    if(action=='警察'){
        var toReturn=roomlist[id].police;
    }
    if(action=='杀手'){
        var toReturn=roomlist[id].killer;
    }
    if(action=='平民'){
        var toReturn=roomlist[id].farmer;
    }

    return toReturn;
}



exports.getUserList=function(id){

    var userlist=[];
    for(var i=0;i<20;i++){
        if(roomlist[id].user[i]){
            userlist.push(roomlist[id].user[i].name);
        }
    }
    return userlist;
}


exports.pushMessage=function(id,message,user){
    var list=[{
        username:user,
        messgae:message
    }];
    roomlist[id].messgae=list.concat(roomlist[id].messgae);
    if(roomlist[id].messgae.length>30){

        roomlist[id].messgae.splice(30,1)
    }


    return  roomlist[id].messgae;
}
exports.getRoomList=function(){
    return roomlist;
}
exports.addUser=function(id,username){
    roomlist[id].num++;
    console.log("roomlist"+id+" 的数量是"+roomlist[id].num)
    if(!roomlist[id].roomowner){
        roomlist[id].roomowner=username;
    }
    var user={
        name:username,
        ready:false,
        position:-1,
        action:"",
        alive:false,
        lastWord:"",
        byPoliceVote:0,
        byKillerVote:0,
        allVote:0,
        voteWho:""
    }
    for(var i=0;i<20;i++){

        if(!roomlist[id].user[i].name){
            user.position=i;
            roomlist[id].user[i]=user;
            break;
        }


    }
    console.log("重新排列后的user")
console.dir(roomlist[id].user)
    return roomlist;
}

exports.doReady=function(id,username){
    for(var i=0;i<20;i++){
        if(username==roomlist[id].user[i].name){

            roomlist[id].user[i].ready='ready'
            return roomlist[id].user;
        }
    }

}
exports.unReady=function(id,username){

    for(var i=0;i<20;i++){
        if(username==roomlist[id].user[i].name){

            roomlist[id].user[i].ready=false
            return roomlist[id].user;
        }
    }

}

exports.doStart=function(id){
    roomlist[id].states="游戏中";
    var user=roomlist[id].user;
    for(var i=0;i<20;i++){
        if(user[i].ready)
            user[i].ready=false;
        user[i].alive=true;
    }
    var remain=doAction(roomlist[id].num,user,id)
    roomlist[id].remain=remain;
    return roomlist[id];
}

function doAction(num,user,id){
    if(num<8){
        var x=1;
        var actionList=['警察','杀手'];
        for(var i=0;i<num-2;i++){
            actionList.push('平民')
        }

    }
    if(num>=8&&num<12){
        var x=2;
        var actionList=['警察','杀手','警察','杀手'];
        for(var i=0;i<num-4;i++){
            actionList.push('平民')
        }
    }
    if(num>12&&num<20){
        var x=3;
        var actionList=['警察','杀手','警察','杀手','警察','杀手'];
        for(var i=0;i<num-6;i++){
            actionList.push('平民')
        }
    }
    actionList.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
    actionList.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
    actionList.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
    for(var i=0;i<num;i++){


        var action=actionList.shift()
        user[i].action=action;
        console.log(action)
        if(action=='警察'){
            console.log("push police")
            roomlist[id].police.push(user[i].name)
        }
        if(action=='杀手'){
            console.log("push kill")
            roomlist[id].killer.push(user[i].name)
        }
        if(action=='平民'){
            console.log("push farmer")
            roomlist[id].farmer.push(user[i].name)
        }


    }

    var remain=[x,x,num-x-x];
    return remain;
}



























































