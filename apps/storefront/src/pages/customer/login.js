import { useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Link from "next/link";

import LayoutFive from "../../components/Layout/LayoutFive";
import { SIGN_IN } from "@bavaan/graphql/customer/sign-in.graphql";
import { solveUpdateDirectData } from "../../redux/actions/resolverAction";

const Login = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const emailRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { addToast } = useToasts();
  const [loginReq] = useMutation(SIGN_IN, {});
  const router = useRouter();
  if (currentCustomer) {
    router.push("/");
  }

  const loginAction = async () => {
    try {
      const email = emailRef.current.value;
      // check email input;
      const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!emailPattern.test(email)){
        throw { message: "Please enter valid Email address." };
      }
      const data = await loginReq({
        variables: {
          emailAddress: email,
          password: password,
          rememberMe: remember,
        },
      });
      console.log(data.data.login.__typename);
      if ((data && data.data && data.data.login && data.data.login.__typename) && (data.data.login.__typename === "InvalidCredentialsError" || data.data.login.__typename === "NotVerifiedError" || data.data.login.__typename === "NativeAuthStrategyError")) {
        if (data.data.login.__typename === "InvalidCredentialsError"){
          throw { message: "Invalid Credentials Error" };
        } else if (data.data.login.__typename === "NotVerifiedError"){
          throw { message: "Not Verified Error" };
        } else if (data.data.login.__typename === "NativeAuthStrategyError"){
          throw { message: "Native Auth Strategy Error" };
        }
      } else if (data.data.login.__typename === "CurrentUser"){
        addToast("Welcome back Swaraj Shop !", {
          appearance: "success",
          autoDismiss: true,
        });
        solveUpdateDirectData();
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
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col
              lg={{ offset: 3, span: 6 }}
              className="space-mb-mobile-only--50"
            >
              <div className="lezada-form login-form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginAction();
                  }}
                >
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Login</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        name="email"
                        id="email"
                        ref={emailRef}
                        type="text"
                        placeholder="Email address"
                        required
                      />
                      {emailError !== null ? <p>{emailError}</p> : null}
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium">
                        login
                      </button>
                    </Col>
                    <Col>
                      <input
                        onChange={(e) => {
                          setRemember(e.target === "on");
                        }}
                        type="checkbox"
                      />{" "}
                      <span className="remember-text">Remember me</span>
                      <a href="/customer/forgotten-password" className="reset-pass-link">
                        Lost your password?
                      </a>
                      <Link href="/customer/register">
                        <a className="reset-pass-link">
                          No account? Register here
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
