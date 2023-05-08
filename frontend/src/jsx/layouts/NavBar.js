import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../store/actions/AuthActions';
import AppModal from './AppModal';
import moment from 'moment';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // selectors
  const userType = useSelector(state => state.auth?.authDetails?.user?.role);
  const user = useSelector(state => state.auth?.authDetails?.user);

  useEffect(() => {
    if (userType) {
      if (userType === 'manager') {
        setLinks([{ title: 'Dashboard', navigate: '/dashboard' }]);
      }
    }
  }, [userType]);

  const logout = () => {
    dispatch(handleLogout(navigate));
  };

  return (
    <>
      <Navbar bg='success' expand='lg' className='mb-4'>
        <Container>
          <Navbar.Brand>
            <Link to='/dashboard' className='text-white text-decoration-none'>
              {userType === 'manager' ? 'Manager Dashboard' : 'Employee Dashboard'}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav className='mr-auto'>
              <Nav.Link className='text-light'>
                <Link to='/dashboard' className='text-decoration-none text-white'>
                  Dashboard
                </Link>
              </Nav.Link>
              <Nav.Link className='text-light'>
                <Link to='/query' className='text-decoration-none text-white'>
                  Query Task
                </Link>
              </Nav.Link>
              <Nav.Link className='text-light' onClick={() => setShowModal(true)}>
                Profile
              </Nav.Link>
              <Nav.Link className='text-light' onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ProfileModal */}
      <AppModal
        size={'md'}
        title={'Profile details'}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className='col-12 col-lg-10 mx-auto'>
          <p>
            <b>Name: </b>
            <span className='text-capitalize'>{user?.name}</span>
          </p>
          <p>
            <b>Email: </b>
            <span>{user?.email}</span>
          </p>
          <p>
            <b>Role: </b>
            <span className='text-capitalize'>{user?.role}</span>
          </p>
          <p>
            <b>Created on: </b>
            <span className='text-capitalize'>{moment(user?.createdAt).format('ll')}</span>
          </p>
        </div>
        <div className='col-12 d-flex justify-content-end'>
          <button className='btn btn-danger mx-3' onClick={() => setShowModal(false)} type='button'>
            Close
          </button>
        </div>
      </AppModal>
    </>
  );
}

export default NavBar;
