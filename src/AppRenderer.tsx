import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './routes/App';

import configureStore from './stores/configureStore';

// const App = React.lazy(()=> {return import(/* webpackChunkName: "App" */ './routes/App')})

const { store, persistor } = configureStore();

import { useClearCache } from 'react-clear-cache';

const Main = () => {
  
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  useEffect(() => {
    if(!isLatestVersion ){
      emptyCacheStorage();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<div className="loading"/>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Main/>, document.getElementById('app'));

// reportWebVitals();