import { useState } from "react";
import API from "../services/api"; 

function AIChat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            setLoading(true);

            const res = await API.post("/ai/chat", {
                message
            });

            setResponse(res.data.response);
            setMessage("");

        } catch (error) {
            console.error("AI CHAT ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Buynest AI Assistant</h2>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me about products..."
            />

            <button onClick={sendMessage}>
                {loading ? "Thinking..." : "Send"}
            </button>

            {response && (
                <p>{response}</p>
            )}
        </div>
    );
}

export default AIChat;