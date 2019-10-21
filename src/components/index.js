import React from 'react'
import $ from 'jquery'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {Carousel, WingBlank} from 'antd-mobile'
import indexImg from '../img/index.jpg'
import msgImg from '../img/msg.jpg'
import moreImg from '../img/more.jpg'
import loginImg from '../img/login.jpg'
import collImg from '../img/coll.jpg'
import homeImg from '../img/home.jpg'
import 'antd-mobile/dist/antd-mobile.css'
class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            imgHeight: 176,
            msg: [],
            banner: [],
            date: 0,
            oldmsg: [],
            scrollHeight: 0,
            hasMore: true,// 判断接口是否还有数据，通过接口设置
            dataList:[], // 数据列表
            data: ['1', '2', '3'],
            homeTag:false,
            newDate:''
        }
    }
    hideHome(){
        if (this.state.homeTag){
            $('#login').css('left','-319px');
            $('#loginMask').hide();
            this.setState({
                homeTag:false
            })
        }
    }
    showHome(){
        console.log(this);
        if (!this.state.homeTag){
            $('#login').show().css('left','0px');
            $('#loginMask').show();
            this.setState({
                homeTag:true
            })
        }
    }
    handleScroll=()=>{
        console.log(window.scrollY);
        console.log($('#bodyMain').offset().top);
        console.log($("#bodyMain").resize()[0].clientHeight);
        console.log(this.state.date);
        const _this= this;
        if (window.scrollY>=($("#bodyMain").resize()[0].clientHeight-$('#bodyMain').offset().top-20)){
                axios.get('api/4/news/before/' + this.state.date + '').then((res) => {
                    // console.log(res.data.stories);
                    _this.state.oldmsg.push(res.data);
                    _this.setState({
                        date: res.data.date,
                        oldmsg: _this.state.oldmsg
                    })
                });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        console.log($('#bodyMain').offset().top);
        console.log($("#bodyMain").resize()[0].clientHeight);
        console.log(document.documentElement.scrollTop);
        axios.get('/api/4/news/latest').then((res) => {
            this.setState({
                msg: res.data.stories,
                banner: res.data.top_stories,
                date: parseInt(res.data.date),
            });
        });
        if ($('#bodyMain').offset().top<100){
            axios.get('/api/4/news/latest').then((res)=> {
                console.log(this);
                this.setState({
                    msg: res.data.stories,
                    banner: res.data.top_stories,
                    date: parseInt(res.data.date),
                });
                let newDate = parseInt(res.data.date);
                axios.get('api/4/news/before/' + newDate + '').then((res) => {
                    // console.log(res.data.stories);
                    this.state.oldmsg.push(res.data);
                    newDate = parseInt(res.data.date);
                    this.setState({
                        date: res.data.date,
                        oldmsg: this.state.oldmsg
                    })
                });
            });
        }
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    render() {
        const {scrollHeight} = this.state;

        function getweek(b) {
            var arys1 = new Array();
            // var c = b.slice(6)+"20"+b.slice(0);
            var d = b.slice(0,4)+"-"+b.slice(4,6)+"-"+b.slice(6,8);
            // console.log(b);
            arys1 = d.split('-');
            //日期为输入日期，格式为 2019-10-15
            var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
            var  week1=String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")
            var week="星期"+week1;
            return week
        }
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
                            width: '.91rem',
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
                            <span style={{fontSize: '18px', color: '#fff', display: 'inline-block'}}>首页</span>
                        </div>
                        <div style={{float: 'right', marginTop: '.18rem'}}>
                            <img src={moreImg} alt=""
                                 style={{float: 'right', width: '.05rem', height: '.18rem', verticalAlign: 'top'}}/>
                            <img src={msgImg} alt="" style={{
                                float: 'right',
                                width: '.18rem',
                                height: '.21rem',
                                verticalAlign: 'top',
                                marginRight: '.36rem'
                            }}/>

                        </div>
                    </div>

                </nav>
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        frameOverflow='hidden'
                        slideWidth="375px"
                    >
                        {this.state.banner.map((v, i) => (
                            <NavLink
                                key={i}
                                to={
                                    '/detail/'+v.id
                                }
                                style={{display: 'inline-block', width: '3.75rem', height: this.state.imgHeight}}
                                nid={v.id}
                            >
                                <span style={{
                                    position: "absolute",
                                    bottom: '.17rem',
                                    padding: '0px 17px',
                                    color: '#fff',
                                    fontSize: '22px'
                                }}>{v.title}</span>
                                <img
                                    src={v.image}
                                    alt=""
                                    style={{width: '3.75rem', verticalAlign: 'top', height: '2.355rem'}}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({imgHeight: 'auto'});
                                    }}
                                />
                            </NavLink>
                        ))}
                    </Carousel>
                </WingBlank>
                <div id='bodyMain' style={{padding: '.19rem .08rem', background: '#f3f3f3', }}>
                    <div ref={this.saveRef}>
                        <div>
                            <h2 style={{
                                color: '#767676',
                                fontSize: '14px',
                                paddingLeft: '.08rem',
                                marginBottom: '.21rem'
                            }}>今日新闻</h2>
                            <ul>
                                {
                                    this.state.msg.map((v, i) => {
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
                                                '/detail/'+v.id
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
                                                <img src={v.images[0]} alt=""
                                                     style={{verticalAlign: 'top', width: '.861rem', height: '.756rem'}}/>
                                            </NavLink>

                                        </li>
                                    })
                                }

                            </ul>
                        </div>

                            {
                                this.state.oldmsg.map((v, i) => {
                                    // console.log(v.date);
                                    return <div key={i}>
                                        <h2 style={{
                                            color: '#767676',
                                            fontSize: '14px',
                                            paddingLeft: '.08rem',
                                            marginBottom: '.21rem',
                                            marginTop:'.19rem'
                                        }}>{
                                            v.date.substr(4,4).slice(0,2)+'月'+v.date.substr(4,4).slice(2)+"日"+" "+getweek(v.date)
                                        }</h2>
                                        <ul>
                                            {
                                                this.state.oldmsg ? this.state.oldmsg[i].stories.map((val, ind) => {
                                                    // console.log(val);
                                                    return <li key={ind} style={{
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
                                                        key={ind}
                                                        to={
                                                            '/detail/'+val.id}
                                                        >
                                                            <h2 style={{
                                                                display: 'inline-block',
                                                                verticalAlign: 'top',
                                                                width: '2.27rem',
                                                                fontSize: '16px',
                                                                fontWeight: 'bold',
                                                                marginRight: '.1rem'
                                                            }}>
                                                                {val.title}
                                                            </h2>
                                                            <img src={val.images[0]} alt="" style={{
                                                                verticalAlign: 'top',
                                                                width: '.861rem',
                                                                height: '.756rem'
                                                            }}/>
                                                        </NavLink>

                                                    </li>
                                                }) : "暂无数据"
                                            }
                                        </ul>
                                    </div>

                                })
                            }


                    </div>
                </div>
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
                            <div style={{
                                position:"absolute",
                                bottom:'0px'
                            }}>
                                <NavLink to='/collect'>
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
                                    >我的收藏</h3>
                                </NavLink>

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
                        <div onClick={this.hideHome.bind(this)} style={{
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
                    </div>
                </div>
            </div>

        );


    }
}

export default Index