import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DataPage from "./pages/DataPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/shop" element={<ShopPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                    <Route path="/data" element={<DataPage />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
