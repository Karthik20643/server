import { clerkClient } from "@clerk/express";


export const protectadmin =async(req , resizeBy,next) => {


    try {
        const {userid} = req.auth() ;
        const user = await clerkClient.users.getuser(userid)


        if(!user.privatemetadata.role != admin){

            return res.json({success : false , message : "not authorised"})


        }
        next() ;


    }
    catch(error){

        return res.json({success : false , message : "not authorised"}) ;

    }

}