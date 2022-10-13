import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Calculator from "./routes/calculator/calculator.component";

import "./App.styles.scss";
import Navigation from "./components/navigation/navigation.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/calc" element={<Calculator />} />
      </Route>
    </Routes>
  );
}

export default App;
