import React from 'react'
import { Container, Row, Col, Breadcrumb, Alert, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import FormInput from '../../formInput.jsx'
import { useDispatch } from 'react-redux'

import { fetchAuthMe } from '../../../redux/slices/user.js'
import * as admin from '../../../redux/slices/admin.js'

import axios from '../../../axios'
import alt from '../../../images/alt.png'


const Add = () => {

    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = React.useState("")

    const [imageUrl, setImageUrl] = React.useState()

    const [pickCategory, setPickCategory] = React.useState()

    const categories = {
        '0': 'Таңдалмаған',
        '1': 'Көркем әдебиет',
        '2': 'Балалар әдебиеті',
        '3': 'Танымал психология',
        '4': 'Іскерлік әдебиет',
        '5': 'Медицина және денсаулық',
        '6': 'Ғылым'
    }

    console.log(categories[pickCategory])

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("image", file);
            const { data } = await axios.post("/api/upload/book", formData);
            setImageUrl(data.url)
        } catch (error) {
            console.warn(error);
            alert(error);
        }
        dispatch(fetchAuthMe());
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            title: "",
            author: "",
            description: "",
            stock: "",
            price: ""
        },
        mode: "onChange"
    })

    const onSubmit = async (values) => {
        const data = await dispatch(
            admin.fetchCreate({
                title: values.title,
                author: values.author,
                description: values.description,
                category: categories[pickCategory],
                stock: values.stock,
                price: values.price,
                imageUrl: imageUrl && imageUrl
            })
        )
        setErrorMessage(data.payload.message)
        window.location.assign('/admin/books')
    };

    return (<>
        <Container>
            <Row className="sign-card d-flex row align-items-center">
                <Col >
                    <div >
                        <br />
                        <h2>Кітаптарды қосу</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin">
                                Админ терезесі
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin/books">
                                Кітаптар қоймасы
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active href="/admin/books/add">
                                Кітаптар қосу
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Form onSubmit={handleSubmit(onSubmit)} method="post">
                            <Row>
                                <Col lg={12} md={12}>
                                    {errorMessage && errorMessage && (
                                        <Alert
                                            variant={errorMessage && errorMessage ? "danger" : "primary"}
                                            style={
                                                errorMessage && errorMessage
                                                    ? { borderColor: "red" }
                                                    : { borderRadius: "6px" }
                                            }>
                                            {
                                                <div className="text-center" style={{ margin: "-12px" }}>
                                                    {errorMessage && <span>{errorMessage}</span>}
                                                </div>
                                            }
                                        </Alert>
                                    )}
                                </Col>
                                <Col lg={4} md={4}>
                                    <FormInput
                                        errors={errors && errors.title}
                                        content={'Кітап атауын жазыңыз'}
                                        type={'text'}
                                        attributes={{
                                            ...register("title", {
                                                required: "Кітап атауын жазыңыз",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Кітап атауы 2 символдан кем болмауы керек",
                                                }
                                            })
                                        }} />
                                </Col>
                                <Col lg={4} md={4}>
                                    <FormInput
                                        errors={errors && errors.author}
                                        content={'Авторды жазыңыз'}
                                        type={'text'}
                                        attributes={{
                                            ...register("author", {
                                                required: "Авторды жазыңыз",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Автор атауы 2 символдан кем болмауы керек",
                                                }
                                            })
                                        }} />
                                </Col>
                                <Col lg={4} md={4}>
                                    <label htmlFor="select-category" style={{ marginBottom: '8px' }}>Категорияны таңдаңыз</label>
                                    <Form.Select id='select-category' className='form-control' onChange={event => setPickCategory(event.target.value)}>
                                        {Object.entries(categories).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col lg={12} md={12}>
                                    <FormInput
                                        errors={errors && errors.description}
                                        content={'Сипаттаманы жазыңыз'}
                                        type={'text'}
                                        attributes={{
                                            ...register("description", {
                                                required: "Сипаттаманы жазыңыз",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Сипаттама 2 символдан кем болмауы керек",
                                                }
                                            })
                                        }} />
                                </Col>
                                <Col lg={6} md={6}>
                                    <FormInput
                                        errors={errors && errors.stock}
                                        content={'Санын жазыңыз'}
                                        type={'number'}
                                        attributes={{
                                            ...register("stock", {
                                                required: "Санын жазыңыз"
                                            })
                                        }} />
                                </Col>
                                <Col lg={6} md={6}>
                                    <FormInput
                                        errors={errors && errors.price}
                                        content={'Бағасын жазыңыз'}
                                        type={'number'}
                                        attributes={{
                                            ...register("price", {
                                                required: "Бағасын жазыңыз"
                                            })
                                        }} />
                                </Col>
                                <Col lg={12} md={12} className=''>
                                    <Row>
                                        <Col lg={10} md={10}>
                                            <input
                                                className='form-control'
                                                type="file"
                                                onChange={handleChangeFile} />
                                        </Col>
                                        <Col >
                                            <img
                                                className='w-100'
                                                style={{ border: '1px solid #0077b6', borderRadius: '6px', height: '300px' }}
                                                // onClick={() => inputFileRef.current.click()}
                                                src={`http://localhost:5000${imageUrl && imageUrl}` || alt}
                                                alt={imageUrl && imageUrl} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12} md={12} className='d-flex col justify-content-end'>
                                    <Button style={{ marginTop: '24px' }} type="submit" disabled={!isValid} variant='primary'>Кітапты қосу</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Add