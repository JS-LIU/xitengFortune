/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/selectAddressStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';

var SelectAddress = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/AddressList');
        this.props.addressActionKeys.getList();
    },
    saveCurrent:function(){
        this.props.addressActionKeys.saveCurrent();
    },
    setNewAddress:function(item){
        return ()=>{
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        return (
            <div className="selected_address_body f5f5f5 po w">
                {/*<Header*/}
                    {/*historyUrls={this.props.historyUrls}*/}
                    {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}>*/}
                    {/*<BackBtn*/}
                        {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}*/}
                        {/*back={{text:'返回',src:'/nav_btn_back@2x.png',link:'/ConfirmOrder'}}*/}
                    {/*/>*/}
                    {/*<Title title={{text:'选择地址'}}></Title>*/}
                {/*</Header>*/}
                <div className="create_address_btn f16 pl15 clearfix" onClick={this.setNewAddress({})}>
                    <Link to="/CreateAddress" className="fl">
                        <span>+</span>
                        <span>新建收货地址</span>
                    </Link>
                    <div className="selected_address_save pr15 fr" onClick={this.saveCurrent}>
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
            console.log(item);
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        let addressNodes = this.props.address.listAddress.map((item,index)=>{
            return(
                <li className="address_item w fff" key={index}>
                    <div className="address_item_select">
                        <input
                            type="radio"
                            name="addressList"
                            checked={item.checked}
                            onChange={this.checkedItem(item)}
                        />
                    </div>
                    <div className="address_item_info">
                        <p className="address_userInfo f14">
                            <span className="address_name">{item.recievName}</span>
                            <span className="address_phone_num">{item.phoneNum}</span>
                        </p>
                        <p>
                            {item.fullAddress}
                        </p>
                    </div>
                    <div className="address_item_edit tr" onClick={this.setNewAddress(item)}>
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
