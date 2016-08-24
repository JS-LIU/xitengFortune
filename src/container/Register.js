/**
 * Created by LDQ on 2016/8/24.
 */



var React = require('react');
var {Link} = require('react-router');

var Header = React.createClass({

    render:function(){
        var headerList = this.props.header.map((item,index)=>{
            return(
                <li key={index}>
                    <Link to={item.url}>
                        <img src={item.icon} alt=""/>
                        <span>{item.text}</span>
                    </Link>
                </li>
            )
        });
        return (
            <ul>
                {headerList}
            </ul>
        )
    }
});

var Register = React.createClass({
    render: function () {
        return (
            <div>
                <Header header={
                    [{icon:'/src/images/nav_btn_back@2x.png',url:'/Login',text:'登录'},
                        {icon:'',url:'javascript:void(0)',text:'注册'}]}/>
                <div>我是注册</div>
            </div>
        )
    }
});
module.exports = Register;