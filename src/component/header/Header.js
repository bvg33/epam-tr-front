import React, {Component} from "react";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import styles from './style/HeaderStyle.module.css'
class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.header}>
                <Logo/>
                <Search/>
                <Menu/>
            </div>
        )
    }
}
export default Header