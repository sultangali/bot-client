
import React from 'react'

const ShortBook = ({id, imageUrl, title, author}) => {

    return (<>
        <div className='w-100 short-book-card text-center' onClick={() => {window.location.assign('/catalog/books/' + id)}}>
            <img src={`http://localhost:5000${imageUrl}`} className='img-fluid' alt="" />
            <h5>{title}</h5>
            <h6>{author}</h6>
        </div>
    </>)
}

export default ShortBook