/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');


import diamondsStyle from "../css/diamondsStyle.css";

import {accountActions} from '../redux/actions/accountActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';
import {createTradeOrderActions} from '../redux/actions/createTradeOrderActions';
import {diamondsActions} from '../redux/actions/diamondsActions';

//  todo 测试使用 提交时删除
import {loginInfoActions} from '../redux/actions/loginInfoActions';

var BuyDiamonds = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/BuyDiamonds');
        this.props.diamondsActionKeys.selectedDiamonds(0);
        this.props.historyUrlsActionKeys.mark('/BuyDiamonds');

        //  todo 测试使用 提交时删除
        this.props.loginInfoActionKeys.phoneNumLogin('18801233565','123456');
    },
    render: function () {
        return (
            <div>
                <PruductItems
                    diamonds={this.props.diamonds}
                    createTradeOrderActionKeys={this.props.createTradeOrderActionKeys}
                    diamondsActionKeys={this.props.diamondsActionKeys}
                />
            </div>
        )
    }
});

var PruductItems = React.createClass({

    buyDiamonds:function(){

        // this.props.createTradeOrderActionKeys.createTradeOrder(this.props.diamonds.amount);
        this.props.createTradeOrderActionKeys.createTradeOrder('/createTradeOrder');
    },
    selectedDiamonds:function(index){
        return ()=>{
            $('.J_customPrince').val("");
            this.props.diamondsActionKeys.clearSelected();
            this.props.diamondsActionKeys.selectedDiamonds(index);
        }
    },
    selectedCustom:function(){
        this.props.diamondsActionKeys.clearSelected();
    },
    inputPrice:function(){
        this.props.diamondsActionKeys.setAmount(parseInt($('.J_customPrince').val()));
    },
    render: function () {

        var diamondsNodes = this.props.diamonds.diamondList.map((item,index)=>{
            return(
                <li
                    className={diamondsStyle.diamond}
                    key={index}
                    onClick={this.selectedDiamonds(index)}
                    style={item.selected?diamonds_selected:{}}>
                    <p className={diamondsStyle.diamond_count}>
                        <span className={diamondsStyle.diamond_num}>{item.amount}</span>
                        <span className={diamondsStyle.diamond_unit}>颗</span>
                    </p>
                </li>
            )
        });
        return (
            <div className={diamondsStyle.buyDiaPage}>
                <div className={diamondsStyle.defAcount}>
                    <span>购买数量：</span>
                    <input
                        type="text"
                        placeholder="填写/选择钻石数量"
                        className={diamondsStyle.defAcount_input}
                        onKeyUp={this.inputPrice}
                    />
                    <span>颗</span>
                </div>
                <ul className={diamondsStyle.diamonds_list}>
                    {diamondsNodes}
                </ul>
                <div className={diamondsStyle.buy_diamonds_btn} onClick={this.buyDiamonds}>
                    <Link to="/Pay" className={diamondsStyle.buy_diamonds_text}>
                        立即购买
                    </Link>
                </div>
                <p className={diamondsStyle.parities}>(钻石价格：￥1 /颗)</p>
            </div>

        )
    }
});



function mapStatetoProps(state){
    return {
        account:state.account,
        historyUrls:state.historyUrls,
        diamonds:state.diamonds,
        storage:state.storage,
    }
}
function mapDispatchToProps(dispatch){

    return{
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        diamondsActionKeys : bindActionCreators(diamondsActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        createTradeOrderActionKeys: bindActionCreators(createTradeOrderActions,dispatch),
        //  todo 测试使用 提交时删除
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(BuyDiamonds);


const diamonds_selected = {
    border:"1px solid #FF4242"
};

