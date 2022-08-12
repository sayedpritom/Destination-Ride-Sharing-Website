import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Home.css'
import Car from '../../images/car.png'
import Bike from '../../images/bike.png'
import Bus from '../../images/bus.png'
import Train from '../../images/train.png'
const Home = () => {
    const [bike, car, train, bus] = ['bike', 'car', 'train', 'bus']
    return (
        <div className="home">

            <Container className="row img-fluid">
                <div className="col-lg-3 col-md-4 col-6 "><Link to ={"/search/"+car}> <img className="img-fluid" src={Car} alt="" /> </Link></div>
                <div className="col-lg-3 col-md-4 col-6 "><Link to ={"/search/"+bike}> <img className="img-fluid" src={Bike} alt="" /> </Link></div>
                <div className="col-lg-3 col-md-4 col-6 "><Link to ={"/search/"+bus}> <img className="img-fluid" src={Bus} alt="" /> </Link></div>
                <div className="col-lg-3 col-md-4 col-6 "><Link to ={"/search/"+train}> <img className="img-fluid" src={Train} alt="" /> </Link></div>    
            </Container>
        </div>
    );
};

export default Home;