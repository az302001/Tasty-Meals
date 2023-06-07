import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps,session }) {
  return(
    <Provider store={store}>
      <SessionProvider session={session}>
        <RecoilRoot>
        <ToastContainer
          position="bottom-center"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
  </Provider>
  );
}

export default MyApp
