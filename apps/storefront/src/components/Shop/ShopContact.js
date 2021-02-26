import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CONTACT_US_SHOP } from "@bavaan/graphql/other/contact-shop.graphql";
import {useMutation} from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import {solveUpdateDirectData} from "../../redux/actions/resolverAction";
import { connect } from "react-redux";
const ShopContact = ({shop, customer, solveUpdateDirectData}) => {
  shop = shop ?? {
    customerInfo: {},
    channel: {
      id: 1,
      code: "_default_channel_",
      createdAt: new Date("01/01/2020"),
    },
  };
  const [error, setError] = useState(false);
  const [content, setMessage] = useState({ subject: "", message: "" });
  const sendMessage = (event) => {
    setMessage({ ...content, [event.target.name]: event.target.value });
  };
  const [authorLocation, setAuthorLocation] = useState("");
  const { addToast } = useToasts();
  const [sentContact] = useMutation(CONTACT_US_SHOP, {});

  const sendingClickHandler = async () => {
    try {
      if( content.subject && content.message ){
        setError(false);
        const authorIp = "";
        const captcha = "";
        if(content.message.length <= 4){
          throw { message: "Message should greater than 4 characters. Please try again!" };
        }
        if(content.subject.length <= 3){
          throw { message: "Message should greater than 3 characters. Please try again!" };
        }
        const queryParams = {
          variables: {
            channelId: shop.channel.id?parseInt(shop.channel.id):1,
            authorEmail: customer.emailAddress,
            authorName: customer?(customer.firstName+" "+customer.lastName):"",
            authorPhone: customer.phoneNumber,
            subject: content.subject,
            message: content.message
          }
        };
        if(customer.id){
          queryParams.variables["customerId"] = customer.id
        }
        if(authorIp){
          queryParams.variables["authorIp"] = authorIp
        }
        if(captcha){
          queryParams.variables["captcha"] = captcha
        }
        if(authorLocation){
          queryParams.variables["authorLocation"] = authorLocation
        }
        const data = await sentContact(queryParams);
        if (data.errors || data.message) {
          throw { message: "Some error when submit contact form" };
        }
        addToast("Thanks you for contacting us! We will answer you soon.", {
          appearance: "success",
          autoDismiss: true,
        });
        solveUpdateDirectData();
      }else {
        setError(true);
        throw { message: "Required name, email, subject, message" };
      }
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Container className="send-mss-form">
      <h4 id="send-message">Send Message To Shop Owner</h4>
      <Container>
        <div>
          <h5>From</h5>
          <br />
          {customer ?
          <h6>Name: {customer.firstName + " " + customer.lastName} <br /> Email: {customer.emailAddress}</h6>
          : <h6>
            <a href="/customer/login">your_email with <i>login</i></a>
          </h6>
          }

          <i className="more-info">
            Your contact information will not be shared with the merchant.
          </i>
          <br />
          <br />
          <br />
        </div>
        <div>
          <h5>To</h5>
          <br />
          <h6>Channel: {shop && shop.channel && shop.channel.code ? shop.channel.code : ""}</h6>
          <h6>Email: {shop && shop.email ? shop.email : ""}</h6>
          <br />
          <br />
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Subject*</Form.Label>
            <Form.Control
              type="text"
              required
              className={error === true ? "required-border" : ""}
              value={content.subject}
              name="subject"
              onChange={(event) => sendMessage(event)}
            />
            {error === true ? (
              <i className="required-text">This field is required</i>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Your Message*</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              required
              className={error === true ? "required-border" : ""}
              value={content.message}
              name="message"
              onChange={(event) => sendMessage(event)}
            />
            {error === true ? (
              <i className="required-text">This field is required</i>
            ) : (
              ""
            )}
          </Form.Group>
          <Button type="button" variant="danger" onClick={sendingClickHandler}>
            Send
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    solveUpdateDirectData: () => dispatch(solveUpdateDirectData()),
  };
}

export default connect(null, mapDispatchToProps)(ShopContact);
