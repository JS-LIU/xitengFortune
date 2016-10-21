/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/ceateAddressStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';

var CreateAddress = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/CreateAddress');
    },
    saveAddress:function(){
        this.props.addressActionKeys.createAddress();
    },
    render: function () {
        return (
            <div className="create_address po w f5f5f5">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:this.props.historyUrls.last}}
                    />
                    <div className="create_address_save pr15" onClick={this.saveAddress}>
                        <Link to={this.props.historyUrls.last}>
                            <span className="cfff">保存</span>
                        </Link>
                    </div>
                    <Title title={{text:'新建地址'}} />
                </Header>
                <NewAddressInfo
                    address={this.props.address}
                    areaActionKeys={this.props.areaActionKeys}
                    addressActionKeys={this.props.addressActionKeys}
                />
            </div>
        )
    }
});

var NewAddressInfo = React.createClass({
    getProvinces:function(){
        this.props.areaActionKeys.getArea({area:"provinces"},0);
    },
    setName:function(){
        console.log(this.refs.name.value);
        this.props.addressActionKeys.setName(this.refs.name.value);
    },
    setPhoneNum:function(){
        this.props.addressActionKeys.setPhoneNum(this.refs.phoneNum.value);
    },
    setDetailAddress:function(){
        this.props.addressActionKeys.setDetailAddress(this.refs.detailAddress.value);
    },
    render: function () {
        return (
            <ul className="new_address_info fff">
                <li className="new_address_name pl15">
                    <p>收 货 人 ：</p>
                    <input type="text"
                           placeholder="请填写姓名"
                           ref="name"
                           onChange={this.setName}
                           value={this.props.address.newAddressInfo.name}
                    />
                </li>
                <li className="new_address_phone pl15">
                    <p>联系方式：</p>
                    <input type="text"
                           placeholder="请填写您的手机号"
                           ref="phoneNum"
                           onChange={this.setPhoneNum}
                           value={this.props.address.newAddressInfo.phoneNum}
                    />
                </li>
                <li className="new_address_district pl15" onClick={this.getProvinces}>
                    <p>所在地区：</p>
                    <Link to='/Provinces' className="new_address_district_selected" >
                        <span>{this.props.address.newAddressInfo.province.label}</span>
                        <span>{this.props.address.newAddressInfo.city.label}</span>
                        <span>{this.props.address.newAddressInfo.area.label}</span>
                    </Link>
                </li>
                <li className="new_address_detail pl15">
                    <p>详细信息：</p>
                    <input type="text"
                           placeholder="请填写收获的详细地址"
                           ref="detailAddress"
                           onChange={this.setDetailAddress}
                           value={this.props.address.newAddressInfo.detailAddress}
                    />
                </li>
                <li className="pl15">
                    <p>设为默认</p>
                </li>
            </ul>
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