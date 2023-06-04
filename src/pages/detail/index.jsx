import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFoodById } from "@/redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Layaout from "@/components/Layaout/Layaout";
import { Rating, Stack } from "@mui/material";

const index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userRating, setUserRating] = useState(1);
  const [userVote, setUserVote] = useState(false);
  const detailFoods = useSelector((state) => state.products.detailFoods);
  const rating = parseFloat(detailFoods.rating);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getFoodById(id));
    }
  }, [dispatch, id]);

  return (
    <Layaout>
      <div>
        <div className="m-3">
          <Link href="/menu">
            <ArrowLeftIcon className="h-8 w-8 text-color1" />
          </Link>
        </div>
      </div>
      <h2 class="flex justify-center font-monrope text-4xl font-semibold tracking-tight text-gray-900 dark:text-black">
        {detailFoods.name}
      </h2>
      <div className="w-full max-w-2xl  mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img src={detailFoods.image} alt={detailFoods.name} />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {detailFoods.description}
          </h5>
          <br />
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${detailFoods.price}
            </span>
            <div>
              <Stack spacing={1}>
                {/* <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  V:
                  <Rating
                  name="half-rating-read"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => setUserRating(newValue)}
                  />
                </span> */}
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Clasificación:
                  </span>
                  <Rating
                    name="half-rating"
                    value={userRating}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
                <br />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      {/* Aqui empieza la seccion de comentarios sobre el plato  este seccion es un maqueta de lo que se rquiere*/ }

      <div className=" mt-20 grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Very easy this was to integrate
            </h3>
            <p className="my-4">
              If you care for your time, I hands down would go with this."
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Bonnie Green</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Developer at Open AI
              </div>
            </div>
          </figcaption>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Clasificación:
            </span>
            <Rating
              name="half-rating"
              value={userRating}
              precision={0.5}
              readOnly
            />
          </div>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Solid foundation for any project
            </h3>
            <p className="my-4">
              Designing with Figma components that can be easily translated to
              the utility classes of Tailwind CSS is a huge timesaver!"
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Roberta Casas</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Lead designer at Dropbox
              </div>
            </div>
          </figcaption>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Clasificación:
            </span>
            <Rating
              name="half-rating"
              value={userRating}
              precision={0.5}
              readOnly
            />
          </div>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mindblowing workflow
            </h3>
            <p className="my-4">
              Aesthetically, the well designed components are beautiful and will
              undoubtedly level up your next application."
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Jese Leos</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Software Engineer at Facebook
              </div>
            </div>
          </figcaption>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Clasificación:
            </span>
            <Rating
              name="half-rating"
              value={userRating}
              precision={0.5}
              readOnly
            />
          </div>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Efficient Collaborating
            </h3>
            <p className="my-4">
              You have many examples that can be used to create a fast prototype
              for your team."
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Joseph McFall</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                CTO at Google
              </div>
            </div>
          </figcaption>
          <div className="flex items-center ">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Clasificación:
            </span>
            <Rating
              name="half-rating"
              value={userRating}
              precision={0.5}
              readOnly
            />
          </div>
        </figure>
      </div>
    </Layaout>
  );
};

export default index;
