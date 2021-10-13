import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function RegisterPage() {
  const [form, setValue] = useState({ email: '', password: '', name: '' })
  function handleChange(e) {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={''}>
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
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    name={'email'}
                    errorText={'Ошибка'}
                    value={form.email}
                    />
                </div>
                <div className={`${styles.box} mb-6`}>
                    <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={'ShowIcon'}
                    name={'password'}
                    error={false}
                    onIconClick={''}
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