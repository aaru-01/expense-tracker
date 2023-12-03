import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar';



function Home() {
    const [transactions, setTransactions] = useState([]);
    const [creditSum, setCreditSum] = useState(0);
    const [debitSum, setDebitSum] = useState(0);


    const CATEGORY_EMOJI_MAP = {
        "food": "🍔",
        "entertainment": "🚴",
        "rent": "🏡",
        "shopping": "👜",
        "travel": "🚗",
        "education": "📚",
        "salary": "💸",
        "freelancing": "💻",
        "side-hussle": "👔",
        "other": "🤷‍♀️"
    }

    const loadTransactions = async () => {
        const response = await axios.get("/api/transactions");
        const transactionsData = (response?.data?.data);

        let totalCredit = 0;
        let totalDebit = 0;

        transactionsData.forEach((transaction) => {
            if (transaction.type === "credit") {
                totalCredit += transaction.amount;
            }
            else {
                totalDebit += transaction.amount;
            }
        })
        setCreditSum(totalCredit);
        setDebitSum(totalDebit);

        setTransactions(transactionsData);
    };

    useEffect(() => {
        loadTransactions();
    }, [])
    return (
        <>
        <Navbar />
        <div className='main-home-container'>
            {/* <h1 className='text-center heading1'>All Expenses</h1> */}
            <h2 className='total'>Total Credit:<span className='credit-amount'>{creditSum}</span></h2>
            <h2 className='total'>Total Debit: <span className='debit-text'>{debitSum}</span></h2>
            {
                transactions.map((transaction, index) => {
                    const { _id, amount, type, category, description, createdAt, updatedAt } = transaction;

                    // if(type=="credit"){
                    //     setCreditSum(creditSum + amount);
                    // }
                    // else{
                    //     setDebitSum(debitSum - amount);
                    // }



                    const date = new Date(createdAt).toLocaleDateString();
                    const time = new Date(createdAt).toLocaleTimeString();

                    return (
                        <div key={index} className='transaction-card'>
                            <span className={`transaction-amount ${type === "debit" ? "debit-amount" : "credit-amount"}`}>
                                {type === "debit" ? "-" : "+"}
                                {amount}
                            </span>&nbsp;
                            {type === "debit" ? "Debited" : "Credited"} On {date} at {time}
                            <span className='transaction-category'>  {CATEGORY_EMOJI_MAP[category]} {category}</span>
                            <hr />
                            <p>{description}</p>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default Home
