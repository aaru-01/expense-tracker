import React, { useState, useEffect } from 'react'
import "./AddTransaction.css"
import axios from 'axios';
import showToast from 'crunchy-toast';
import Navbar from '../../components/Navbar/Navbar.js'

function AddTransaction() {

    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [user, setUser] = useState({});

    const addtransactions = async () => {
        const userStorage = JSON.parse(localStorage.getItem('user'));

        if (!amount) {
            alert("Amount is required")
            return;
        }
        if (!type) {
            alert("Type is required")
            return;
        }
        if (!description) {
            alert("Description is required")
            return;
        }
        if (!category) {
            alert("Category is required")
            return;
        }

        const response = await axios.post('/api/transaction', {
            user: userStorage?._id,
            amount: amount,
            type: type,
            description: description,
            category: category
        })

        showToast(response?.data?.message, 'success', 3000);

        if (response?.data?.success) {
            window.location.href = '/';
        }
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
    return (
        <div>
            <Navbar />
            <div>
                <form>
                    <div className='transaction-container'>
                        <h2 className='text-center headingadd'>Add Transactions</h2>
                        {/* amount, type, description,category,user */}
                        <div>
                            <input
                                type='number'
                                placeholder='Enter Amount Here'
                                className='input-box'
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                }}
                            /><br />
                            <label className='ms-3 type-text'>Type:- </label>
                            <div className='type-container'>
                                <input
                                    type='radio'
                                    className='gender-type'
                                    value="credit"
                                    checked={type === "credit"}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setType(e.target.value)
                                        }
                                    }}
                                /> <label className='type-text'>Credit</label>

                                <input
                                    type='radio'
                                    className='gender-type'
                                    name="amounttype"
                                    value="debit"
                                    checked={type === "debit"}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setType(e.target.value)
                                        }
                                    }}
                                /> <label className='type-text'>Debit</label>
                            </div>
                            <div className=''>
                                <label className='cetgory-text'>Category :-</label><br />
                                <select
                                    className='form-control-regi'
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}>
                                    <option>select category here</option>
                                    <option value="food">Food</option>
                                    <option value="entertainement">Entertainment</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="rent">Rent</option>
                                    <option value="travel">Travel</option>
                                    <option value="education">Education</option>
                                    <option value="salary">Salary</option>
                                    <option value="freelancing">Freelancing</option>
                                    <option value="side-hussle">Side-hussle</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <input
                                type='text'
                                placeholder='Enter description'
                                className='form-control-regi description-text'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            <button
                                type='button'
                                className='button btn-addTransaction'
                                onClick={addtransactions}>Add Transaction</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddTransaction
