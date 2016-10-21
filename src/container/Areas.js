/**
 * Created by liudq on 2016/10/20.
 */
/**
 * Created by liudq on 2016/10/20.
 */
var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/areaStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';
import {storageActions} from '../redux/actions/storageActions';

var Areas = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Areas');
        let cityId = this.props.storage.cityInfo.id;
        this.props.areaActionKeys.getArea({area:"cities"},2,{parentAreaId:cityId});
    },
    render: function () {
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:"/Cities"}}
                    />
                    <Title title={{text:"选取地区"}} />
                </Header>
                <CityList
                    areas={this.props.areas}
                    storageActionKeys={this.props.storageActionKeys}
                />
            </div>
        )
    }
});

var CityList = React.createClass({
    saveArea:function(item){
        return ()=>{
            this.props.storageActionKeys.setArea(item);
        }
    },
    render: function () {
        let areaNodes = this.props.areas.list.map((item,index)=>{
            return (
                <li className="pl15" key={index} onClick={this.saveArea(item)}>
                    <Link to="/Areas">{item.label}</Link>
                </li>
            )
        });
        return (
            <ul className="area_list">
                {areaNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address,
        areas:state.areas,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        areaActionKeys:bindActionCreators(areaActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Areas);