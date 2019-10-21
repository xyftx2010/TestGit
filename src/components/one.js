import React from 'react'
import Store from '../store/index'
class One extends React.Component{
    state={
        name:Store.state.name,
        age:Store.state.age
    };
    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.age}</h2>
                <button onClick={this.changN.bind(this)}>改变名字</button>
                <hr/>
                <button onClick={this.changA.bind(this,100)}>改变年龄</button>
            </div>
        )
    }
    changN(){

        Store.dispatcher.dispatch({
            actionType:"changeName",
            actionParams:'改变后数据'
        })
    }
    changA(a){
        Store.dispatcher.dispatch({
            actionType:'changeAge',
            actionParams:a
        })
    }
    componentDidMount() {
        Store.state.on('change',()=>{
            this.setState({
                name:Store.state.name,
                age:Store.state.age
            })
        })
    }
}
export default One