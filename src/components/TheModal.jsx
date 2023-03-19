import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const TheModal = () => {
    const [lgShow, setLgShow] = useState(false);
    const transactions = JSON.parse(localStorage.getItem('transactions'))
    console.log("transactionstransactions", transactions)
    return (
        <div>
            <button style={{ backgroundColor: 'transparent', border: 'none', color: 'white', outline: 'none' }} onClick={() => setLgShow(true)}>Transactions</button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <div style={{ color: 'black', textAlign: 'left', }}>
                            <h2>All your transfers are save with me!</h2>
                            <br />
                            {transactions.map((transaction) => {
                                return (
                                    <div>
                                        <div className='singleTransaction'>
                                            <p>Receiver: {transaction[1]}</p>
                                            <p>Amount: {parseInt(transaction[2].hex) / (10 ** 18)} eth</p>
                                        </div>
                                        <br />
                                    </div>
                                )
                            })}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>
        </div>
    );
}