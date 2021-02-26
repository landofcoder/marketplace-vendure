import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { SUBSRIBE_NEWSLETTER } from "@bavaan/graphql/other/newsletter.graphql";

const CustomForm = ({ status, message, onValidated, alertColor }) => {
  const [email, setEmail] = useState("");
  const [subscribeReq] = useMutation(SUBSRIBE_NEWSLETTER, {});
  const { addToast } = useToasts();
  const subscribeAction = async() => {
    try {
      email &&
        email.indexOf("@") > -1 &&
        onValidated({
          EMAIL: email
        });
      
      var queryParams = {
        variables: {
          email: email
        }
      }
      const data = await subscribeReq(queryParams);
      if (data.errors || data.message) {
        throw { message: "Some error when submit contact form" };
      }
      addToast("Thanks you for contacting us! We will answer you soon.", {
        appearance: "success",
        autoDismiss: true,
      });
      let emailInput = document.getElementById("mc-form-email");
      emailInput.value = "";
    } catch (e) {
      addToast(e.message || e, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="subscribe-form">
      <div className="mc-form position-relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              subscribeAction();
            }}
          >
          <input
            id="mc-form-email"
            className="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Your email address"
          />
          <button type="submit" value="submit" id="submit">
            SUBSCRIBE
          </button>
        </form>
      </div>

      {status === "sending" && (
        <div
          style={{
            color: alertColor,
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
        >
          sending...
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            color: alertColor,
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{
            color: alertColor,
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

const SubscribeEmail = ({ mailchimpUrl, alertColor }) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            alertColor={alertColor}
          />
        )}
      />
    </div>
  );
};

export default SubscribeEmail;
