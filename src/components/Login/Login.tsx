import React, { useState, useEffect } from 'react';

import './Login.css';

import crypt from 'bcryptjs';

const Login = (props: any) => {
  const [isAccountLogged, setIsAccountLogged] = useState<Boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [textLoginStatus, setTextLoginStatus] = useState<string>('');

  useEffect(() => {
    props.logged(isAccountLogged);
  }, [isAccountLogged]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmailValid) {
      const axios = require('axios');

      axios.get('http://localhost:8000/accounts').then((resp: any) => {
        const data = resp.data;
        var id = undefined;

        const found = data.some((e: any) => {
          if (e.email === email) {
            id = e.id;
            return true;
          }
        });

        if (found && id != undefined) {
          if (crypt.compareSync(password, data[id - 1].password)) {
            setIsAccountLogged(true);
          } else {
            setIsAccountLogged(false);
            setTextLoginStatus(
              'Zadaný účet neexistuje! (email nebo heslo nejsou správné)'
            );
          }
        } else {
          setTextLoginStatus(
            'Zadaný účet neexistuje! (email nebo heslo nejsou správné)'
          );
        }
      });
    }
  };

  useEffect(() => {
    const validSign: number = (email.match(/@/g) || []).length;
    const validEmailCharacters: boolean = /^[a-z0-9.@-]*$/.test(email);
    const charactersBeforeSign: number = email.split('@')[0].length;

    validSign === 1 &&
    validEmailCharacters === true &&
    charactersBeforeSign >= 5
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  }, [email]);

  return (
    <React.Fragment>
      {!isEmailValid && email.length > 0 && (
        <h2 className="incorect-email">Formát emailu není správný</h2>
      )}
      {!isAccountLogged && (
        <h2 className="incorect-email">{textLoginStatus}</h2>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Váš email..."
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Vaše heslo..."
        />
        <button type="submit">Přihlásit se</button>
      </form>
    </React.Fragment>
  );
};

export default Login;
