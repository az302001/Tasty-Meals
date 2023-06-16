import Layaout from "@/components/Layaout/Layaout";
import { getTransactions } from "@/redux/actions";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const transactions = useSelector((state) => state.products.userTransactions);
  const dispatch = useDispatch();
  const userId = session?.user?.id || userData?.data?.id;
  console.log(userId);
  console.log(transactions);

  useEffect(() => {
    if (userId) {
      dispatch(getTransactions(userId));
    }
  }, [userId]);
  return (
    <Layaout>
      <div className="container mx-auto">renderizar transactions--</div>
    </Layaout>
  );
}
