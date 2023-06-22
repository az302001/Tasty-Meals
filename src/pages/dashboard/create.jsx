import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Layaout from "@/components/Layaout/Layaout";
import AdminRoute from "@/components/AdminRoute/AdminRoute";

export default function create() {
  const [submitSuccess, setSubmitSuccess] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitError, setSubmitError] = useState();
  const [existingCategories, setExistingCategories] = useState([]);
  const checkFields = (state) => {
    const fieldErrors = {};

    if (!state.name) {
      fieldErrors.name = "Debe ingresar";
    }

    if (!state.price) {
      fieldErrors.price = "Debe ingresar un precio";
    }

    if (!state.description) {
      fieldErrors.description = "Debe ingresar";
    }

    if (!state.image) {
      fieldErrors.image = "Debe seleccionar una imagen";
    }

    if (!state.Category.connect.id) {
      fieldErrors.Category = "Debe seleccionar una categoría";
    }

    setErrors({ ...errors, ...fieldErrors });

    return Object.keys(fieldErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Category") {
      const selectedCategoryId = parseInt(value);

      if (!selectedCategoryId || isNaN(selectedCategoryId)) {
        setFormData({
          ...formData,
          Category: {
            connect: {
              id: "",
            },
          },
        });
        setErrors({ ...errors, [name]: "Debe seleccionar una categoría" });
      } else {
        setFormData({
          ...formData,
          Category: {
            connect: {
              id: selectedCategoryId,
            },
          },
        });
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "price") {
      const parsedValue = parseFloat(value);
      setFormData({ ...formData, [name]: parsedValue });

      if (parsedValue) {
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({ ...errors, [name]: "Debe ingresar un precio" });
      }
    } else {
      setFormData({ ...formData, [name]: value });

      if (value) {
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({ ...errors, [name]: "Debe ingresar" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = checkFields(formData);

    if (isValid) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("image", formData.image);
      data.append("Category", JSON.stringify(formData.Category));
      data.append("rating", formData.rating);
      data.append("discount", formData.discount);

      axios
        .post(`/api/Products/addFood`, data)
        .then((response) => {
          console.log(data);
          setSubmitSuccess(response.data);
          setSubmitError(null);
          setFormData({
            name: "",
            price: "",
            description: "",
            image: "",
            Category: {
              connect: {
                id: "",
              },
            },
            rating: 0,
            discount: 0,
          });
          setSelectedImage(null);
          setErrors({
            name: "",
            price: "",
            description: "",
            image: "",
            Category: "",
          });
        })
        .catch((error) => {
          setSubmitError(error.response.data);
          setSubmitSuccess(null);
        });
    } else {
      console.log("Corrija los errores antes de enviar el formulario");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    Category: {
      connect: {
        id: "",
      },
    },
    rating: 0,
    discount: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    Category: "",
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: "" });
    } else {
      setSelectedImage(null);
      setErrors({ ...errors, image: "Debe seleccionar una imagen" });
    }
  };
  useEffect(() => {
    axios
      .get("/api/Products/AllCategories")
      .then((response) => {
        const existingCategories = response.data;
        setExistingCategories(existingCategories);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  return (
    <AdminRoute>
      <Layaout>
        <section className="flex flex-col h-auto m-0 items-center justify-center">
          <h2 className="font-sans font-bold text-2xl text-color1">
            PANEL ADMINISTRADOR
          </h2>
          <h3 className="font-sans text-xl text-color1">Agregar producto</h3>
          <form
            className="flex flex-col justify-center content-center items-center p-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="image" className="text-xl p-3 text-color1">
              Seleccione una imagen:
            </label>
            {selectedImage ? (
              <Image
                src={selectedImage}
                height={120}
                width={120}
                alt="imagen-nuevo-plato"
                className="rounded-full"
              ></Image>
            ) : (
              ""
            )}
            <label
              htmlFor="upload-image"
              className="bg-transparent hover:bg-blue-500 mt-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Subir imagen
            </label>
            <input
              name="image"
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.image && <p className="text-red-600">{errors.image}</p>}
            <label htmlFor="name" className="text-xl p-3 text-color1">
              Ingrese un nombre:
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow lg:w-5/6 text-center appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name ? (
              <p className="text-red-600">{errors.name} un nombre</p>
            ) : (
              ""
            )}{" "}
            <label htmlFor="price" className="text-xl p-3 text-color1">
              {" "}
              Ingrese un precio:
            </label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none lg:w-5/6 text-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.price ? <p className="text-red-600">{errors.price}</p> : ""}{" "}
            <label htmlFor="description" className="text-xl p-3 text-color1">
              Ingrese una breve descripcion:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none lg:w-5/6 text-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            {errors.description ? (
              <p className="text-red-600">
                {errors.description} una descripcion
              </p>
            ) : (
              ""
            )}
            <label htmlFor="Category" className="text-xl p-3 text-color1">
              Seleccione una categoría:
            </label>
            <select
              name="Category"
              value={formData.Category.connect.id || ""}
              onChange={handleChange}
              className="shadow appearance-none lg:w-4/6 text-center border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" className="hidden">
                Seleccione una opción
              </option>
              {existingCategories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="text-center"
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.Category ? (
              <p className="text-red-600">{errors.Category}</p>
            ) : (
              ""
            )}{" "}
            <button className="bg-transparent hover:bg-blue-500 mt-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Enviar
            </button>
            {submitSuccess ? (
              <h2 className="mt-5 font-sans font-bold text-2xl text-color1">
                El plato se ha creado correctamente
              </h2>
            ) : (
              ""
            )}
            {submitError ? (
              <h2 className="mt-5 font-sans font-bold text-2xl text-red-500">
                El nombre del plato ya existe
              </h2>
            ) : (
              ""
            )}
          </form>
        </section>
      </Layaout>
    </AdminRoute>
  );
}
