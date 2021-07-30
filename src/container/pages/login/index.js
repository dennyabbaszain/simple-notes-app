// library
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// local
import { loginUserWithFirebase } from '../../../config/redux/action/action';
import { Button } from './../../../components/atoms/Button';

// style
import './login.scss';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.loading);

  const handleLoginUser = async () => {
    const res = await loginUserWithFirebase(email, password, dispatch).catch(
      (err) => err
    );
    if (res) {
      localStorage.setItem('userData', JSON.stringify(res));
      history.push('/');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form '>
        <p>Login Page</p>
        <input
          type='text'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
        />
        <Button action={handleLoginUser} title='Login' isLoading={loading} />
      </div>
    </div>
  );
}
export default Login;
