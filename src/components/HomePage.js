/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var Footer = require('../components/Footer');

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
                <Footer footerData={[
                    {name:'猜猜',url:'/Guess',checked:"/caicai_s@2x.png",unchecked:"/caicai_d@2x.png",isChecked:false},
                    {name:'发现',url:'/Discover',checked:"/faxian_s@2x.png",unchecked:"/faxian_d@2x.png",isChecked:false},
                    {name:'我',url:'/My',checked:"/me_s@2x.png",unchecked:"me_d@2x.png",isChecked:false}
                    ]}
                    pathName={this.props.location.pathname}
                />
            </div>
        )
    }
});
module.exports = HomePage;
