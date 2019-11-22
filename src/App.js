import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import Finder from './Components/Finder';


class App extends React.Component{
    render() {
        return(
            <Router><Finder /></Router>
        )
    }
}

export default App;
