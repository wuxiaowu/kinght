package com.kinght.shop.gongxian.action;

import com.brainlong.api.utils.ResponseUtils;
import com.kinght.shop.gongxian.domain.GongXianExchange;
import com.kinght.shop.gongxian.service.GongXianExchangeBiz;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-11-16
 * Time: 下午2:06
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/api/kinght/gongxian")
public class GongXianExchangeController {
    public void setGongXianExchangeBiz(GongXianExchangeBiz gongXianExchangeBiz) {
        this.gongXianExchangeBiz = gongXianExchangeBiz;
    }
    @Autowired
    private GongXianExchangeBiz gongXianExchangeBiz;

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public ModelAndView queryChangeItemList(){
        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArray = new JSONArray();

//        ExChangeItem.put("ItemID",230);
//        ExChangeItem.put("ItemID",230);
//        ExChangeItem.put("ItemID",230);
//        ExChangeItem.put("ItemID",230);
//        ExChangeItem.put("ItemID",230);
//        ExChangeItem.put("ItemID",230);

        List<GongXianExchange> gongXianExchanges =gongXianExchangeBiz.queryChangeItemList();
        for (GongXianExchange gongXianExchange:gongXianExchanges) {
            System.out.println(gongXianExchange.getItemName());
            JSONObject ExChangeItem = new JSONObject();
            ExChangeItem.put("id",gongXianExchange.getId());
            ExChangeItem.put("ItemID",gongXianExchange.getItemID());
            ExChangeItem.put("ItemName",gongXianExchange.getItemName());
            ExChangeItem.put("ItemNote",gongXianExchange.getItemNote());
            ExChangeItem.put("ItemPoint",gongXianExchange.getItemPoint());
            jsonArray.add(ExChangeItem);
        }


        jsonObj.put("list", jsonArray);
        return new ModelAndView("", ResponseUtils.jsonSuccess(jsonObj));
    }
}
