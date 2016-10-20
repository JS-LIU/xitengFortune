/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/areaStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';
import {storageActions} from '../redux/actions/storageActions';

var Provinces = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Provinces');
        this.props.areaActionKeys.getArea({area:"provinces"});
    },
    render: function () {
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:this.props.historyUrls.last}}
                    />
                    <Title title={{text:"选取省份"}} />
                </Header>
                <ProvinceList
                    provinces={this.props.provinces}

                />
            </div>
        )
    }
});

var ProvinceList = React.createClass({
    saveProvince:function(item){
        return ()=>{
        }
    },
    render: function () {
        let provinceNodes = this.props.provinces.list.map((item,index)=>{
            return (
                <li className="pl15" key={index} onClick={this.saveProvince(item)}>
                    <Link to="/Cities">{item.label}</Link>
                </li>
            )
        });
        return (
            <ul className="province_list">
                {provinceNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address,
        provinces:state.provinces,
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

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Provinces);