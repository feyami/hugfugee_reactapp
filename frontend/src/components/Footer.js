import Nav from 'react-bootstrap/Nav';
import "../styles/Footer.scss";

const Footer = () => {
    return (
        <footer>
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href="">Contact</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>
                        Link
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </footer>
    )
}

export default Footer;