import React, { HtmlHTMLAttributes, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import crypt from 'bcryptjs';

import './Register.css';

const Register = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isEmailCorrect, setIsEmailCorrect] = useState<{
    validCharacters: boolean;
    hasValidSign: boolean;
    hasMoreValidSign: boolean;
    enoughtLength: boolean;
  }>({
    validCharacters: false,
    hasValidSign: false,
    hasMoreValidSign: false,
    enoughtLength: false,
  });
  const [isMinimalPasswordLength, setIsMinimalPasswordLength] =
    useState<boolean>(false);
  const [isRegisterPossible, setIsRegisterPossible] = useState<boolean>(false);
  const [textRegisterStatus, setTextRegisterStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPossible) {
      const axios = require('axios');

      axios
        .get('http://localhost:8000/accounts')
        .then((resp: any) => {
          const data = resp.data;

          const found = data.some((e: any) => {
            if (e.email === email) {
              return true;
            }
          });

          if (found) {
            setTextRegisterStatus('Účet je již zaregistrován');
          } else {
            axios
              .post('http://localhost:8000/accounts', {
                id: data[data.length - 1].id + 1,
                email: email,
                password: crypt.hashSync(password, 10),
              })
              .catch((error: any) => {
                console.log(error);
              });

            setTextRegisterStatus('Účet je zaregistrován');
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setTextRegisterStatus('Nesplňujete všechny podmínky pro registraci');
    }
  };

  useEffect(() => {
    const validSign: number = (email.match(/@/g) || []).length;
    const validEmailCharacters: boolean = /^[a-z0-9.@-]*$/.test(email);
    const charactersBeforeSign: number = email.split('@')[0].length;

    validSign == 1
      ? setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            hasValidSign: true,
          };
        })
      : setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            hasValidSign: false,
          };
        });

    validSign > 1
      ? setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            hasMoreValidSign: true,
          };
        })
      : setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            hasMoreValidSign: false,
          };
        });

    setIsEmailCorrect((emailCorrect) => {
      return {
        ...emailCorrect,
        validCharacters: validEmailCharacters,
      };
    });

    charactersBeforeSign >= 5
      ? setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            enoughtLength: true,
          };
        })
      : setIsEmailCorrect((emailCorrect) => {
          return {
            ...emailCorrect,
            enoughtLength: false,
          };
        });
  }, [email]);

  useEffect(() => {
    password.length >= 6
      ? setIsMinimalPasswordLength(true)
      : setIsMinimalPasswordLength(false);
  }, [password]);

  useEffect(() => {
    password === passwordAgain
      ? setIsPasswordSame(true)
      : setIsPasswordSame(false);
  }, [passwordAgain, password]);

  useEffect(() => {
    isPasswordSame &&
    isEmailCorrect.enoughtLength &&
    !isEmailCorrect.hasMoreValidSign &&
    isEmailCorrect.hasValidSign &&
    isEmailCorrect.validCharacters &&
    isMinimalPasswordLength
      ? setIsRegisterPossible(true)
      : setIsRegisterPossible(false);
    setTextRegisterStatus('');
  }, [isPasswordSame, isEmailCorrect, isMinimalPasswordLength]);

  return (
    <React.Fragment>
      <h2
        className={`${
          textRegisterStatus.length != 0 ? 'register-status' : ''
        } ${
          isRegisterPossible &&
          textRegisterStatus != 'Účet je již zaregistrován'
            ? 'register-status-accept'
            : 'register-status-decline'
        }`}
      >
        {textRegisterStatus}
      </h2>
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
        <input
          type="password"
          name="passwordAgain"
          id="passwordAgain"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          placeholder="Potvrďte vaše heslo..."
        />
        <button type="submit">Zaregistrovat se</button>
        <div className="info-container">
          {isEmailCorrect.hasValidSign ? (
            <span className="acceptText">
              <FontAwesomeIcon icon={faCircleCheck} className="acceptIcon" />
              Email účet obsahuje @
            </span>
          ) : (
            <span
              className="failedText"
              style={{
                display: isEmailCorrect.hasMoreValidSign ? 'none' : '',
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              Email účet neobsahuje @
            </span>
          )}
          {!isEmailCorrect.hasValidSign && isEmailCorrect.hasMoreValidSign && (
            <span className="failedText">
              <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              Email účet obsahuje více @
            </span>
          )}
          {isEmailCorrect.validCharacters && email.length > 0 ? (
            <span className="acceptText">
              <FontAwesomeIcon icon={faCircleCheck} className="acceptIcon" />
              Email obsahuje povolené znaky
            </span>
          ) : (
            <span className={`${email.length > 0 ? 'failedText' : ''}`}>
              {email.length > 0 && (
                <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              )}
              {email.length > 0 && 'Email obsahuje nepovolené znaky'}
            </span>
          )}
          {isEmailCorrect.enoughtLength ? (
            <span className="acceptText">
              <FontAwesomeIcon icon={faCircleCheck} className="acceptIcon" />
              Email účet obsahuje dostatečný počet znaků před @
            </span>
          ) : (
            <span className="failedText">
              <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              Email účet neobsahuje dostatečný počet znaků před @ (min 5)
            </span>
          )}
          {isMinimalPasswordLength ? (
            <span className="acceptText">
              <FontAwesomeIcon icon={faCircleCheck} className="acceptIcon" />
              Heslo obsahuje dostatečný počet znaků
            </span>
          ) : (
            <span className="failedText">
              <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              Heslo neobsahuje dostatečný počet znaků
            </span>
          )}
          {isPasswordSame && password.length > 0 ? (
            <span className="acceptText">
              <FontAwesomeIcon icon={faCircleCheck} className="acceptIcon" />
              Hesla si odpovídají
            </span>
          ) : (
            <span className={`${password.length > 0 ? 'failedText' : ''}`}>
              {password.length > 0 && (
                <FontAwesomeIcon icon={faCircleXmark} className="failedIcon" />
              )}
              {password.length > 0 && 'Hesla si neodpovídají'}
            </span>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
