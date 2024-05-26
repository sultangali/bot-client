import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";
import alt from '../../../images/alt.png';
import { useDispatch } from 'react-redux';
import * as user from '../../../redux/slices/user.js';

const Employee = ({ id, avatar, fullname, phone, email, address, role, status }) => {

    const dispatch = useDispatch();

    const roles = {
        'Таңдалмаған': 'Таңдалмаған',
        'Админинстратор': 'Админинстратор',
        'Менеджер': 'Менеджер',
        'Сатушы': 'Сатушы'
    };

    const statuses = {
        'Таңдалмаған': 'Таңдалмаған',
        'denied': 'Рұқсат жоқ',
        'accepted': 'Рұқсат бар'
    }

    const [selectedRole, setSelectedRole] = useState(role);
    const [selectedStatus, setSelectedStatus] = useState(status);

    useEffect(() => {
        setSelectedRole(role);
        setSelectedStatus(status);
    }, [role, status]);

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        dispatch(user.fetchSetRole({
            id,
            role: newRole
        }))
        dispatch(user.fetchAuthMe())
    }


    return (
        <tr>
            <td>1</td>
            <td style={{ width: '100px' }}>
                <img src={avatar ? `http://localhost:5000${avatar}` : alt} style={{ height: '100px', width: '100px' }} alt="аватар" />
            </td>
            <td>{fullname}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>
                <Form.Select aria-label="Default select example" value={selectedRole} onChange={handleRoleChange}>
                    {
                        Object.entries(roles).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))
                    }
                </Form.Select>
            </td>
            <td>
                {statuses[selectedStatus]}
            </td>
        </tr>
    );
};

export default Employee;
