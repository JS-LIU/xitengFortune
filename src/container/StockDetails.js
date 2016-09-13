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
        var detail = this.props.stockGameDetail.detail;
        console.log(detail);
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'猜猜',src:'/nav_btn_back@2x.png'}}/>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <StockGameDetail
                    stockGameDetail={detail}
                />
            </div>
        )
    }
});

var StockGameDetail = React.createClass({

    render: function () {
        var stockGameDetail = this.props.stockGameDetail;
        var stockCode = stockGameDetail.stockCode;

        if(stockCode == '000001'){
            var daily = "http://image.sinajs.cn/newchart/daily/n/sh"+stockCode+".gif";
        }else{
            var daily = "http://image.sinajs.cn/newchart/daily/n/sz"+stockCode+".gif";
        }

        return (
            <div >
                <ul>
                    <li>{stockGameDetail.stockModel.currentPoint}</li>
                    <li>{stockGameDetail.stockModel.chg}</li>
                    <li>{stockGameDetail.stockModel.changeRate}</li>
                    <li>昨收{this.props.stockGameDetail.stockModel.yesterDayClosed}</li>
                    <li>最高{stockGameDetail.stockModel.todayMaxPrice}</li>
                    <li>成交量{stockGameDetail.stockModel.turnoverStockAmount}</li>
                    <li>今开{stockGameDetail.stockModel.todayOpend}</li>
                    <li>最低{stockGameDetail.stockModel.todayMinPrice}</li>
                    <li>成交额{stockGameDetail.stockModel.turnoverStockMoney}</li>
                </ul>
                <img src={daily} alt="" className="w"/>
            </div>
        )
    }
});


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