
import { atom } from "recoil";

let defaultTransaction = [];
if (typeof window !== "undefined") {
  const transaction = localStorage.getItem("transactionID");
  defaultTransaction = transaction ? JSON.parse(transaction) : [];
}

export const transaction = atom({
  key: "transaction",
  default: defaultTransaction,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newTransactionID) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("transactionID", JSON.stringify(newTransactionID));
        }
      });
    },
  ],
});
