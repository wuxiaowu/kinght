package com.kinght.web.sys.action;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created with IntelliJ IDEA.
 * SysUser: 吴校武
 * Date: 14-11-2
 * Time: 下午6:13
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/api/xuyi/user")
public class XyUserShowController {
    private static Logger logger = Logger.getLogger(XyUserShowController.class);
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public void queryUserList(){

    }
}
