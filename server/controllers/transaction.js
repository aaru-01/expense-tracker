import Transaction from "./../models/Transaction.js";
import { responder } from "./../util.js";

const postApiTransaction = async (req, res) => {
    const { amount, type, category, description } = req.body;

    const transaction = new Transaction({
        amount,
        type,
        category,
        description
    });

    try {
        const savedTransaction = await transaction.save();

        return responder({
            res,
            success: true,
            message: "Transaction saved",
            data: savedTransaction,
        });
        // res.json({
        //     success: true,
        //     data: savedTransaction,
        //     message: "Transaction saved"
        // });

    }
    catch (err) {

        return responder({
            res,
            success: false,
            message: err.message

        });

        // res.json({
        //     success: false,
        //     message: err.message
        // });

    }
}


const getApiTransactions = async (req, res) => {
    const allTransactions = await Transaction.find();

    return responder({
        res,
        success: true,
        message: "Successfully fetch all transactions",
        data: allTransactions,
    });
    // res.json({
    //     success: true,
    //     data: allTransactions,
    //     message: "Successfully fetch all trasanction",
    // })
}


export { postApiTransaction, getApiTransactions }