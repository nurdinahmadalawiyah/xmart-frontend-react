import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/shop" element={<ShopPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                    <Route path="/admin" element={<AdminPage />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
