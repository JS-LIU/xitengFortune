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
            <ul className="footer">
                {footerNodes}
            </ul>
        )
    }
});





module.exports = Footer;

