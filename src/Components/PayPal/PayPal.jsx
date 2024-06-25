import React, { useEffect, useRef } from "react";
import { checkout } from "../../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";

export default function PayPal({ price }) {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckout = () => {
    dispatch(checkout());
    queryClient.invalidateQueries(["allOrders"]);

    navigate("/");
  };

  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
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
          // const order = await actions.order.capture();
          handleCheckout();
          // console.log(order);
        },
        onError: (err) => {
          // console.log(err);
        },
      })
      .render(paypal.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full mt-5">
      <div ref={paypal}></div>
    </div>
  );
}
