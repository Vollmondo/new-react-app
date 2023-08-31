import { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'

export const LoginForm: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSign, setSign] = useState<boolean>(false)


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/", {
        username,
        password,
      });
      const userId = response.data.userId;
      setUser(userId);
    } catch (error) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  const rightPanelActive = isSign ? 'container right-panel-active' : 'container' 

  return (
    <div className="login-page">     
            <div className={rightPanelActive} id="login-container">
                <div className="form-container sign-up-container">
                    <form className="login-form" action="#">
                        <h1>Соаздайте пользователя</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span> 
                        <InputText type="text" placeholder="Введите логин" />
                        <InputText type="email" placeholder="Введите Email" />
                        <InputText 
                            type="text" 
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass1(event)}
                        />
                        <InputText 
                            type="text" 
                            placeholder="Введите пароль повторно" 
                            onChange={(event: any) => handleChangePass2(event)}
                        />
                        {isPassError && <div style={{color: 'red'}}>Пароли не совпадают</div>}
                        <button className="login-button">Регистрация</button>*/}
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="login-form" action="#">
                        <h1>Sign in</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your account</span> */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="#">Забыли пароль</a>
                        <button className="login-button" onClick={handleLogin}>Войти</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
                
            </div>
        </div>
  );
};

