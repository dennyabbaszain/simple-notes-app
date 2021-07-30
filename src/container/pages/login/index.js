// library
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/atoms/footer';
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
  const stateGlobal = useSelector((state) => state);

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
        <Button
          action={handleLoginUser}
          title='Login'
          isLoading={stateGlobal.isLoading}
        />
      </div>
      <Button
        action={() => history.push('/register')}
        title='not have account ? register first'
        className='btn-register'
      />
      <Footer />
    </div>
  );
}
export default Login;
