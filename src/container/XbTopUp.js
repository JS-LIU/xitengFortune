/**
 * Created by zhangxin on 3/20 0020.
 */
//喜币充值页
import React,{Component}from 'react';
import { render } from 'react-dom';
require('../css/xbTopUp.css');


//套餐数量控件
class CountPart extends Component{
    constructor(props){
        super(props)
    }
    render(){
       return(
           <div>
                <span>{this.props.text}</span>
           </div>
       )
    }
}
class DiaAcount extends Component{
    render(){
        const acount = [1,10,100];
        const diaAcount = acount.map((num,index) =>
            <li key={index} className="xiTopUp_bg">
                <div >
                    <p><img src="" alt=""/>{12*num}</p>
                </div>
                <p>{num}钻石</p>
            </li>
        )
        return(
            <div>
                <ul>
                    {diaAcount}
                </ul>
            </div>
        )
    }
}
class XbTopUp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>选择套餐</p>
                <DiaAcount/>
                <CountPart/>
                <p className="tr">
                    <span>充值：</span>
                    <span className="tr">{}喜币</span>
                </p>
                <p className="tr">
                    <span>应付：</span>
                    <span className="tr">{}钻石</span>
                </p>
                <SureBtn text="立即充值"/>
            </div>
        )
    }
}


//页面确认按钮控件
class SureBtn extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="sureBtn">
                {this.props.text}
            </div>
        )
    }
}


module.exports = XbTopUp;

































