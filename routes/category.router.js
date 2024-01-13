import { Router } from "express"
import { createCategory, fetchCategory } from "../controllers/category.controller.js"

export const router = Router()

router.get("/",fetchCategory).post("/",createCategory)