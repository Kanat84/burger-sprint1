import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export default function NotFound404() {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Ошибка 404</h1>
          <p>Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно она</p>
          <p>устарела, была удалена, или был введен неверный адрес в адресной строке</p>          
          <br />
          <br />          
          <Link to='/' className={styles.link}>Перейти на главную</Link>
        </div>
      </div>
  );
}
