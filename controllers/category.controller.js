import { Category } from "../models/category.model.js"

export const fetchCategory =async (req,res) => {
    try {
       const category = await Category.find({}).exec();
       res.status(200).json(category)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createCategory = async (req,res) => {
    const category = new Category(req.body)
    try {
        const doc = await category.save()
        res.status(201).json(doc)
    } catch (error) {
            res.status(402).json(error)
    }
}