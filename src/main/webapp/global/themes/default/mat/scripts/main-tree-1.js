var sysManage= new dTree('sysManage','../global/themes/default/styles/images/dtree');
sysManage.config.useCheckboxes=false;
sysManage.config.useIcons=true;
sysManage.config.useSelection=true;
sysManage.config.useCookies=true;

sysManage.add('mat-0',-1,'系统模块');
	sysManage.add('mat-0-01','mat-0','产品辞典','','');
	sysManage.add('mat-0-01-01','mat-0-01','计量单位分类维护','','mat-dictionary/measure-type/measure-type.html "target="workflow');
	sysManage.add('mat-0-01-02','mat-0-01','计量单位维护','','mat-dictionary/measure-maintenance/measure-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-03','mat-0-01','电压等级维护','','mat-dictionary/voltage-grade/voltage-grade.html "target="workflow');
	//sysManage.add('mat-0-01-17','mat-0-01','招标归属维护','','mat-dictionary/invite-ascription-maintenance/invite-ascription-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-04','mat-0-01','招标专职维护','','mat-dictionary/invite-ascription/invite-ascription.html "target="workflow');
	sysManage.add('mat-0-01-09','mat-0-01','分类集维护','','mat-dictionary/sort-maintenance/sort-maintenance.html "target="workflow');
	//sysManage.add('mat-0-01-05','mat-0-01','产品类别维护','','mat-dictionary/chapter-maintenance/chapter-maintenance.html "target="workflow');
	//sysManage.add('mat-0-01-08','mat-0-01','产品用途维护','','../mat-dictionary/pro-maintenance/pro-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-10','mat-0-01','物资类别维护','','mat-dictionary/mat-sort-maintenance/mat-sort-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-11','mat-0-01','服务类别维护','','mat-dictionary/service-maintenance/service-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-12','mat-0-01','设备类别维护','','mat-dictionary/equipment-maintenance/equipment-maintenance.html "target="workflow');
	
	sysManage.add('mat-0-01-06','mat-0-01','物资辞条维护','','mat-dictionary/mat-maintenance/mat-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-16','mat-0-01','物料维护','','mat-dictionary/add-mat/add-mat.html "target="workflow');
	sysManage.add('mat-0-01-06','mat-0-01','服务辞条维护','','mat-dictionary/service-code-maintenance/service-code-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-13','mat-0-01','设备物资对应关系','','mat-dictionary/bom-maintenance/bom-maintenance.html "target="workflow');
	sysManage.add('mat-0-01-14','mat-0-01','资产设备对应关系','','mat-dictionary/asset-equipment-relation/asset-equipment-relation.html "target="workflow');
	//sysManage.add('mat-0-01-15','mat-0-01','资产物资对应关系','','mat-dictionary/asset-mat-relation/asset-mat-relation.html "target="workflow');
	sysManage.add('mat-0-01-07','mat-0-01','产品计量单位换算','','mat-dictionary/mat-product/mat-product.html "target="workflow');


	sysManage.add('mat-0-02','mat-0','基础设置','','');
	sysManage.add('mat-0-02-01','mat-0-02','增值税设置','','base-set/contract-set/contract-set.html "target="workflow');
	sysManage.add('mat-0-02-13','mat-0-02','预算项目设置','','base-set/budget-pro-set/budget-pro-set.html "target="workflow');
	sysManage.add('mat-0-02-02','mat-0-02','付款方式维护','','base-set/pay-maintenance/pay-maintenance.html "target="workflow');
	sysManage.add('mat-0-02-03','mat-0-02','综合服务费率','','base-set/colligate-service/colligate-service.html "target="workflow');
	sysManage.add('mat-0-02-04','mat-0-02','付款比例维护','','base-set/pay-proportion/pay-proportion.html "target="workflow');
	sysManage.add('mat-0-02-06','mat-0-02','供应商付款比例维护','','base-set/pay-supplier/pay-supplier.html "target="workflow');
	//sysManage.add('mat-0-02-07','mat-0-02','付款类型维护','','base-set/pay-type/pay-type.html "target="workflow');
	//sysManage.add('mat-0-02-07','mat-0-02','付款比例维护','','../base-set/pay-supplier/pay-supplier.html "target="workflow');
	sysManage.add('mat-0-02-08','mat-0-02','违约金阀值设置','','base-set/fell-back-money/fell-back-money.html "target="workflow');
	sysManage.add('mat-0-02-11','mat-0-02','分批授权设置','','base-set/commision-setting/commision-setting.html "target="workflow');
	sysManage.add('mat-0-02-13','mat-0-02','未到货先开票授权设置','','base-set/no-good-setting/no-good-setting.html "target="workflow');
	sysManage.add('mat-0-02-12','mat-0-02','重点物资设置','','base-set/emphases-mat-set/emphases-mat-set.html "target="workflow');
	sysManage.add('mat-0-02-09','mat-0-02','出入库设置','','base-set/out-in-set/in-set/in-set.html "target="workflow');
	//sysManage.add('mat-0-02-09','mat-0-02','出库设置','','base-set/out-in-set/out-set/out-set.html "target="workflow');
	//sysManage.add('mat-0-02-10','mat-0-02','仓管人设置','','base-set/storge-man-set/storge-man-set.html "target="workflow');
	sysManage.add('mat-0-02-10','mat-0-02','库存地设置','','base-set/storge-set/storge-set.html "target="workflow');
	sysManage.add('mat-0-02-05','mat-0-02','子库存设置','','base-set/stock-treat/stock-treat.html "target="workflow');
	sysManage.add('mat-0-02-14','mat-0-02','库存组织设置','','base-set/storge-orgaize-set/storge-orgaize-set.html "target="workflow');
	sysManage.add('mat-0-02-15','mat-0-02','参数设置','','base-set/parameter-set/parameter-set.html "target="workflow');
	sysManage.add('mat-0-02-16','mat-0-02','采购组织设置','','base-set/stock-organize-set/stock-organize-set.html "target="workflow');
	sysManage.add('mat-0-02-17','mat-0-02','订单条款维护','','base-set/stock-contract-clause-set/stock-contract-clause-set.html "target="workflow');
	sysManage.add('mat-0-02-18','mat-0-02','订单模板维护','','base-set/stock-contract-set/stock-contract-set.html "target="workflow');
	sysManage.add('mat-0-02-19','mat-0-02','项目类型分类维护','','base-set/pronatrue-set/pronatrue-set.html "target="workflow');

document.write(sysManage);