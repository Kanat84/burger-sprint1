import React from 'react';
import appStyles from './app.css';
import AppHeader from '../app-header/app-header';
import { data } from '../../utils/data';

function App() {
  return (
      <div className="">
          <AppHeader />
          <main>
              <div className={`${appStyles.container} pl-5 pr-5`}>
                  <div className={appStyles.main__container}>
                  </div>
              </div>
          </main>
      </div>
  );
}

export default App;
