import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Index from './components/index'
import First from './router/first'

class App extends React.Component {

    render() {

        return (
           <div>
            <First></First>
           </div>

        );
    }
}
export  default  App