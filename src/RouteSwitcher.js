import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Instructions from './Instructions';
import Game from './Game';

const RouteSwitcher = () => {
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<Instructions />} />
                  <Route path ="game" element={<Game />} />
                  <Route path ="*" element={
                      <main>
                          <h1>What are? you looking for?</h1>
                          <p>There's nothing here!</p>
                      </main>
                    }
                  /> 
              </Route>
          </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitcher;  