import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import UserServices from '../../services/UserServices';
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../services/UserContext';
import Swal from 'sweetalert2';


function Login({ onLoginSuccess }) {
    const { login } = useUser();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
      };
      
    const navigate = useNavigate();
    const [agreePolicy, setAgreePolicy] = useState(false);
    const handleAgreePolicyChange = () => {
        setAgreePolicy(!agreePolicy);
      };

      const handleRegisterUsernameChange = (event) => {
        setRegisterUsername(event.target.value);
      };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRegisterEmailChange = (event) => {
        setRegisterEmail(event.target.value);
      };
    
      const handleRegisterPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
      };
    const handleLogin = (event) => {
        event.preventDefault();
        const user = users.find((user) => user.email === email && user.password === password);
        
        if (user) {
          const { id, name, email, phone, username, address, image, roles, createdAt, updatedAt, createdBy, updatedBy, status, role } = user;
          console.log('Login successful');

          localStorage.setItem('loggedInUser', JSON.stringify(user));            
          onLoginSuccess();
          Swal.fire(
            'Logged In Successfully!',
            'You have successfully logged into your account!',
            'success'
          )
    
          const closeButton = document.querySelector('.close');
          if (closeButton) {
              closeButton.click();
          }
          
          login(user);
          console.log("user",user)
          navigate('/');
        
        } else {
          console.error('Invalid email or password');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong login name or password!',
            
          })
        }
      };
      const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await UserServices.registerUser({
                email: registerEmail,
                password: registerPassword,
                name: "DEFAULT",
                phone: "DEFAULT",
                username: registerUsername,
                address: "DEFAULT",
                image: "DEFAULT",
                roles: "1",
                createdAt: "2023-12-30T07:54:31.000+00:00",
                updatedAt: null,
                createdBy: null,
                updatedBy: null,
                status: 1,
                role: 0
            });
    
            setLoggedInUser(response);
            Swal.fire(
                'Sign Up Successfully!',
                'You have successfully registered your account!',
                'success'
            );
    
            console.log('Registration successful', response);
    
            UserServices.getAll()
                .then(response => {
                    console.log('Data from API:', response.data.content);
                    setUsers(response.data.content);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
    
        } catch (error) {
            console.error('Error registering user:', error);
            window.alert('Đã có lỗi xảy ra trong quá trình đăng ký!');
        }
    };
    useEffect(() => {
      UserServices.getAll()
        .then(response => {
          console.log('Data from API:', response.data.content);
          setUsers(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
    
    const handleGoogleLogin = async (credentialResponse) => {
        try {
          if (credentialResponse && credentialResponse.credential) {
            const decodedToken = jwtDecode(credentialResponse.credential);
            console.log('API:', decodedToken);
            const { email, name } = decodedToken;
            const response = await UserServices.registerUser({
              email,
              name,
              password: "DEFAULT",
              phone: "DEFAULT",
              username: "DEFAULT",  
              address: "DEFAULT",
              image: "DEFAULT",
              roles: "1",
              createdAt: "2023-12-30T07:54:31.000+00:00",
              updatedAt: null,
              createdBy: null,
              updatedBy: null,
              status: 1,
              role: 0
          
            });
      
            onLoginSuccess();
            console.log('Google Login successful', response);
            Swal.fire(
              'Logged In Successfully!',
              'You have successfully logged into your account!',
              'success'
            )
            const closeButton = document.querySelector('.close');
            if (closeButton) {
                closeButton.click();
            }
    
            navigate('/');
          } else {
            console.error('Invalid Google Login response:', credentialResponse);
          }
        } catch (error) {
          console.error('Error handling Google Login:', error);
        }
      };
      useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
      
        if (storedUser) {
          console.log('Stored user found:', storedUser);
      
          const user = JSON.parse(storedUser);
          login(user);
          onLoginSuccess();
        }
      }, []);
      
    return (  
        <div
        className="modal fade"
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="signin-tab"
                        data-toggle="tab"
                        href="#signin"
                        role="tab"
                        aria-controls="signin"
                        aria-selected="true"
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {/* LOGIN */}
                    <div
                      className="tab-pane fade show active"
                      id="signin"
                      role="tabpanel"
                      aria-labelledby="signin-tab"
                    >
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <label htmlFor="singin-email">
                            Username or email address *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="singin-email"
                            name="singin-email"
                            value={email}
                            onChange={handleEmailChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="singin-password">Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password"
                            name="singin-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>LOG IN</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="signin-remember"
                              
                              checked={true}
                              onChange={handleRememberMeChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="signin-remember"
                            >
                              Remember Me
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <a href="#" className="forgot-link">
                            Forgot Your Password?
                          </a>
                        </div>
                        {/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                        
                            <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>
                        
                          </div>
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* REIGISTER */}
                    <div
                      className="tab-pane fade"
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      <form onSubmit={handleRegister}>
                        <div className="form-group">
                          <label htmlFor="register-email">
                            Your email address *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="register-email"
                            name="register-email"
                            value={registerEmail}
                            onChange={handleRegisterEmailChange}
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="register-username">Username *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="register-username"
                            name="register-username"
                            value={registerUsername}
                            onChange={handleRegisterUsernameChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="register-password">Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="register-password"
                            name="register-password"
                            value={registerPassword}
                            onChange={handleRegisterPasswordChange}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                            disabled={!agreePolicy}
                          >
                            <span>SIGN UP</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="register-policy"
                              checked={agreePolicy}
                              onChange={handleAgreePolicyChange}
                              required=""
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="register-policy"
                            >
                              I agree to the <a href="#">privacy policy</a> *
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                          <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>
                          </div>
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
      </div>
    );
}

export default Login;