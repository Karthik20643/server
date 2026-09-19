import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

export const isadmin = async (req, res) => {
    return res.json({ success: true, isAdmin: true });
};

export const getdashboarddata = async (req, res) => {
    try {
        const bookings = await Booking.find({ isPaid: true });
        const activeshows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');
        const totaluser = await User.countDocuments();

        const dashboarddata = {
            totalbookings: bookings.length,
            totalrevenue: bookings.reduce((acc, booking) => acc + (booking.amount || 0), 0),
            activeshows,
            totaluser,
        };

        return res.json({ success: true, dashboarddata });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } })
            .populate('movie')
            .sort({ showDateTime: 1 });

        return res.json({ success: true, shows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getallbookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('user')
            .populate({
                path: 'show',
                populate: { path: 'movie' },
            })
            .sort({ createdAt: -1 });

        return res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};