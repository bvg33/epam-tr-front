import React, {Component} from "react";
import FileItem from "./FileItem";
import style from './style/MainPageStyle.module.css'
import folder from './../../images/folder.jpg'
import file from './../../images/file.png'
import drive from './../../images/drive.png'

if (sessionStorage.getItem('url') == null) {
    sessionStorage.setItem('url', 'http://localhost:8083/epam_tr/files/getFile');
}

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.createFileItem = this.createFileItem.bind(this);
        this.setFileStates = this.setFileStates.bind(this);
        this.definePathToImg = this.definePathToImg.bind(this);
        this.state = {
            itemNumber: 0,
            names: [],
            paths: [],
            sizes: [],
            pathsToImg: []
        }
    }

    render() {
        let arr = this.createFileItem();
        return (
            <div className={style.allFiles}>
                <div className={style.fileBlock}>
                    {arr.map((row) => (<div>{row}</div>))}
                </div>
            </div>
        );
    }


    componentDidMount() {
        fetch(sessionStorage.getItem('url'), {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        })
            .then(response => response.json())
            .then(files => {
                let fileList = files["list"];
                this.setFileStates(fileList);
            })
    }


    setFileStates = (fileList) => {
        let names = Array.from(fileList, file => file["name"]);
        let paths = Array.from(fileList, file => file["path"]);
        let sizes = Array.from(fileList, file => file["size"]);
        let types = Array.from(fileList, file => file["type"]);
        let size = fileList.length;
        for (let i = 0; i < size; i++) {
            this.state.names.push(names[i]);
            this.state.paths.push(paths[i]);
            this.state.sizes.push(sizes[i]);
            let pathToImg = this.definePathToImg(types[i]);
            this.state.pathsToImg.push(pathToImg);
        }
        this.setState({itemNumber: size});
    }

    definePathToImg = (type) => {
        if (type === 'FOLDER') {
            return folder;
        }
        if (type === 'DRIVE') {
            return drive;
        }
        if (type === 'FILE') {
            return file;
        }
    }

    createFileItem = () => {
        let arr = new Array(this.state.itemNumber)
        for (let i = 0; i < arr.length; i++) {
            let name = `Name : ${this.state.names[i]}`;
            let size = `Size : ${this.state.sizes[i]} MB`;
            let path = `Path : ${this.state.paths[i]}`;
            let pathToImg = this.state.pathsToImg[i];
            arr[i] = <FileItem name={name} size={size} path={path} pathToImg={pathToImg}/>;
        }
        return arr;
    }
}

export default MainPage;