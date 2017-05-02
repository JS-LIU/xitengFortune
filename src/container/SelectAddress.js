/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

import selectAddressStyle from '../css/selectAddressStyle.css';

import _h from '../Util/HB';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
var SelectAddress = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/SelectAddress');
        let urlList = [...this.props.historyUrls.urlList];
        _h.url.setBrowserHistoryFromBefore(urlList,"/SelectAddress");
        this.props.addressActionKeys.getList();
    },
    setNewAddress:function(item){
        return ()=>{
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        return (
            <div className={selectAddressStyle.selected_address_body}>
                <div className={selectAddressStyle.create_address_btn} onClick={this.setNewAddress({})}>
                    <Link to="/CreateAddress" className="fl">
                        <span>+</span>
                        <span>新建收货地址</span>
                    </Link>
                    <div className={selectAddressStyle.selected_address_save}>
                        <Link to='/ConfirmOrder'>
                            保存选择
                        </Link>
                    </div>
                </div>
                <AddressList
                    address={this.props.address}
                    addressActionKeys={this.props.addressActionKeys}
                />
            </div>
        )
    }
});

var AddressList = React.createClass({
    checkedItem:function(item){
        return ()=>{
            this.props.addressActionKeys.checkedAddress(item);
        }
    },
    setNewAddress:function(item){
        return ()=>{
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        let addressNodes = this.props.address.listAddress.map((item,index)=>{
            return(
                <li className={selectAddressStyle.address_item} key={index}>
                    <div className={selectAddressStyle.address_item_select}>
                        <input
                            type="radio"
                            name="addressList"
                            onChange={this.checkedItem(item)}
                        />
                    </div>
                    <div className={selectAddressStyle.address_item_info}>
                        <p className="f14">
                            <span className="pr15">{item.recievName}</span>
                            <span>{item.phoneNum}</span>
                        </p>
                        <p>
                            {item.fullAddress}
                        </p>
                    </div>
                    <div className={selectAddressStyle.address_item_edit} onClick={this.setNewAddress(item)}>
                        <Link to='/CreateAddress'>
                            编辑
                        </Link>

                    </div>
                </li>
            )

        });

        return (
            <ul className="mt10">
                {addressNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(SelectAddress);
