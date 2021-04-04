import { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Link from "next/link";

import LayoutFive from "../../components/Layout/LayoutFive";
import { VERIFY } from "@bavaan/graphql/customer/verify.graphql";
import { solveUpdateDirectData } from "../../redux/actions/resolverAction";

const Verify = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const { addToast } = useToasts();
  const [verifyReq] = useMutation(VERIFY, {});
  const [status, setStatus] = useState(null);
  const router = useRouter();

  if (currentCustomer) {
    router.push("/");
  }

  const verifyAction = () => {
    try {
      const token = router.query.token
      if(token){
        verifyReq({
          variables: {
            token: token
          },
        })
        .then((res) => {
          if (res.data.verifyCustomerAccount && res.data.verifyCustomerAccount.__typename === "CurrentUser") {
            addToast("Verified account sucessfully!", {
              appearance: "success",
              autoDismiss: true,
            });
            solveUpdateDirectData();
          } else {
            setStatus(res.data.verifyCustomerAccount.message);
            addToast(res.data.verifyCustomerAccount.message, {
              appearance: "error",
              autoDismiss: true,
            });

          }
        }).catch((e) => {
          addToast(e.message || "Cannot connect to server", {
            appearance: "error",
            autoDismiss: true,
          });
        });
      }else {
        throw { message: "The token is required. Please try to use correct verify link!" };
      }
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(()=>{
    verifyAction()
  }, [])
  
  return (
    <LayoutFive>
      {/* breadcrumb */}
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col
              lg={{ offset: 2, span: 8 }}
              className="space-mb-mobile-only--50"
            >
              <div className="lezada-form login-form">
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Verify Your Account</h2>
                        <p>Thank your sigin up to Vendure-Marketplace marketplace, great to have you back!</p>
                        {
                          status ?
                              <p style={{color: 'red'}}>{status}</p>
                              :
                              <p>Please wait while we check your verification token</p>
                        }
                      </div>
                    </Col>
                  </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
