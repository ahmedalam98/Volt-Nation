import React, { useEffect, useRef, useState } from "react";
import { checkout } from "../../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function PayPal({ price }) {
  const navigate = useNavigate();
  const paypal = useRef();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    dispatch(checkout());
    navigate("/");
  };

  useEffect(() => {
    let paypalButton = window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "Your products",
              amount: {
                currency_code: "USD",
                value: price,
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        handleCheckout();
      },
      onError: (err) => {
        console.log(err);
      },
    });

    paypalButton.render(paypal.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full mt-5">
      <div ref={paypal}></div>
    </div>
  );
}
