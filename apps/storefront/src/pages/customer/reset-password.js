import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Link from "next/link";

import LayoutFive from "../../components/Layout/LayoutFive";
import { RESET_PASSWORD } from "@bavaan/graphql/customer/reset-password.graphql";
import { solveUpdateDirectData } from "../../redux/actions/resolverAction";

const PasswordReset = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { addToast } = useToasts();
  const [resetReq] = useMutation(RESET_PASSWORD, {});
  const router = useRouter();
  if (currentCustomer) {
    if (Object.keys(router.components).length > 2) router.back();
    else router.push("/");
  }
  const confirmPasswordResetAction = async () => {
    if ( confirmPassword === password){
      try {
        const token = router.query.token
        if (token) {
          const data = await resetReq({
            variables: {
              token: token,
              password: password
            },
          });
          if (data.errors || data.message) {
            throw { message: "Incorrect token or password" };
          }
          addToast("Your request reset password was sent sucessfully !", {
            appearance: "success",
            autoDismiss: true,
          });
          solveUpdateDirectData();
          await router.push("/");
        }else {
          throw { message: "No token provided! Cannot reset password." };
        }
      } catch (e) {
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
    else{
      setErrorConfirmPassword("The password and confirmation password do not match!!! Please input again confirmation password!!!")
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
                    confirmPasswordResetAction();
                  }}
                >
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Reset password</h2>
                        <p>Choose a new password</p>
                      </div>
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
                    <Col lg={12} className="space-mb--50">
                      <input
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          type="password"
                          placeholder="Confirm Password"
                          required
                      />
                      <div className="text-danger">{errorConfirmPassword?errorConfirmPassword:""}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
