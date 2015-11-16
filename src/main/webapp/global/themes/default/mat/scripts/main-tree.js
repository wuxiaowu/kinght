var busiProcTree= new dTree('busiProcTree','../global/themes/default/styles/images/dtree');
busiProcTree.config.useCheckboxes=false;
busiProcTree.config.useIcons=true;
busiProcTree.config.useSelection=true;
busiProcTree.config.useCookies=true;

busiProcTree.add('fmis-0-01',-1,'基础数据维护','','');
busiProcTree.add('fmis-0-01-01','fmis-0-01','采购计划','','');
busiProcTree.add('fmis-0-01-01-02','fmis-0-01-01','物资驳回','','rep-man/collect-maintenance-man/list1.html "target="workflow');
busiProcTree.add('fmis-0-01-01-04','fmis-0-01-01','驳回审批','','rep-man/mat-overrule-check/mat-overrule-check.html "target="workflow');


busiProcTree.add('fmis-0-01-02','fmis-0-01','计划汇总','','');
busiProcTree.add('fmis-0-01-02-04','fmis-0-01-02','批量审批','','rep-man/collect-batch/collect-batch.html "target="workflow');
busiProcTree.add('fmis-0-01-02-01','fmis-0-01-02','汇总维护','','rep-man/req-plan-collect/req-plan-collect.html "target="workflow');
busiProcTree.add('fmis-0-01-02-02','fmis-0-01-02','汇总审批','','rep-man/collect-plan-check/collect-plan-check.html "target="workflow');
busiProcTree.add('fmis-0-01-02-03','fmis-0-01-02','汇总驳回处理','','rep-man/collect-reject-edit/collect-reject-edit.html "target="workflow');

	
document.write(busiProcTree);
