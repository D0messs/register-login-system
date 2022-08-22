import React, { useState } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Graph from '../AdminPanel/ProgramLanguageChart';

import './LoginWindow.css';

const LoginWindow = () => {
  const [isLoginAction, setIsLoginAction] = useState<boolean>(true);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="loginPanel">
        {!isUserLogged ? (
          <>
            <h1>UD4D - Frontend</h1>
            {isLoginAction ? (
              <Login logged={(logged: boolean) => setIsUserLogged(logged)} />
            ) : (
              <Register />
            )}
            <button onClick={() => setIsLoginAction(!isLoginAction)}>
              {isLoginAction ? 'Zaregistrovat se' : 'Přihlásit se'}
            </button>
          </>
        ) : (
          <>
            <h2 style={{ color: 'green' }}>Byl jste úspěšně přihlášen</h2>
            <h3 style={{ paddingTop: '1.5rem', color: 'rgba(255, 125, 100)' }}>
              Nejpoužívanější programovací jazyky 2022 (%)
            </h3>
            <Graph />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginWindow;
