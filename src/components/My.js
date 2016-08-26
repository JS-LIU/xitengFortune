/**
 * Created by liudq on 16/8/25.
 */
var React = require('react');
var {Link} = require('react-router');


var My = React.createClass({
    render: function () {
        return (
            <Link to='/Register'>注册</Link>
        )
    }
});
module.exports = My;