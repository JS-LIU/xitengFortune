/**
 * Created by LDQ on 2017/1/8.
 */
var React = require('react');
var {Link} = require('react-router');
import currentAddressStyle from '../css/currentAddressStyle.css';

var CurrentAddress = React.createClass({
    render: function () {
        return (
            <Link to="/SelectAddress">
                <ul className={currentAddressStyle.current_address}>
                    <li className={currentAddressStyle.current_address_userInfo}>
                        <div className="fl">
                            <span>收 货 人：</span>
                            <span className={currentAddressStyle.f24}>{this.props.address.currentAddress.recievName}</span>
                        </div>
                        <div className="fr">
                            <span className={currentAddressStyle.f24}>{this.props.address.currentAddress.phoneNum}</span>
                        </div>
                    </li>
                    <li className={currentAddressStyle.current_address_receiveAddress}>
                        <div className="fl">
                            <span>送货地址：</span>
                            <span className={currentAddressStyle.f24}>{this.props.address.currentAddress.fullAddress}</span>
                        </div>
                    </li>
                </ul>
            </Link>
        )
    }
});
module.exports = CurrentAddress;