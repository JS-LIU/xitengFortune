/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var {Link} = require('react-router');

var EntranceList = React.createClass({

    render:function(){
        var listNodes = this.props.itemList.map((list,index)=>{
            return (
                <li key={index} >
                    <Link to={list.url}>{list.name}</Link>
                </li>
            )
        });
        return (
            <ul>
                {listNodes}
            </ul>
        )
    },
});

module.exports = EntranceList;