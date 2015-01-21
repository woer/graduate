var roomlist= [
    { id:0, roomowner: "",states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:1, roomowner: "",states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:2, roomowner: "", states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:3, roomowner: "",states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:4, roomowner: "", states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:5, roomowner: "",states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:6, roomowner: "",states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
    { id:7, roomowner: "" ,states:"等待中",user:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
]

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
        position:-1
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

































































