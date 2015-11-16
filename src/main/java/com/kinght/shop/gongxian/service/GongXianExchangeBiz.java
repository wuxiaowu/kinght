package com.kinght.shop.gongxian.service;

import com.kinght.shop.gongxian.dao.GongXianExchangeDao;
import com.kinght.shop.gongxian.domain.GongXianExchange;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: wuxw
 * Date: 14-11-16
 * Time: 下午3:33
 * To change this template use File | Settings | File Templates.
 */
public class GongXianExchangeBiz {
    @Autowired
    public void setGongXianExchangeDao(GongXianExchangeDao gongXianExchangeDao) {
        this.gongXianExchangeDao = gongXianExchangeDao;
    }

    private GongXianExchangeDao gongXianExchangeDao;

    public List<GongXianExchange> queryChangeItemList(){
        return gongXianExchangeDao.queryChangeItemList();
    }
}
