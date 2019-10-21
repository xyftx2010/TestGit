import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from '../components/login'
import First from "./first";
const arr =[
    {
        path:'/index/login',
        component:Login
    },
];
const Second=()=>{
    return (
        <div>
            <Switch>
                {
                    arr.map((v,i)=>{
                        if (v.path==="*"){
                            return <Redirect to="/index" key={i} />
                        } else {
                            return <Route path={v.path} component={v.component} key={i} />
                        }

                    })
                }
            </Switch>
        </div>
    )
}
export default Second