import React, {useContext} from 'react';
import { PayPalButton } from 'react-paypal-button';
import AppContext from '../context/AppContext';
import "../styles/components/Payment.css";

const Payments = ({history}) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const payPalOptions = {
    clientId: "Ad1WFLkoZv2rzhyWX28baUVieFckIkfDaqF-D1Oo-TMscIGb54UfRbT6jpQbs2_rjz4-sZvtDE5owRFA",
    intent: "capture",
    currency: "USD"
  }
  const buttonStyles = {
    layout: "vertical",
    shape:  "rect"
  }
  const handleSumTotal = () => {
    const reducer  = (accumalator, currentValue) => accumalator + currentValue.price;
    const sum = cart.reduce(reducer, 0)
    return sum;
  }
  const handlePaymentSucces = (data) => {
    if(data.status === "COMPLETED"){
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push("/checkout/success")
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item">
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>
                $
                {" "}
                {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={payPalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={()=> console.log("start payment")}
            onPaymentSuccess={data => handlePaymentSucces(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
}
export default Payments;




