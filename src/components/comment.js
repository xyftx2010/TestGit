import React from 'react'
import backImg from "../img/back.jpg";
import {NavLink} from "react-router-dom";
import comImg from "../img/pl.jpg";
import emptyImg from "../img/empty.jpg";
import axios from 'axios';
import $ from 'jquery';
class Comment extends React.Component{
    constructor(props){
        super(props);
        this.zanSpan = React.createRef();
        this.red = React.createRef();
        this.gray = React.createRef();
        this.goback = this.goback.bind(this);
        this.state={
            id:props.match.params.id,
            msg:'',
            long_comments:'',
            short_comments:'',
            arrowBImg:require('../img/arrowB.png'),
            arrowTImg:require('../img/arrowT.png'),
            shortData:[],
            longData:[],
            zanImg :require('../img/zanS.jpg'),
            zan_Img:require('../img/zanS_.png'),
            zanTag:false,
            shortTag:false
        }
    }
    componentDidMount() {
        axios.get('/api/4/story-extra/'+this.state.id+'').then((res)=>{
            this.setState({
                msg:res.data.comments,
                long_comments:res.data.long_comments,
                short_comments:res.data.short_comments,
            })
        })
        axios.get('/api/4/story/'+this.state.id+'/short-comments').then((res)=>{
            console.log(res);
            this.setState({
                shortData:res.data.comments
            })
        })
        axios.get('/api/4/story/'+this.state.id+'/long-comments').then((res)=>{
            console.log(res);
            this.setState({
                longData:res.data.comments
            })
        })
    }

    goback(){
        this.props.history.go(-1)
    }
    Red(e){
        e.target.style.display='none';
        console.log(e.target.nextSibling.nextSibling,'red');
        let a = parseInt(e.target.nextSibling.nextSibling.innerHTML)+1;
        e.target.nextSibling.nextSibling.innerHTML=a;

    }
    Gray(e){
        console.log(e.target.nextSibling,'gray');
        e.target.previousSibling.style.display="block";
        let b = parseInt(e.target.nextSibling.innerHTML)-1;
        e.target.nextSibling.innerHTML=b;

    }
    Unfold(e){
        console.log(1);
        if (!this.state.shortTag){
            $("#shortList").show()
            this.setState({
                shortTag:true,
                arrowBImg:require('../img/arrowT.png')
            })
        } else {
            $("#shortList").hide()
            this.setState({
                shortTag:false,
                arrowBImg:require('../img/arrowB.png')
            })
        }

    }
    render() {
        function timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
        return(
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
                            width: '2rem',
                            height: '.18rem',
                            lineHeight: '.18rem',
                            float: 'left',
                            marginTop: '.18rem'
                        }}>
                            <img src={backImg} onClick={this.goback.bind(this)} alt="" style={{
                                width: '.19rem',
                                height: '.18rem',
                                verticalAlign: 'top',
                                marginRight:'.1rem'
                            }}/>
                            <span style={{fontSize: '20px', color: '#fff', display: 'inline-block'}}>{this.state.msg}1条点评</span>
                        </div>
                        <div style={{float: 'right', marginTop: '.18rem'}}>
                            <img src={comImg} alt=""    style={{
                                float: 'right',
                                width: '.19rem',
                                height: '.18rem',
                                verticalAlign: 'top',marginRight:'.1rem',marginTop:'.02rem'
                            }}/>

                        </div>
                    </div>
                </nav>
                <div style={{

                }}>
                    <div className='long_comments'>
                        <p style={{
                            padding:"0px 12px",
                            height:'.49rem',
                            lineHeight:'.49rem',
                            margin:'0px',
                            borderBottom:'.01rem solid #666'
                        }}>{this.state.long_comments}条长评</p>
                        <div>
                            {
                                this.state.long_comments===0?<img src={emptyImg}
                                                                  style={{
                                                                        width:'100%',
                                                                        height:'4.84rem'}} alt=""/>: <ul>
                                    {
                                        this.state.longData.map((v,i)=>{
                                            return <li key={i} style={{
                                                borderTop:'1px solid #333',
                                                borderBottom:'1px solid #333',
                                                overflow:'hidden'
                                            }}>
                                                <div style={{
                                                    width:'.46rem',
                                                    padding:'12px 12px',
                                                    float:'left',
                                                }}>
                                                    <img src={v.avatar} style={{
                                                        width:'.37rem',
                                                        height:'.37rem',
                                                        display:'block',
                                                        borderRadius:'50%'
                                                    }} alt=""/>
                                                </div>
                                                <div style={{
                                                    width:'3.29rem',
                                                    float:'right',
                                                    paddingLeft:'.2rem'
                                                }}>
                                                    <h2 style={{
                                                        fontSize:'16px',
                                                        fontWeight:'bold',
                                                        margin:'10px 0 0 0',
                                                        position:'relative'
                                                    }}>{v.author}
                                                        <span ref={this.zanSpan}  style={{

                                                            display:'block',
                                                            position:'absolute',
                                                            right:'12px',
                                                            bottom:'10px',

                                                        }}>
                                                    <img className='gray' onClick={this.Red.bind(this)} ref={this.gray} src={this.state.zanImg} style={{
                                                        width:'12px',
                                                        height:'11px',
                                                        verticalAlign:'middle',
                                                        marginRight:'2px',
                                                        position:"absolute",
                                                        top:'7px',left:'-15px',
                                                        zIndex:2
                                                    }}  alt=""/>
                                                    <img className='red' onClick={this.Gray.bind(this)} ref={this.red} src={this.state.zan_Img} style={{
                                                        width:'12px',
                                                        height:'11px',
                                                        verticalAlign:'middle',
                                                        marginRight:'2px',position:"absolute",
                                                        top:'7px',left:'-15px',

                                                    }} alt=""/>
                                                    <span id='zan' style={{
                                                        fontSize:'12px',
                                                        color:'#b8b8b8',
                                                        verticalAlign:'middle',
                                                    }}>{v.likes}</span>

                                                </span>
                                                    </h2>
                                                    <p style={{
                                                        margin:'0px',
                                                        padding:'5px 8px'
                                                    }}
                                                    >{v.content }</p>
                                                    <span className='time'>{
                                                        timestampToTime(v.time)
                                                    }</span>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>

                            }
                        </div>
                    </div>
                    <div className='short_comments'>
                        <p  onClick={this.Unfold.bind(this)} style={{
                            padding:"0px 12px",
                            height:'.49rem',
                            lineHeight:'.49rem',
                            borderBottom:'.01rem solid #666',
                            borderTop:'.01rem solid #666',
                            margin:'0px',
                            position:'relative'
                        }}>{this.state.short_comments}条短评
                            <img src={this.state.arrowBImg}  style={{
                                width:'.12rem',
                                height:'.11rem',
                                display:'block',
                                position:'absolute',
                                right:'15px',
                                bottom:'18px'
                            }} alt=""/>
                        </p>
                        <div>{
                            this.state.short_comments?<ul id='shortList'>
                                {
                                    this.state.shortData.map((v,i)=>{
                                        return <li key={i} style={{
                                            borderTop:'1px solid #333',
                                            borderBottom:'1px solid #333',
                                            overflow:'hidden'
                                        }}>
                                            <div style={{
                                                width:'.46rem',
                                                padding:'12px 12px',
                                                float:'left',
                                            }}>
                                                <img src={v.avatar} style={{
                                                    width:'.37rem',
                                                    height:'.37rem',
                                                    display:'block',
                                                    borderRadius:'50%'
                                                }} alt=""/>
                                            </div>
                                            <div style={{
                                                width:'3.29rem',
                                                float:'right',
                                                paddingLeft:'.2rem'
                                            }}>
                                                <h2 style={{
                                                    fontSize:'16px',
                                                    fontWeight:'bold',
                                                    margin:'10px 0 0 0',
                                                    position:'relative'
                                                }}>{v.author}
                                                    <span ref={this.zanSpan}  style={{

                                                        display:'block',
                                                        position:'absolute',
                                                        right:'12px',
                                                        bottom:'10px',

                                                    }}>
                                                    <img className='gray' onClick={this.Red.bind(this)} ref={this.gray} src={this.state.zanImg} style={{
                                                        width:'12px',
                                                        height:'11px',
                                                        verticalAlign:'middle',
                                                        marginRight:'2px',
                                                        position:"absolute",
                                                        top:'7px',left:'-15px',
                                                        zIndex:2
                                                    }}  alt=""/>
                                                    <img className='red' onClick={this.Gray.bind(this)} ref={this.red} src={this.state.zan_Img} style={{
                                                        width:'12px',
                                                        height:'11px',
                                                        verticalAlign:'middle',
                                                        marginRight:'2px',position:"absolute",
                                                        top:'7px',left:'-15px',

                                                    }} alt=""/>
                                                    <span id='zan' style={{
                                                        fontSize:'12px',
                                                        color:'#b8b8b8',
                                                        verticalAlign:'middle',
                                                    }}>{v.likes}</span>

                                                </span>
                                                </h2>
                                                <p style={{
                                                    margin:'0px',
                                                    padding:'5px 8px'
                                                }}
                                                >{v.content }</p>
                                                <span className='time'>{
                                                    timestampToTime(v.time)
                                                }</span>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>:<img src={emptyImg}
                                                           style={{
                                                               width:'100%',
                                                               height:'4.84rem'}} alt=""/>

                        }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    unfold(){

    }
}
export default Comment