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

            <Container className="d-flex flex-wrap">
                <Link to ={"/search/"+car}> <img src={Car} alt="" /> </Link>
                <Link to ={"/search/"+bike}> <img src={Bike} alt="" /> </Link>
                <Link to ={"/search/"+bus}> <img src={Bus} alt="" /> </Link>
                <Link to ={"/search/"+train}> <img src={Train} alt="" /> </Link>
            </Container>
        </div>
    );
};

export default Home;