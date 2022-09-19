import { Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Calculator from "./routes/calculator/calculator.component";
import Graphs from "./routes/graphs/graphs.component";
import Gifts from "./routes/gifts/gifts.component";
import Authentication from "./routes/authentication/authentication.component";

import "./App.styles.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="graphs" element={<Graphs />} />
        <Route path="gifts" element={<Gifts />} />
      </Route>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
}

export default App;
