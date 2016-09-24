/**
 * Created by LDQ on 2016/9/21.
 */
/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import {storageActions} from '../redux/actions/storageActions';
var {Header,BackBtn,Title} = require('../components/Header');

require('../css/betStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';

var Bet = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Bet');
        console.log(this.props.storage);
    },
    render: function () {

        return (
            <div>
                <Header historyUrls={this.props.historyUrls}
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        back={{text:'取消',src:'/nav_btn_back@2x.png',link:'/StockDetails'}}
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}/>
                    <Title title={{text:'投注'}} />
                </Header>
                <div className="center po w">
                    <img src="/lg_light1@2x.png" alt="" className="bgLight po"/>
                    <BetHeader />
                    <div className="betBtn po tc f16 w">立即投注</div>
                </div>
            </div>
        )
    }
});

var BetHeader = React.createClass({
    render: function () {
        return (
            <ul className="bet_header">
                <li className="bet_header_item tc">
                    <span>上证指数</span>
                    <span>1888期</span>
                </li>
                <li className="bet_header_item tc">
                    <span>猜涨</span>
                    <span>投注</span>
                </li>
            </ul>
        )
    }
});



function mapStatetoProps(state){
    return {
        storage:state.storage,
        historyUrls:state.historyUrls
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Bet);