import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, logout, fetchAuthMe } from "../redux/slices/user.js"
import { Cart } from "react-bootstrap-icons";

const Header = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  const userData = useSelector((state) => state.user.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    window.location.assign('/')
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" bg="primary" sticky="top">
        <Container>
          <Link to={"/"} className="brand-link" >
            <Navbar.Brand >
              КІТАП ДҮКЕНІ
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/catalog">Каталог</Nav.Link>
              <Nav.Link href="/chat" active>Чат-бот</Nav.Link>
              <Nav.Link href="https://www.flip.kz/catalog?subsection=1">Қосымша</Nav.Link>
              {userData?.role !== 'client' && <Nav.Link href="/admin">Админ үшін</Nav.Link>}
            </Nav>
            {isAuth ? (
              <>
                <Nav>
                  {userData && userData.role === 'client' ?
                    <>
                      <Nav.Link href="/cart">
                        <Cart size={'32px'} />
                      </Nav.Link>
                      <Nav.Link href="/profile"> Қош келдіңіз, &nbsp;
                        {userData && userData.fullname && userData.fullname}
                      </Nav.Link>
                    </> : <Nav.Link href="/profile"> Қош келдіңіз, &nbsp;
                      {userData && userData.fullname && userData.fullname}
                    </Nav.Link>}
                  <Nav.Link
                    eventKey={2}
                    onClick={() => onClickLogout()}>
                    Шығу
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Button href="/login">Кіру</Button>&nbsp;&nbsp;&nbsp;
                <Button className="reg-nav-link" href="/registration">Тіркелу</Button>
              </>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
