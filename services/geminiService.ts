import { GoogleGenAI, Type } from "@google/genai";

// According to guidelines, initialize with apiKey from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        newLabel: {
            type: Type.STRING,
            description: "A concise, descriptive label for the workflow agent, under 5 words."
        },
        newDescription: {
            type: Type.STRING,
            description: "A clear, one-sentence description of what the workflow agent does."
        }
    },
    required: ["newLabel", "newDescription"]
};

export async function enhanceNodeDetails(label: string, description: string): Promise<{ newLabel: string, newDescription: string }> {
    const prompt = `
        You are an expert in creating clear and concise labels and descriptions for workflow automation agents.
        Given the following user-provided details for a workflow agent, please enhance them.
        The new label should be a short, descriptive title (under 5 words).
        The new description should be a single, clear sentence explaining the agent's purpose.

        Current Label: "${label}"
        Current Description: "${description}"

        Return the enhanced details in JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // A good choice for this kind of text task
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        // The API returns a JSON string in the text property
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result && typeof result.newLabel === 'string' && typeof result.newDescription === 'string') {
            return result;
        } else {
            throw new Error("Invalid JSON response from AI.");
        }

    } catch (error) {
        console.error("Error enhancing node details with Gemini:", error);
        throw new Error("Failed to get enhancement from AI.");
    }
}
