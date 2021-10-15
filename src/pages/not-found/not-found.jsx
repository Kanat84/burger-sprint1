import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export default function NotFound404() {

  return (
    <div className={styles.container}>
      <h1>Ошибка 404</h1>
      <div className="text text_type_main-default mb-4">  
        <p>Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно она</p>
        <p>устарела, была удалена, или был введен неверный адрес в адресной строке</p>          
        <br/><br/> 
        <Link to="/" className="text text_color_accent"> Перейти на главную</Link>
      </div>  
    </div>
  );
}
