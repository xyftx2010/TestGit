import React from 'react'
import indexImg from "../img/index.jpg";

import {NavLink} from "react-router-dom";
import Store from '../store/index'
import axios from  'axios'
import loginImg from "../img/login.jpg";
import collImg from "../img/coll.jpg";
import homeImg from "../img/home.jpg";
import $ from "jquery";
var storage=window.localStorage;
class Collect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collectMain: [],
            collectCount: JSON.parse(storage.getItem('newsId')).length,
            arr:JSON.parse(storage.getItem('newsId'))
        }
    }
    componentDidMount() {
        console.log(this.state.arr);
        var collectArr =[]
        this.state.arr.forEach(item=>{
            collectArr.push(item['id'])
            });
        console.log(collectArr);
        var arr =[];
        collectArr.map((val)=>{
            axios.get('/api/4/news/'+val+'').then(res=>{
                arr.push(res.data);
                console.log(arr);
                this.setState({
                    collectMain:arr
                })
            })
        })
    }
    hideHome(){
        if (this.state.homeTag){
            $('#login').css('left','-319px')
            $('#loginMask').hide();
            this.setState({
                homeTag:false
            })
        }
    }
    showHome(){
        if (!this.state.homeTag){
            $('#login').show().css('left','0px');
            $('#loginMask').show();
            this.setState({
                homeTag:true
            })
        }
    }
    render() {
        console.log(this.state.collectMain);
        return (
            <div>
                <nav style={{
                    width: "3.75rem",
                    height: '.88rem',
                    background: '#00a2ed',
                    boxSize: "borderBox",
                    paddingLeft: '.19rem',
                    paddingRight: '.19rem',
                }}>
                    <div style={{height: '.34rem'}}>
                    </div>
                    <div style={{height: '.54rem'}}>
                        <div style={{
                            width: '2.91rem',
                            height: '.18rem',
                            lineHeight: '.18rem',
                            float: 'left',
                            marginTop: '.18rem'
                        }}>
                                <img src={indexImg} onClick={this.showHome.bind(this)} alt="" style={{
                                    width: '.19rem',
                                    height: '.18rem',
                                    verticalAlign: 'top',
                                    marginRight: '.36rem'
                                }}/>
                            <span style={{
                                fontSize: '20px',
                                color: '#fff',
                                display: 'inline-block'
                            }}>{this.state.collectCount}条收藏</span>
                        </div>

                    </div>

                </nav>
                <ul>
                    {
                        this.state.collectMain===false?'':this.state.collectMain.map((v, i) => {
                                    return <li key={i} style={{
                                        borderRadius: '6px',
                                        boxShadow: '0px 3px 4px -4px #000',
                                        background: '#fff',
                                        marginBottom: '.07rem',
                                        width: '100%',
                                        height: '1.03rem',
                                        boxSizing: 'border-box',
                                        padding: '.175rem'
                                    }}>
                                        <NavLink
                                            key={i}
                                            to={
                                                '/detail/' + v.id
                                            }>
                                            <h2 style={{
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                width: '2.27rem',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginRight: '.1rem'
                                            }}>
                                                {v.title}
                                            </h2>
                                            <img src={v.images} alt=""
                                                 style={{
                                                     verticalAlign: 'top',
                                                     width: '.861rem',
                                                     height: '.756rem'
                                                 }}/>
                                        </NavLink>
                                    </li>
                                })
                    }
                </ul>
                <div id='loginMask' onClick={this.hideHome.bind(this)} style={{
                    position:'fixed',
                    width:'100%',
                    height:'100%',
                    top:0,
                    left:0,
                    zIndex:0,
                    background:'rgba(0,0,0,0.4)',
                    display:'none'
                }}>

                </div>
                <div id='login'
                     style={{
                         position:"fixed",
                         top:0,left:'-319px',
                         width:'3.19rem',
                         display:'none',
                         transition:'left .5s '
                     }}><div style={{
                    // float:'left',
                    width:'100%',
                    height:'.34rem',
                    background:'#00a2ed',

                }}>
                </div>
                    <div style={{
                        // float:'left',
                        marginTop:'-2px',
                        width:'100%',
                        height:'1.16rem',
                        background:'#00a2ed',

                        padding:'.1rem .17rem'
                    }}>
                        <div style={{
                            overflow:'hidden',
                            position:"relative",
                            height:'.96rem'
                        }}>
                            <img src={loginImg} alt="" style={{
                                width:'.35rem',
                                height:".35rem",
                                display:'block',
                                borderRadius:'50%',
                                float:"left",
                                marginRight:'.2rem'
                            }}/>
                            <h2 style={{
                                fontSize:'16px',
                                fontWeight:'bold',
                                color:'#fff',
                                float:"left",
                                lineHeight:'36px',


                            }}>一二三四</h2>
                            <div  onClick={this.hideHome.bind(this)}  style={{
                                position:"absolute",
                                bottom:'0px'
                            }}>
                                    <img src={collImg}alt="" style={{
                                        width:'16px',
                                        height:'16px',
                                        verticalAlign:'top',
                                        marginTop:'3px',
                                        marginRight:'10px'
                                    }}/>
                                    <h3 style={{
                                        color:'#fff',
                                        fontSize:'16px',
                                        display:'inline-block'
                                    }}
                                    >我的收藏</h3>

                            </div>
                            <div style={{
                                position:"absolute",
                                bottom:'0px',
                                left:'150px'
                            }}>
                                <img src={collImg} alt="" style={{
                                    width:'16px',
                                    height:'16px',
                                    verticalAlign:'top',
                                    marginTop:'3px',
                                    marginRight:'10px'
                                }}/>
                                <h3 style={{
                                    color:'#fff',
                                    fontSize:'16px',
                                    display:'inline-block'
                                }}
                                >离线下载</h3>
                            </div>
                        </div>

                    </div>
                    <div style={{
                        width:'3.19rem',
                        height:'6.67rem',
                        background:'#fff',
                        marginTop:'-2px',
                    }}>
                        <NavLink to='/index'>
                            <div style={{
                                padding:'.17rem .23rem',
                                lineHeight:'16px',background:'rgb(240,240,240)'
                            }}>
                                <img src={homeImg} alt="" style={{
                                    width:'.21rem',
                                    height:'.18rem',
                                    marginRight:'8px',

                                }}/>
                                <span style={{
                                    color:'rgb(0,162,237)',
                                    display:"inline-block",


                                }}>首页</span>
                            </div>
                        </NavLink>

                    </div>
                </div>
            </div>
        )
    }
}

export default Collect