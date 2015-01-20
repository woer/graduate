var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/killgame')
var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    pass  : { type:String },//属性age,类型为Number,默认为0
    email: { type:String,default:''},
    header:{type:String,default:'img/17.jpg'}
});
var userModel=mongoose.model("user",TestSchema);

function User(user){
    this.name=user.name;
    this.pass=user.pass,
        this.email=user.email,
        this.header=this.header||'img/17.jpg'
}
module.exports=User;
User.prototype.save=function(callback){
    var user={
        name:this.name,
        pass:this.pass,
        email:this.email,
        header:this.header
    }
    var newUser=new userModel(user);
    newUser.save(function(err,user){
        if(err){
            return callback(err)
        }
        callback(null,user)
    })
}

User.loginValidate=function(name,callback){
    userModel.findOne({name:name},function(err,user){
        if(err){
            return callback(err)
        }
        callback(null,user);

    })


}



























































