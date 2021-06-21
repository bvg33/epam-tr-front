import React, {Component} from "react";
import epamLogo from '../../images/logoEpam.png'
import styles from './style/LogoStyle.module.css'
class Logo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.logo}>
                <img src={epamLogo} height="100"/>
            </div>
        )
    }

}
export default Logo