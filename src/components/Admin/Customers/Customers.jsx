import React from 'react'
import { Container, Row, Col, Breadcrumb, Alert, Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import * as user from '../../../redux/slices/user.js'
import alt from '../../../images/alt.png'
const Customers = () => {

    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.user) || { items: [] }

    const users = Array.isArray(items) ? items : []

    const clients = users.filter((user) => user?.status === 'denied' )

    React.useEffect(() => {
        dispatch(user.fetchAllUsers())
    }, [dispatch]);

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Клиенттік база</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin/customers">
                                Клиенттік база
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <Alert variant={'primary'} className="admin-main-alert" style={{ borderRadius: '1px' }}>
                                    <p>«Клиенттік база» бөлімі тұтынушылар туралы ақпаратты басқарудың ыңғайлы және тиімді әдісін ұсынады. Бұл бөлімде толық тұтынушы деректерін көруге және бар ақпаратты өңдеуге болады. Ыңғайлы кесте жұмыстың қарапайымдылығын және жоғары өнімділікті қамтамасыз ете отырып, қажетті ақпаратты жылдам табуға мүмкіндік береді. Жаңартылған тұтынушылар базасын қолдау, тұтынушылардың өзара әрекеттесуін жақсарту және қызмет деңгейлерін жақсарту үшін осы бөлімді пайдаланыңыз.</p>
                                </Alert>
                            </Col>
                            <Col lg={12} md={12}>
                                <br />
                                <div style={{ maxHeight: '350px', overflowY: 'auto', position: 'relative' }}>
                                    <Table striped bordered hover size={'lg'}>
                                        <thead >
                                            <tr>
                                                <th>#</th>
                                                <th>Аватары</th>
                                                <th>Аты-жөні</th>
                                                <th>Телефоны</th>
                                                <th>Поштасы</th>
                                                <th>Мекенжайы</th>
                                                <th>Транзакциясы</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                clients.map((user, i) => (
                                                    <tr>
                                                        <td>1</td>
                                                        <td style={{ width: '100px' }}>
                                                            <img
                                                                onClick={() => { window.location.assign(`http://localhost:5000${user?.avatar}`) }}
                                                                src={user?.avatar ? `http://localhost:5000${user?.avatar}` : alt}
                                                                style={{ height: '100px', width: '100px', cursor: 'pointer' }} alt="аватар" /></td>
                                                        <td >{user?.fullname}</td>
                                                        <td>{user?.phone}</td>
                                                        <td>{user?.email}</td>
                                                        <td>{user?.address}</td>
                                                        <td >
                                                            <Button
                                                                className='w-100'
                                                                variant='primary'
                                                                href={'/admin/customers/' + user?._id}
                                                                style={{ fontSize: 'medium', borderRadius: '1px', padding: '8px 12px' }}>{user?.transactions?.length} транзакция</Button>
                                                        </td>
                                                    </tr>
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

export default Customers