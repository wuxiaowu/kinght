package com.kinght.shop.gongxian.dao.impl;

import com.kinght.shop.gongxian.dao.GongXianExchangeDao;
import com.kinght.shop.gongxian.domain.GongXianExchange;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-11-16
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 */
public class GongXianExchangeDaoImpl extends JdbcDaoSupport implements GongXianExchangeDao {

    @Override
    public List<GongXianExchange> queryChangeItemList() {
        return ( List<GongXianExchange>)this.getJdbcTemplate().query("select * from TW76_PointExchange", new BeanPropertyRowMapper(GongXianExchange.class));
    }
}
