import React from 'react'
import { Container, Row, Col, Breadcrumb, Alert, Table, Button} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import * as user from '../../../redux/slices/user.js'
import Employee from './Employee.jsx'

const Employees = () => {

    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.user) || { items: [] }

    const users = Array.isArray(items) ? items : []

    React.useEffect(() => {
        dispatch(user.fetchAllUsers())
    }, [dispatch])

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Жеке құрам менеджменті</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin/employees">
                                Жеке құрам менеджменті
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <Alert variant={'primary'} className="admin-main-alert" style={{ borderRadius: '1px' }}>
                                    <p>«Жеке құрам менеджменті» бөлімі компанияңыздың қызметкерлері туралы деректерді тиімді басқаруға арналған. Бұл бөлімде қызметкерлер туралы толық ақпаратты ыңғайлы кестеде көруге, жазбаларды жоюға, қызметкер рөлдерін өзгертуге және жаңа топ мүшелерін қосуға болады. Біздің жүйе персоналды басқарудың қарапайымдылығы мен ашықтығын қамтамасыз етеді, бұл деректерді жылдам және қиындықсыз жаңартып отыруға және команданың жұмысын ұйымдастыруға мүмкіндік береді.</p>
                                </Alert>
                            </Col>
                            <Col lg={12} md={12}>
                                <Button
                                    variant='success'
                                    style={{ borderRadius: '1px', backgroundColor: '--bs-success' }}
                                    href="/admin/employees/add">Жаңа қызметкер қосу</Button>{' '}
                                <Button
                                    variant='danger'
                                    style={{ borderRadius: '1px' }}
                                    href="/admin/employees/delete">Қызметкерді өшіру</Button>
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
                                                <th>Рөлі</th>
                                                <th>Статусы</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user, i) => user?.status === 'accepted' && (
                                                    <Employee 
                                                        id={user?._id}
                                                        avatar={user?.avatar}
                                                        fullname={user?.fullname}
                                                        phone={user?.phone}
                                                        address={user?.address}
                                                        email={user?.email}
                                                        role={user?.role}
                                                        status={user?.status} />
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

export default Employees