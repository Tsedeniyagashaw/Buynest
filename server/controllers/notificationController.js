const Notification = require("../models/Notification");

const getNotifications = async(req,res)=>{

    try{

        const notifications = await Notification
        .find({
            seller:req.user.id
        })
        .sort({createdAt:-1})
        .limit(10);

        res.json(notifications);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



const markAsRead = async(req,res)=>{

    try{

        const notification = await Notification.findById(
            req.params.id
        );

        if(!notification){

            return res.status(404).json({
                message:"Notification not found"
            });

        }

        notification.isRead=true;

        await notification.save();

        res.json(notification);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



module.exports={
    getNotifications,
    markAsRead
};