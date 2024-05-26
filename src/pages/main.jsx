import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as admin from '../redux/slices/admin.js'
import { ShortBook } from "../components";

const Main = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [search, setSearch] = React.useState()

    const { items } = useSelector((state) => state.admin) || { items: [] }

    const books = Array.isArray(items) ? items : []

    React.useEffect(() => {
        dispatch(admin.fetchAll())
    }, [dispatch])

    let topBooks = []

    for (let i = 0; i < 4; i++) {
        topBooks.push(books[i])
    }

    return (
        <>
            <Container fluid >
                <Row className="d-flex row align-items-center text-center main-page-container justify-content-center">
                    <Col md={6} className="d-flex column">
                        <input type="text" className="form-control" onChange={(event) => {setSearch(event.target.value)}} placeholder="Керек кітапты іздеу" />&nbsp;
                        <Button onClick={() => { navigate(`/search/${search}`) }}>Іздеу</Button>
                    </Col>
                </Row>
            </Container>
            <br />
            <Container>
                <span className="main-page-top-heading">Топ кітаптар</span>
                <hr />
                <Row>
                    {topBooks?.map((book, i) => (
                        <Col key={i} lg={3} md={3}>
                            <ShortBook
                                id={book?._id}
                                title={book?.title}
                                imageUrl={book?.imageUrl}
                                author={book?.author} />
                        </Col>
                    ))}
                    <Col lg={12} md={12} className="d-flex col justify-content-end">
                        <Button variant="link" onClick={() => {navigate('/catalog')}}>Толығырақ...</Button>
                    </Col>
                </Row>
                <br />
            </Container>

        </>
    );
}

export default Main;
