import React from "react"
import { Container, Row, Col, Button, Breadcrumb } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as admin from '../redux/slices/admin.js'
import { ShortBook } from '../components/index.js'

const Catalog = () => {

    const dispatch = useDispatch()

    const categories = {
        '0': 'Барлық кітаптар',
        '1': 'Көркем әдебиет',
        '2': 'Балалар әдебиеті',
        '3': 'Танымал психология',
        '4': 'Іскерлік әдебиет',
        '5': 'Медицина және денсаулық',
        '6': 'Ғылым'
    }

    const [selectedCategory, setSelectedCategory] = React.useState(categories[0])

    const { items } = useSelector((state) => state.admin) || { items: [] }

    const books = Array.isArray(items) ? items : []

    const sortedBooks = selectedCategory === 'Барлық кітаптар'
        ? books
        : books.filter((book) => book.category === selectedCategory);

    React.useEffect(() => {
        dispatch(admin.fetchAll())
    }, [dispatch])

    return (<>
        <Container>
            <Row className="sign-card">
                <Col >
                    <div >
                        <br />
                        <h2>Каталог</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active href="/catalog">
                                Каталог
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <div className="auth-img"></div>
                            </Col>
                            <Col lg={12} md={12}>
                                <br />
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[1]) }}>Көркем әдебиет</Button>{' '}
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[2]) }}>Балалар әдебиеті</Button>{' '}
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[3]) }}>Танымал психология</Button>{' '}
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[4]) }}>Іскерлік әдебиет</Button>{' '}
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[5]) }}>Медицина және денсаулық</Button>{' '}
                                <Button className="category-btn" onClick={() => { setSelectedCategory(categories[6]) }}>Ғылым</Button>{' '}
                            </Col>
                            <Col lg={12} md={12}>
                                <br />
                                <h4 className="h4-heading">{selectedCategory}</h4>
                                <br />
                                <Row>
                                    {sortedBooks.map((book, i) => (
                                        <Col key={i} lg={3} md={3}>
                                            <ShortBook
                                                id={book._id}
                                                title={book.title}
                                                imageUrl={book.imageUrl}
                                                author={book.author} />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Catalog