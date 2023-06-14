// import { atom } from "recoil";

// export const cartState = atom({
//     key: 'cartState',
//     default: [],
// });


import { atom } from "recoil";

let defaultCartState = [];
if (typeof window !== "undefined") {
  const storedCartState = localStorage.getItem("cartItem");
  defaultCartState = storedCartState ? JSON.parse(storedCartState) : [];
}

export const cartState = atom({
  key: "cartState",
  default: defaultCartState,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newCartItems) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItem", JSON.stringify(newCartItems));
        }
      });
    },
  ],
});




