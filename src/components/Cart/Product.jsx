import React from "react"
import * as transaction from '../../redux/slices/transaction.js'
import { useDispatch } from "react-redux"


const Product = ({ id, imageUrl, title, stock, quantity, price, isShipped }) => {

    const dispatch = useDispatch();
    const [switchNumber, setSwitchNumber] = React.useState(quantity);

    const handleQuantityChange = (event) => {
        const value = Number(event.target.value);
        setSwitchNumber(value);
    };

    React.useEffect(() => {
        const updateStock = async () => {
            if (switchNumber !== quantity) {
                await dispatch(transaction.fetchPatch({ id, stock: switchNumber }))
                window.location.reload()
            }
        };
        updateStock();
    }, [switchNumber, quantity, id, dispatch]);

    const total = price * switchNumber;
    return (
        <tr>
            <td>1</td>
            <td style={{ width: '140px', height: '200px' }} className="text-center">
                <img
                    className='img-fluid w-100'
                    src={imageUrl}
                    alt=""
                />
                <div>
                    <h6>{title}</h6>
                </div>
            </td>
            <td style={{ width: '200px' }}>
                <input
                    type="number"
                    className="form-control"
                    value={switchNumber}
                    max={stock}
                    onChange={handleQuantityChange}
                />
            </td>
            <td>{price} KZT</td>
            <td>{total} KZT</td>
        </tr>
    )
}

export default Product