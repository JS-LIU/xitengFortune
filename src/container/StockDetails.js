/**
 * Created by LDQ on 2016/9/12.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

import {storageActions} from '../redux/actions/storageActions'
import {stockGameDetailActions} from '../redux/actions/stockGameDetailActions'

var StockDetails = React.createClass({
    componentWillMount:function(){
        this.props.storageActionKeys.getStockGameId();
        var stockGameId = this.props.storage.stockGameId;
        this.props.stockGameDetailActionKeys.getStockDetail(stockGameId);
    },
    render: function () {

        return (
            <div>
                <Header >
                    <BackBtn back={{text:'猜猜',src:'/nav_btn_back@2x.png'}}/>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <StockGameDetail
                    stockGameDetail={this.props.stockGameDetail.detail}
                    getStockKLine={this.props.stockGameDetailActionKeys.getStockKLine}
                    kLineImg={this.props.stockGameDetail.kLineImg}
                />
            </div>
        )
    }
});

var StockGameDetail = React.createClass({

    render: function () {
        var stockGameDetail = this.props.stockGameDetail;
        var stockCode = stockGameDetail.stockCode;
        return (
            <div >
                <ul className="pl15 pr15 clearfix f14">
                    <li className="w">
                        <span>{stockGameDetail.stockModel.currentPoint}</span>
                        <span>{stockGameDetail.stockModel.chg}</span>
                        <span>{stockGameDetail.stockModel.changeRate}</span>
                    </li>
                    <li className="fl tl" style={stockDetailList}>昨收{this.props.stockGameDetail.stockModel.yesterDayClosed}</li>
                    <li className="fl tl" style={stockDetailList}>最高{stockGameDetail.stockModel.todayMaxPrice}</li>
                    <li className="fl tl" style={stockDetailList}>成交量{stockGameDetail.stockModel.turnoverStockAmount}</li>
                    <li className="fl tl" style={stockDetailList}>今开{stockGameDetail.stockModel.todayOpend}</li>
                    <li className="fl tl" style={stockDetailList}>最低{stockGameDetail.stockModel.todayMinPrice}</li>
                    <li className="fl tl" style={stockDetailList}>成交额{stockGameDetail.stockModel.turnoverStockMoney}</li>
                </ul>
                <StockPic
                    stockCode={stockCode}
                    kLineImg={this.props.kLineImg}
                    getStockKLine={this.props.getStockKLine}
                />
                {/*<img src={} alt="" className="w"/>*/}
            </div>
        )
    }
});

var StockPic = React.createClass({

    cutKLineImg:function(str){
        var kLineImg = str;
        var self = this;
        return function(){
            self.props.getStockKLine(kLineImg);
        }
    },
    render: function () {
        var src = '';
        var kLineImg = this.props.kLineImg;

        if(this.props.stockCode == '000001'){
            src = "http://image.sinajs.cn/newchart/"+kLineImg+"/n/sh"+this.props.stockCode+".gif";
        }else{
            src = "http://image.sinajs.cn/newchart/"+kLineImg+"/n/sz"+this.props.stockCode+".gif";
        }

        return (
            <div>
                <ul>
                    <li onClick={this.cutKLineImg("min")}>分时</li>
                    <li onClick={this.cutKLineImg("daily")}>日K</li>
                    <li onClick={this.cutKLineImg("weekly")}>周K</li>
                    <li onClick={this.cutKLineImg("monthly")}>月K</li>
                </ul>
                <img src={src} alt="" className="w"/>
            </div>
        )
    }
});


const stockDetailList = {
    width:"33.3%"

};



function mapStatetoProps(state){
    return {
        stockGameDetail:state.stockGameDetail,
        storage:state.storage,

    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameDetailActionKeys:bindActionCreators(stockGameDetailActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockDetails);