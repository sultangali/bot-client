import React from "react"
import { Container, Row, Col, Breadcrumb, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as transaction from '../redux/slices/transaction.js'

const AllTransactions = () => {

    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.transaction) || { items: [] };

    const transactions = Array.isArray(items) ? items : [];

    React.useEffect(() => {
        dispatch(transaction.fetchAll());
    }, [dispatch]);

    const statusColors = {
        'Pending': '#FFEB3B',  // Күтілуде (Pending) - Светло-желтый
        'Processing': '#64B5F6',  // Өңделуде (Processing) - Светло-синий
        'Shipped': '#FFB74D',  // Жіберілді (Shipped) - Светло-оранжевый
        'Delivered': '#81C784',  // Жеткізілген (Delivered) - Светло-зеленый
        'Cancelled': '#E57373'   // Бас тартылды (Cancelled) - Светло-красный
    }

    const statusName = {
        'Pending': 'Күтілуде',  // Күтілуде (Pending) - Светло-желтый
        'Processing': 'Өңделуде',  // Өңделуде (Processing) - Светло-синий
        'Shipped': 'Жөнелтілді',  // Жіберілді (Shipped) - Светло-оранжевый
        'Delivered': '#81C784',  // Жеткізілген (Delivered) - Светло-зеленый
        'Cancelled': '#E57373'   // Бас тартылды (Cancelled) - Светло-красный
    }

    const getStatusColor = (status) => {
        return statusColors[status] || '#FFFFFF'; 
    }

    const getStatusName = (status) => {
        return statusName[status] || 'Таңдалмаған'; 
    }

    return (<>
        <Container>
            <Row className="sign-card">
                <Col >
                    <div >
                        <br />
                        <h2>Барлық транзакциялар</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                            Барлық транзакциялар
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Тауар</th>
                                            <th>Саны</th>
                                            <th>Бағасы</th>
                                            <th>Барлығы</th>
                                            <th>Тұтынушы</th>
                                            <th>Телефоны</th>
                                            <th>Поштасы</th>
                                            <th>Статусы</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        transactions.map((product, i) => (
                                            <tr>
                                            <td>1</td>
                                            <td style={{ width: '140px', height: '200px' }} className="text-center">
                                                <img
                                                    className='img-fluid w-100'
                                                    src={`http://localhost:5000${product?.book?.imageUrl}`}
                                                    alt=""
                                                />
                                                <div>
                                                    <h6>{product?.book?.title}</h6>
                                                </div>
                                            </td>
                                            <td>
                                                {product?.quantity}
                                            </td>
                                            <td>{product?.book?.price} KZT</td>
                                            <td>{product?.book?.price * product?.quantity} KZT</td>
                                            <td>{product?.user?.fullname}</td>
                                            <td>{product?.user?.phone}</td>
                                            <td>{product?.user?.email}</td>
                                            <td style={{backgroundColor: getStatusColor(product?.status)}}>{getStatusName(product?.status)}</td>
                                        </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default AllTransactions