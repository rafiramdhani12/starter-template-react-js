import express from "express";
import TransactionController from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/", TransactionController.getAllTransactionsController);
router.get(
  "/limit/:limit",
  TransactionController.getTransactionWithLimitController
);

export default router;
