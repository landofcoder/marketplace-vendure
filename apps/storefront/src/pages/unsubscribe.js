import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";

import LayoutFive from "../components/Layout/LayoutFive";
import { UNSUBSRIBE_NEWSLETTER } from "@bavaan/graphql/other/newsletter.graphql";
import { solveUpdateDirectData } from "../redux/actions/resolverAction";

const Unsubscribe = ({ solveUpdateDirectData, currentCustomer, prevStep }) => {
  const { addToast } = useToasts();
  const [unsubscribeReq] = useMutation(UNSUBSRIBE_NEWSLETTER, {});
  const router = useRouter();
  const unsubscribeAction = () => {
    try {
      const token = router.query.token
      if(token){
        unsubscribeReq({
          variables: {
            token: token
          },
        })
        .then((res) => {
            addToast("You unsubscribe the newsletter sucessfully!", {
                appearance: "success",
                autoDismiss: true,
            });
        }).catch((e) => {
          addToast(e.message || "Cannot connect to server", {
            appearance: "error",
            autoDismiss: true,
          });
        });
      }else {
        throw { message: "The token is required. Please try to use correct unsubsriber link!" };
      }
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(()=>{
    unsubscribeAction()
  }, [])
  
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
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">You are un-subscribe the newsletter</h2>
                        <p>Great to have you back!</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe);
