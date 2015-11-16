package com.kinght.demo.action;

import com.kinght.web.security.RSAUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.security.interfaces.RSAPrivateKey;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 15-10-8
 * Time: 下午7:55
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/api/kinght/demo")
public class DemoController {

    /**
     * 跳转例子1  不传参数直接跳转
     * @return
     */
    @RequestMapping(value = "/test1", method = RequestMethod.GET)
    public String queryChangeItemList(){
        return "demo/start";
    }

    /**
     * 跳转例子1  不传参数直接跳转
     * @return
     */
    @RequestMapping(value = "/test2", method = RequestMethod.GET)
    public String queryChangeItemList(HttpServletRequest request) throws Exception {
        String p1=request.getParameter("p1");
        RSAPrivateKey privateKey = (RSAPrivateKey)request.getSession().getAttribute("privateKey");
        System.out.println(privateKey);
        String descrypedPwd = RSAUtils.decryptByPrivateKey(p1, privateKey); //解密后的密码,password是提交过来的密码
        descrypedPwd=URLDecoder.decode(descrypedPwd, "UTF-8");
        System.out.println(descrypedPwd);
        return "demo/start";
    }

}
