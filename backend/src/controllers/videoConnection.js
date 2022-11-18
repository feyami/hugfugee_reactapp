import videoConnectionModel from "../models/videoConnectionModel.js";

export const getVideoConnections = async (req, res) => {
    try {
        const videoConnections = await videoConnectionModel.find();
        res.status(200).json(videoConnections);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getVideoConnection = async (req, res) => {
    const { id } = req.params;
    try {
        const videoConnection = await videoConnectionModel.findById(id);
        res.status(200).json(videoConnection);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createVideoConnection = async (req, res) => {
    const videoConnection = req.body;
    const newVideoConnection = new videoConnectionModel(videoConnection);
    try {
        await newVideoConnection.save();
        res.status(201).json(newVideoConnection);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateVideoConnection = async (req, res) => {
    const id = req.params.id;
    const videoConnection = req.body;
    if (!videoConnectionModel.findById(id)) {
        return res.status(404).json({ message: "VideoConnection not found" });
    }
    await videoConnectionModel.findByIdAndUpdate(id, videoConnection, { new: true });
    res.status(200).json(videoConnection);
};

export const deleteVideoConnection = async (req, res) => {
    const id = req.params.id;
    if (!videoConnectionModel.findById(id)) {
        return res.status(404).json({ message: "VideoConnection not found" });
    }
    await videoConnectionModel.findByIdAndDelete(id);
    res.status(200).json({ message: "VideoConnection deleted successfully" });
};




