import LanguageSchema from '../models/languageModel.js';

export const getLanguages = async (req, res) => {
    try {
        const languages = await LanguageSchema.find();
        res.status(200).json(languages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getLanguage = async (req, res) => {
    const { id } = req.params;
    try {
        const language = await LanguageSchema.findById(id);
        res.status(200).json(language);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLanguage = async (req, res) => {
    const language = req.body;
    const newLanguage = new LanguageSchema(language);
    try {
        await newLanguage.save();
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateLanguage = async (req, res) => {
    const { id } = req.params;
    const language = req.body;
    if (!LanguageSchema.findById(id)) {
        return res.status(404).json({ message: "Language not found" });
    }
    const updatedLanguage = await LanguageSchema.findByIdAndUpdate(id, language, { new: true });
    res.json({ data: updatedLanguage });
};

export const deleteLanguage = async (req, res) => {
    const { id } = req.params;
    if (!LanguageSchema.findById(id)) {
        return res.status(404).json({ message: "Language not found" });
    }
    await LanguageSchema.findByIdAndRemove(id);
    res.json({ message: "Language deleted successfully" });
};

