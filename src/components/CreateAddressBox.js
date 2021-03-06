/**
 * Created by LDQ on 2017/1/8.
 */
var React = require('react');
var {Link} = require('react-router');

import createAddressStyle from '../css/createAddressStyle.css';

var CreateAddressBox = React.createClass({
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
    setDefault:function(){
        this.props.addressActionKeys.setDefault();
    },
    render: function () {
        return (
            <ul className={createAddressStyle.new_address_info}>
                <li className={createAddressStyle.new_address_name}>
                    <p>收 货 人 ：</p>
                    <input type="text"
                           placeholder="请填写姓名"
                           ref="name"
                           onChange={this.setName}
                           value={this.props.address.newAddressInfo.recievName}
                    />
                </li>
                <li className={createAddressStyle.new_address_phone}>
                    <p>联系方式：</p>
                    <input type="text"
                           placeholder="请填写您的手机号"
                           ref="phoneNum"
                           onChange={this.setPhoneNum}
                           value={this.props.address.newAddressInfo.phoneNum}
                    />
                </li>
                <li className={createAddressStyle.new_address_district} onClick={this.getProvinces}>
                    <p>所在地区：</p>
                    <Link to='/Provinces' className={createAddressStyle.new_address_district_selected}>
                        <span>{this.props.address.newAddressInfo.districtAddress}</span>
                    </Link>
                </li>
                <li className={createAddressStyle.new_address_detail}>
                    <p>详细信息：</p>
                    <input type="text"
                           placeholder="请填写收获的详细地址"
                           ref="detailAddress"
                           onChange={this.setDetailAddress}
                           value={this.props.address.newAddressInfo.detailAddress}
                    />
                </li>
                <li className={createAddressStyle.new_address_set_default}>
                    <p>设为默认</p>
                    <div onClick={this.setDefault} className="pr15">
                        {Boolean(this.props.address.newAddressInfo.isDefault)?"":"非"}默认
                    </div>
                </li>
            </ul>
        )
    }
});
module.exports = CreateAddressBox;