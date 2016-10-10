/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var {Link} = require('react-router');
require('../css/footerStyle.css');

var Footer = React.createClass({

    render: function () {
        var footerNodes = this.props.footerData.map((footerItem,index) => {
            return (
                <li className="fl footer_item tc" key={index}>
                    <Link to={footerItem.url}>
                        <img src="" alt=""/>
                        {footerItem.name}
                    </Link>
                </li>
            )
        });

        return (
            <ul className="w main_footer fff">
                {footerNodes}
            </ul>
        )
    }
});



module.exports = Footer;

