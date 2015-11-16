package com.kinght.web.sys.action;

import com.kinght.web.sys.service.SysUserBiz;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * SysUser: 吴校武
 * Date: 14-11-2
 * Time: 下午6:10
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/api/xuyi/user")
public class XyUserPerformController {
    private SysUserBiz sysUserBiz;
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void register(){
        sysUserBiz.register(null);
    }
    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    public void resetPassword(){

    }
}
