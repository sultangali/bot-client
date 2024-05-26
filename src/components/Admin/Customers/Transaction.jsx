import React from 'react'
import {  Form } from "react-bootstrap"

const Transaction = ({id, date, img, name, author, stock, price, status}) => {

    const [pickedStatus, setPickedStatus] = React.useState(status)

    console.log(status)

    const statusColors = {
        'Pending': '#FFEB3B',  // Күтілуде (Pending) - Светло-желтый
        'Processing': '#64B5F6',  // Өңделуде (Processing) - Светло-синий
        'Shipped': '#FFB74D',  // Жіберілді (Shipped) - Светло-оранжевый
        'Delivered': '#81C784',  // Жеткізілген (Delivered) - Светло-зеленый
        'Cancelled': '#E57373'   // Бас тартылды (Cancelled) - Светло-красный
    }

    const getStatusColor = (status) => {
        return statusColors[status] || '#FFFFFF'; // Белый по умолчанию
    }

    return (<>
        <tr>
            <td>{id}</td>
            <td >
                {date}</td>
            <td style={{ width: '240px' }} >
                <img
                    className='img-fluid w-100'
                    src={img}
                    alt="" /></td>
            <td>{name}</td>
            <td>{author}</td>
            <td>{stock}</td>
            <td >
                {price}
            </td>
            <td style={{ backgroundColor: getStatusColor(pickedStatus) }}>
                <Form.Select aria-label="Default select example" defaultValue={status} onChange={event => setPickedStatus(event.target.value)}>
                    <option value="">Таңдалмаған</option>
                    <option value="Pending">Күтілуде</option>
                    <option value="Processing">Өңделуде</option>
                    <option value="Shipped">Жіберілді</option>
                    <option value="Delivered">Жеткізілген</option>
                    <option value="Cancelled">Бас тартылды</option>
                </Form.Select>
            </td>
        </tr>
    </>)
}

export default Transaction
