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
                <Link to={footerItem.url} className="footer_item tc" key={index}>
                    <div className="footer_text">
                        <img src={footerItem.isChecked?footerItem.checked:footerItem.unchecked} alt="" className="footer_icon"/>
                        <span>{footerItem.name}</span>
                    </div>
                </Link>
            )
        });

        return (
            <div className="w main_footer fff">
                {footerNodes}
            </div>
        )
    }
});



module.exports = Footer;

