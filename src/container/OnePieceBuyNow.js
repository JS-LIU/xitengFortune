/**
 * Created by LDQ on 2016/12/28.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

import onePieceBuyNowStyle from '../css/onePieceBuyNowStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';
import {storageActions} from '../redux/actions/storageActions';


var OnePieceBuyNow = React.createClass({
    setPurchaseGameCount:function(purchaseGameCount){
        return ()=>{

            var counts = purchaseGameCount||this.refs.counts.value;
            if(!isNaN(counts)){
                counts = Math.abs(counts);
            }
            this.props.purchaseGameActionKeys.setPurchaseOrderCount(counts);
        }
    },
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceBuyNow');

    },
    render: function () {
        return (
            <div className={onePieceBuyNowStyle.onePiece_order_wrap}>
                <div className={onePieceBuyNowStyle.onePiece_order_productInfo}>
                    <div className={onePieceBuyNowStyle.onePiece_order_productInfo_pic}>
                        <img src={this.props.purchaseGame.detail.picUrl} alt="" className="w h"/>
                    </div>
                    <ul className={onePieceBuyNowStyle.onePiece_order_productInfo_detail}>
                        <li className={onePieceBuyNowStyle.onePiece_order_product_name}>{this.props.purchaseGame.detail.productName}</li>
                        <li>期数：{this.props.purchaseGame.detail.stage}</li>
                        <li>剩余：{this.props.purchaseGame.detail.restPurchaseCount}</li>
                    </ul>
                </div>

                <ul className={onePieceBuyNowStyle.onePiece_order_much}>
                    <li className={onePieceBuyNowStyle.onePiece_order_buy_much}>
                        <span>参与份数</span>
                        <div className={onePieceBuyNowStyle.onePiece_order_ctrl}>
                            <div className={onePieceBuyNowStyle.onePiece_order_ctrl_reduce} onClick={this.setPurchaseGameCount(parseInt(this.props.purchaseGame.order.purchaseGameCount)-1)}>-</div>
                            <input type="number"
                                   className="tc"
                                   ref="counts"
                                   value={this.props.purchaseGame.order.purchaseGameCount}
                                   onChange={this.setPurchaseGameCount()}/>
                            <div className={onePieceBuyNowStyle.onePiece_order_ctrl_add} onClick={this.setPurchaseGameCount(parseInt(this.props.purchaseGame.order.purchaseGameCount)+1)}>+</div>
                        </div>
                    </li>
                    <li>
                        <ul className={onePieceBuyNowStyle.onePiece_order_buy_much_select_list}>
                            <li className="tc" onClick={this.setPurchaseGameCount(5)}>5</li>
                            <li className="tc" onClick={this.setPurchaseGameCount(20)}>20</li>
                            <li className="tc" onClick={this.setPurchaseGameCount(50)}>50</li>
                            <li className="tc" onClick={this.setPurchaseGameCount(100)}>100</li>
                            <li className="tc" onClick={this.setPurchaseGameCount(this.props.purchaseGame.detail.restPurchaseCount)}>包尾</li>
                        </ul>
                    </li>
                    <li className={onePieceBuyNowStyle.onePiece_order_buy_money}>
                        <span>合计：</span>
                        <span className={onePieceBuyNowStyle.red_money}>{this.props.purchaseGame.detail.priceOfOneBidInRmb * this.props.purchaseGame.order.purchaseGameCount}</span>
                    </li>
                </ul>
                <Link to="/OnePieceConfirmOrder" className={onePieceBuyNowStyle.onePiece_confirm_btn}>立即参与</Link>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        purchaseGame:state.purchaseGame
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceBuyNow);