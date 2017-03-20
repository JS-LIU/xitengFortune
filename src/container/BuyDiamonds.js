/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');


require("../css/diamondsStyle.css");

import {accountActions} from '../redux/actions/accountActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';
import {createTradeOrderActions} from '../redux/actions/createTradeOrderActions';
import {diamondsActions} from '../redux/actions/diamondsActions';

var BuyDiamonds = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/BuyDiamonds');
        this.props.diamondsActionKeys.selectedDiamonds(0);
        this.props.historyUrlsActionKeys.mark('/BuyDiamonds');
        console.log('BuyDiamonds-componentWillMount-',this.props.historyUrls);
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

        this.props.createTradeOrderActionKeys.createTradeOrder(this.props.diamonds.amount);
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
                    className="diamond"
                    key={index}
                    onClick={this.selectedDiamonds(index)}
                    style={item.selected?diamonds_selected:{}}>
                    <p className="diamond_count f16 cblue tc pr">{item.amount}颗</p>
                </li>
            )
        });
        return (
            <div className="buyDiaPage">
                <div className="defAcount">
                    <span>购买数量：</span>
                    <input
                        type="text"
                        placeholder="填写/选择钻石数量"
                        className="tr pr5 defAcount_input"
                        onKeyUp={this.inputPrice}
                    />
                    <span>颗</span>
                </div>
                <ul className="diamonds_list">
                    {diamondsNodes}
                </ul>
                <div className="tc buy_diamonds_btn" onClick={this.buyDiamonds}>
                    <Link to="/Pay" className="cfff f16">
                        立即购买
                    </Link>
                </div>
                <p className="parities tc w">(钻石价格：￥1 /颗)</p>
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
        createTradeOrderActionKeys: bindActionCreators(createTradeOrderActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(BuyDiamonds);


const diamonds_selected = {
    border:"1px solid #FF4242"
};

