import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ updateOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .post(`http://localhost:3030/order`, { signal: controller.signal })
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setError(true);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  return orderNumber ? (
    <div className="text-center p-5">
      <h1>Thank you!</h1>
      <h4>Your order number is {orderNumber ? orderNumber : "loading..."}</h4>
      <p>as per our terms and conditions, nothing will happen now</p>

      <Button
        onClick={() => {
          updateOrderPhase("inprogress");
          resetOrder();
        }}
        className="mt-5"
        variant="dark"
      >
        Create new order
      </Button>
    </div>
  ) : (
    <div className="text-center p-5">Loading</div>
  );
}
