/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var {Link} = require('react-router');

import entranceListStyle from "../css/entranceListStyle.css";

var EntranceList = React.createClass({

    render:function(){
        var listNodes = this.props.itemList.map((item,index)=>{
            return (
                <li key={index} className={entranceListStyle.entrance_list}>
                    <Link to={item.url}>
                        <span className={entranceListStyle.entrance_name} style={entranceBgStyle(item.icon)}>{item.name}</span>
                    </Link>
                </li>
            )
        });
        return (
            <ul className={entranceListStyle.entrance}>
                {listNodes}
            </ul>
        )
    },
});

module.exports = EntranceList;

const entranceBgStyle = function(icon){
    return {
        background:'url('+icon+') no-repeat 15px center',
        backgroundSize:"20px"
    }
};