import React from "react"
import { Container, Row, Col, Button, Breadcrumb, Alert } from "react-bootstrap"

const Admin = () => {

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Админ терезесі</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <br />
                                <Alert variant={'primary'} className="admin-main-alert">
                                    Біздің басқару жүйеміздің басқару тақтасына қош келдіңіз! Мұнда сіз өзіңіздің бизнесіңіздің барлық аспектілерін тиімді басқара аласыз. Қызметкерлерді, тұтынушылар базасын және өнім ассортиментін толық бақылау үшін «Қызметкерлер», «Тұтынушылар» және «Өнімдер» бөлімдерін пайдаланыңыз. Біздің интуитивті бақылау тақтасы сізге ақпаратты оңай көруге, өңдеуге және қосуға көмектеседі, бұл сіздің бизнесіңіздің бірқалыпты жұмыс істеуін қамтамасыз етеді. Әкімші панелін бүгіннен бастап пайдалануды бастаңыз және компанияңыздың басқару мен тиімділігін арттырудың күшін табыңыз.
                                </Alert>
                                <br />
                            </Col>
                            <Col lg={4} md={4}>
                                <Button variant="success"
                                    className="admin-card-btn-emp w-100 d-flex col align-items-center " href="/admin/employees">
                                    <div>
                                        Жеке құрам менеджменті
                                        <hr />
                                        <span>
                                            Қызметкерлер туралы ақпаратты қарау және өңдеу
                                        </span>
                                    </div>
                                </Button>
                            </Col>
                            <Col lg={4} md={4}>
                                <Button variant="info" className="admin-card-btn-cli w-100 d-flex col align-items-center" href="/admin/customers">
                                    <div>
                                        Клиенттік база
                                        <hr />
                                        Тұтынушы деректерін көру және басқару
                                    </div>
                                </Button>
                            </Col>
                            <Col lg={4} md={4}>
                                <Button variant="primary" className=" admin-card-btn-pro w-100 d-flex col align-items-center" href="/admin/books">
                                    <div>
                                        Кітаптар қоймасы
                                        <hr />
                                        Өнімдерді қосу, жою және өңдеу мүмкіндігі
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Admin