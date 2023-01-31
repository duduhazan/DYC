import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Regular } from "./components/Regular";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Business } from "./components/Business";
import { About } from "./components/About";
import { Footer } from "./components/footer";
import { Favorites } from "./components/Favorites";
import { Cards } from "./components/Cards";
import { useState } from "react";
import { Gallery } from "./components/Gallery";
import { Card } from "./components/Card";
import { useEffect } from "react";
import { Api } from "./api";
import { ThemeContext } from "./context";

const backgroundColors = ["light", "dark", "yellow"];

function App() {
  const [user, setUser] = useState();
  const [theme, setTheme] = useState("light");

  const onThemeChange = () => {
    const currentIndex = backgroundColors.findIndex((color) => color === theme);
    const index =
      currentIndex === backgroundColors.length - 1 ? 0 : currentIndex + 1;
    setTheme(backgroundColors[index]);
  };

  const onLogin = (user) => {
    setUser(user);
    console.log(user.email, "is logged in");
  };

  useEffect(function getLoggedInUser() {
    Api.getUser().then(setUser);
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Header user={user} onThemeChange={onThemeChange} />
        <ToastContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path="regular" element={<Regular onLogin={onLogin} />} />
          <Route path="business" element={<Business onLogin={onLogin} />} />
          <Route path="about" element={<About />} />
          <Route
            path="favorites"
            element={
              <Favorites cardLikes={user?.cardLikes} onUserUpdate={setUser} />
            }
          />
          <Route path="card" element={<Card />} />
          <Route
            path="my-cards"
            element={
              !!user?._id && (
                <Cards
                  cardLikes={user?.cardLikes}
                  userId={user?._id}
                  onUserUpdate={setUser}
                />
              )
            }
          />
          <Route
            path="gallery"
            element={
              <Gallery cardLikes={user?.cardLikes} onUserUpdate={setUser} />
            }
          />
        </Routes>
        <Footer user={user} />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
