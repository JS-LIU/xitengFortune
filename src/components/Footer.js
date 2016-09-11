/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var {Link} = require('react-router');
require('../Footer.css');

var Footer = React.createClass({

    render: function () {
        var footerNodes = this.props.footerData.map((footerItem,index) => {
            return (
                <li className="fl" key={index}>
                    <Link to={footerItem.url}>{footerItem.name}</Link>
                </li>
            )
        });

        return (
            <ul className="w" style={footerStyle}>
                {footerNodes}
            </ul>
        )
    }
});


const footerStyle = {
    position:"fixed",
    bottom:"0px",
    height:"44px",
    background:"#FFF",
    zIndex:"11"
};


module.exports = Footer;

