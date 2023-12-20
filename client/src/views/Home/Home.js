import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import Navbar from './../../components/Navbar/Navbar.js'
import showToast from 'crunchy-toast';
import Update from './edit.png'
import Delete from './delete.png'

function Home() {

  const [transactions, setTransactions] = useState([]);
  const [creditSum, setCreditSum] = useState(0);
  const [debitSum, setDebitSum] = useState(0);
  const [user, setUser] = useState({});

  const CATEGORY_EMOJI_MAP = {
    "food": "🍔",
    "entertainment": "📺",
    "rent": "🏠",
    "shopping": "🛍",
    "travel": "✈",
    "education": "📚",
    "salary":"💰",
    "freelancing": "💻",
    "side-hussle": "👔👗",
    "other": "🤷‍♂️"
  }

  const loadTransactions = async () => {
    const getUser = JSON.parse(localStorage.getItem('user') || '{}');
    const storageUser = getUser._id;
    console.log(storageUser)

    const response = await axios.get(`/api/transaction/users/${storageUser}`);
    const transactionsData = response?.data?.data;
    console.log(transactionsData);

    let totalCredit = 0;
    let totalDebit = 0;

    // const transactionsData = response?.data?.data;

    transactionsData.forEach((transaction) => {
      if (transaction.type === "credit") {
        totalCredit += transaction.amount;
      }
      else {
        totalDebit += transaction.amount;
      }
    });

    setTransactions(transactionsData);

    setCreditSum(totalCredit);
    setDebitSum(totalDebit)
  };

  useEffect(() => {
    loadTransactions();
  }, [])

  const deleteTransaction = async (id) => {
    const response = await axios.delete(`/api/transactions/${id}`);

    if (response?.data?.success) {
      showToast(response?.data?.message, 'success', '3000');
      loadTransactions();
    }
  }
 

  const updateTransaction = async(id)=>{
    window.location.href=`/updateTransaction/${id}`
  }


 useEffect(() => {
    const userstorageData = JSON.parse(localStorage.getItem('user') || '{}');

    if (userstorageData?.email) {
      setUser(userstorageData);
    }
    else {
      showToast('you are not logged in!', 'danger', 1000);
      window.location.href = '/login'
    }

  }, [])




  return (<>
    <Navbar />

    <div className='container'>
      {/* <h1 className='text-center'>All Expenses</h1> */}
      <h2>Credit: {creditSum}</h2>
      <h2>Debit: {debitSum}</h2>

      {
        transactions?.map((transaction, index) => {
          const { _id, amount, type, category, description, createdAt } = transaction;

          const date = new Date(createdAt).toLocaleDateString();
          const time = new Date(createdAt).toLocaleTimeString();

          return (

            <div key={index} className='transaction-card ' >

              <span className={`transaction-amount ${type === "debit" ? "debit-amount" : "credit-amount"}`}>
                {type === "debit" ? "-" : "+"}
                {amount} </span>

           <span className='types-date-time'> {type === "debit" ? "Debited" : "Credited"} on {date}  at {time}</span>  

              <span className='transaction-category'>
                {CATEGORY_EMOJI_MAP[category]}
                {category} </span>

            


              <hr /><p className='description'>{description}</p>

              <img src={Delete} 
              className='image-delete'
               onClick={() => { deleteTransaction(_id) }} />
             
              <img src={Update}
                className='image-update'
                onClick={() => {
                 updateTransaction(_id)
                }}
              />
            </div>
          )
        })
      }
    </div>
  </>
  )
}

export default Home