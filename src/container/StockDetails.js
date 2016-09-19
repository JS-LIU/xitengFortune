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
                    KLineTags={this.props.stockGameDetail.KLineTags}
                />
                <UpDownRate stockGameDetail={this.props.stockGameDetail.detail}/>
            </div>
        )
    }
});

var StockGameDetail = React.createClass({

    render: function () {
        var stockGameDetail = this.props.stockGameDetail;
        var stockCode = stockGameDetail.stockCode;
        return (
            <div className="pb15" style={stockDetailStyle}>
                <ul className="pl15 pr15 clearfix">
                    <li className="w">
                        <span>{stockGameDetail.stockModel.currentPoint}</span>
                        <span>{stockGameDetail.stockModel.chg}</span>
                        <span>{stockGameDetail.stockModel.changeRate}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>昨收</span>
                        <span className="pl5">{this.props.stockGameDetail.stockModel.yesterDayClosed}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>最高</span>
                        <span className="pl5">{stockGameDetail.stockModel.todayMaxPrice}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListLongStyle}>
                        <span>成交量</span>
                        <span className="pl5">{stockGameDetail.stockModel.turnoverStockAmount}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>今开</span>
                        <span className="pl5">{stockGameDetail.stockModel.todayOpend}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>最低{stockGameDetail.stockModel.todayMinPrice}</li>
                    <li className="fl tl" style={stockDetailListLongStyle}>成交额{stockGameDetail.stockModel.turnoverStockMoney}</li>
                </ul>
                <StockPic
                    stockCode={stockCode}
                    KLineTags={this.props.KLineTags}
                    getStockKLine={this.props.getStockKLine}
                />
            </div>
        )
    }
});

var StockPic = React.createClass({

    cutKLineImg:function(index){
        var index = index;
        return function(){
            console.log(index);
            // self.props.getStockKLine(kLineImg);
        }
    },
    render: function () {
        var src = '';
        var KLineTags = this.props.KLineTags;
        console.log(KLineTags);
        // if(this.props.stockCode == '000001'){
        //     src = "http://image.sinajs.cn/newchart/"+KLineTags+"/n/sh"+this.props.stockCode+".gif";
        // }else{
        //     src = "http://image.sinajs.cn/newchart/"+KLineTags+"/n/sz"+this.props.stockCode+".gif";
        // }
        var KLineTagNodes = KLineTags.map((tagItem,index)=>{
            return (
                <li className="fl tc"
                    key={index}
                    onClick={this.cutKLineImg(index)}
                    style={stockDetailHeaderItem}
                    >{tagItem.tagTitle}</li>
            )
        });

        return (
            <div className="m15" style={stockDetailPicStyle}>
                <ul className="clearfix" style={stockDetailHeader}>
                    {KLineTagNodes}
                </ul>
                <img src={src} alt="" className="w"/>
            </div>
        )
    }
});

var UpDownRate = React.createClass({
    render: function () {

        var stockGameDetail = this.props.stockGameDetail;

        return (
            <ul className="m15 f14">
               <li className="clearfix" style={guessUpDownRateStyle}>
                   <span className="fl" style={guessUpRateStyle}>看涨：{stockGameDetail.guessUpRate}</span>
                   <span className="fr" style={guessDownRateStyle}>看跌：{stockGameDetail.guessDownRate}</span>
               </li>
                <li className="clearfix">
                    <div className="fl tc" style={guessUpXtBAmountStyle}>合计：{stockGameDetail.guessUpXtBAmount}XT币</div>
                    <div className="fl tc fb f20" style={vsStyle}>vs</div>
                    <div className="fr tc" style={guessDownXtBAmountStyle}>合计：{stockGameDetail.guessDownXtBAmount}XT币</div>
                </li>
                <li className="mt30 f12" >
                    <span>截止时间：{stockGameDetail.gameEndTime}</span>
                    <span>开奖时间：{stockGameDetail.gameStartTime}</span>
                </li>
            </ul>
        )
    }
});
module.exports = UpDownRate;

const stockDetailStyle = {
    background:"#24232B",

};
const stockDetailListStyle = {
    width:"30%",
    lineHeight:"30px"
};
const stockDetailListLongStyle = {
    width:"40%",
    lineHeight:"30px"
};
const stockDetailPicStyle = {
    border:"1px solid #E2E2E2"
};

const stockDetailHeader = {
    height:"40px",
    lineHeight:"40px",
    borderBottom:"1px solid #E2E2E2"
};

const stockDetailHeaderItem = {
    width:"25%"
};
const guessUpDownRateStyle = {
    lineHeight:"40px"
};
const guessUpRateStyle = {
    background:'url("/flag_red@2x.png") no-repeat left center',
    backgroundSize:'15px',
    paddingLeft:'20px',
    color:"#DE3031"
};
const guessDownRateStyle = {
    background:'url("/flag_green@2x.png") no-repeat left center',
    backgroundSize:'15px',
    paddingLeft:'20px',
    color:"#03C56C"
};

const guessUpXtBAmountStyle = {
    width:"45%",
    height:"33px",
    lineHeight:"33px",
    color:"#FFF",
    background:'url("/red@2x.png") no-repeat center',
    backgroundSize:"contain"
};

const guessDownXtBAmountStyle = {
    width:"45%",
    height:"33px",
    lineHeight:"33px",
    color:"#FFF",
    background:'url("/green@2x.png") no-repeat center',
    backgroundSize:"contain"
};
const vsStyle = {
    width:"10%",
    color:"#EFB800"
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