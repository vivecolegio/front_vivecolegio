import React, { Suspense } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './routes/App';
import configureStore from './stores/configureStore';

// const App = React.lazy(()=> {return import(/* webpackChunkName: "App" */ './routes/App')})

const { store, persistor } = configureStore();

const container = document.getElementById('app');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </PersistGate>
  </Provider>,
);

// reportWebVitals();
