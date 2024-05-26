import React from 'react'

const Product = ({id, imageUrl, title, description, category, author, stock, price}) => {

    return (<>
        <tr>
            <td>{id}</td>
            <td style={{ width: '240px' }} >
                <img
                    className='img-fluid w-100'
                    src={`http://localhost:5000${imageUrl}`}
                    alt="" /></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{stock}</td>
            <td>{price} KZT</td>
        </tr>
    </>)
}

export default Product
