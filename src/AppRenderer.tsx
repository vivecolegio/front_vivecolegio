import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import Spinner from './components/common/General/Spinner';
// import { GlobalStyles } from './components/styled/GlobalStyles';
// import enMessages from './lang/locales/en_US';
// import esMessages from './lang/locales/es_ES';
import App from './routes/App';
import configureStore from './stores/configureStore';

const { store, persistor } = configureStore();

// loadMessages(enMessages, 'en');
// loadMessages(esMessages, 'es');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <Suspense fallback={<Spinner />}> */}
        {/* <GlobalStyles /> */}
        <App />
       {/* </Suspense> */}
     </PersistGate>
   </Provider>,
  document.getElementById('app'),
);