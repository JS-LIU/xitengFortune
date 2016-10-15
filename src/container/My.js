/**
 * Created by liudq on 16/8/25.
 */
var React = require('react');
var {Link} = require('react-router');


var My = React.createClass({
    render: function () {
        return (
            <div>
                <Link to='/Register'>注册</Link>
                <Link to='/Login'>登录</Link>
            </div>

        )
    }
});
module.exports = My;