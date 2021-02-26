import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import BraintreeWebDropIn from "braintree-web-drop-in";

export default class DropInBraintree extends React.Component {
  static displayName = "BraintreeWebDropIn";

  static propTypes = {
    options: PropTypes.object.isRequired,
    // @deprecated: Include inside options
    preselectVaultedPaymentMethod: PropTypes.bool,

    onInstance: PropTypes.func,
    onError: PropTypes.func,

    onNoPaymentMethodRequestable: PropTypes.func,
    onPaymentMethodRequestable: PropTypes.func,
    onPaymentOptionSelected: PropTypes.func,
  };

  // static defaultProps = {
  //   preselectVaultedPaymentMethod: true,
  // };

  wrapper;
  instance;

  async componentDidMount() {
    try {
      this.instance = await BraintreeWebDropIn.create({
        container: ReactDOM.findDOMNode(this.wrapper),
        preselectVaultedPaymentMethod: false,
        vaultManager: false,
        ...this.props.options,
      });

      this.instance.on("noPaymentMethodRequestable", (...args) => {
        if (this.props.onNoPaymentMethodRequestable) {
          this.props.onNoPaymentMethodRequestable(...args);
        }
      });
      this.instance.on("paymentMethodRequestable", (...args) => {
        if (this.props.onPaymentMethodRequestable) {
          this.props.onPaymentMethodRequestable(...args);
        }
      });
      this.instance.on("paymentOptionSelected", (...args) => {
        if (this.props.onPaymentOptionSelected) {
          this.props.onPaymentOptionSelected(...args);
        }
      });

      if (this.props.onInstance) {
        this.props.onInstance(this.instance);
      }

      let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.firstChild;
      // let nodeCOD = getNodes(`
      //    <div class="braintree-option classNametree-option__cod" tabindex="0">
      //       <div class=tabIndexee-option_className">
      //         <svg width="48" height="29" class="braintree-icon--bclassNameed">
      //           <use xlink:href="#iconCardFront"></use>
      //         </svg>
      //       </div>
      //       <div class="braintree-option__label" aria-label="Paying with Card">
      //           Cash On Delivery
      //           <div class="braintree-option_classNamebled-message"></div>
      //       </div>
      //    </div>
      // `);

      let nodeCOD = getNodes(``);

      nodeCOD.addEventListener('click', () => {
        // document.querySelector('.braintree-large-button braintree-toggle braintree-hidden')[0].className = 'braintree-large-button braintree-toggle'
        let el = document.querySelector('.braintree-large-button');
        el.classList.remove("braintree-hidden");
        // console.log(document.querySelector('.braintree-large-button'))
        let card = document.getElementsByClassName('braintree-option__card')[0];
        card.style.display = "none";
        let paypal = document.getElementsByClassName('braintree-option__paypal')[0];
        paypal.style.display = "none";
        el.addEventListener('click', () => {
          el.classList.add("braintree-hidden");
          card.style.display = "flex";
          paypal.style.display = "flex";
        })
      });
      let elBraintreeList = document.getElementsByClassName("braintree-options-list");
      if (elBraintreeList.length) {
        elBraintreeList[0].prepend(nodeCOD);
       // React.render(elBraintreeList, document.getElementsByClassName("braintree-options-list"));
      }
    } catch (error) {
      if (this.props.onError) {
        this.props.onError(error);
      }
    }
  }

  async componentWillUnmount() {
    if (this.instance) {
      await this.instance.teardown();
    }
  }

  shouldComponentUpdate() {
    // Static
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <div ref={(ref) => (this.wrapper = ref)} />
        {/* <div ref={(ref) => (this.test = ref)}>ABC</div> */}
        <div className="cod"></div>
      </React.Fragment>
    )
  }
}