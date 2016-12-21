/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var Footer = require('../components/Footer');

var HomePage = React.createClass({
    componentWillMount:function(){

    },
    render: function () {
        return (
            <div>
                {this.props.children}
                <Footer footerData={[
                    {name:'猜猜',url:'/Guess',checked:"src/images/caicai_s@2x.png",unchecked:"src/images/caicai_d@2x.png",isChecked:false},
                    {name:'发现',url:'/Discover',checked:"src/images/faxian_s@2x.png",unchecked:"src/images/faxian_d@2x.png",isChecked:false},
                    {name:'我',url:'/My',checked:"src/images/me_s@2x.png",unchecked:"src/images/me_d@2x.png",isChecked:false}
                    ]}
                    pathName={this.props.location.pathname}
                />
            </div>
        )
    }
});


module.exports = HomePage;
