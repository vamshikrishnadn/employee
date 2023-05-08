import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import '../../../assets/css/auth.css';
import { registerUser } from '../../../store/actions/AuthActions';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ role: 'employee' });
  const [showPassword, setShowPassword] = useState(false);

  // selectors
  const { btnLoader } = useSelector(state => state.app);

  const handleChange = e => {
    console.log('evalue', e);
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    delete errors?.[e.target.name];
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!data.password) {
      return setErrors({ ...errors, password: 'Password is required' });
    } else if (data.password.length < 8 || data.password.length >= 20) {
      return setErrors({
        ...errors,
        password: 'Password length should be between 8 and 20 characters',
      });
    }

    if (data.password !== data.confirmPassword) {
      return setErrors({
        ...errors,
        confirmPassword: 'Password and confirm password should be the same.',
      });
    }

    console.log('data', data);
    dispatch(registerUser(data, navigate));
  };

  return (
    <section className='login_section'>
      <div className='col-10 col-lg-8 form_container'>
        <h4 className='text-center mb-4'>Register</h4>
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  First Name<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your first name'
                  name='fname'
                  value={data?.['fname']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your first name'
                  name='lname'
                  value={data?.['lname']}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Gender<span className='text-danger'>*</span>
                </Form.Label>
                <br />
                <Form.Check
                  inline
                  label='Male'
                  name='gender'
                  type={'radio'}
                  id={`gender-1`}
                  value='Male'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Female'
                  name='gender'
                  type={'radio'}
                  id={`gender-2`}
                  value='Female'
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Email<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                  value={data?.['email']}
                  required
                  onChange={handleChange}
                />
                {errors?.email && <span className='text-danger'>{errors?.['email']}</span>}
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
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
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>
                  Confirm Password<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter you password'
                  name='confirmPassword'
                  value={data?.['confirmPassword']}
                  required
                  onChange={handleChange}
                />
                {errors?.confirmPassword && (
                  <span className='text-danger'>{errors?.['confirmPassword']}</span>
                )}
              </Form.Group>
            </div>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>
                User Type<span className='text-danger'>*</span>
              </Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={e => setData({ ...data, role: e.target.value })}
                required
                value={data?.['role']}
              >
                <option value='employee'>Employee</option>
                <option value='manager'>Manager</option>
              </Form.Select>
            </Form.Group>

            <div className='col-12 col-lg-6 mx-auto'>
              <button className='login_btn my-3 mt-4' type='submit'>
                {btnLoader ? <Spinner animation='border' size='sm' /> : 'Register'}
              </button>
            </div>
            <div className='text-center'>
              <span className='text-muted'>Already have account?</span>{' '}
              <Link to='/login' className='text-green login_link'>
                Sign in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Register;
