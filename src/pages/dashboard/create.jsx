import { useState, useEffect } from "react";
import axios from "axios";

import Layaout from "@/components/Layaout/Layaout";

export default function create() {
  const [submitSuccess, setSubmitSuccess] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitError, setSubmitError] = useState();
  const [existingCategories, setExistingCategories] = useState([]);
  const checkFields = (state) => {
    const fieldErrors = {};

    if (!state.name) {
      fieldErrors.name = "Debe ingresar un nombre";
    }

    if (!state.price) {
      fieldErrors.price = "Debe ingresar un precio";
    }

    if (!state.description) {
      fieldErrors.description = "Debe ingresar una descripción";
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
      const parsedValue = parseInt(value);
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
      data.append("image", selectedImage);
      data.append("Category", JSON.stringify(formData.Category));
      data.append("rating", formData.rating);
      data.append("discount", formData.discount);

      axios
        .post(`http://localhost:3000/api/Products/addFood`, data)
        .then((response) => {
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
    setSelectedImage(file);
    if (file) {
      setErrors({ ...errors, image: "" });
    } else {
      setErrors({ ...errors, image: "Debe seleccionar una imagen" });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Products/AllCategories")
      .then((response) => {
        const existingCategories = response.data;
        setExistingCategories(existingCategories);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  return (
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
          <label htmlFor="name" className="text-xl p-3 text-color1">
            Ingrese un nombre:
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name ? <p className="text-red-600">{errors.name}</p> : ""}{" "}
          <label htmlFor="price" className="text-xl p-3 text-color1">
            {" "}
            Ingrese un precio:
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.price ? <p className="text-red-600">{errors.price}</p> : ""}{" "}
          <label htmlFor="description" className="text-xl p-3 text-color1">
            Ingrese una breve descripcion:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {errors.description ? (
            <p className="text-red-600">{errors.description} una descripcion</p>
          ) : (
            ""
          )}
          <label htmlFor="image" className="text-xl p-3 text-color1">
            Seleccione una imagen:
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="py-2"
          />
          {errors.image && <p className="text-red-600">{errors.image}</p>}
          <label htmlFor="Category" className="text-xl p-3 text-color1">
            Seleccione una categoría:
          </label>
          <select
            name="Category"
            value={formData.Category.connect.id || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione una opción</option>
            {existingCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.Category ? (
            <p className="text-red-600">{errors.Category}</p>
          ) : (
            ""
          )}{" "}
          <button class="bg-transparent hover:bg-blue-500 mt-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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
  );
}
