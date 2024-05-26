import React from 'react'
import { Container, Row, Col, Breadcrumb, Table, Button } from "react-bootstrap"
import alt from '../../../images/alt.png'
import { useDispatch, useSelector } from 'react-redux'
import * as user from '../../../redux/slices/user.js'
const Delete = () => {

    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.user) || { items: [] }

    const users = Array.isArray(items) ? items : []

    React.useEffect(() => {
        dispatch(user.fetchAllUsers())
    }, [dispatch]);

    const setStatus = async (id, status) => {
        await dispatch(user.fetchSetStatus({ id, status }))
        dispatch(user.fetchAuthMe())
        dispatch(user.fetchAllUsers())
    }

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Қызметкерді өшіру</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin/employees">
                                Жеке құрам менеджменті
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin/employees/delete">
                                Қызметкерді өшіру
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <br />
                                <div style={{ maxHeight: '500px', overflowY: 'auto', position: 'relative' }}>
                                    <Table striped bordered hover size={'lg'}>
                                        <thead >
                                            <tr>
                                                <th>#</th>
                                                <th>Аватары</th>
                                                <th>Аты-жөні</th>
                                                <th>Телефоны</th>
                                                <th>Поштасы</th>
                                                <th>Мекенжайы</th>
                                                <th>Қосу</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user, i) => user?.status === 'accepted' && (
                                                    <tr>
                                                        <td>{user?._id.substring(18)}</td>
                                                        <td style={{ width: '100px' }}><img src={user?.avatar ? `http://localhost:5000${user?.avatar}` : alt} style={{ height: '100px', width: '100px' }} alt="аватар" /></td>
                                                        <td >{user?.fullname}</td>
                                                        <td>{user?.phone}</td>
                                                        <td>{user?.email}</td>
                                                        <td>{user?.address}</td>
                                                        <td>
                                                            <Button
                                                                variant='danger'
                                                                onClick={() => {setStatus(user?._id, 'denied')}}
                                                                className='w-100'
                                                                style={{ fontSize: 'medium', borderRadius: '1px', padding: '8px 12px' }}>Жүйеден өшіру</Button>
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

export default Delete