import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postResetPassword, DELETE_WAS_ON_FORGOT_PAGE } from "../../../services/actions/users";

export default function ResetPasswordPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { wasOnForgotPass, isAuth } = useSelector(state => state.usersData);
console.log(wasOnForgotPass);
    const [form, setValue] = useState({ password: "", token: "" })

    function handleChange(e) {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postResetPassword(form, history));
        dispatch({type: DELETE_WAS_ON_FORGOT_PAGE})
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}} />)
    }
    if (!wasOnForgotPass) {
        return (<Redirect to={'/forgot-password'} />)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <div className={`${styles.box} mt-6 mb-6`}>
                        <Input
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
                    <div className={`${styles.box} mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={handleChange}
                            name={'token'}
                            errorText={'Ошибка'}
                            value={form.token}
                        />
                    </div>
                    <div className={`${styles.box} mb-20`}>
                        <Button type="primary" size="medium">Сохранить</Button>
                    </div>
                    <p className={`${styles.text} text text_type_main-default`}>Вспомнили пароль?
                        <Link to="/login"> 
                            <span className={styles.link}>Войти</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}