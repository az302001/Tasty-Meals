import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";
import React from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../../atoms/cartState";
import CartList from "@/components/CartList/CartList";
import Layaout from "@/components/Layaout/Layaout";
import MercadoPagoBttn from "@/components/MercadoPagoBttn/MercadoPagoBttn";

const Cart = () => {
  const [cartItem, setCartItem] = useRecoilState(cartState);

  const totalPrice = () => {
    let total = 0;
    cartItem.forEach(
      (item) => (total += Math.ceil(item.price) * item.quantity)
    );
    return total;
  };

  return (
    <Layaout>
      <div>
        <div className="container mx-auto">
          {cartItem.length <= 0 ? (
            <h1 className="text-center text-4xl mt-32">
              Tu carrito esta vacio
            </h1>
          ) : (
            cartItem.map((item) => <CartList key={item.id} data={item} />)
          )}

          {cartItem.length > 0 && (
            <div className="max-w-[800px] mx-auto mt-4">
              <h2 className="text-right text-3xl font-bold">
                Total a pagar: ${totalPrice()}
              </h2>
              <MercadoPagoBttn
                product={{ name: "Compra en TastyMeals", price: totalPrice() }}
              />
            </div>
          )}
        </div>
      </div>
    </Layaout>
  );
};

export default Cart;
