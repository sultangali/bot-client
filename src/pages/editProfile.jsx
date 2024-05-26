import React from "react";
import { Container, Row, Col, Button, Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { fetchUpdateProfile, fetchAuthMe } from "../redux/slices/user.js";
import { FormInput } from '../components/index.js'
import baseUrl from "../baseUrl.js"

const EditProfile = () => {

  const dispatch = useDispatch()

  const userData = useSelector((state) => state.user.data);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  const [phone, setPhone] = React.useState(userData && userData.phone && userData.phone);

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: userData && userData.fullname && userData.fullname,
      address: userData && userData.address && userData.address
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      fetchUpdateProfile({
        fullname: values.fullname,
        phone: phone && phone,
        address: values.address
      })
    )
    setErrorMessage(data.payload.message);
    alert(errorMessage && errorMessage)

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    window.location.assign(`${baseUrl}/profile`)
  }

  return (<>
    <Container fluid className="">
      <br />
      <Container>
        <Row>
          <Form onSubmit={handleSubmit(onSubmit)} method="post">
            <Row>
              <Col lg={12} md={12}>
              <h4>Профильді өңдеу</h4>
              <hr />
              </Col>
              <Col lg={4} xs={12}>
                <FormInput
                  errors={errors && errors.fullname}
                  content={'Аты-жөніңіз'}
                  attributes={{
                    ...register("fullname", {
                      required: "Аты-жөніңіз енгізіңіз",
                      minLength: {
                        value: 10,
                        message:
                          "Аты-жөніңіз 10 символдан кем болмауы керек",
                      },
                    })
                  }}
                  placeholder={userData && userData.fullname && userData.fullname}
                  type={'text'} />
              </Col>

              <Col lg={4} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Телефон</Form.Label>
                  <PhoneInput
                    className="form-control phone"
                    defaultCountry="KZ"
                    value={phone}
                    onChange={setPhone}
                    placeholder={userData && userData.phone && userData.phone} />
                </Form.Group>
              </Col>

              <Col lg={4} xs={12}>
                <FormInput
                  errors={errors && errors.address}
                  content={'Мекенжай'}
                  attributes={{
                    ...register("address", {
                      required: "Мекенжайды жазыңыз",
                      minLength: {
                        value: 3,
                        message: "Өте аз символ, 3 символдан кем болмау керек",
                      },
                    })
                  }}
                  placeholder={userData && userData.address && userData.address}
                  type="text" />

              </Col>
            </Row>

            <Col className="col-12 d-flex column justify-content-end align-items-center">
              <Button variant="link" href="/profile">
                Артқа қайту
              </Button>
              <Button
                variant="primary"
                className="btn-signup"
                type="submit">
                Сақтау
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </Container>
  </>)
};

export default EditProfile


