// import Layaout from '@/components/Layaout/Layaout';
// import { getAllCategories } from '@/redux/actions';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const Discount = () => {
//     const dispatch = useDispatch();
//     const categories = useSelector((state) => state.products.categories)
//     const [ discount, setDiscount ] = useState(0);
    
//     const handleChange = (event) => {
//       setDiscount(event.target.value)
//     };

//     useEffect(() => {
//         dispatch(getAllCategories());
//     }, [dispatch]);

//   return (
//     <Layaout>
//      <table className='mx-auto mt-12'>
//        <tbody>
//          {categories.map((category) => (
//            <tr key={category.id} className='border-t'>
//              <td className='py-2 px-4'>{category.name}</td>
//              <td className='py-2 px-4'>
//                <input
//                  type='number'
//                  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 w-12 text-center'
//                  value={discount}
//                  onChange={(event) => handleChange(event)}
//                />
//              </td>
//              <td className='py-2 px-4'>
//                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
//                  Aplicar descuento
//                </button>
//              </td>
//            </tr>
//          ))}
//        </tbody>
//       </table>

//     </Layaout>
//   );
// };

// export default Discount;




import Layaout from '@/components/Layaout/Layaout';
import { getAllCategories, createDiscount } from '@/redux/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Discount = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const [discounts, setDiscounts] = useState({});

  const handleChange = (event, categoryId) => {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [categoryId]: Number(event.target.value),
    }));
  };

  const handleApplyDiscount = (categoryId) => {
    const discount = discounts[categoryId];
    dispatch(createDiscount(categoryId, discount));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Layaout>
      <table className='mx-auto mt-12'>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className='border-t'>
              <td className='py-2 px-4'>{category.name}</td>
              <td className='py-2 px-4'>
                <input
                  type='number'
                  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 w-12 text-center'
                  value={discounts[category.id] || ''}
                  onChange={(event) => handleChange(event, category.id)}
                />
              </td>
              <td className='py-2 px-4'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleApplyDiscount(category.id)}
                >
                  Aplicar descuento
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
