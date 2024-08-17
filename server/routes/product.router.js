import { Router } from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  fetchSuggestion,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

export const router = Router();

router.get("/getAllProducts", fetchAllProducts);
router.post(
  "/create",
  upload.fields([
    {
      name: "thumbnail",
    },
    {
      name: "image1",
    },
    {
      name: "image2",
    },
    {
      name: "image3",
    },
  ]),
  createProduct
);
router.get("/:id", fetchProductById);
router.patch("/update/:id", updateProduct);
router.get("/suggestion/:category", fetchSuggestion);
