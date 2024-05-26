import React from "react";
import { Tab, Container, Row, Col, Button, Card, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { fetchAuthMe } from "../redux/slices/user.js";
import { Cart, ListCheck, ListUl } from 'react-bootstrap-icons'

import axios from "../axios.js";
import { ContentSpinner } from '../components/index.js'
import alt from '../images/alt.png'
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()

  const inputFileRef = React.useRef(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/avatar", formData);
      alert(JSON.stringify(data))
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  return (!userData ?

    <ContentSpinner />
    :
    <Container>
      <br />
      <Container>
        <Tab.Container defaultActiveKey={"rating"}>

          <br />
          <h2>{userData && userData.role === 'client' ? 'Клиент профилі' : 'Қызметкер профилі'}</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
            <Breadcrumb.Item active href="/profile">
              Жеке профиль
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr />
          <Row>
            <Col lg={4} xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <img
                      onClick={() => inputFileRef.current.click()}
                      src={userData && userData.avatar ? `http://localhost:5000${userData && userData.avatar} ` : alt
                      }
                      alt="Мына жерде сурет туру керек" />
                    <input
                      type="file"
                      onChange={handleChangeFile}
                      hidden
                      ref={inputFileRef}
                    />
                    <h5 className="text-center">{userData && userData.fullname}</h5>
                    <Button
                      variant="link"
                      href="/edit-profile">
                      Профильді өңдеу
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <h6>Телефон: {userData.phone}</h6>
              <h6>Адрес: {userData.address}</h6>
              <hr />

              {
                userData && userData.role === 'client' ?
                  <Row>
                    <Col lg={6} md={6}>
                      <Button 
                      onClick={() => { navigate('/cart') }}
                      className="w-100" variant="outline-primary" 
                      style={{ paddingTop: '42px', paddingBottom: '42px' }}>
                        <Cart size={'100'} />
                        <hr />
                        Менің себетім
                      </Button>
                    </Col>
                    <Col lg={6} md={6}>
                      <Button className="w-100" variant="outline-primary" 
                        onClick={() => { navigate('/my-transactions') }}
                      style={{ paddingTop: '42px', paddingBottom: '42px' }}>
                        <ListCheck size={'100'} />
                        <hr />
                        Менің тапсырысым
                      </Button>
                    </Col>
                  </Row>
                  : 
                  <Row>
                    <Col lg={6} md={6}>
                      <Button className="w-100" 
                      onClick={() => { navigate('/all-transactions') }}
                      variant="outline-primary" style={{ paddingTop: '42px', paddingBottom: '42px' }}>
                        <ListUl size={'100'} />
                        <hr />
                        Транзакциялар
                      </Button>
                    </Col>
                  </Row>
                }
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Container>
  );
};

export default Profile;
