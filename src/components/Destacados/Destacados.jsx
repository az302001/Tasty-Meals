import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "@/redux/actions";
import { Rating, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper";
import { useRouter } from "next/router";
import Link from "next/link";

const Destacados = () => {
  const [userRating, setUserRating] = useState(1);
  const detailFoods = useSelector((state) => state.products.detailFoods);
  const rating = parseFloat(detailFoods.rating);
  const router = useRouter();
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  const { id } = router.query;

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);
  const shuffledFoods = foods.sort(() => Math.random() - 0.5).slice(0, 5);
  return (
    <div>
      <h1 className="text-color1 font-semibold text-center text-xl lg:text-2xl mt-3">
        Recomendaciones de la casa
      </h1>
      <Swiper
        className="relative w-2/6 h-1/6 min-w-[300px] md:min-w-[500px] mt-6 border-28px "
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={false}
        modules={[EffectCube, Pagination]}
      >
        {shuffledFoods.map((food, index) => (
          <SwiperSlide key={index}>
            <Link href={`/detail?id=${food.id}`}>
              <div className="w-full max-w-2xl  mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  src={food.image}
                  alt={food.name}
                  className="block w-full h-56 sm:h-80 object-cover"
                />
                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {food.description}
                  </h5>
                  <br />
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${Math.ceil(food.price)}
                    </span>
                    <div>
                      <Stack spacing={1}>
                        <div className="flex items-center">
                          <Rating
                            name="half-rating"
                            value={food.rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <br />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Destacados;
