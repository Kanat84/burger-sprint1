import { useEffect, useState, useRef, FormEvent, ChangeEvent, SyntheticEvent, RefObject, FocusEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styles from "./profile.module.css";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { postLogout, getUserInfo, postChangeUserInfo } from "../../services/actions/users";

export default function ProfilePage() {
    const { user }: any = useSelector<any>(state => state.usersData);
    const [isInput, setIsInput] = useState<boolean>(false);
    const [form, setValue] = useState<{ name: string, email: string, password: string }>({ name: "", email: "", password: "" })
    const dispatch = useDispatch();
    const history = useHistory();
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setValue({ ...form, email: user.email, name: user.name }) 
    }, [user])  // eslint-disable-line react-hooks/exhaustive-deps

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue({ ...form, [e.target.name]: e.target.value })
        setIsInput(true);
    }
    function handleCancel(e: SyntheticEvent) { 
        e.preventDefault(); 
        setValue({ email: user.email, name: user.name, password: "" })
        setIsInput(false);
    }
    function handleClick() {
        dispatch(postLogout(history));
    }
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        dispatch(postChangeUserInfo(form));
        setIsInput(false);
        setValue({...form, password: ''});
    }

    function handleIconClick(e: MouseEvent, ref: RefObject<any>) {
        e.preventDefault();
        ref.current.removeAttribute('disabled');
        ref.current.classList.remove('input__textfield-disabled')
        ref.current.focus();
    }   
    function handleBlur(e: FocusEvent, ref: RefObject<any>) {
        e.preventDefault();
        ref.current.setAttribute('disabled', true);
        ref.current.classList.add('input__textfield-disabled');
    }

    return (
        <div className={`${styles.container} mt-30 `}>
            <div className={styles.cont}>
                <ul className={`${styles.menu} mr-15`}>
                    <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>
                        <NavLink className={"text_color_secondary"} activeClassName={"text_color_primary"}
                            exact to={`/profile`}>Профиль</NavLink>
                    </li>
                    <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>
                        <NavLink className={"text_color_inactive"} activeClassName={"text_color_primary"}
                            exact to={`/profile/orders`}>История заказов
                        </NavLink>
                    </li>
                    <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`} onClick={handleClick}>
                        <NavLink className={"text_color_inactive"} activeClassName={"text_color_primary"}
                            exact to={`/login`}>Выход
                        </NavLink>
                    </li>
                </ul>
                <p className={`${styles.menuSubtitle} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={`${styles.text}`}>
                <form onSubmit={handleSubmit} className={`${styles.form}`}>
                    <div className="form__item mb-6">
                        <Input
                            type={"text"}
                            placeholder="Имя"
                            onChange={handleChange}
                            icon={"EditIcon"}
                            name={"name"}
                            error={false}
                            errorText={'Ошибка'}                                
                            size={"default"}                       
                            //onBlur={e => handleBlur(e, nameRef)}
                            onIconClick={e => handleIconClick(e, nameRef)}
                            disabled={true}
                            ref={nameRef}     
                            value={form.name}                       
                        />
                    </div>
                    <div className="form__item mb-6">
                        <EmailInput 
                            //type={"email"}
                            onChange={handleChange} 
                            //icon={"EditIcon"}
                            name={'email'} 
                            //errorText={'Ошибка'}                                
                            size={"default"}
                            value={form.email}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <Input
                            type={"text"}
                            placeholder="Пароль"
                            onChange={handleChange}
                            icon={"EditIcon"}
                            name={"password"}
                            error={false}
                            errorText={'Ошибка'}
                            size={"default"}
                            //onBlur={e => handleBlur(e, passRef)}
                            onIconClick={e => handleIconClick(e, passRef)}
                            disabled={true}
                            ref={passRef}
                            value={form.password}                           
                        />
                    </div>
                    {isInput && (
                    <div className={`${styles.form__buttons} mb-20`}>
                        <Button type={"primary"} size="medium">Сохранить</Button>
                        <Button type={"secondary"} size="medium" onClick={handleCancel}>Отмена</Button>
                    </div>
                    )}
                </form>
            </div>
        </div>
    )
}