import React from 'react'
import { Container, Row, Col, Breadcrumb, Table } from "react-bootstrap"
import { Envelope, Person, Telephone, PinMap } from 'react-bootstrap-icons'
import Transaction from './Transaction.jsx'
import { useDispatch, useSelector } from 'react-redux'
import * as user from '../../../redux/slices/user.js'
import * as transaction from '../../../redux/slices/transaction.js'
import { useParams } from 'react-router-dom'
import alt from '../../../images/alt.png'

const Transactions = () => {

    const params = useParams()

    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.user) || { items: [] }

    const transactionsItems = useSelector((state) => state.transaction) || { items: [] }


    const users = Array.isArray(items) ? items : []

    const transactions = Array.isArray(transactionsItems?.items) ? transactionsItems?.items : []

    React.useEffect(() => {
        dispatch(user.fetchAllUsers())
        dispatch(transaction.fetchAll())
    }, [dispatch])

    const currentUser = users.filter((user) => user._id === params.id)

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Клиент ID: {currentUser[0]?._id.substring(18)}</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin/customers">
                                Клиенттік база
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href={`/admin/customers/${currentUser[0]?._id}`}>
                                ID: {currentUser[0]?._id.substring(18)}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <Row>
                                    <Col lg={3} md={3}>
                                        <img
                                            onClick={() => { window.location.assign(currentUser[0]?.avatar ? `http://localhost:5000${currentUser[0]?.avatar}` : alt) }}
                                            src={currentUser[0]?.avatar ? `http://localhost:5000${currentUser[0]?.avatar}` : alt}
                                            className='customer-img w-100 img-fluid' alt="аватар" />
                                    </Col>
                                    <Col className='' lg={9} md={9}>
                                        <h3><Person size={'52px'} style={{ color: "#1c71d8", }} />{' '}{currentUser[0]?.fullname}</h3>
                                        <hr />
                                        <h5><Telephone size={'24px'} style={{ color: "#1c71d8", }} />{' '}{currentUser[0]?.phone}</h5>
                                        <h5><Envelope size={'24px'} style={{ color: "#1c71d8", }} />{' '}{currentUser[0]?.email}</h5>
                                        <h5><PinMap size={'24px'} style={{ color: "#1c71d8", }} />{' '}{currentUser[0]?.address}</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={12} md={12}>
                                <br />
                                <div style={{ overflowY: 'auto', position: 'relative' }}>
                                    <Table striped bordered hover size={'lg'}>
                                        <thead >
                                            <tr>
                                                <th>ID</th>
                                                <th>Уақыты</th>
                                                <th>Бейнесі</th>
                                                <th>Кітап атауы</th>
                                                <th>Авторы</th>
                                                <th>Саны</th>
                                                <th>Жалпы сома</th>
                                                <th>Статусы</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((transaction, i) => (
                                                <Transaction
                                                    id={transaction?._id.substring(18)}
                                                    img={`http://localhost:5000${transaction?.book?.imageUrl}`}
                                                    name={transaction?.book?.title}
                                                    author={transaction?.book?.author}
                                                    stock={transaction?.quantity}
                                                    price={transaction?.totalAmount}
                                                    status={transaction?.status}
                                                    date={formatDate(transaction?.createdAt) } />
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Transactions