import { BrowserRouter as Router } from 'react-router-dom';
import { ApiContext } from './context/ApiContext';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes';
import './styles/styles.scss';

function App() {
    return (
        <div className="mobile-div">
            <ApiContext>
                <Router>
                    <AnimatedRoutes />
                </Router>
            </ApiContext>
        </div>
    );
}

export default App;
