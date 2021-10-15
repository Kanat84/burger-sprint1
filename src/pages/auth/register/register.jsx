import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from 'react-router-dom';
import styles from './register.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postRegister } from "../../../services/actions/users";

export default function RegisterPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state.usersData);
    
    const [form, setValue] = useState({ email: '', password: '', name: '' })
    function handleChange(e) {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRegister(form, history))
    }
    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
                    <div className={`${styles.box} mt-6 mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleChange}
                            name={'name'}
                            errorText={'Ошибка'}
                            value={form.name}
                        />
                    </div>
                    <div className={`${styles.box} mb-6`}>
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
                            placeholder={'Введите новый пароль'}
                            onChange={handleChange}
                            icon={'ShowIcon'}
                            name={'password'}
                            error={false}
                            errorText={'Ошибка'}
                            value={form.password}                              
                        />                                             
                    </div>
                    <div className={`${styles.box} mb-20`}>
                        <Button type="primary" size="medium">Зарегистрироваться</Button>
                    </div>
                    <div className={styles.link}>                
                        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link 
                            to="/login" className="text text_color_accent">Войти</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}