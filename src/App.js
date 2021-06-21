import React, {Component} from "react";
import Header from "./component/header/Header";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import {BrowserRouter,Route} from "react-router-dom";
import MainPage from "./component/mainPage/MainPage";
import FileItem from "./component/mainPage/FileItem";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/main' component={MainPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
