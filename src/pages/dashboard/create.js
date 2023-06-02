import { useState, useEffect } from "react";
import axios from "axios";

export default function create() {
  const [submitSuccess, setSubmitSuccess] = useState();
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

    if (!state.image) {
      fieldErrors.image = "Debe ingresar una imagen";
    }

    if (state.Category.connect.id === "") {
      fieldErrors.Category = "Debe seleccionar una categoría";
    }

    setErrors({ ...errors, ...fieldErrors });

    return Object.keys(fieldErrors).length === 0; // Devuelve true si no hay errores
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Category") {
      const selectedCategoryId = parseInt(value);
      setFormData({
        ...formData,
        Category: {
          connect: {
            id: selectedCategoryId,
          },
        },
      });

      if (!selectedCategoryId) {
        setErrors({ ...errors, [name]: "Debe seleccionar una categoría" });
      } else {
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

    // Verificar si hay errores
    const isValid = checkFields(formData);

    if (isValid) {
      axios
        .post(`http://localhost:3000/api/Products/addFood`, formData)
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Products/AllCategories")
      .then((response) => {
        const existingCategories = response.data;
        setExistingCategories(existingCategories);
        console.log(existingCategories);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  return (
    <section className="flex flex-col items-center mt-20 mb-20">
      <h2 className="font-sans">PANEL ADMINISTRADOR</h2>
      <h3 className="font-sans">Agregar producto</h3>
      <form
        className="flex flex-col justify-center content-center items-center p-10"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="">
          Ingrese un nombre:
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name ? <p>{errors.name}</p> : ""}{" "}
        <label htmlFor="price">Ingrese un precio:</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.price ? <p>{errors.price}</p> : ""}{" "}
        <label htmlFor="description">Ingrese una breve descripcion:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        {errors.description ? <p>{errors.description} una descripcion</p> : ""}
        <label htmlFor="image">Ingrese URL de la imagen:</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.image ? <p>{errors.image}</p> : ""}{" "}
        <label htmlFor="Category">Seleccione una categoría:</label>
        <select
          name="Category"
          value={formData.Category.connect.id}
          onChange={handleChange}
        >
          <option value="">Seleccione una opción</option>
          {existingCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.Category ? <p>{errors.Category}</p> : ""}{" "}
        <button>Enviar</button>
        {submitSuccess ? <h2>El plato se ha creado correctamente</h2> : ""}
        {submitError ? <h2>El nombre del plato ya existe</h2> : ""}
      </form>
    </section>
  );
}
