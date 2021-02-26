import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Link from "next/link";

import LayoutFive from "../../components/Layout/LayoutFive";
import { VERIFY_CHANGE_EMAIL_ADDRESS } from "@bavaan/graphql/customer/change-email-address.graphql";
import { solveUpdateDirectData } from "../../redux/actions/resolverAction";

const ChangeEmailAddress = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const { addToast } = useToasts();
  const [changeEmailReq] = useMutation(VERIFY_CHANGE_EMAIL_ADDRESS, {});
  const router = useRouter();
  if (currentCustomer) {
    if (Object.keys(router.components).length > 2) router.back();
    else router.push("/");
  }
  const verifyEmailAction = async () => {
    try {
      const token = router.query.token
      if(token){
        const data = await changeEmailReq({
          variables: {
            token: token
          },
        });
        if (data.errors || data.message) {
          throw { message: "Incorrect token" };
        }
        addToast("Your new email address has been verified!", {
          appearance: "success",
          autoDismiss: true,
        });
        solveUpdateDirectData();
      }else {
        throw { message: "Token is invalid" };
      }
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  useEffect(()=>{
    verifyEmailAction()
  }, [verifyEmailAction])
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
                        <h2 className="space-mb--20">Verify change email address</h2>
                        <p>Verifying new email address...</p>
                      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailAddress);
