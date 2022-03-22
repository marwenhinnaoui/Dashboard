import "antd/dist/antd.css";
import "./components/styles/main.css";
import "./components/styles/responsive.css";
import Home from "./components/dashboard/pages/Home";
import Tables from "./components/dashboard/pages/Tables";
import Setting from "./components/dashboard/pages/Setting";
import ErrorLogin from "./components/auth/signin/ErrorLogin";
import FormSignin from './components/auth/signin/FormSigIn';
import {  Route, useNavigate, Routes  } from "react-router-dom";
import NotFound from "./components/404";
import Form from "./components/auth/signup/Form";
import FormSuccess from "./components/auth/signup/FormSuccess";

function App() {
const navigate=useNavigate()
  return (
    <div className="App">

          <Routes>
                <Route path="/login" element={<FormSignin />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route exact path="/error" element={<ErrorLogin />} />
                <Route path="/singup" element={<Form />} />
                <Route path="/success" element={<FormSuccess/>} />

                  <Route exact path="/dashboard" element={<Home/>} />
                  <Route exact path="/tables" element={<Tables/>} />
                  <Route exact path="/setting" element={<Setting/>} />

                  {/* <Redirect from="*" to="/notfound" /> */}
          </Routes>


    </div>
  );
}

export default App;
