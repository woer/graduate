var roomlist= [
    { id:0, roomowner: "",remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:1, roomowner: "",remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:2, roomowner: "",remain:"",num:0,messgae:[], states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:3, roomowner: "",remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:4, roomowner: "",remain:"", num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:5, roomowner: "",remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:6, roomowner: "",remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:7, roomowner: "" ,remain:"",num:0,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
]
exports.getUserList=function(id){

    var userlist=[];
    for(var i=0;i<20;i++){
        if(roomlist[id].user[i].name){
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
        action:""
    }
    for(var i=0;i<20;i++){
        if(!roomlist[id].user[i].name){
            user.position=i;
            roomlist[id].user[i]=user;
            break;
        }

    }

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
    }
    var remian=doAction(roomlist[id].num,user)
    roomlist[id].remain=remian;
return roomlist[id];
}

function doAction(num,user){
    console.log(user)

    console.log(user)
if(num<8){
    var actionList=['警察','杀手'];
    for(var i=0;i<num-2;i++){
        actionList.push('平民')
    }

}
    if(num>=8&&num<12){
        var actionList=['警察','杀手','警察','杀手'];
        for(var i=0;i<num-4;i++){
            actionList.push('平民')
        }
    }
    if(num>12&&num<20){
        var actionList=['警察','杀手','警察','杀手','警察','杀手'];
        for(var i=0;i<num-6;i++){
            actionList.push('平民')
        }
    }
    actionList.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
console.log(actionList);
    for(var i=0;i<num;i++){

        user[i].action=actionList.shift()

    }

    console.dir(user)


    return [x,x,num-x-x];
}



























































