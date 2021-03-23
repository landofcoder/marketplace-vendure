import CookieConsent from "react-cookie-consent";
import HeaderFive from "../Header/HeaderFive";
import FooterTwo from "../Footer/FooterTwo";

const LayoutFive = ({ children }) => {
  return (
    <div>
      <HeaderFive />
      {children}
      <FooterTwo />
        <CookieConsent
            style={{ background: "#8a8b8cd6" }}
            buttonStyle={{ backgroundColor: "red", borderRadius: "4px", color:"#fff", fontWeight: 500 }}
        >
            This website uses cookies to enhance the user experience.
        </CookieConsent>
    </div>
  );
};

export default LayoutFive;
