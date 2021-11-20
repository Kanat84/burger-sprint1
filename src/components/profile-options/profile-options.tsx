import { useEffect, useState, useRef, FormEvent, ChangeEvent, SyntheticEvent, RefObject, FocusEvent, MouseEvent } from "react";
import styles from "./profile-options.module.css";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserInfo, postChangeUserInfo } from "../../services/funcs";
import { TUserData, RootState, useDispatch, useSelector } from '../../services/types';

export default function ProfileOptions() {
    const { user } = useSelector((state: RootState) => state.usersData);
    const [isInput, setIsInput] = useState<boolean>(false);
    const [form, setValue] = useState<TUserData>({ name: "", email: "", password: "" })
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setValue({ ...form, email: user.email, name: user.name }) 
    }, [user])  // eslint-disable-line react-hooks/exhaustive-deps

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue({ ...form, [e.target.name]: e.target.value })
        setIsInput(true);
    }
    function handleCancel(e: SyntheticEvent): void { 
        e.preventDefault(); 
        setValue({ email: user.email, name: user.name, password: "" })
        setIsInput(false);
    }
    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        dispatch(postChangeUserInfo(form));
        setIsInput(false);
        setValue({...form, password: ''});
    }
    function handleIconClick(e: MouseEvent, ref: RefObject<any>): void {
        e.preventDefault();
        ref.current.removeAttribute('disabled');
        ref.current.classList.remove('input__textfield-disabled')
        ref.current.focus();
    }   
    function handleBlur(ref: RefObject<any>, e?: FocusEvent): void {
        e?.preventDefault();
        ref.current.setAttribute('disabled', true);
        ref.current.classList.add('input__textfield-disabled');
    }

    return (
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
                        onBlur={e => handleBlur(nameRef, e)}
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
                        onBlur={e => handleBlur(passRef, e)}
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
    )
}