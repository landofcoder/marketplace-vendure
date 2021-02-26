import MailchimpSubscribe from "react-mailchimp-subscribe";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { SUBSRIBE_NEWSLETTER } from "@bavaan/graphql/other/newsletter.graphql";


const CustomForm = ({ status, message, onValidated }) => {
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
      <div className="mc-form">
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
          <IoIosArrowRoundForward />
        </button>
        </form>
      </div>

      {status === "sending" && (
        <div style={{ color: "#3498db", fontSize: "14px", lineHeight: "1.3" }}>
          sending...
        </div>
      )}
      {status === "error" && (
        <div
          style={{ color: "#e74c3c", fontSize: "14px", lineHeight: "1.3" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "#2ecc71", fontSize: "14px", lineHeight: "1.3" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

const SubscribeEmailTwo = ({ mailchimpUrl }) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default SubscribeEmailTwo;
