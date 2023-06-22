import { Provider } from "react-redux";
import { SafeHydrate } from "@/Hocs/Hydrate";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps, session }) {
  return (
    <SafeHydrate>
      <Provider store={store}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="icon" href="/src/assets/favicon.ico" />

              <title>Tasty Meals</title>
            </Head>
            <Component {...pageProps} />
          </RecoilRoot>
        </SessionProvider>
      </Provider>
    </SafeHydrate>
  );
}

export default MyApp;
