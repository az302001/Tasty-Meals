import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoodById, cleanDetail } from "@/redux/actions";
import Image from "next/image";
import axios from "axios";
import Layaout from "@/components/Layaout/Layaout";
export default function Update() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [existingCategories, setExistingCategories] = useState([]);
  const food = useSelector((state) => state.products.detailFoods);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Products/AllCategories")
      .then((response) => {
        const categories = response.data;
        setExistingCategories(categories);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getFoodById(id));
    }
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (food && Object.keys(food).length > 0) {
      setValue("name", food?.name || "");
      setValue("price", food?.price || "");
      setValue("description", food?.description || "");
      setValue("image", food?.image || "");
      setValue("categoryId", food?.categoryId || "");
      clearErrors();
    }
  }, [food, setValue, clearErrors]);

  useEffect(() => {
    clearErrors();
  }, [id, clearErrors]);

  const [serverResponse, setServerResponse] = useState("");

  const onSubmit = (data) => {
    const requestData = {
      id: food?.id || "",
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      Category: { connect: { id: parseInt(data.categoryId) } },
    };

    axios
      .put(`http://localhost:3000/api/Products/${id}`, requestData)
      .then((response) => {
        const serverMessage = response.data.mensaje;
        setServerResponse(serverMessage);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
    console.log(requestData);
  };

  return (
    <Layaout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          placeholder="Nombre"
          {...register("name", { required: true, maxLength: 40 })}
          onChange={() => {
            trigger("name");
          }}
        />
        {errors.name && errors.name.type === "required" && (
          <p className="text-red-700">
            Este campo es requerido y debe tener menos de 40 caracteres
          </p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p className="text-red-700">
            El nombre debe tener menos de 40 caracteres
          </p>
        )}

        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          placeholder="Precio"
          {...register("price", {
            required: true,
            pattern: /^[0-9]+([.,][0-9]{1,2})?$/,
          })}
          onChange={() => {
            trigger("price");
          }}
        />
        {errors.price && errors.price.type === "required" && (
          <p className="text-red-700">Este campo es requerido</p>
        )}
        {errors.price && errors.price.type === "pattern" && (
          <p className="text-red-700">El precio debe ser un número válido</p>
        )}

        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          {...register("description", { required: true, maxLength: 160 })}
          onChange={() => {
            trigger("description");
          }}
        />
        {errors.description && errors.description.type === "required" && (
          <p className="text-red-700">
            Este campo es requerido y debe tener menos de 160 caracteres
          </p>
        )}
        {errors.description && errors.description.type === "maxLength" && (
          <p className="text-red-700">
            La descripción debe tener menos de 160 caracteres
          </p>
        )}

        <label htmlFor="image">Imagen:</label>
        <Image
          src={food?.image}
          width={50}
          height={50}
          alt="Imagen de Comida"
        />

        <label htmlFor="categoryId">Categoría:</label>
        <select
          id="categoryId"
          {...register("categoryId", { required: true })}
          onChange={() => {
            trigger("categoryId");
          }}
        >
          <option value="">Selecciona una categoría</option>
          {existingCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && errors.categoryId.type === "required" && (
          <p className="text-red-700">Este campo es requerido</p>
        )}

        <input type="file" accept="image/*" />

        <input type="submit" value="Enviar" />

        {serverResponse && <p>{serverResponse}</p>}
      </form>
    </Layaout>
  );
}
