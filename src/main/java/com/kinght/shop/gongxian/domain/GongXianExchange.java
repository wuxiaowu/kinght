package com.kinght.shop.gongxian.domain;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-11-16
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
public class GongXianExchange {
     private Integer id;
    private  String ItemID;
    private  String  ItemName;
    private String  ItemNote;

    public String getItemPoint() {
        return ItemPoint;
    }

    public void setItemPoint(String itemPoint) {
        ItemPoint = itemPoint;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemID() {
        return ItemID;
    }

    public void setItemID(String itemID) {
        ItemID = itemID;
    }

    public String getItemName() {
        return ItemName;
    }

    public void setItemName(String itemName) {
        ItemName = itemName;
    }

    public String getItemNote() {
        return ItemNote;
    }

    public void setItemNote(String itemNote) {
        ItemNote = itemNote;
    }

    private  String  ItemPoint;
}
