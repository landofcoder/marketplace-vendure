import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

function CreditCard({ actionSendCard }) {
  const { addToast } = useToasts();
  const [card, setCard] = useState({
    Name: '',
    card_no: '',
    expdate: '',
    cvv: '',
    method: "cod-payment",
    metadata: { foo: "bar" },
  });

  const creditCardChange = (event) => {
    setCard({...card, [event.target.name]: event.target.value});
  }

  return (
    <div className="row justify-content-center">
      <div className=" col-lg-10 col-md-8">
        <div className="card p-3">
          <div className="row justify-content-center">
            <div className="col-12">
              <h2 className="heading text-center checkout-title">
                Credit CARD
              </h2>
            </div>
          </div>
          
            <div className="row justify-content-center mb-4 radio-group">
              <div className="col-sm-3 col-5">
                <div className="radio selected mx-auto" data-value="dk">
                  {" "}
                  <img
                    className="fit-image"
                    src="https://i.imgur.com/5TqiRQV.jpg"
                    width="105px"
                    height="55px"
                  />{" "}
                </div>
              </div>
              <div className="col-sm-3 col-5">
                <div className="radio mx-auto" data-value="visa">
                  {" "}
                  <img
                    className="fit-image"
                    src="https://i.imgur.com/OdxcctP.jpg"
                    width="105px"
                    height="55px"
                  />{" "}
                </div>
              </div>
              <div className="col-sm-3 col-5">
                <div className="radio mx-auto" data-value="master">
                  {" "}
                  <img
                    className="fit-image"
                    src="https://i.imgur.com/WIAP9Ku.jpg"
                    width="105px"
                    height="55px"
                  />{" "}
                </div>
              </div>
              <div className="col-sm-3 col-5">
                <div className="radio mx-auto" data-value="paypal">
                  {" "}
                  <img
                    className="fit-image"
                    src="https://i.imgur.com/cMk1MtK.jpg"
                    width="105px"
                    height="55px"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="row justify-content-center form-group">
              <div className="col-12 px-auto">
                <div className="custom-control custom-radio custom-control-inline">
                  {" "}
                  <input
                    id="customRadioInline1"
                    type="radio"
                    name="customRadioInline1"
                    className="custom-control-input"
                    defaultChecked={true}
                  />{" "}
                  <label
                    htmlFor="customRadioInline1"
                    className="custom-control-label label-radio"
                  >
                    Private
                  </label>{" "}
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  {" "}
                  <input
                    id="customRadioInline2"
                    type="radio"
                    name="customRadioInline1"
                    className="custom-control-input"
                  />{" "}
                  <label
                    htmlFor="customRadioInline2"
                    className="custom-control-label label-radio"
                  >
                    Business
                  </label>{" "}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="input-group">
                  {" "}
                  <input
                    onChange={(event) => {
                      creditCardChange(event)
                    }}
                    type="text"
                    name="Name"
                    placeholder="John Doe"
                  />{" "}
                  <label>Name</label>{" "}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="input-group">
                  {" "}
                  <input
                    onChange={(event) => {
                      creditCardChange(event)
                    }}
                    type="text"
                    id="cr_no"
                    name="card_no"
                    placeholder="0000 0000 0000 0000"
                    minLength="19"
                    maxLength="19"
                  />{" "}
                  <label>Card Number</label>{" "}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div className="input-group">
                      {" "}
                      <input
                        onChange={(event) => {
                          creditCardChange(event)
                        }}
                        type="text"
                        id="exp"
                        name="expdate"
                        placeholder="MM/YY"
                        minLength="5"
                        maxLength="5"
                      />{" "}
                      <label>Expiry Date</label>{" "}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group">
                      {" "}
                      <input
                        onChange={(event) => {
                          creditCardChange(event)
                        }}
                        type="password"
                        name="cvv"
                        placeholder="&#9679;&#9679;&#9679;"
                        minLength="3"
                        maxLength="3"
                      />{" "}
                      <label>CVV</label>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                {" "}
                <input
                  type="button"
                  value="Pay"
                  className="btn btn-pay placeicon"
                  onClick={() => actionSendCard("cod-payment",{foo: "bar"})}
                />{" "}
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
