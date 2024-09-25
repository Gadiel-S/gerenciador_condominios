import React from 'react';
import LoginButton from '../components/loginButton';

const Login: React.FC = () => {
  return (
    <div className='container'>
      <h1>Realize Login para acessar a aplicação</h1>
      <LoginButton />
    </div>
  )
}

export default Login;