import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models";

const newUser: IUser ={
    address: {
        geolocation: {
            lat: '',
            long: ''
        },
        city: '',
        street: '',
        number: 0,
        zipcode: ''
    },
    email: '',
    username: '',
    password: '',
    avatar: '',
    name: {
        firstname: '',
        lastname: '',
    },
    phone: '',
    __v: 0,
    role: 'user',
}

export const LoginForm: React.FC = () => {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userPass1, setUserPass1] = useState("");
    const [userPass2, setUserPass2] = useState("");
    const [error, setError] = useState("");
    const [isSign, setSign] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleTogglePanel = () => {
        setSign(!isSign);
      };

    const containerClass = isSign ? "container right-panel-active" : "container";

    const handleSignIn = async () => {
        try {
            const response = await axios.post<IUser>("http://localhost:5000/users/login", {
              username,
              password,
            });
      
            const user = response.data;
            console.log(user);
            setUser(user);
            localStorage.setItem("userJSON", JSON.stringify(user))



          } catch (error) {
            setError("Неверное имя пользователя или пароль");
          }
        };

    const handleSignUp = async () => {
        if (username && userPass1 && userPass1 === userPass2) {
            try {
                newUser.username = username
                newUser.password = userPass1
                const response = await axios.post<IUser>("http://localhost:5000/users/register", newUser);
                
                const user = response.data;
                console.log(user);
                setUser(user);
                localStorage.setItem("userJSON", JSON.stringify(user));
            } catch (error) {
                setError("Error registering user");
            }
          } else {
                setError("Invalid registration details");
          }
        };

    useEffect(() => {
        const user = localStorage.getItem("userJSON") || ''
        setUsername(user)
        if (user){
            return (navigate('/home'))
        }
    }, [])

    
  
    return (
      
        <div className="login-page">
            <div className={containerClass} id="login-container">
    {/* Код для левой панели (регистрация) */}
                <div className="form-container sign-up-container">
                    
                    <form className="login-form" action="#">
                        <h1>Создайте пользователя</h1>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={userPass1} onChange={(e) => setUserPass1(e.target.value)} autoComplete="new-password" />
                        <input type="password" placeholder="Password" value={userPass2} onChange={(e) => setUserPass2(e.target.value)} autoComplete="new-password" />
                        <button onClick={handleSignUp}>Зарегистрироваться</button>
                    </form>
                </div>
    {/* Код для правой панели (вход) */}
                <div className="form-container sign-in-container">
                    <form className="login-form" action="#">
                        <h1>Войти</h1>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleSignIn}>Войти</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
    {/* Код для левой панели (регистрация) */}
                            <h1>Уже зарегистрирован?</h1>
                            <button className="ghost" onClick={handleTogglePanel}>Заходи!</button>
                        </div>
                        <div className="overlay-panel overlay-right">
    {/* Код для правой панели (вход) */}
                            <h1>Нет аккаунта?</h1>
                            <p>Не беда!</p>
                            <button className="ghost" onClick={handleTogglePanel}>Регистрируйся!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
