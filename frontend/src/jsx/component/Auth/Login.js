import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

import '../../../assets/css/auth.css';

const Login = () => {
  // states
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target.name]: null });
    delete errors?.[e.target.name];
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!data.email) {
      setErrors({ ...errors, email: 'Email is required' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      setErrors({ ...errors, email: 'Email is invalid' });
    }

    if (!data.password) {
      setErrors({ ...errors, password: 'Password is required' });
    } else if (data.password.length < 8 || data.password.length >= 20) {
      setErrors({
        ...errors,
        password: 'Password length should be between 8 and 20 characters',
      });
    }

    console.log('data', data);
  };

  return (
    <section>
      <div className='col-10 col-lg-4 form_container'>
        <h4 className='text-center mb-4'>Login</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>
              Email<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              value={data?.['email']}
              onChange={handleChange}
            />
            {errors?.email && <span className='text-danger'>{errors?.['email']}</span>}
          </Form.Group>

          <Form.Group className='mb-3 position-relative' controlId='formBasicPassword'>
            <Form.Label>
              Password<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={data?.['password']}
              onChange={handleChange}
            />
            <div className='eye_icon' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </div>
            {errors?.password && <span className='text-danger'>{errors?.['password']}</span>}
          </Form.Group>
          <button className='login_btn my-3 mt-4' type='submit'>
            Login
          </button>
          <div className='text-center'>
            <span className='text-muted'>Not registered?</span>{' '}
            <Link to='/register' className='text-green login_link'>
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Login;
