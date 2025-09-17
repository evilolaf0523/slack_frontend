import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Icons from "./pages/Icons";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"
import Layout from "./Layout";

import "./App.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/icons" element={<Icons />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
