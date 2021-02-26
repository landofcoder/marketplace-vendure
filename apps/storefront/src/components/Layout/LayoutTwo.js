import { HeaderOne } from "../Header";
import FooterTwo from "../Footer/FooterTwo";

const LayoutTwo = ({ children, aboutOverlay }) => {
  return (
    <div>
      <HeaderOne aboutOverlay={aboutOverlay} />
      {children}
      <FooterTwo />
    </div>
  );
};

export default LayoutTwo;
