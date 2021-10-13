import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

//import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Home from '../../pages/home';
import NotFound404  from '../../pages/not-found';

export default function App() {
    const location = useLocation();
    const history = useHistory();
    const background = history.action === 'PUSH' && location.state && location.state.background;

    return (
        <div>
            <AppHeader />
            <main>
                <Switch location={background || location}> 
                    <Route exact path="/" component={ Home } />                       
                    <Route component={ NotFound404 } />                                              
                </Switch>
            </main>
        </div>
    );
}
