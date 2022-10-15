import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import Logo from '../images/hugfugee_favicon.png'


import "../styles/Header.scss";

const Header = ({ user }) => {

    console.log("user", user);
    const logout = () => {
      window.open("http://localhost:4000/auth/logout", "_self");
    };

    return (
        <header>
            <Navbar collapseOnSelect expand="lg">
                <Container fluid className="px-lg-5 py-lg-2">
                    <Link to="/">
                        <Navbar.Brand>
                            <img className="logo" src={Logo} alt="logo" />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Home</Nav.Link>
                            <Nav.Link href="#pricing">About</Nav.Link>
                            <NavDropdown title="Services" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Call</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">
                                    School
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Marketplace</NavDropdown.Item>

                                <NavDropdown.Item href="#action/3.4">
                                    Café
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Volunteers</Nav.Link>
                            {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.google.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.google.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (<Nav.Link eventKey={2} href="login">
                                Login
                            </Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;