var roomlist= [
    { id:0, roomowner: "",messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:1, roomowner: "",messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:2, roomowner: "",messgae:[], states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:3, roomowner: "",messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:4, roomowner: "", messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:5, roomowner: "",messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:6, roomowner: "",messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:7, roomowner: "" ,messgae:[],states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
]
exports.getUserList=function(id){
    console.log(roomlist)
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
   return  roomlist[id].messgae;
}
exports.getRoomList=function(){
    return roomlist;
}
exports.addUser=function(id,username){
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
            roomlist[id].user[i].ready="ready"
            break;
        }
    }
    return roomlist;

}

exports.doStart=function(id){

}





























































