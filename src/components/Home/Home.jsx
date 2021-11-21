import React from 'react';
import {Row} from 'react-bootstrap'
import './Home.css'
import '../../App.css'

const Home = (props) => {
    return (
        <div className="container">
            <Row>
                <div className="col-lg-8" align="left">

                </div>
                <div className="col-lg-4" id="home_text" align="left">
                    <h1>Welcome to Local Volleyball</h1>
                    <h3>First Time Here? <a href="/register" id="home-path">Sign up here!</a></h3>
                    <h3>If not, <a href="/login" id = "home-path"> Login here!</a></h3>
                </div>
            </Row>
        </div>
    )
}

export default Home;