import HeaderFive from "../Header/HeaderFive";
import FooterTwo from "../Footer/FooterTwo";

const LayoutFive = ({ children }) => {
  return (
    <div>
      <HeaderFive />
      {children}
      <FooterTwo />
    </div>
  );
};

export default LayoutFive;
