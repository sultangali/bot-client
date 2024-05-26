import React from "react"
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap"
import { CartFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from "react-redux"
import * as admin from '../redux/slices/admin.js'
import * as transaction from '../redux/slices/transaction.js'

import { useParams } from "react-router-dom"
import { fetchAuthMe } from "../redux/slices/user.js"

const FullBook = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { items } = useSelector((state) => state.admin) || { items: [] }

    const books = Array.isArray(items) ? items : []

    React.useEffect(() => {
        dispatch(admin.fetchAll());
    }, [dispatch]);
    let currentBook = []
    currentBook = books.filter((book) => book._id === id);

    const addToCart = async () => {
        const data =  await dispatch(transaction.fetchCreate({id}))
        dispatch(fetchAuthMe())
        alert(data.payload.message)
        window.location.reload()
    }

    return (<Container>
        <Row className="sign-card">
            <Col>
                <div>
                    <br />
                    <h2>{currentBook[0]?.title}</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                        <Breadcrumb.Item href="/catalog">
                            Каталог
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {currentBook[0]?.category}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active href={`/catalog/books/${id}`} >
                            {currentBook[0]?.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <hr />
                    <Row>
                        <Col lg={4} md={4}>
                            <img src={`http://localhost:5000${currentBook[0]?.imageUrl}`} className="w-100" alt="" />
                        </Col>
                        <Col lg={8} md={8}>
                            <h6><span style={{ color: 'gray' }}>Категориясы:</span> {currentBook[0]?.category}</h6>
                            <h6><span style={{ color: 'gray' }}>Авторы:</span> {currentBook[0]?.author}</h6>
                            <h6><span style={{ color: 'gray' }}>Бағасы:</span> {currentBook[0]?.price} KZT</h6>
                            <h6><span style={{ color: 'gray' }}>Дүкендегі саны:</span> {currentBook[0]?.stock}</h6>
                            <p><span style={{ color: 'gray' }}>Толығырақ:</span> {currentBook[0]?.description}</p>
                            <hr />
                            <Button variant="primary" style={{borderRadius: '1px'}}
                                onClick={() => {
                                    addToCart()
                                }}>
                                <CartFill size={42}/>{' '}Себетке қосу</Button>
                        </Col>
                    </Row>
                    <br />
                </div>
            </Col>
        </Row>
    </Container>)
}

export default FullBook