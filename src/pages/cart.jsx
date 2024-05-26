
import React from "react"
import { Container, Row, Col, Button, Breadcrumb, Table } from "react-bootstrap"
import { CreditCard } from 'react-bootstrap-icons'
import { Product } from "../components/index.js"
import { useDispatch, useSelector } from "react-redux"
import * as transaction from '../redux/slices/transaction.js'
const Cart = () => {

    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.transaction) || { items: [] };
    const userData = useSelector((state) => state.user.data);

    const transactions = Array.isArray(items) ? items : [];

    React.useEffect(() => {
        dispatch(transaction.fetchAll());
    }, [dispatch]);

    const myCart = transactions.filter((transaction) => userData?.role === 'client' && transaction?.user._id === userData?._id);

    const totalAmount = myCart.reduce((acc, product) => product?.status !== 'Shipped' && acc + (product.book.price * product.quantity), 0);

    const pay = async () => {
       await dispatch(transaction.fetchPay())
       window.location.reload()
    }

    return (<>
        <Container>
            <Row className="sign-card">
                <Col >
                    <div >
                        <br />
                        <h2>Менің себетім</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active href="/cart">
                                Менің себетім
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={8} md={8}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Тауар</th>
                                            <th>Саны</th>
                                            <th>Бағасы</th>
                                            <th>Барлығы</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        myCart.map((product, i) => product?.status !== 'Shipped' && (
                                            <Product
                                                key={i}
                                                id={product?._id}
                                                imageUrl={`http://localhost:5000${product?.book?.imageUrl}`}
                                                title={product?.book?.title}
                                                stock={  product?.book?.stock}
                                                quantity={  product?.quantity}
                                                price={  product?.book?.price}
                                                isShipped={product?.status === 'Shipped'}
                                            />
                                        ) )
                                    }

                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="w-100 checkout-card">
                                    <h4>Барлық тапсырыс</h4>
                                    <hr />
                                    <CreditCard size={64} color="#0077b6" />
                                    <hr />
                                    <label htmlFor="card-number">Карта нөмірі</label>
                                    <input type="text" id="card-number" className="w-100" placeholder="1111 2222 4444 5555" />
                                    <label htmlFor="card-fullname">Карта иесі</label>
                                    <input type="text" id="card-fullname" className="w-100" placeholder="Атыжөніңіз" />
                                    <Row>
                                        <Col lg={6}>
                                            <label htmlFor="card-month">Айы</label>
                                            <input type="date" id="card-month" className="w-100" />
                                        </Col>
                                        <Col lg={6}>
                                            <label htmlFor="card-cvv">CVV</label>
                                            <input type="number" id="card-cvv" className="w-100" placeholder="123" />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg={6} md={6} className="d-flex col justify-content-start">
                                            <h5>Барлығы</h5>
                                        </Col>
                                        <Col lg={6} md={6} className="d-flex col justify-content-end">
                                            {totalAmount} KZT
                                        </Col>
                                    </Row>
                                    <br />
                                    <Button className="w-100" onClick={() => { pay() }} >Төйлеу</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Cart