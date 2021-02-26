import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Link from "next/link";

import LayoutFive from "../../components/Layout/LayoutFive";
import { REQUEST_PASSWORD_RESET } from "@bavaan/graphql/customer/forgotten-password.graphql";
import { solveUpdateDirectData } from "../../redux/actions/resolverAction";

const ForgottenPassword = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const { addToast } = useToasts();
  const [resetPasswordReq] = useMutation(REQUEST_PASSWORD_RESET, {});
  const router = useRouter();
  if (currentCustomer) {
    if (Object.keys(router.components).length > 2) router.back();
    else router.push("/");
  }

  const validate = () => {
    let isValid = true;
    let emailError = "";

    if (!email) {
      isValid = false;
      emailError = "Please enter your email Address.";
    }

    if (typeof email !== "undefined") {
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        emailError = "Please enter valid email address.";
      }
    }
    setError(emailError);

    return isValid;
  };

  const resetPasswordAction = async () => {
    if(validate()){
      try {
        const data = await resetPasswordReq({
          variables: {
            emailAddress: email
          },
        });
        if (data.errors || data.message) {
          throw { message: "No token provided! Cannot verify email address." };
        }
        addToast("Reset password request was sent successfully. Please check your email inbox to get reset password link !", {
          appearance: "success",
          autoDismiss: true,
        });
        solveUpdateDirectData();
      } catch (e) {
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      }
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
                    resetPasswordAction();
                  }}
                >
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Reset Password</h2>
                        <p>Please input your email address to reset password!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Email address"
                        required
                      />
                      <div className="text-danger">{error?error:""}</div>
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium">
                      Reset password
                      </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
