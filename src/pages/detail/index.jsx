import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFoodById } from "@/redux/actions";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const detailFoods = useSelector((state) => state.detailFoods);

  useEffect(() => {
    if (id) {
      dispatch(getFoodById(id));
    }
  }, [dispatch, id]);

  return (
    <section className="flex flex-col items-center bg-color3 h-screen w-screen">

        <h1>Detalle de la búsqueda: </h1>
        <p>Nombre: {detailFoods.name}</p>
        <p>Descripción: {detailFoods.description}</p>
        <p>Precio: {detailFoods.price} </p>
        <p>Rating: {detailFoods.rating} </p>
        <p>Categoria: {detailFoods.categoryId} </p>
        <img src={detailFoods.image} alt={detailFoods.name} />

    </section>
  );
};

export default index;
