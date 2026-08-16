const { askAI } = require("../ai/agent");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const response = await askAI(message);

        res.json({
            response
        });

    } catch (error) {
        console.error("AI ERROR:", error);

        res.status(500).json({
            message: "Something went wrong with the AI assistant"
        });
    }
};

module.exports = {
    chatWithAI
};