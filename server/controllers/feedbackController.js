const Feedback = require("../models/Feedback");
const Notification = require("../models/Notification");
const User = require("../models/User");



const createFeedback = async (req, res) => {

    try {

        const { type, subject, message } = req.body;

        const feedback = await Feedback.create({

            user: req.user.id,
            type,
            subject,
            message

        });



        const admins = await User.find({ role: "admin" });

        for (const admin of admins) {

            await Notification.create({

                user: admin._id,

                message: `${req.user.firstName} submitted new feedback.`

            });

        }


        res.status(201).json({

            message: "Feedback submitted successfully.",
            feedback

        });

    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



const getAllFeedback = async(req,res)=>{

    try{

        const feedback = await Feedback.find()

        .populate("user","firstName lastName email role")

        .sort({createdAt:-1});


        res.json(feedback);

    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




const updateFeedbackStatus = async(req,res)=>{

    try{

        const {status,priority} = req.body;


        const feedback = await Feedback.findById(req.params.id);

        if(!feedback){

            return res.status(404).json({

                message:"Feedback not found"

            });

        }


        if(status){

            feedback.status = status;

        }


        if(priority){

            feedback.priority = priority;

        }


        await feedback.save();



        await Notification.create({

            user:feedback.user,

            message:`Your feedback "${feedback.subject}" has been ${feedback.status}.`

        });


        res.json({

            message:"Feedback updated successfully.",
            feedback

        });

    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



const deleteFeedback = async(req,res)=>{

    try{

        const feedback = await Feedback.findById(req.params.id);

        if(!feedback){

            return res.status(404).json({

                message:"Feedback not found"

            });

        }


        await feedback.deleteOne();


        res.json({

            message:"Feedback deleted successfully."

        });

    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


module.exports = {

    createFeedback,
    getAllFeedback,
    updateFeedbackStatus,
    deleteFeedback

};