const Groq = require("groq-sdk");
const { searchProducts } = require("./tools");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const tools = [
    {
        type: "function",
        function: {
            name: "searchProducts",
            description: "Search Buynest products by category and maximum price.",
            parameters: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        description: "The product category to search for"
                    },
                    maxPrice: {
                        type: "number",
                        description: "The maximum price of the product"
                    }
                },
                required: []
            }
        }
    }
];
async function askAI(message) {
    const messages = [
        {
            role: "system",
            content: `
                        You are Buynest's shopping assistant.

                        You help users find products available in the Buynest store.

                        Important rules:
                        - Only recommend products returned by the available tools.
                        - Never invent or suggest products that are not returned by the database.
                        - If a search returns no products, clearly tell the user that no matching products were found.
                        - Do not use your general knowledge to create product results.
`
        },
        {
            role: "user",
            content: message
        }
    ];

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        tools,
        tool_choice: "auto"
    });

    const response = completion.choices[0].message;

    if (response.tool_calls) {
        const toolCall = response.tool_calls[0];

        const functionName = toolCall.function.name;
        const argumentsFromAI = JSON.parse(
            toolCall.function.arguments
        );

        let toolResult;

        if (functionName === "searchProducts") {
            toolResult = await searchProducts(argumentsFromAI);
        }

        messages.push(response);

        messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult)
        });

        const finalResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages
        });

        return finalResponse.choices[0].message.content;
    }

    return response.content;
}

module.exports = {
    groq, tools, askAI
};
