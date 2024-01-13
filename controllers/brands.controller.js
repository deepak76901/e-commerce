import { Brand } from "../models/Brand.model.js"

export const fetchBrand =async (req,res) => {
    try {
       const brands = await Brand.find({}).exec();
       res.status(200).json(brands)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createBrand = async (req,res) => {
    const brand = new Brand(req.body)
    try {
        const docs = await brand.save()
        res.status(201).json(docs)
    } catch (error) {
        res.status(402).json(error)
    }
}