import TransactionService from "../services/transaction.service.js";
class TransactionController {
  static getAllTransactionsController = async (req, res) => {
    try {
      const transactions = await TransactionService.getAllTransactions();
      res.status(200).json({
        status: "success",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static getTransactionWithLimitController = async (req, res) => {
    try {
      const { limit } = req.params;
      const transactions = await TransactionService.getTransactionWithLimit(
        limit
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default TransactionController;
