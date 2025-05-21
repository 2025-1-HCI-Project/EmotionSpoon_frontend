import './App.css';
import MyRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle";

function App() {
  return (
      <>
          <GlobalStyle />
          <BrowserRouter basename="/ice">
              <MyRoutes />
          </BrowserRouter>
      </>
  );
}

export default App;
