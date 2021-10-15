import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, Redirect, useHistory } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postForgotPassword, SET_WAS_ON_FORGOT_PAGE } from "../../../services/actions/users";

export default function ForgotPasswordPage() {
    const [value, setValue] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();    
    const { isAuth } = useSelector(state => state.usersData);

    function handleChange(e) {
        setValue(e.target.value);
    } 
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: SET_WAS_ON_FORGOT_PAGE })
        dispatch(postForgotPassword(value, history));
    }
    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <div className={`${styles.box} mt-6 mb-6`}>
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={handleChange}
                            name={'email'}
                            errorText={'Ошибка'}
                            value={value}
                        />
                    </div>
                    <div className={`${styles.box} mb-20`}>
                        <Button type="primary" size="medium">Восстановить</Button>
                    </div>
                    <div className={styles.link}>                
                        <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <Link 
                            to="/login" className="text text_color_accent">Войти</Link>
                        </p>
                    </div>    
                </form>
            </div>
        </div>
    );
}