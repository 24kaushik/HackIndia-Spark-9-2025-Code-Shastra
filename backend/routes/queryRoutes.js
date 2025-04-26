import express from "express";
import { enhance } from "../utils/promptEnhancer.js";

const queryRouter = express.Router();

queryRouter.post('/', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (!data) {
            throw new Error("Error in fetching query data...");
        }

        // Check if database doesn't have the information
        if (data.answer === "Information not available in the current database.") {
            const enhanced = await enhance(JSON.stringify(data), query);
            return res.json({ response: enhanced });
        }

        // Return database response if available
        return res.json({ response: data.answer });

    } catch (error) {
        console.error(`Error in query route: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default queryRouter;
