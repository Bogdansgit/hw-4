import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Router from './routes';
import { UserContext } from './Context/userContext';
import { userData } from './api';

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={userData}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
