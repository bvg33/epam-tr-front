import React, {Component} from "react";
import style from './styles/RegisterStyle.module.css'
import epamLogo from './../../images/epamWithBag.png'
import {NavLink} from "react-router-dom";
import User from "../../entity/User";

class Register extends Component {
    constructor(props) {
        super(props);
        this.registerClicked = this.registerClicked.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRepeatPassword = this.changeRepeatPassword.bind(this);
        this.state = {
            loginInput: '',
            passwordInput: '',
            repeatPasswordInput: '',
            message: ''
        };
    }

    render() {
        return (
            <div className={style.register}>
                <img src={epamLogo} height="100" className={style.epamImage}/>
                <label><input className={style.login} onChange={this.changeLogin} placeholder="login"/></label>
                <label><input className={style.password} onChange={this.changePassword} placeholder="password"
                              type="password"/></label>
                <label><input className={style.repeatPassword} onChange={this.changeRepeatPassword}
                              placeholder="password" type="password"/></label>
                <div className={style.buttons}>
                    <button className={style.registerButton} onClick={this.registerClicked}>Register</button>
                    <NavLink to="/login">
                        <button className={style.cancelButton}>Cancel</button>
                    </NavLink>
                </div>
                <label className={style.message}>{this.state.message}</label>
            </div>
        )
    }

    changeLogin(event) {
        this.setState({loginInput: event.target.value});
    }

    changePassword(event) {
        this.setState({passwordInput: event.target.value});
    }

    changeRepeatPassword(event) {
        this.setState({repeatPasswordInput: event.target.value});
    }

    registerClicked() {
        let result = this.checkCredentials();
        if (result) {
            let stringifyUser = JSON.stringify(this.registerUser());
            fetch('http://localhost:8083/epam_tr/users/newUser', {
                body: stringifyUser, method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })
                .then(response => {
                    if (response.ok) {
                        this.clearFields();
                        this.setState({message: 'Success'});
                    } else {
                        this.setState({message: "User with such login is already exist"})
                    }
                })
        } else {
            this.setState({message: "Passwords doesnt match"})
        }
    }

    checkCredentials = () => {
        return this.state.repeatPasswordInput === this.state.passwordInput;
    }

    registerUser = () => {
        let loginInput = this.state.loginInput;
        let passwordInput = this.state.passwordInput;
        return new User(loginInput, passwordInput);
    }

    clearFields = () => {
        this.setState({loginInput: ''})
        this.setState({passwordInput: ''})
        this.setState({repeatPasswordInput: ''})
    }
}

export default Register