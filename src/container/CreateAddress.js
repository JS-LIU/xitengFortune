/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var CreateAddressBox = require('../components/CreateAddressBox');

import createAddressStyle from '../css/createAddressStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';

var CreateAddress = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/CreateAddress');
        this.props.historyUrlsActionKeys.mark('/CreateAddress');
    },
    saveAddress:function(){
        this.props.addressActionKeys.createAddress();
    },
    render: function () {
        return (
            <div className={createAddressStyle.create_address}>
                <CreateAddressBox
                    address={this.props.address}
                    areaActionKeys={this.props.areaActionKeys}
                    addressActionKeys={this.props.addressActionKeys}
                />
                <div className={createAddressStyle.create_address_save} onClick={this.saveAddress}>
                    <span className={createAddressStyle.cff}>保存</span>
                </div>

            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address,
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        areaActionKeys:bindActionCreators(areaActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(CreateAddress);