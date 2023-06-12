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
    <select name="Category" onChange={onChange}>
      <option value={value ? value : ""}>Seleccione una opción</option>
      {existingCategories?.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
