import Show from "../models/Show.js"

const checkseatsavailability = async(showid, selectedseats)=>{

    try {

        const showdata = await show.findbyid(showid)
        if(!showdata){
            res.json({success : false , message : "no such shows"})
        }
        const occupiedseats = showdata.occupiedseats ;

        const isanyseattaken = selectedseats.some(seat => 

            occupiedseats[seat]

        ) ;
        if(!isanyseattaken)return false ;

    }
    catch(error){

console.log(error.message) ;
return false ;

    }


}

export const createbooking = async(req,res)=>{
    try {

        const {userid} = req.auth() ;
        const {showid ,selectedseats} =req.body ;

        const {origin} = req.headers ;

        const isavailable = await checkseatsavailability(showid ,selectedseats)

        if(!isavailable){

            return res.json({success : false , message : "sleected seat is not available"})

        }

        const showdata = await show.findbyid(showid).populate('movie') ;

        const booking = await booking.create({

            user : userid,
            show : showid,
            amount : showdata.price * selectedseats.length,
            bookseats : selectedseats.length
        })

        selectedseats.map((seat)=> {

            showdata.occupiedseats[seats]  = userid ;

        })

        showdata.markmodified('occuppiedseats') ;
        await showdata.save() ;

        //payment message

        res.json({success : true , message : "payment succesfull"})

    }
    catch(error){
            console.log(error.message);
                   res.json({success : false , message : "payment failed"})
 
    }
}

export const getoccupiedseats = async (req, res) => {

    try {

        const {showid} =req.params ;
        const showdata = await show.findbyid(showid) ;
        const occupiedSeats = object.keys(showdata.occupiedseats)

        res.json({success : true, message : occupiedSeats})

    }
    catch(error){

        

    }


}



