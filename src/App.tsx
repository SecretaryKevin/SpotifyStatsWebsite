import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Controller from './Controller';
import Statistics from './pages/Statistics.tsx';
import './App.css';
import DataUpload from "./pages/DataUpload.tsx";

function App() {
    const controller = new Controller();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={Object.keys(controller.songs).length > 0 ? "/statistics" : "/loadData"} />} />
                <Route path='/loadData' element={<DataUpload controller={controller} />} />
                <Route path="/statistics" element={<Statistics controller={controller}/>} />
            </Routes>
        </Router>
    );
}

export default App;