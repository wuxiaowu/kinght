var busiProcTree= new dTree('busiProcTree','../../../../global/themes/default/styles/images/dtree');
busiProcTree.config.useCheckboxes=false;
busiProcTree.config.useIcons=true;
busiProcTree.config.useSelection=true;
busiProcTree.config.useCookies=true;

busiProcTree.add('fmis-0',-1,'参与人角色');

	busiProcTree.add('fmis-0-01','fmis-0','往来单位','','');
	busiProcTree.add('fmis-0-01-01','fmis-0-01','供应商','','');
	
	busiProcTree.add('fmis-0-01-01-01','fmis-0-01-01','服务供应商','','');
	busiProcTree.add('fmis-0-01-01-02-01','fmis-0-01-01-01','勘测设计单位','','');
	busiProcTree.add('fmis-0-01-01-02-02','fmis-0-01-01-01','土建单位','','');
	busiProcTree.add('fmis-0-01-01-02-03','fmis-0-01-01-01','电气安装单位','','');
	busiProcTree.add('fmis-0-01-01-02-04','fmis-0-01-01-01','标底编制单位','','');
	busiProcTree.add('fmis-0-01-01-02-05','fmis-0-01-01-01','调试单位','','');
	busiProcTree.add('fmis-0-01-01-02-06','fmis-0-01-01-01','监理单位','','');
	
	busiProcTree.add('fmis-0-01-01-02','fmis-0-01-01','货物供应商','','');
	busiProcTree.add('fmis-0-01-01-03','fmis-0-01-01','购电单位（电厂）','','');
	
	busiProcTree.add('fmis-0-01-02','fmis-0-01','客户','','');
	busiProcTree.add('fmis-0-01-02-01','fmis-0-01-02','废旧物资回收单位','','');
		
	
	busiProcTree.add('fmis-0-02','fmis-0','员工','','');
	busiProcTree.add('fmis-0-02-01','fmis-0-02','正式员工','','');
	
	busiProcTree.add('fmis-0-02-02-01','fmis-0-02-01','项目经理','','');
	busiProcTree.add('fmis-0-02-02-02','fmis-0-02-01','联系人','','');
	busiProcTree.add('fmis-0-02-02-03','fmis-0-02-01','法人代表','','');
	
	busiProcTree.add('fmis-0-02-02','fmis-0-02','非正式员工','','');
	
	
document.write(busiProcTree);
