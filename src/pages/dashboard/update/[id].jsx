import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoodById, cleanDetail } from "@/redux/actions";
import Image from "next/image";
import axios from "axios";
import Layaout from "@/components/Layaout/Layaout";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
const Swal = require("sweetalert2");
import "react-toastify/dist/ReactToastify.css";
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    setIsLoading(true); // Mostrar indicador de carga

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/Products/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.imageUrl;
      setUploadedImageUrl(imageUrl); // Guardar la URL de la imagen cargada
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw new Error("Error al cargar la imagen");
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        id: food?.id || "",
        name: data.name,
        price: data.price,
        description: data.description,
        image: uploadedImageUrl || food?.image || "", // Utilizar la URL de la imagen cargada o la existente
        Category: { connect: { id: parseInt(data.categoryId) } },
      };

      // Verificar si no ha habido cambios en los campos del formulario
      const formHasChanges =
        requestData.name !== food?.name ||
        requestData.price !== food?.price ||
        requestData.description !== food?.description ||
        requestData.image !== food?.image ||
        requestData.Category?.connect?.id !== food?.categoryId;

      if (!formHasChanges) {
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/Products/${id}`,
        requestData
      );

      const serverMessage = response.data.mensaje;
      Swal.fire(serverMessage, "", "success");
      setServerResponse(serverMessage);
      setTimeout(() => {
        // Redirigir al usuario a la página de inicio de sesión
        router.push("/dashboard/products");
      }, 2000);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  return (
    <Layaout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center "
      >
        <label htmlFor="name" className="text-xl p-3 text-color1 ">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          className="shadow text-center appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        <label htmlFor="price" className="text-xl p-3 text-color1">
          Precio:
        </label>
        <input
          type="text"
          id="price"
          placeholder="Precio"
          className="shadow appearance-none border rounded  text-center w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        <label htmlFor="description" className="text-xl p-3 text-color1">
          Descripción:
        </label>
        <textarea
          id="description"
          className="shadow appearance-none  text-center h-24 border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <label htmlFor="categoryId" className="text-xl p-3 text-color1">
          Categoría:
        </label>
        <select
          className="shadow appearance-none  text-center border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <label htmlFor="image" className="text-xl p-3 text-color1">
          Imagen:
        </label>

        {uploadedImageUrl ? (
          <Image
            src={uploadedImageUrl}
            width={100}
            height={80}
            alt="Imagen de Comida"
          />
        ) : (
          <Image
            src={food?.image}
            width={140}
            height={100}
            alt="Imagen de Comida"
          />
        )}
        <label htmlFor="image" className="text-xl p-3 text-color1">
          Subir una imagen:
        </label>
        <input
          type="file"
          accept="image/*"
          class="bg-transparent hover:bg-blue-500 w-4/6 mt-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onChange={handleImageChange}
        />
        <div className="mb-10 mt-5">
          {isLoading ? (
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={50}
              width={50}
            />
          ) : (
            <div className="flex space-x-4 mt-5">
              <input
                type="submit"
                value="Enviar"
                className="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 rounded cursor-pointer"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch(getFoodById(id));
                  setUploadedImageUrl("");
                }}
                className="bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-500 rounded cursor-pointer"
              >
                Revertir
              </button>
            </div>
          )}
        </div>
        {serverResponse && <p>{serverResponse}</p>}
      </form>
    </Layaout>
  );
}
