/**
 * Created by LDQ on 2016/8/24.
 */



var React = require('react');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

var Register = React.createClass({
    render: function () {
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'取消'}}/>
                </Header>

                <div className="tc f16">请输入你的手机号</div>
                <ul className="mt30">
                    <li style={listStyle}>
                        <span>国家/地区</span>
                        <input style={inputStyle} className="h" type="text"/>
                    </li>
                    <li style={listStyle}>
                        <span>+86 |</span>
                        <input type="text" style={inputStyle} className="h"/>
                    </li>
                </ul>
            </div>
        )
    }
});

const listStyle = {
    height:'44px',
    lineHeight:'44px',
    borderBottom:'1px solid #E2E2E2',
    margin:"0px 15px"
};
const inputStyle = {
    paddingLeft:"15px",
    outline:"none"
};
module.exports = Register;