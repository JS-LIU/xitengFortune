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
                    {name:'猜猜',url:'/Guess'},
                    {name:'问吧',url:'/AskBar'},
                    {name:'发现',url:'/Discover'},
                    {name:'我',url:'/My'}
                    ]}/>
            </div>
        )
    }
});
module.exports = HomePage;
