import React, { useEffect, useState } from 'react';
import { getAllCategories, createDiscount, deleteDiscount } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Layaout from '@/components/Layaout/Layaout';
import Swal from 'sweetalert2';
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AdminRoute from '@/components/AdminRoute/AdminRoute';

const Discount = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const [discounts, setDiscounts] = useState({});

  const handleChange = (event, categoryId) => {
    const discountValue = Number(event.target.value);
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [categoryId]: discountValue,
    }));
    localStorage.setItem(`discount_${categoryId}`, discountValue);
  };

  const handleApplyDiscount = (categoryId, categoryName) => {
    const discount = discounts[categoryId];
    dispatch(createDiscount(categoryId, discount));

    Swal.fire({
      icon: 'success',
      title: 'Descuento aplicado',
      text: `${discounts[categoryId]}% menos en ${categoryName}`,
    })
  };

  const handleRemoveDiscount = (categoryId) => {
    dispatch(deleteDiscount(categoryId));
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [categoryId]: 0,
    }));
    localStorage.removeItem(`discount_${categoryId}`);

    Swal.fire({
      icon: 'info',
      title: 'Descuento removido',
    })
  };

  useEffect(() => {
    dispatch(getAllCategories());

    // Recuperar los descuentos guardados del almacenamiento local
    const savedDiscounts = {};
    categories.forEach((category) => {
      const discountValue = localStorage.getItem(`discount_${category.id}`);
      if (discountValue !== null) {
        savedDiscounts[category.id] = Number(discountValue);
      }
    });
    setDiscounts(savedDiscounts);
  }, [dispatch, categories]);

  return (
    <AdminRoute>
    <Layaout>
      <div className="mb-20 rounded-lg flex flex-col items-center">
      <table className="w-11/12 mb-10 mt-[4vh] rounded-lg border-color1">
        <thead>
          <tr>
            <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg w-[37vw]">Categorias</th>
            <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg w-[37vw]">Descuento</th>
          <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg w-[37vw]">Aplicar/Quitar</th>
          </tr>
      </thead>
      <tbody className="m-10">
     {categories.map((category) => (
       <tr key={category.id} className="bg-white even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 border-solid border-2">
         <td className="w-20 text-color1 text-lg whitespace-normal text-center font-semibold">
           <div className="flex flex-col items-center">
             <span>{category.name}</span>
           </div>
         </td>
         <td className='py-2 px-4'>
           <div className="flex flex-col items-center">
             <input
            type='number'
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 ml-7 text-center w-[7vw]'
            value={discounts[category.id] || 0 } 
            onChange={(event) => handleChange(event, category.id)}
             />
           </div>
         </td>
         <td className='ml-[5%]'>
           <div className="flex flex-row justify-center items-center space-x-4">
             <button
            onClick={() => handleApplyDiscount(category.id, category.name)}
            className="bg-green-400 text-white rounded-md p-2 focus:outline-none"
          >
               <CheckIcon className="h-6 w-6 text-darkgreen-500" />
             </button>
             <button
            onClick={() => handleRemoveDiscount(category.id)}
            className="bg-red-500 text-white rounded-md p-2 focus:outline-none"
             >
               <XMarkIcon className="h-6 w-6 text-darkred-400" />
             </button>
           </div>
         </td>
    </tr>
  ))}
</tbody>

      </table>
      </div>
    </Layaout>
    </AdminRoute>
  );
};

export default Discount;