import React, { useEffect, useRef, useState } from "react";
import { checkout } from "../../api/apiFunctions";
import { useNavigate } from "react-router-dom";

export default function PayPal({ price }) {
  const navigate = useNavigate();
  const paypal = useRef();

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
        checkout();
        navigate("/");
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
