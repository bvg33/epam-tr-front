import React, {Component} from "react";
import epamLogo from './../../images/epamWithBag.png'
import styles from './style/LoginStyle.module.css'
import User from "../../entity/User";
import {NavLink} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.loginButtonClick = this.loginButtonClick.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            invalidCredentials: '',
            loginInput: '',
            passwordInput: ''
        };
    }

    render() {
        return (
            <div className={styles.login}>
                <img src={epamLogo} height="100" className={styles.epamLoginImage}/>
                <label><input className={styles.loginInput} onChange={this.changeLogin} placeholder="login"/></label>
                <label><input className={styles.passwordInput} onChange={this.changePassword} placeholder="password"
                              type="password"/></label>
                <button onClick={this.loginButtonClick} className={styles.loginButton}>Log In</button>
                <NavLink to="/register">
                    <button className={styles.loginRegisterButton}>
                        Register
                    </button>
                </NavLink>
                <label className={styles.invalidCredentials}>{this.state.invalidCredentials}</label>
            </div>);
    }

    changeLogin(event) {
        this.setState({loginInput: event.target.value});
    }

    changePassword(event) {
        this.setState({passwordInput: event.target.value});
    }

    loginButtonClick() {
        let stringifyUser = JSON.stringify(this.createUser());
        fetch('http://localhost:8083/epam_tr/auth', {
            body: stringifyUser,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({invalidCredentials: 'Invalid Credentials'})
                }
            })
            .then(token => {
                if (typeof token !== "undefined") {
                    sessionStorage.setItem("token", token["token"]);
                    window.location.assign('http://localhost:3000/register');
                }
            })
    }

    createUser = () => {
        const loginInput = this.state.loginInput;
        const passwordInput = this.state.passwordInput;
        return new User(loginInput, passwordInput);
    }
}

export default Login