/**
 * Created by LDQ on 2016/9/12.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

import {storageActions} from '../redux/actions/storageActions'

var StockDetails = React.createClass({
    componentWillMount:function(){
        this.props.storageActionKeys.getStockGameId();

    },
    render: function () {
        var stockGameId = this.props.storage;
        var daily = "http://image.sinajs.cn/newchart/daily/n/sh"+stockGameId+".gif";
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'猜猜',src:'/nav_btn_back@2x.png'}}/>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <img src={daily} alt="" className="w"/>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        storage:state.storage
    };
}

function mapDispatchToProps(dispatch){

    return{
        storageActionKeys:bindActionCreators(storageActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockDetails);