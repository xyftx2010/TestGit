import {Dispatcher} from "flux"
import EventEmitter from "events"


class State extends EventEmitter{
    name="初始数据"
    age=99
    colArr=[]
}
var state = new State() ;
var dispatcher  = new Dispatcher();
dispatcher.register((a)=>{
    switch(a.actionType){
        case "changeName" :
            state.name=a.actionParams;
            state.emit('change');
            break;
        case "changeAge" :
            state.age=a.actionParams;
            state.emit('change');
            break;
        case "changeArr" :
            state.colArr=a.actionParams;
            state.emit('change');
            break;
    }
});
export default {
    state,
    dispatcher
}