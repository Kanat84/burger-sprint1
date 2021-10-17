import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { postLogin } from "../../../services/actions/users";

export default function LoginPage() {
    const history = useHistory();
    const location = useLocation();    
    const dispatch = useDispatch();

    const [form, setValue] = useState({ email: '', password: '' });
    const { isAuth } = useSelector(state => state.usersData);
    let { from } = location.state || {from: {pathname: '/'}}

    function handleChange(e) {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postLogin({ email: form.email, password: form.password }, history, from)) 
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}} />)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
                    <div className={`${styles.box} mt-6 mb-6`}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={handleChange}
                            name={'email'}
                            errorText={'Ошибка'}
                            value={form.email} 
                        />
                    </div>
                    <div className={`${styles.box} mb-6`}>
                        <PasswordInput
                            type={'password'}
                            placeholder='Пароль'
                            onChange={handleChange}
                            icon={'ShowIcon'}
                            name={'password'}
                            error={false}                            
                            errorText={'Ошибка'}
                            size={"default"}
                            value={form.password}                             
                        />
                    </div>
                    <div className={`${styles.box} mb-20`}>
                        <Button type="primary" size="medium">Войти</Button>
                    </div>
                </form>    
                <div className={styles.link}>
                    <p className="text text_type_main-default text_color_inactive mb-4"> Вы — новый пользователь? <Link 
                        to="/register" className="text text_color_accent">Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link
                        to={"/forgot-password"} className="text text_color_accent">Восстановить пароль</Link>
                    </p>          
                </div>
            </div>
        </div>            
    );
}