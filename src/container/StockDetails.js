/**
 * Created by LDQ on 2016/9/12.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

import stockDetailStyle from '../css/stockDetailStyle.css';

import {storageActions} from '../redux/actions/storageActions'
import {stockGameDetailActions} from '../redux/actions/stockGameDetailActions'
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {stockGameActions} from '../redux/actions/stockGameActions';

var StockDetails = React.createClass({
    timer:{},
    componentWillMount:function(){
        var stockGameId = this.props.storage.stockGameId;
        this.props.stockGameDetailActionKeys.getStockDetail(stockGameId);
        this.props.historyUrlsActionKeys.pushUrl('/StockDetails');
        this.props.historyUrlsActionKeys.mark('/StockDetails');
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
            <div className={stockDetailStyle.stock_game_detail_body}>
                <StockGameDetail
                    stockGameDetail={this.props.stockGameDetail.detail}
                    getStockKLine={this.props.stockGameDetailActionKeys.getStockKLine}
                    KLineTags={this.props.stockGameDetail.KLineTags}
                />
                <UpDownRate
                    stockGameDetail={this.props.stockGameDetail.detail}
                    stockGameActionKeys={this.props.stockGameActionKeys}
                    countDown={this.props.stockGame.countDown}
                    gameTime={this.props.stockGame.gameTime}
                />

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
            <div className={stockDetailStyle.stockGameList} style={stockDetailAnotherStyle}>
                <ul className={stockDetailStyle.stock_game_detail_header}>
                    <li className={stockDetailStyle.stock_game_detail_header_title} style={stockGameDetail.stockModel.changeRate>0?cred:cgreen}>
                        <span className={stockDetailStyle.stock_game_detail_index}>{stockGameDetail.stockModel.currentPoint}</span>
                        <span className={stockDetailStyle.stock_game_detail_up_down_index}>{stockGameDetail.stockModel.changeRate>0?"+":""}{stockGameDetail.stockModel.chg}</span>
                        <span className={stockDetailStyle.stock_game_detail_up_down_rate}>{stockGameDetail.stockModel.changeRate>0?"+":""}{stockGameDetail.stockModel.changeRate}%</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>昨收</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num}>{this.props.stockGameDetail.stockModel.yesterDayClosed}</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>最高</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num_item} style={maxStockDateStyle}>{stockGameDetail.stockModel.todayMaxPrice}</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListLongStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>成交量</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num}>{stockGameDetail.stockModel.turnoverStockAmount}</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>今开</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num} style={stockDetailDateStyle}>{stockGameDetail.stockModel.todayOpend}</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>最低</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num_item} style={minStockDateStyle}>{stockGameDetail.stockModel.todayMinPrice}</span>
                    </li>
                    <li className={stockDetailStyle.stock_game_detail_header_detail} style={stockDetailListLongStyle}>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_title}>成交额</span>
                        <span className={stockDetailStyle.stock_game_detail_header_detail_num} style={stockDetailDateStyle}>{stockGameDetail.stockModel.turnoverStockMoney}</span>
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
            <div className={stockDetailStyle.stock_game_detail_pic_box} style={stockDetailPicStyle}>
                <ul className="clearfix" style={stockDetailHeader}>
                    {KLineTagNodes}
                </ul>
                <img src={src} alt="" className={stockDetailStyle.stock_game_detail_pic}/>
            </div>
        )
    }
});

var UpDownRate = React.createClass({
    timer:function(){
        setInterval(()=>{
            this.props.stockGameActionKeys.countDown(
                new Date(),
                this.props.gameTime.startTime,
                this.props.gameTime.endTime
            );
        },1000);
    },
    componentWillMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {

        var stockGameDetail = this.props.stockGameDetail;
        return (
            <ul className={stockDetailStyle.stock_game_detail_info_box}>
                <li className={stockDetailStyle.stock_game_detail_info}>
                    <span>{stockGameDetail.stockGameName}{stockGameDetail.stage}期</span>
                    <span className={stockDetailStyle.stock_game_detail_open_time}>开奖时间{stockGameDetail.comesTime}</span>
                </li>
                <li className={stockDetailStyle.stock_game_detail_end_time}>
                    <span className={stockDetailStyle.stock_game_detail_count_down_icon}>截止投注:{this.props.countDown.countDownTime}</span>
                </li>
                <li className={stockDetailStyle.stock_game_detail_guess_up_down_statistics}>
                    <div className={stockDetailStyle.stock_game_detail_guess_up}>
                        <div className={stockDetailStyle.stock_game_detail_guess_up_cow}>{stockGameDetail.guessUpRate}</div>
                        <div className={stockDetailStyle.stock_game_detail_guess_up_line}>
                            <span>看涨：</span>
                            <span className={stockDetailStyle.black_xt_money}>{stockGameDetail.guessUpXtBAmount}</span>
                        </div>
                    </div>
                    <div className={stockDetailStyle.stock_game_detail_guess_down}>
                        <div className={stockDetailStyle.stock_game_detail_guess_down_bear}>{stockGameDetail.guessDownRate}</div>
                        <div className={stockDetailStyle.stock_game_detail_guess_down_line}>
                            <span>看跌：</span>
                            <span className={stockDetailStyle.black_xt_money}>{stockGameDetail.guessDownXtBAmount}</span>
                        </div>
                    </div>
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
            <ul className={stockDetailStyle.footer_guess}>
                <li className={stockDetailStyle.guessBtn}>
                    <Link to="/Bet" onClick={this.setGuessType(0)} className={stockDetailStyle.red}>
                        <span className={stockDetailStyle.guessUp}>猜涨投注</span>
                    </Link>
                </li>
                <li className={stockDetailStyle.guessBtn}>
                    <Link to="/Bet" onClick={this.setGuessType(1)} className={stockDetailStyle.green}>
                        <span className={stockDetailStyle.guessDown}>猜跌投注</span>
                    </Link>
                </li>
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        stockGameDetail:state.stockGameDetail,
        storage:state.storage,
        historyUrls:state.historyUrls,
        stockGame:state.stockGame
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameDetailActionKeys:bindActionCreators(stockGameDetailActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys:bindActionCreators(historyUrlsActions,dispatch),
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch)
    }
}
module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockDetails);

const stockDetailAnotherStyle = {
    paddingBottom:"0.42rem",
    background:"#24232B"
};
const cred = {
    color:"#FF4242"
};
const cgreen = {
    color:"#03c56c"
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
    background:'url("/xitenggame/xitengWapApp/src/images/flag_red@2x.png") no-repeat left center',
    backgroundSize:'15px',
    paddingLeft:'20px',
    color:"#DE3031"
};
const guessDownRateStyle = {
    background:'url("/xitenggame/xitengWapApp/src/images/flag_green@2x.png") no-repeat left center',
    backgroundSize:'15px',
    paddingLeft:'20px',
    color:"#03C56C"
};

const guessUpXtBAmountStyle = {
    width:"45%",
    height:"33px",
    lineHeight:"33px",
    color:"#FFF",
    background:'url("/xitenggame/xitengWapApp/src/images//red@2x.png") no-repeat center',
    backgroundSize:"contain"
};

const guessDownXtBAmountStyle = {
    width:"45%",
    height:"33px",
    lineHeight:"33px",
    color:"#FFF",
    background:'url("/xitenggame/xitengWapApp/src/images//green@2x.png") no-repeat center',
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