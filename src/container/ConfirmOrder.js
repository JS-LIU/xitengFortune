/**
 * Created by LDQ on 2016/10/18.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

require('../css/submitOrderStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {addressActions} from '../redux/actions/addressActions';

var ConfirmOrder = React.createClass({

    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/SubmitOrder');
        this.props.addressActionKeys.getDefault();
    },
    render:function(){
        return(
            <div className="cart_body f5f5f5 po w">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:'/ShoppingCart'}}
                    />
                    <Title title={{text:'确认订单'}}></Title>
                </Header>
                <ul className="order_def_address pl15">
                    <li className="order_user_info">
                        <p className="order_user_name ">
                            <span className="f16">收货人：</span>
                            <span>{this.props.address.currentAddress.userName}</span>
                        </p>
                        <p className="order_user_mobile pr15">
                            {this.props.address.currentAddress.mobile}
                        </p>
                    </li>
                    <li className="order_user_address">
                        <span className="f16">送货地址：</span>

                    </li>

                </ul>

                <div className="cart_footer f16 w">
                    <span className="ml15">合计：{this.props.shoppingCart.realCount / 100}</span>
                    <Link to="/Pay" className="cart_payment_btn fr cfff f20 tc">提交订单</Link>
                </div>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        address:state.address
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ConfirmOrder);