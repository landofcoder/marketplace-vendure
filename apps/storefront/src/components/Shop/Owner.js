import React from 'react'
const Owner = (props) => {
    const {owner} = props
    return (
        <React.Fragment>
            <p>SHOP OWNER</p>
            <div style={{marginLeft: "10px"}}>
                <div className="multi-testimonial-single-item">
                    <div className="multi-testimonial-single-item__author-info">
                        <div className="member-image">
                            <img
                                src={process.env.PUBLIC_URL + owner.ownerImage}
                                className="img-fluid"
                                alt="Shop Owner"
                            />
                        </div>
                    </div>
                    <span>Owner Name: {owner.ownerName ? owner.ownerName : "Default Owner Name"}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Owner
