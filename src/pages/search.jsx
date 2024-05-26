import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as admin from '../redux/slices/admin.js'
import { ShortBook } from '../components/index.js'
import { useParams } from "react-router-dom"

const Search = () => {

    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.admin) || { items: [] };
    const books = Array.isArray(items) ? items : [];

    const params = useParams();
    const searchTerm = params.text || '';

    console.log(searchTerm);

    const sortedBooks = books.filter((book) => book.title.includes(searchTerm));

    React.useEffect(() => {
        dispatch(admin.fetchAll());
    }, [dispatch]);

    console.log(sortedBooks)

    return (<>
        <Container>
            <Row className="sign-card">
                <Col >
                    <div >
                        <br />
                        <h2>"{params.text}" бойынша іздеу</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                            Іздеу
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <div className="auth-img"></div>
                            </Col>
                            <Col lg={12} md={12}>
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

export default Search