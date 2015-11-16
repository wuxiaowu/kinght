var busiProcTree= new dTree('busiProcTree','../../../../global/themes/default/styles/images/dtree');
busiProcTree.config.useCheckboxes=false;
busiProcTree.config.useIcons=true;
busiProcTree.config.useSelection=true;
busiProcTree.config.useCookies=true;

busiProcTree.add('fmis-0',-1,'地区信息');

	busiProcTree.add('fmis-0-01','fmis-0','中华人民共和国','','');
	busiProcTree.add('fmis-0-01-01','fmis-0-01','北京市','','');
	busiProcTree.add('fmis-0-01-01-01','fmis-0-01-01','顺义区','','');
	
	busiProcTree.add('fmis-0-01-02','fmis-0-01','天津区','','');
	busiProcTree.add('fmis-0-01-02-01','fmis-0-01-02','红桥区','','');
	busiProcTree.add('fmis-0-01-02-02','fmis-0-01-02','南开区','','');
	busiProcTree.add('fmis-0-01-02-03','fmis-0-01-02','和平区','','');
	busiProcTree.add('fmis-0-01-02-04','fmis-0-01-02','河北区','','');
	busiProcTree.add('fmis-0-01-02-05','fmis-0-01-02','塘沽区','','');
	busiProcTree.add('fmis-0-01-02-06','fmis-0-01-02','和平区','','');

	busiProcTree.add('fmis-0-01-03','fmis-0-01','江苏省','','');
	busiProcTree.add('fmis-0-01-03-01','fmis-0-01-03','南京市','','');
	busiProcTree.add('fmis-0-01-03-02','fmis-0-01-03','苏州市','','');
	busiProcTree.add('fmis-0-02','fmis-0','美国','','');
	busiProcTree.add('fmis-0-03','fmis-0','英国','','');
	busiProcTree.add('fmis-0-04','fmis-0','芬兰','','');
document.write(busiProcTree);
