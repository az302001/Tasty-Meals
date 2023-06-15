import React, { useEffect, useState } from 'react';
import { getAllCategories, createDiscount, deleteDiscount } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Layaout from '@/components/Layaout/Layaout';
import Swal from 'sweetalert2';
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
    <Layaout>
      <table className='mx-auto mt-12 w-[50vw]'>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className='border-t'>
              <td className='py-2 px-4'>{category.name}</td>
              <td className='py-2 px-4'>
                <input
                  type='number'
                  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 w-12 text-center w-[7vw]'
                  value={discounts[category.id] || ''}
                  onChange={(event) => handleChange(event, category.id)}
                />
                {discounts[category.id] ? (
                  <h2 className='text-blue-500 mt-2'>Descuento: {discounts[category.id]}%</h2>
                ) : ''}
              </td>
              <td className='py-2 px-4'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleApplyDiscount(category.id, category.name)}
                >
                  Aplicar descuento
                </button>
              </td>
              <td className='py-2 px-4'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleRemoveDiscount(category.id)}
                >
                  {/* <PencilSquareIcon className="h-6 w-6 text-gray-500" /> */}
                  Quitar descuento
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layaout>
  );
};

export default Discount;
