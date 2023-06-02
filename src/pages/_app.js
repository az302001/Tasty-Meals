import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps,session }) {
  return(
    <Provider store={store}>
    <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider>
  </Provider>
  );
}

export default MyApp
