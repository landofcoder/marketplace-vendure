import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosPin, IoIosCall, IoIosMail, IoIosClock } from "react-icons/io";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import LayoutFive from "../components/Layout/LayoutFive";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { CONTACT_US_STORE } from "@bavaan/graphql/other/contact-store.graphql";
import { solveUpdateDirectData } from "../redux/actions/resolverAction";
import {
  SectionTitleOne,
  SectionTitleTwo,
} from "@bavaan/storefront-base/src/components/SectionTitle";

const validator = require("email-validator");

const Contact = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const defaultAuthorName = currentCustomer?(currentCustomer.firstName+" "+currentCustomer.lastName):"";
  const defaultAuthorEmail = currentCustomer?currentCustomer.emailAddress:"";
  const defaultAuthorPhone = currentCustomer?currentCustomer.phoneNumber:"";
  const [authorName, setAuthorName] = useState(defaultAuthorName);
  const [authorEmail, setAuthorEmail] = useState(defaultAuthorEmail);
  const [authorPhone, setAuthorPhone] = useState(defaultAuthorPhone);
  const [authorLocation, setAuthorLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { addToast } = useToasts();
  const [contactUsReq] = useMutation(CONTACT_US_STORE, {});
  const router = useRouter();
  const contactUsAction = async () => {
    try {
      let customerId = 0;
      if (currentCustomer) {
        customerId = currentCustomer.id
      }
      const contactAuthorName = authorName.trim();
      const contactEmail = authorEmail.trim();
      const contactSubject = subject.trim();
      const contactMessage = message.trim();

      if(contactAuthorName && contactEmail && contactSubject && contactMessage){
        const authorIp = "";
        const captcha = "";
        const emailVerified = validator.validate(contactEmail);
        if(!emailVerified){
          throw { message: "Your email is invalid. Please try again!" };
        }
        if(contactMessage.length <= 4){
          throw { message: "Message should greater than 4 characters. Please try again!" };
        }
        if(contactSubject.length <= 3){
          throw { message: "Message should greater than 3 characters. Please try again!" };
        }
        const queryParams = {
          variables: {
            channelId: 1,
            authorEmail: authorEmail,
            authorName: contactAuthorName,
            authorPhone: authorPhone,
            subject: contactSubject,
            message: contactMessage
          }
        };
        if(customerId){
          queryParams.variables["customerId"] = customerId
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
        const data = await contactUsReq(queryParams);
        if (data.errors || data.message) {
          throw { message: "Some error when submit contact form" };
        }
        addToast("Thanks you for contacting us! We will answer you soon.", {
          appearance: "success",
          autoDismiss: true,
        });
        solveUpdateDirectData();
      }else {
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
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Contact"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Contact</li>
        </ul>
      </BreadcrumbOne>
      <div className="contact-page-content-wrapper space-mt--r130 space-mb--r130">
        <div className="contact-page-top-info space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleTwo
                  title="Contact detail"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <Col md={4} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosPin />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">ADDRESS</h3>
                    <p className="content">
                      68 Nguyen Co Thach Street - Hanoi , 100000 - Vietnam
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosCall />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">CONTACT</h3>
                    <p className="content">
                      Mobile: +84 0356535598
                    </p>
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosMail />
                  </div>
                  <div className="icon-box__content">
                    <p className="content"> Mail: cs@storeofapp88@gmail.com</p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosClock />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">HOUR OF OPERATION</h3>
                    <p className="content">
                      Monday – Friday : 09:00 – 23:00
                      <span>Sunday &amp; Saturday: 09:00 – 23:00</span>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-map space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="google-map">
                  <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.964220232823!2d105.76310011450946!3d21.034117592972244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b947cd6e49%3A0x6a87974c6b44d671!2zNjggUGjhu5EgTmd1eeG7hW4gQ8ahIFRo4bqhY2gsIE3hu7kgxJDDrG5oLCBU4burIExpw6ptLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1615393746342!5m2!1sen!2s"
                      width="600" height="450" style="border:0;" allowFullScreen="" loading="lazy"></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-form">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleOne title="Get in touch" />
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="ml-auto mr-auto">
                <div className="lezada-form contact-form">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      contactUsAction();
                    }}
                  >
                    <Row>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          name="authorName"
                          id="authorName"
                          onChange={(e) => {
                            setAuthorName(e.target.value);
                          }}
                          defaultValue={defaultAuthorName}
                          required
                        />
                      </Col>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="email"
                          placeholder="Email *"
                          name="authorEmail"
                          id="authorEmail"
                          onChange={(e) => {
                            setAuthorEmail(e.target.value);
                          }}
                          defaultValue={defaultAuthorEmail}
                          required
                        />
                      </Col>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Your Phone"
                          name="authorPhone"
                          id="authorPhone"
                          onChange={(e) => {
                            setAuthorPhone(e.target.value);
                          }}
                          defaultValue={defaultAuthorPhone}
                        />
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Subject *"
                          name="subject"
                          id="subject"
                          onChange={(e) => {
                            setSubject(e.target.value);
                          }}
                          required
                        />
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <textarea
                          cols={30}
                          rows={10}
                          placeholder="Message"
                          name="contactMessage"
                          id="contactMessage"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          required
                          defaultValue={""}
                        />
                      </Col>
                      <Col md={12} className="text-center">
                        <button
                          type="submit"
                          value="submit"
                          id="submit"
                          className="lezada-button lezada-button--medium"
                        >
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutFive>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    solveUpdateDirectData: () => dispatch(solveUpdateDirectData()),
  };
}
const mapStateToProps = (state) => {
  return {
    prevStep: state.cartData.prevStep,
    currentCustomer: state.customerData.customer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
