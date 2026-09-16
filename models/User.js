import mongoosefrom  from "mongoose";

const userSchema =  new mongoose.schema({

    id :  {type : String , required : true},
     name :  {type : String , required : true} ,
      email :  {type :  String, required : true},
       Image :  {type : String , required : true}


      


})

 const user = mongoose.model('user', userSchema)

 export default user