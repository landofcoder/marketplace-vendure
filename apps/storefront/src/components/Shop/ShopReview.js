import React, { useState } from 'react'
import {FaStar, FaStarHalfAlt} from "react-icons/fa"
import {Container, Row, Col, Table, ProgressBar, Button} from "react-bootstrap"

import ShopRating from './ShopRating'
const ShopReview = () => {
    const [option, setOption] = useState(1);
    
    const chooseButtonOption = (event) => {
        event.preventDefault()
        setOption(event.target.value)
    }
    return (
       <Container id="shop-review">
           <Row className="list-progress-star">
               <Col lg={2}></Col>
               <Col lg={4} className="shop-rating">

                   <p className="shop-rating__name">Reviews For ショップ Shop</p>
                   <FaStar className="shop-rating__icon" size={100}></FaStar>
                   <span className="shop-rating__value">4.7</span>

               </Col>
               <Col lg={4}>
                   <span>5 Star</span>
                   <ProgressBar className="star-progress" now={90} />
                   <br/>
                   <span>4 Star</span>
                   <ProgressBar className="star-progress" now={85} />
                   <br/>
                   <span>3 Star</span>
                   <ProgressBar className="star-progress" now={40} />
                   <br/>
                   <span>2 Star</span>
                   <ProgressBar className="star-progress" now={30} />
                   <br/>
                   <span>1 Star</span>
                   <ProgressBar className="star-progress" now={20} />
               </Col>
               <Col lg={2}></Col>
           </Row>
           <Row style={{marginBottom: "50px"}}>
               <Col lg={2}></Col>
               <Col lg={4} className="text-center">
                   <Button 
                        variant={option == 1 ? "danger" : "outline-danger"}
                        style={{width: "100%"}}
                        value={1}
                        onClick={() => chooseButtonOption(event)}
                    >
                        Most Recent</Button>
               </Col>
               <Col lg={4} className="text-center">
                   <Button 
                        variant={option == 2 ? "danger" : "outline-danger"}
                        style={{width: "100%"}}
                        value={2}
                        onClick={() => chooseButtonOption(event)}
                   >
                       Most Helpful
                   </Button>
               </Col>
           </Row>
       </Container>
    )
}

export default ShopReview
