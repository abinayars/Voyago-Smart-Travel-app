const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {

    try {

        const expense = new Expense(req.body);

        await expense.save();

        res.status(201).json(expense);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Expenses
exports.getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find();

        res.json(expenses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Expense
exports.deleteExpense = async (req, res) => {

    try {

        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Update Expense
exports.updateExpense = async (req, res) => {

    try {

        const updatedExpense = await Expense.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(updatedExpense);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};