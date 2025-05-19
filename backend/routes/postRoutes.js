import connectDB from "../mongodb/connect.js";
import express from "express";

import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import PostSchema from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (filePath) => {
    const result = await cloudinary.v2.uploader.upload(filePath);
    return result;
};

router.post("/", async (req, res) => {
    const { name, prompt, photo } = req.body;
    try {
        const filePath =
            "C:\\Users\\harsh\\OneDrive\\project\\webdev\\backend\\imagegenerator\\frontend" +
            photo.split("?")[0];
        const result = await upload(filePath);
        const postData = await PostSchema.create({
            name,
            prompt,
            photo: result.url,
        });
        res.status(201).json({ success: true, data: postData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message || "Server Error" });
    }
});
router.post('/fetch',async (req,res)=>{
    try{
        const data =await PostSchema.find();
        console.log(data);
        res.status(200).json({data});
    }catch(e){
        res.status(500).json({message:"internaql server error"})
    }
})

export default router;
