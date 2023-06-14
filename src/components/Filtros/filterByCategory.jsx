import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterByCategory({ onChange, value }) {
  const [existingCategories, setExistingCategories] = useState([]);

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
    <select
      name="Category"
      onChange={onChange}
      className="text-center font-semibold text-color1"
    >
      <option
        value={value ? value : ""}
        className="hidden text-center font-semibold"
      >
        Categorias
      </option>
      <option
        value="all"
        className="text-color1 font-semibold text-center bg-color3"
      >
        Todos
      </option>
      {existingCategories?.map((category) => (
        <option key={category.id} value={category.name} className="text-center">
          {category.name}
        </option>
      ))}
    </select>
  );
}
