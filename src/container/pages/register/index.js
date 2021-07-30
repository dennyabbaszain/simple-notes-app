// library
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// local
import { registerUserWithFirebase } from '../../../config/redux/action/action';
import { Button } from './../../../components/atoms/Button';
// style
import './register.scss';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.isLoading);

  const handleRegisterUser = async () => {
    const res = await registerUserWithFirebase(email, password, dispatch).catch(
      (err) => err
    );
    if (res) {
      setEmail('');
      setPassword('');
      history.push('/login');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form '>
        <p>Register Page</p>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
        />
        <Button
          action={handleRegisterUser}
          title='Register'
          isLoading={loading}
        />
      </div>
    </div>
  );
}
export default Register;
