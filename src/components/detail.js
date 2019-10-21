import React from 'react'
import backImg from "../img/back.jpg";
import recImg from "../img/rec.jpg";
import {NavLink} from 'react-router-dom';
import talkImg from "../img/talk.jpg";
import axios from 'axios';
import "../Detail.css";
import wbImg from '../img/wb.png'
import Store from '../store/index'


var storage = window.localStorage;
class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.goback = this.goback.bind(this);
        var NowId = props.match.params.id;
        var aTest = JSON.parse(storage.getItem('newsId'));
        console.log(aTest);

        var arrTest = [];
        aTest.forEach(i=>{
            arrTest.push(i['id'])
        });
        console.log(arrTest);
        console.log(arrTest.indexOf(NowId));
        this.state = {
            id: props.match.params.id,
            body: "",
            title: '',
            img: '',
            tag: '',
            collTag: false,
            zanTag: false,
            collImg: arrTest.indexOf(NowId)===-1?require('../img/coll.jpg'):require('../img/coll_.png'),
            zanImg: require('../img/zan.jpg'),
            long_comments: 0,
            short_comments: 0,
            comments: 0,  //评论总数
            popularity: 0,
            colArr: JSON.parse(storage.getItem('newsId'))
        }
    }

    componentDidMount() {
        axios.get('/api/4/news/' + this.state.id + '').then((res) => {
                console.log(res);
                this.setState({
                    body: res.data.body,
                    img: res.data.images[0],
                    title: res.data.title,
                    tag: res.data.image_source,
                    share_flag: false,
                });
                document.getElementById("Main").innerHTML = res.data.body
            }
        );
        axios.get('/api/4/story-extra/' + this.state.id + '').then((res) => {
            console.log(res);
            this.setState({
                long_comments: res.data.long_comments,
                short_comments: res.data.short_comments,
                comments: res.data.comments,
                popularity: res.data.popularity
            })
        })
    }

    hide() {
        if (this.state.share_flag) {
            document.getElementById("wb").style.display = "none";
            document.getElementById("mask").style.display = "none";
            this.setState({
                share_flag: false
            })
        }
    }

    share = () => {
        if (!this.state.share_flag) {
            document.getElementById("wb").style.display = "block";
            document.getElementById("mask").style.display = "block";
            this.setState({
                share_flag: true
            })
        }
    };

    coll(a) {
        var newsMain = storage.getItem("newsId");
        var arr = [];
        var obj = {
            "id": a
        };
        if (newsMain) {
            arr = JSON.parse(newsMain)
        }
        var brr = [];
        arr.forEach(item => {
            brr.push(item['id'])
        });
        if (brr.indexOf(a) === -1) {
            arr.push(obj)
            this.setState({
                collImg: require('../img/coll_.png')
            })
        } else {
            arr.splice(brr.indexOf(a), 1)
            this.setState({
                collImg: require('../img/coll.jpg')
            })
        }
        storage.setItem('newsId', JSON.stringify(arr));
    }

    zan() {

        if (!this.state.zanTag) {
            document.getElementById('zan').style.color = '#ff2f40'
            this.setState({
                zanImg: require("../img/zan_.png"),
                zanTag: true,
                popularity: this.state.popularity + 1
            })
        } else {
            document.getElementById('zan').style.color = '#fff'
            this.setState({
                zanImg: require("../img/zan.jpg"),
                zanTag: false,
                popularity: this.state.popularity - 1
            })
        }
    }

    goback() {
        this.props.history.go(-1)
    }

    render() {
        console.log(this.state.colArr);
        return (
            <div style={{
                height: '100%'
            }
            }>
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
                            width: '.19rem',
                            height: '.18rem',
                            lineHeight: '.18rem',
                            float: 'left',
                            marginTop: '.18rem'
                        }}>
                            <img src={backImg} onClick={this.goback.bind(this)} alt="" style={{
                                width: '.19rem',
                                height: '.18rem',
                                verticalAlign: 'top',
                            }}/>
                            {/*<span style={{fontSize: '18px', color: '#fff', display: 'inline-block'}}>首页</span>*/}
                        </div>
                        <div style={{float: 'right', marginTop: '.18rem'}}>
                            <span id='zan' style={{
                                float: 'right',
                                color: '#fff'
                            }}>{this.state.popularity}</span>
                            <img src={this.state.zanImg} alt="" onClick={this.zan.bind(this)} style={{
                                float: 'right',
                                width: '.19rem',
                                height: '.18rem',
                                verticalAlign: 'top', marginRight: '.1rem', marginTop: '.02rem'
                            }}/>
                            <span style={{
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '.3rem',
                                verticalAlign: 'top',
                                color: '#fff'

                            }}>{this.state.comments}</span>
                            <NavLink to={
                                '/comment/' + this.state.id
                            }>
                                <img src={talkImg} alt="" style={{
                                    float: 'right',
                                    width: '.19rem',
                                    height: '.18rem',
                                    verticalAlign: 'top', marginTop: '.04rem', marginRight: '.1rem'
                                }}/>
                            </NavLink>

                            <img src={this.state.collImg} alt="" onClick={this.coll.bind(this, this.state.id)} style={{
                                float: 'right',
                                width: '.19rem',
                                height: '.21rem',
                                verticalAlign: 'top',
                                marginRight: '.4rem'
                            }}/>
                            <img src={recImg} onClick={this.share.bind(this)} alt="" style={{
                                float: 'right',
                                width: '.19rem',
                                height: '.18rem',
                                verticalAlign: 'top', marginRight: '.4rem', marginTop: '.02rem'
                            }}/>
                        </div>
                    </div>
                </nav>
                <div>
                    <div style={{position: 'relative', width: '100%', height: '2.124rem'}}>
                        <img src={this.state.img} alt="" style={{
                            width: "100%",
                            height: "2.124rem"
                        }}/>
                        <span style={{
                            display: 'block',
                            fontSize: '24px',
                            color: '#fff',
                            position: "absolute",
                            bottom: '30px',
                            left: '10px'

                        }}>{this.state.title}</span>
                        <span style={{
                            display: 'block',
                            color: '#a8a8a8',
                            fontSize: '14px',
                            position: "absolute",
                            bottom: '8px',
                            right: "5px"
                        }}
                        >{this.state.tag}</span>
                    </div>
                    <div id="Main">
                        {
                            this.state.body
                        }
                    </div>
                </div>
                <div id="mask" onClick={this.hide.bind(this)}>

                </div>
                <div id="wb">
                    <img src={wbImg} alt="" style={
                        {
                            width: '3.26rem',
                            height: '3.79rem'
                        }
                    }/>
                </div>
            </div>
        )
    }
}

export default Detail