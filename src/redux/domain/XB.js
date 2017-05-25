/**
 * Created by LDQ on 2017/5/24.
 */

import CoinInterface from './CoinInterface';

class XB extends CoinInterface{
    constructor(xb){
        super();
        this.xb = xb;
        this.diamonds = xb / this.radio;
    }
}

module.exports = XB;