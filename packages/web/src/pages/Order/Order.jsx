import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";

const Order = () => {
  const api = useAxios();
  const { order_id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(async () => {
    const res = await api.get(`/orders/${order_id}`);
    if (!res.data.error) {
      setOrder(res.data);
    } else {
      alert(res.data.error);
    }
  });
  return <div>{JSON.stringify(order, null, 2)}</div>;
};

export default Order;
