import Carousel from 'react-bootstrap/Carousel';
import Afghanflag from '../images/afghanflag.jpg';
import Russianflag from '../images/russianflag.jpg';
import Ukrainianflag from '../images/ukrainianflag.jpg';

import "../styles/Slider.scss";


const Slider = ()=> {
    return (
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 slide"
          src={Afghanflag}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide"
          src={Russianflag}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide"
          src={Ukrainianflag}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}

export default Slider;