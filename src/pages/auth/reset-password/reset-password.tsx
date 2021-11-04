import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postResetPassword, DELETE_WAS_ON_FORGOT_PAGE } from "../../../services/actions/users";

export default function ResetPasswordPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { wasOnForgotPass, isAuth }: any = useSelector<any>(state => state.usersData);
    const [form, setValue] = useState<{ password: string; token: string }>({ password: "", token: "" })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    function handleSubmit(e: FormEvent) {
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
                        <PasswordInput
                            //type={'password'}
                            //placeholder={'Введите новый пароль'}
                            onChange={handleChange}
                            //icon={'ShowIcon'}
                            name={'password'}
                            //error={false}
                            //errorText={'Ошибка'}
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