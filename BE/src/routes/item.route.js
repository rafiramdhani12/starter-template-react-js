import express from "express";
import ItemController from "../controllers/item.controller.js";

const router = express.Router();

// GET
router.get("/", ItemController.getItems);
router.get("/limit/:limit", ItemController.getItemWithLimit);
router.get("/total-items", ItemController.getTotalItems);
router.get("/good-items", ItemController.getTotalGoodItems);
router.get("/damaged-items", ItemController.getTotalDamagedItems);
router.get("/missing-items", ItemController.getTotalMissingItems);
router.get("/location-items", ItemController.getTotalLocation);
router.get("/:id", ItemController.getBarangByidController);

// PUT
router.put("/update-item/:id", ItemController.updateItem);

// DELETE
router.delete("/delete-item/:id", ItemController.deleteItem);

// POST
router.post("/add-item", ItemController.addItems);

export default router;
