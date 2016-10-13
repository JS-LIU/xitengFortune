/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require("../css/diamondsStyle.css");

import {accountActions} from '../redux/actions/accountActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';
import {createTradeOrderActions} from '../redux/actions/createTradeOrderActions';

var BuyDiamonds = React.createClass({

    componentWillMount:function(){
        this.props.diamondsActionKeys.getDiamonds();
        this.props.accountActionKeys.getAccount();
        this.props.historyUrlsActionKeys.pushUrl('/BuyDiamonds');
    },
    render: function () {
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:this.props.historyUrls.last}}
                    />
                    <Title title={{text:'购买钻石'}}></Title>
                </Header>
                <div className="pt15 pl15">
                    <span className="c000">钻石余额：</span>
                    <span className="cred">{this.props.account.diamondAmount||0}</span>
                    <span className="c000">颗</span>
                    <span>(钻石兑换喜腾币为1:12)</span>
                </div>

                <PruductItems
                    diamondList={this.props.diamonds.diamondList}
                    setProductId={this.props.storageActionKeys.setProductId}
                    createTradeOrderActionKeys={this.props.createTradeOrderActionKeys}
                    userInfo={this.props.userInfo}
                />
            </div>
        )
    }
});

var PruductItems = React.createClass({

    buyDiamonds:function(item){
        return ()=>{
            this.props.createTradeOrderActionKeys.createTradeOrder(item,2,1)
        }
    },

    render: function () {

        var diamondsNodes = this.props.diamondList.map((item,index)=>{
            return(
                <li className="diamond mr15 mt10 fl" key={index}>
                    <div className="diamond_count pr">
                        <img src={item.picture} alt="" className="diamond_pic po w h"/>
                        <p className="pt20 f16 cred tc pr">{item.diamondCount}颗钻</p>
                    </div>
                    <div className="pb10">
                        <p className="price pl10">
                            <span className="cred">￥</span>
                            <span className="f16 cred">{item.price / 100}</span>
                            <span className="tag cfff ml10">{item.tagName}</span>
                            <span className="cblue pl10">{(item.giveDiamondCount==0)?"":"赠送"+item.giveDiamondCount+"颗钻石"}</span>
                        </p>
                        <Link to={this.props.userInfo.logIn?"/Pay":"/Login"} className="buy_btn f16 cred tc" onClick={this.buyDiamonds(item)}>立即购买</Link>
                    </div>
                </li>
            )
        });
        return (
            <ul className="diamonds_list ml15 clearfix">
                {diamondsNodes}
            </ul>
        )
    }
});



function mapStatetoProps(state){
    return {
        account:state.account,
        historyUrls:state.historyUrls,
        diamonds:state.diamonds,
        storage:state.storage,
        userInfo:state.userInfo
    }
}
function mapDispatchToProps(dispatch){

    return{
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        diamondsActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        createTradeOrderActionKeys: bindActionCreators(createTradeOrderActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(BuyDiamonds);