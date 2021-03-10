import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { VERIFY_SELLER } from "@bavaan/graphql/seller/verify-seller.graphql";

const Verify = () => {
  let password, retypePass;
  const { addToast } = useToasts();
  const [verifyReq, { data }] = useMutation(VERIFY_SELLER);
  const router = useRouter();
  const verify = (router.query.verify === "false" || router.query.verify === false) ;

  const verifyAction = (e) => {
    e.preventDefault();
    try {
        if(verify){
            if(!password.value || password.value !== retypePass.value){
                addToast(e.message || "Password and confirm password does not match", {
                    appearance: "error",
                    autoDismiss: true,
                });
                return;
            }
        }
      const token = router.query.token;
      if (token) {
        verifyReq({
          variables: {
            token: token,
            password: password.value,
          },
        })
          .then((res) => {
              let result = res.data.verifyVendorAccount.result;
              if(result === "SUCCESS"){
                  addToast("Verified account sucessfully!", {
                      appearance: "success",
                      autoDismiss: true,
                  });
                  router.push(`/shop/${res.data.verifyVendorAccount.brand}/shop_store_home`);
              } else {
                  addToast("Verified error!", {
                      appearance: "error",
                      autoDismiss: true,
                  });
              }
          })
          .catch((e) => {
            addToast(e.message || "Cannot connect to server", {
              appearance: "error",
              autoDismiss: true,
            });
          });
      } else {
        throw {
          message:
            "The token is required. Please try to use correct verify link!",
        };
      }
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="jumbotron text-xs-center">
      <h1 className="display-3">Thank You For Joining!</h1>
      <hr />
      <p className="lead">
        We're excited to have you get started. First, you need to confirm your
        account. Just press the button below.
      </p>
      <form className="form-inline">
        {verify && (
          <div>
            <input
              type="password"
              className="form-control"
              name="pwd"
              placeholder="Password"
              ref={(node) => {
                password = node;
              }}
            />
            <input
              type="password"
              className="form-control"
              name="repwd"
              placeholder="Retype Password"
              ref={(node) => {
                retypePass = node;
              }}
            />
          </div>
        )}

        <button className="btn btn-info" onClick={verifyAction}>
          Confirm Account
        </button>
      </form>
    </div>
  );
};

export default Verify;
