import { clerkClient } from "@clerk/express";
import booking from "../models/Booking";


export const getuserbookings = async (req,res) => {

    try {

        const user = req.auth().userid ;
        const bookings = await booking.find({user}).populate({

            path : "show" ,
            populate : {path : "movie"}

        }).sort({createdAt : -1})

    }
catch(error){

console.error(error.message) ;
res.json({success : false , message : error.message}) ;

}

}

export const addfavourite = async(req,res)=> {
try{

    const {movieid} = req.body ;
    const {userid} = req.auth().userid ;

    const user = await clerkClient.users.getUser(userid)

    if(!user.privateMetadata.favorites){
        user.privateMetadata.favorites = []
    }
     if(!user.privateMetadata.favorites){
        user.privateMetadata.favorites.push(movieid)
    }

    await clerkClient.users.updateUserMetadata(userid, {privateMetadata : user.privateMetadata})

    res.json({success : true , message : "favourite added sucecsfully"})

}
catch(error){

    console.error(error.message) ;
    res.json({success : false, message : error.message}) ;

}


}

export default usercontroller