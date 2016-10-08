/**
 * Created by liudq on 2016/10/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');


import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';

var Pay = React.createClass({
    render: function () {
        var urls = this.props.historyUrls;
        var backUrl = urls[urls.length-2];
        console.log(this.props.storage);
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:backUrl}}
                    />
                    <Title title={{text:'确认购买'}}></Title>
                </Header>
                <div>
                    我是购买
                </div>

            </div>

        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Pay);