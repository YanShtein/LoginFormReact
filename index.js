import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { login } from './login';
import './index.css';


function LoginForm() {
  // here setting and getting the values
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  // we disable login button while action is being performed
  const [loading, setLoading] = useState(false);

  // we disable the btn if email is blank||pass < 6||login is performed
  const disableButton = !email || password.length < 6 || loading;
  const success = <div>Connected!</div>

  // Async function because usually we call to a server 
  // in try catch we need to handle failing Promise
  const handlelogin = async () => {
    setLoading(true);
    setStatus(null) // if login fails we show error, clear the error every new attempt
    try {
      // passing login as an object, await loging as this is Asynchronous call
      await login({ email, password })
      setStatus(success)
      setLoading(false)
      setEmail('')
      setPassword('')
    } catch(status) {
      setStatus(status.message) // -message- from new Error in login.js
      setLoading(false)
      setEmail('')
      setPassword('')
    };
  };

  return (
    <div className='container'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className='back'></div>
      <div className='form'>
        <div>
          <h1>Login in to site</h1>
        </div>
        <label htmlFor={'email'}>Email</label>
        <input 
          id={'email'} 
          type={'email'} 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}/> {/*passing event to on change*/}
        <label htmlFor={'password'}>Password</label>
        <input 
          id={'password'} 
          type={'password'} 
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
        <div>
          {/*disable the button if true*/}
          <button disabled={disableButton} onClick={handlelogin}>Login</button>
        </div>  
      </div>
      <div className='errorMessage'>{status}
      </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      
      <LoginForm />
    );
  };
};


ReactDOM.createRoot(document.getElementById('root')).render(<App />);