/**
 * Created by LDQ on 2016/9/12.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

require('../css/stockDetailStyle.css');
import {storageActions} from '../redux/actions/storageActions'
import {stockGameDetailActions} from '../redux/actions/stockGameDetailActions'

var StockDetails = React.createClass({
    timer:{},
    componentWillMount:function(){
        var stockGameId = this.props.storage.stockGameId;
        this.props.stockGameDetailActionKeys.getStockDetail(stockGameId);
    },
    componentDidMount:function(){
        var time = 5000;
        var stockGameId = this.props.storage.stockGameId;
        this.timer = setInterval(()=>{
            this.props.stockGameDetailActionKeys.getStockDetail(stockGameId);
        },time);
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {

        return (
            <div>
                <Header >
                    <BackBtn back={{text:'猜猜',src:'/nav_btn_back@2x.png',link:'/Guess'}}/>
                    <Title title={{text:'喜腾'}} />
                </Header>
                <StockGameDetail
                    stockGameDetail={this.props.stockGameDetail.detail}
                    getStockKLine={this.props.stockGameDetailActionKeys.getStockKLine}
                    KLineTags={this.props.stockGameDetail.KLineTags}
                />
                <UpDownRate stockGameDetail={this.props.stockGameDetail.detail}/>
                <StockDetailFooter
                    storageActionKeys={this.props.storageActionKeys}
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
            <div className="pb15" style={stockDetailStyle}>
                <ul className="pl15 pr15 clearfix">
                    <li className="w">
                        <span>{stockGameDetail.stockModel.currentPoint}</span>
                        <span>{stockGameDetail.stockModel.chg}</span>
                        <span>{stockGameDetail.stockModel.changeRate}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>昨收</span>
                        <span className="pl5" style={stockDetailDateStyle}>{this.props.stockGameDetail.stockModel.yesterDayClosed}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>最高</span>
                        <span className="pl5" style={maxStockDateStyle}>{stockGameDetail.stockModel.todayMaxPrice}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListLongStyle}>
                        <span>成交量</span>
                        <span className="pl5" style={stockDetailDateStyle}>{stockGameDetail.stockModel.turnoverStockAmount}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>今开</span>
                        <span className="pl5" style={stockDetailDateStyle}>{stockGameDetail.stockModel.todayOpend}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListStyle}>
                        <span>最低</span>
                        <span className="pl5" style={minStockDateStyle}>{stockGameDetail.stockModel.todayMinPrice}</span>
                    </li>
                    <li className="fl tl" style={stockDetailListLongStyle}>
                        <span>成交额</span>
                        <span className="pl5" style={stockDetailDateStyle}>{stockGameDetail.stockModel.turnoverStockMoney}</span>
                    </li>
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

function selectTag(tags){
    let selectedTag = "";
    tags.map((tag,index)=>{
        tag.tagStyle = noSelectedStyle;
        if(tag.selected){
            tag.tagStyle = selectedStyle;
            selectedTag = tag.tag;
        }
    });
    return selectedTag;

}

var StockPic = React.createClass({
    componentWillMount:function(){
        selectTag(this.props.KLineTags);
    },

    cutKLineImg:function(index){
        return ()=>{
            this.props.getStockKLine(index);
            selectTag(this.props.KLineTags);
        }
    },
    render: function () {
        let KLineTags = this.props.KLineTags;
        let tag = selectTag(KLineTags);
        let src = "";
        if(this.props.stockCode == '000001'){
            src = "http://image.sinajs.cn/newchart/"+tag+"/n/sh"+this.props.stockCode+".gif";
        }else{
            src = "http://image.sinajs.cn/newchart/"+tag+"/n/sz"+this.props.stockCode+".gif";
        }
        var KLineTagNodes = KLineTags.map((tagItem,index)=>{
            return (
                <li className="fl tc"
                    key={index}
                    onClick={this.cutKLineImg(index)}
                    style={tagItem.tagStyle}
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
                <li className="mt30 f12 clearfix" >
                    <span className="fl">截止时间：{stockGameDetail.gameEndTime.slice(5)}</span>
                    <span className="fr">开奖时间：{stockGameDetail.gameStartTime.slice(5)}</span>
                </li>
            </ul>
        )
    }
});

var StockDetailFooter = React.createClass({
    setGuessType:function(guessType){
        return ()=>{
            this.props.storageActionKeys.setGuessType(guessType);
        }
    },

    render: function () {
        return (
            <ul className="footer w">
                <li className="guessBtn h tc red f20 ">
                    <Link to="/Bet" >
                        <span className="guessUp cfff" onClick={this.setGuessType(0)}>猜涨</span>
                    </Link>
                </li>
                <li className="guessBtn h tc f20 green ">
                    <Link to="/Bet" onClick={this.setGuessType(1)}>
                        <span className="guessDown cfff">猜跌</span>
                    </Link>
                </li>
            </ul>
        )
    }
});

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

const noSelectedStyle = {
    width:"25%",
    color:"#E2E2E2",
    background:"#24232B"
};
const selectedStyle = {
    width:"25%",
    color:"#FFF",
    background:"#2A2A32"
};

const stockDetailDateStyle = {
    color:"#FFF"
};
const maxStockDateStyle = {
    color:"#FF393A"
};
const minStockDateStyle = {
    color:"#02C56B"
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