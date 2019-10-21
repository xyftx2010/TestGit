import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Index from '../components/index'
import Detail from '../components/detail'
import Comment from '../components/comment'
import Collect from '../components/collect'
const arr =[
    {
        path:'/index',
        component:Index
    },
    {
        path:'/detail/:id',
        component:Detail
    },
    {
        path:'/comment/:id',
        component:Comment
    },
    {
        path:'/collect/',
        component:Collect
    },
    {
        path:'*',
        redirect:'/index'
    }
];
const First=()=>{
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
export default First
