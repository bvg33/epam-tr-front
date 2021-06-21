import React, {Component} from "react";
import styles from './style/SearchStyle.module.css'
class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let searchClass = `material-icons ${styles.searchIcon}`
        return (
            <div className={styles.search}>
                <input placeholder="Find File" className={styles.searchField}/>
                <button onClick={this.buttonClicked} className={styles.searchButton}>
                    search
                    <span className={searchClass}>search</span>
                </button>
            </div>
        )
    }

    buttonClicked() {
        if (sessionStorage.getItem('token') === null) {
            alert('Login first');
        } else {
            //findCertificates();
        }
    }
}
export default Search