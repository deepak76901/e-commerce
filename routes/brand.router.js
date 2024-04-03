import { Router } from "express";
import { createBrand, fetchBrand } from "../controllers/brands.controller.js";

export const router = Router();

router.get("/", fetchBrand).post("/", createBrand);
