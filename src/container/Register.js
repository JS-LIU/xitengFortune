/**
 * Created by LDQ on 2016/8/24.
 */



var React = require('react');
var {Link} = require('react-router');

var Header = React.createClass({

    componentWillMount:function(){
        if(this.props.back){
            const backStyle = {
                background:"url("+this.props.back.src+")",
                backgroundSize:"10px",
                backgroundRepeat:'no-repeat',
                backgroundPositionX:"15px",
                paddingLeft:"30px"
            };
            this.props.text[0].style=backStyle;
        }
        this.props.text[1].style = {
            textAlign:'center'
        }
    },

    render:function(){

        var headerList = this.props.text.map((item,index)=>{
            return(
                <li key={index} style={headerLiStyle}>
                    <span style={item.style}>{item.text}</span>
                </li>
            )
        });
        return (
            <ul style={headerStyle}>
                {headerList}
            </ul>
        )
    }
});

var Register = React.createClass({
    render: function () {
        return (
            <div>
                <Header text={[{text:'登录'}, {text:'注册'},{text:''}]} back={{src:'/src/images/nav_btn_back@2x.png'}}/>
                <div>我是注册</div>
            </div>
        )
    }
});

const headerStyle = {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    height:'44px',
    lineHeight:'44px',
    fontSize:'14px'
};
const headerLiStyle = {
    flexGrow:'1',
};
const backIcon = {
    alignSelf:'center',
    height:'30px'
};

module.exports = Register;