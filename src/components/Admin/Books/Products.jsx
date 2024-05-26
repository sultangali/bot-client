import React from 'react'
import { Container, Row, Col, Breadcrumb, Alert, Table, Button } from "react-bootstrap"
import Product from './Product.jsx'
import { useDispatch, useSelector } from 'react-redux'
import * as admin from '../../../redux/slices/admin.js'

const Products = () => {

    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.admin) || { items: [] }

    const books = Array.isArray(items) ? items : []

    React.useEffect(() => {
        dispatch(admin.fetchAll());
    }, [dispatch]);

    console.log(books)

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Кітаптар қоймасы</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin/books">
                                Кітаптар қоймасы
                            </Breadcrumb.Item>

                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <Alert variant={'primary'} className="admin-main-alert" style={{ borderRadius: '1px' }}>
                                    <p>Кітаптар қоймасы» бөлімі өнім ассортиментін тиімді басқаруға арналған. Бұл бөлімде өнім деректерін көруге, жаңа элементтерді қосуға, бар өнімдер туралы ақпаратты өңдеуге және ескірген немесе қажет емес жазбаларды жоюға болады. Ыңғайлы кесте қойма деректерінің дәлдігі мен өзектілігін қамтамасыз ете отырып, өнім элементтерін жылдам табуға және басқаруға мүмкіндік береді. Бұл бөлімді қорларды басқаруды оңтайландыру, қордың тиімділігін арттыру және сату процестерін жақсарту үшін пайдаланыңыз.</p>
                                </Alert>
                            </Col>
                            <Col lg={12} md={12}>
                                <Button variant='success' style={{ borderRadius: '1px' }} href={`/admin/books/add`}>Жаңа тауар қосу</Button>

                            </Col>
                            <Col><br /></Col>
                            <Col lg={12} md={12}>
                                <div style={{ overflowY: 'auto', position: 'relative' }}>
                                    <Table striped bordered hover size={'lg'}>
                                        <thead >
                                            <tr>
                                                <th>ID</th>
                                                <th>Бейнесі</th>
                                                <th>Кітап атауы</th>
                                                <th>Авторы</th>
                                                <th>Толығырақ</th>
                                                <th>Категория</th>
                                                <th>Саны</th>
                                                <th>Бағасы</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                books.map((book, i) => (
                                                    <Product
                                                        key={i}
                                                        id={book._id.substring(18)}
                                                        title={book.title}
                                                        author={book.author}
                                                        description={book.description}
                                                        category={book.category}
                                                        price={book.price}
                                                        stock={book.stock}
                                                        imageUrl={book.imageUrl} />
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

export default Products