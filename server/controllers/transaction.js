import Transaction from "./../models/Transaction.js";
import { responder } from "./../util.js";

const postApiTransaction = async (req, res) => {
    const { user, amount, type, category, description } = req.body;

    const transaction = new Transaction({
        user,
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

const getApiTransactionbyId = async (req, res) => {
    const { id } = req.params;

    const showTransaction = await Transaction.findOne({ _id: id })

    res.json
        ({
            success: true,
            data: showTransaction,
            message: "successfully show Transactions"
        })
}

const getApiTransactionbyUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const finduserTrans = await Transaction.find({ user: id }).populate('user')

        finduserTrans.forEach((singleTransaction) => {
            singleTransaction.user.password = undefined;
        })
        res.json({
            success: true,
            data: finduserTrans,
            message: "fetch user transaction"
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

const updateUserTransaction = async (req, res) => {
    const { id } = req.params;
    const { amount, type, description, category} = req.body;

    await Transaction.updateOne({ _id: id }, {
        $set: {
            amount: amount,
            type: type,
            description: description,
            category: category,
        }
    });

     const updateTransaction = await Transaction.findOne({ _id: id });

    res.json({
        success: true,
        data: updateTransaction,
        message: 'successfully update Transaction'
    })
}


const deleteUserTransaction = async (req,res)=>{
    const {id} = req.params;
    const deleteTransaction = await Transaction.deleteOne({_id:id});

    res.json({
        success:true,
        data:deleteTransaction,
        message:'successfully delete Transaction'
    })
}



export { postApiTransaction, getApiTransactions, getApiTransactionbyId, getApiTransactionbyUserId,updateUserTransaction ,deleteUserTransaction}