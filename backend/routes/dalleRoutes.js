import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: "AIzaSyCHM2ya86FAGXKgtMf6Lri_zKiSmyYl5k0" });

const router = express.Router();



router.post('/', async (req, res) => {
  
  try {
    const { prompt } = req.body;

    // Default prompt if none is provided
    const finalPrompt = prompt || "A plush toy robot sitting against a yellow wall";

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: finalPrompt,
      config: {
        responseModalities: ['Text', 'Image']
      },

    });

      if(response.candidates == null){
        console.log("pls refine")
        res.status(500).send({prompt:"sorry i didn't get that"})
      }
    for (const part of response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        // console.log(part.text);
        
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
      return res.status(200).json({ photo: `data:image/png;base64,${imageData}` });
      }
    }

   
    // Send the image file as a response
  
    
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

export default router;