import React, { Component } from "react";
import NavButton from "../../components/NavButton"
import Hamburger from "../../components/Hamburger"
import Logo from "../../components/Logo"
import { HashLink as Link } from 'react-router-hash-link';
import './Navbar.css';

class Navbar extends React.Component {

    constructor(props){
        super(props);

        this.selectLanguage = this.selectLanguage.bind(this);
        this.clickHamburger = this.clickHamburger.bind(this);

        this.state = {
            menuItems : ["What we do","Who we work with","Contact"],
            selectedLang : "DA",
            hamburgerOpen: true,

        }
    }

    clickHamburger(){
        this.setState({hamburgerOpen: !this.state.hamburgerOpen});
        console.log("clicked:" + this.state.hamburgerOpen);
        console.log("width:" + document.body.clientWidth);
    }

    selectLanguage(language){
        this.setState({selectedLang: language});
    }

    render(){
        return (
            <>
            <div className="Navbar">
                <Logo/>
                <Hamburger className = "NavButton Hamburger" onClick={() => this.clickHamburger()}/>
                <ul className={`MenuList ${(!this.state.hamburgerOpen && document.body.clientWidth<1250) ? ("off") : ("")}`}>
                    {this.state.menuItems.map((menuItem) => (
                        <li className="NavButton">
                            <Link smooth to={`#${menuItem}`}>
                                <NavButton name={menuItem}/>
                            </Link>
                        </li>
                    ))}
                    <div className="vl big"></div>
                    <li className="NavButton Language">
                        <Link to={'/dk'}>
                            <NavButton name="DA" className={`Language ${this.state.selectedLang === "DA" ? ("bold") : ("")}`}  onClick={() => this.selectLanguage("DA")}/>
                        </Link>
                    </li>
                    <div className="vl small"></div>
                    <li className="NavButton Language">
                        <Link to={'/en'}>
                        <NavButton name="EN" className={`Language ${this.state.selectedLang === "EN" ? ("bold") : ("")}`}  onClick={() => this.selectLanguage("EN")}/>
                        </Link>
                    </li>
   
                </ul>
            </div>
            </>
        );
    }
}
export default Navbar