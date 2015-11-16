<% String contextPath = request.getContextPath(); %>

<link rel="stylesheet" type="text/css" href="<%=contextPath%>/global/themes/default/styles/ext/ext-all.css" />

<link rel="stylesheet" type="text/css" href="<%=contextPath%>/global/themes/default/styles/ext/ext-tree.css" />
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/global/scripts/extux/treegrid/TreeGrid.css" />
<script type="text/javascript" src="<%=contextPath%>/global/scripts/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/ext/source/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/ext/source/widgets/Window.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/extux/treegrid/TreeGrid.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/extux/grid/GroupHeaderPlugin.js"></script>
<script type="text/javascript" src="<%=contextPath%>/global/scripts/extux/grid/EpiiGroupHeaderPlugin.js"></script>


<script type="text/javascript" src="<%=contextPath%>/global/scripts/extux/treeEditorGrid/TreeEditorGrid.js"></script>


<script type="text/javascript">
  Ext.namespace("Epii");
  Epii.rootUrl = "<%=contextPath%>";
  Ext.BLANK_IMAGE_URL = "<%=contextPath%>/global/themes/default/styles/images/default/s.gif";
</script>



<script type="text/javascript">
var noPerform = false;
Ext.EPIIGroupHeaderGrid = Ext.extend(Ext.ux.plugins.GroupHeaderGrid,{
    findHeaderCell : function(el){
    if (!el) {
        return false;
    }
    return el ? this.fly(el).findParent('td', this.cellSelectorDepth) : false;
  },

  findHeaderIndex : function(el){
    if (!el) {
        return false;
    }
    var cell = this.findHeaderCell(el);
    return cell ? this.getCellIndex(cell) : false;
  }
});



  Ext.grid.EPIICheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel, {

    isSelectAll: false,

      selectArr : new Array(),

      deselectArr : new Array(),
      
  	 /**
  	 * @cfg {Boolean} moveEditorOnEnter
  	 * False to turn off moving the editor to the next cell when the enter key is pressed
  	 */
      // private
      initEvents : function(){

          if(!this.grid.enableDragDrop && !this.grid.enableDrag){
          	this.grid.on("rowmousedown", this.handleMouseDown, this, {delay:175} );
              
              
          }else{ // allow click to work like normal
              this.grid.on("rowclick", 
              function(grid, rowIndex, e) {
                  if(e.button === 0 && !e.shiftKey && !e.ctrlKey) {
                      this.selectRow(rowIndex, false);
                      grid.view.focusRow(rowIndex);
                  }
              }, this);
          }

          this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
              "up" : function(e){
                  if(!e.shiftKey){
                      this.selectPrevious(e.shiftKey);
                  }else if(this.last !== false && this.lastActive !== false){
                      var last = this.last;
                      this.selectRange(this.last,  this.lastActive-1);
                      this.grid.getView().focusRow(this.lastActive);
                      if(last !== false){
                          this.last = last;
                      }
                  }else{
                      this.selectFirstRow();
                  }
              },
              "down" : function(e){
                  if(!e.shiftKey){
                      this.selectNext(e.shiftKey);
                  }else if(this.last !== false && this.lastActive !== false){
                      var last = this.last;
                      this.selectRange(this.last,  this.lastActive+1);
                      this.grid.getView().focusRow(this.lastActive);
                      if(last !== false){
                          this.last = last;
                      }
                  }else{
                      this.selectFirstRow();
                  }
              },
              scope: this
          });

          var view = this.grid.view;
          view.on("refresh", this.onRefresh, this);
          view.on("rowupdated", this.onRowUpdated, this);
          view.on("rowremoved", this.onRemove, this);

          this.grid.on('render', function(){
              var view = this.grid.getView();
              
	          view.mainBody.on('mousedown', this.onMouseDown, this);
	          Ext.fly(view.innerHd).on('mousedown', this.onHdMouseDown, this);
              

          }, this);
      },
    removeSelectArr : function() {
      for (var i = this.selectArr.length - 1; i >= 0; i--) {
        this.selectArr.remove(this.selectArr[i]);
      }
    },

    removeDeselectArr : function() {
      for (var i = this.deselectArr.length - 1; i >= 0; i--) {
        this.deselectArr.remove(this.deselectArr[i]);
      }
    },

    // private
      onHdMouseDown : function(e, t){
          if(t.className == 'x-grid3-hd-checker'){
              e.stopEvent();
              var hd = Ext.fly(t.parentNode);
              var isChecked = hd.hasClass('x-grid3-hd-checker-on');
              if(isChecked) {
                  hd.removeClass('x-grid3-hd-checker-on');
                  this.clearSelections();
                  this.isSelectAll = false;
                  this.removeDeselectArr();
                  this.removeSelectArr();
              } else{
                  hd.addClass('x-grid3-hd-checker-on');
                  this.selectAll();
                  this.isSelectAll = true;
                  this.removeDeselectArr();
                  this.removeSelectArr();
              }
          }
      },

      getIsSelectAll : function() {
        return this.isSelectAll;
      },

      /**
       * Selects a row.
       * @param {Number} row The index of the row to select
       * @param {Boolean} keepExisting (optional) True to keep existing selections
       */
      selectRow : function(index, keepExisting, preventViewNotify){
		  keepExisting = true;
          if(this.locked || (index < 0 || index >= this.grid.store.getCount()) || this.isSelected(index)) return;
          var r = this.grid.store.getAt(index);
          if(r && this.fireEvent("beforerowselect", this, index, keepExisting, r) !== false){
              if(!keepExisting || this.singleSelect){
                  this.clearSelections();
              }
              this.selections.add(r);
              this.last = this.lastActive = index;
              if(!preventViewNotify){
                  this.grid.getView().onRowSelect(index);
              }
              this.fireEvent("rowselect", this, index, r);
              this.fireEvent("selectionchange", this);
          }
      },

      // private
      handleMouseDown : function(g, rowIndex, e){

    	  if(e.button !== 0 || this.isLocked()){
              return;
          };

          var view = this.grid.getView();
          if(e.shiftKey && this.last !== false){
              var last = this.last;
              this.selectRange(last, rowIndex, e.ctrlKey);
              this.last = last; // reset the last
              view.focusRow(rowIndex);
          }else{
              var isSelected = this.isSelected(rowIndex);

              //if(e.ctrlKey && isSelected){
              if(isSelected){
                  this.deselectRow(rowIndex);
              }else if(!isSelected || this.getCount() > 1){
                  this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
                  view.focusRow(rowIndex);
              }

          }
      }

  });


  Ext.grid.EPIICheckboxSelectionModel2 = Ext.extend(Ext.grid.EPIICheckboxSelectionModel, {

      /**
       * Deselects a row.
       * @param {Number} row The index of the row to deselect
       */
      deselectRowForChild : function(index, preventViewNotify){
          if(this.locked) return;
          if(this.last == index){
              this.last = false;
          }
          if(this.lastActive == index){
              this.lastActive = false;
          }
          var r = this.grid.store.getAt(index);
          if(r){
              this.selections.remove(r);
              if(!preventViewNotify){
                  this.grid.getView().onRowDeselect(index);
              }
              this.fireEvent("rowdeselect", this, index, r, true);
              this.fireEvent("selectionchange", this);
          }
      },

    // private
      onHdMouseDown : function(e, t){
          if(t.className == 'x-grid3-hd-checker'){
              e.stopEvent();
              var hd = Ext.fly(t.parentNode);
              var isChecked = hd.hasClass('x-grid3-hd-checker-on');
              if(isChecked) {
                  hd.removeClass('x-grid3-hd-checker-on');
                  this.clearSelections();
                  this.isSelectAll = false;
              } else{
                  hd.addClass('x-grid3-hd-checker-on');
                  this.selectAll();
                  this.isSelectAll = true;
              }
          }
      }

  });





  Ext.grid.EPIICheckboxSelectionModel3 = Ext.extend(Ext.grid.CheckboxSelectionModel, {

      selectRow : function(index, keepExisting, preventViewNotify){
         keepExisting = true;
          if(this.locked || (index < 0 || index >= this.grid.store.getCount()) || this.isSelected(index)) return;
          var r = this.grid.store.getAt(index);
          if(r && this.fireEvent("beforerowselect", this, index, keepExisting, r) !== false){
              if(!keepExisting || this.singleSelect){
                  this.clearSelections();
              }
              this.selections.add(r);
              this.last = this.lastActive = index;
              if(!preventViewNotify){
                  this.grid.getView().onRowSelect(index);
              }
              this.fireEvent("rowselect", this, index, r);
              this.fireEvent("selectionchange", this);
          }
      },
      // private
      handleMouseDown : function(g, rowIndex, e){

          if(e.button !== 0 || this.isLocked()){
              return;
          };

          var view = this.grid.getView();
          if(e.shiftKey && this.last !== false){
              var last = this.last;
              this.selectRange(last, rowIndex, e.ctrlKey);
              this.last = last; // reset the last
              view.focusRow(rowIndex);
          }else{
              var isSelected = this.isSelected(rowIndex);

              //if(e.ctrlKey && isSelected){
              if(isSelected){
                  this.deselectRow(rowIndex);
              }else if(!isSelected || this.getCount() > 1){
                  this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
                  view.focusRow(rowIndex);
              }

          }
      }

  });

	Ext.grid.EPIICheckboxSelectionModel4 = Ext.extend(Ext.grid.CheckboxSelectionModel, {

	   renderer : function (v, p, record){
	   		if(record.get("_parent") == null){
	   			return '<div class="x-grid3-row-checker">&#160;</div>';
	   		} else {
	   			return '';
	   		}
       	}
	
	});

	function checkBoxrenderFunc(v, p, record){
	   		if(record.get("_parent") == null){
	   			return '<div class="x-grid3-row-checker">&#160;</div>';
	   		} else {
	   			return '';
	   		}
       	}
	Ext.grid.EPIICheckboxSelectionModelWithoutChild = Ext.extend(Ext.grid.EPIICheckboxSelectionModel2, {

	   renderer : checkBoxrenderFunc,

	      // private
	   handleMouseDown : function(g, rowIndex, e){

		
			  if (noPerform == undefined || !noPerform) {
		    	  if(e.button !== 0 || this.isLocked()){
		              return;
		          };
	
		          var view = this.grid.getView();
		          if(e.shiftKey && this.last !== false){
		              var last = this.last;
		              this.selectRange(last, rowIndex, e.ctrlKey);
		              this.last = last; // reset the last
		              view.focusRow(rowIndex);
		          }else{
		              var isSelected = this.isSelected(rowIndex);
	
		              //if(e.ctrlKey && isSelected){
		              if(isSelected){
		                  this.deselectRow(rowIndex);
		              }else if(!isSelected || this.getCount() > 1){
		                  this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
		                  view.focusRow(rowIndex);
		              }
	
		          }
		       }
	   },

	    // private
	    onMouseDown : function(e, t){
	    	//return;
	    	if (noPerform == undefined || !noPerform) {
		        if(e.button === 0 && t.className == 'x-grid3-row-checker'){ // Only fire if left-click
		            e.stopEvent();
		            var row = e.getTarget('.x-grid3-row');
		            if(row){
		                var index = row.rowIndex;
		                if(this.isSelected(index)){
		                    this.deselectRow(index);
		                }else{
		                    this.selectRow(index, true);
		                }
		            }
		        }
	    	}
	    },


	    // private
	      onHdMouseDown : function(e, t){
	    	if (noPerform == undefined || !noPerform) {
	          if(t.className == 'x-grid3-hd-checker'){
	              e.stopEvent();
	              var hd = Ext.fly(t.parentNode);
	              var isChecked = hd.hasClass('x-grid3-hd-checker-on');
	              if(isChecked) {
	                  hd.removeClass('x-grid3-hd-checker-on');
	                  this.clearSelections();
	                  this.isSelectAll = false;
	              } else{
	                  hd.addClass('x-grid3-hd-checker-on');
	                  this.selectAll();
	                  this.isSelectAll = true;
	              }
	          }
	    	}
	      }
	
	});


  Ext.EPIITreeGridPagingToolbar = Ext.extend(Ext.ux.maximgb.treegrid.PagingToolbar, {

	    // private
	    onPagingKeydown : function(e){
	        var k = e.getKey(), d = this.getPageData(), pageNum;
	        if (k == e.RETURN) {
	            e.stopEvent();
	            pageNum = this.readPage(d);
	            if(pageNum !== false){
	                pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
	                this.store.baseParams.depth = null;
	                this.doLoad(pageNum * this.pageSize);
	            }
	        }else if (k == e.HOME || k == e.END){
	            e.stopEvent();
	            pageNum = k == e.HOME ? 1 : d.pages;
	            this.field.dom.value = pageNum;
	        }else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN){
	            e.stopEvent();
	            if(pageNum = this.readPage(d)){
	                var increment = e.shiftKey ? 10 : 1;
	                if(k == e.DOWN || k == e.PAGEDOWN){
	                    increment *= -1;
	                }
	                pageNum += increment;
	                if(pageNum >= 1 & pageNum <= d.pages){
	                    this.field.dom.value = pageNum;
	                }
	            }
	        }
	    },
  
    onClick : function(which)
    {
      var store = this.store,
          cursor = store ? store.getActiveNodePageOffset() : 0,
          total = store ? store.getActiveNodeTotalCount() : 0;

      switch(which){
        case "first":
                store.baseParams.depth = null;
          this.doLoad(0);
          break;
        case "prev":
                store.baseParams.depth = null;
          this.doLoad(Math.max(0, cursor - this.pageSize));
          break;
        case "next":
                store.baseParams.depth = "";
          this.doLoad(cursor + this.pageSize);
          break;
                store.baseParams.depth = null;
        case "last":
              var extra = total % this.pageSize;
              var lastStart = extra ? (total - extra) : total - this.pageSize;
              store.baseParams.depth = null;
              this.doLoad(lastStart);
          break;
        case "refresh":
                store.baseParams.depth = null;
          this.doLoad(cursor);
          break;
      }
    },

    onStoreActiveNodeChange : function(store, old_rec, new_rec)
    {
      if (new_rec != undefined && new_rec != null) {
        if (new_rec.is_leaf == true) {
          if (this.rendered) {
            this.updateUI();
          }
        }
      }
    }

  });

  Ext.EPIISelectAllPagingToolbar = Ext.extend(Ext.PagingToolbar, {

    needAlert : false,

    isSelectAllChange: false,

    selectionModel: new Ext.grid.CheckboxSelectionModel(),

    isSelectAll: false,

      getIsSelectAll : function() {
        return this.isSelectAll;
      },

      selectAllCheckBox : new Ext.form.Checkbox(),

  // private
    onRender : function(ct, position){
        Ext.PagingToolbar.superclass.onRender.call(this, ct, position);

        
        this.selectAllCheckBox.on("check", function(checkbox, checked) {
                          if (checked) {
                          this.isSelectAll = true;
                          this.isSelectAllChange = true;
                          this.selectionModel.selectAll();
                                  this.selectionModel.removeDeselectArr();
                                  this.selectionModel.removeSelectArr();
                                  if (Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).hasClass('x-grid3-hd-checker-on')) {
                                } else {
                                  Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).addClass('x-grid3-hd-checker-on');
                              }
                          } else {
                            this.isSelectAll = false;
                                    this.selectionModel.removeDeselectArr();
                                    this.selectionModel.removeSelectArr();
                                    Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).removeClass('x-grid3-hd-checker-on');
                                    this.selectionModel.clearSelections();
                          }
                      }, this, this);
        this.checkBox = this.addField(this.selectAllCheckBox);
        this.label = this.addText("跨页");
        this.first = this.addButton({
            tooltip: this.firstText,
            iconCls: "x-tbar-page-first",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["first"])
        });
        this.prev = this.addButton({
            tooltip: this.prevText,
            iconCls: "x-tbar-page-prev",
            disabled: true,
             handler: this.onClick.createDelegate(this, ["prev"])
        });
        this.addSeparator();
        this.add(this.beforePageText);
        this.field = Ext.get(this.addDom({
           tag: "input",
           type: "text",
           size: "3",
           value: "1",
           cls: "x-tbar-page-number"
        }).el);
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
        this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
        this.field.setHeight(18);
        this.addSeparator();
        this.next = this.addButton({
            tooltip: this.nextText,
            iconCls: "x-tbar-page-next",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["next"])
        });
        this.last = this.addButton({
            tooltip: this.lastText,
            iconCls: "x-tbar-page-last",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["last"])
        });
        this.addSeparator();
        this.loading = this.addButton({
            tooltip: this.refreshText,
            iconCls: "x-tbar-loading",
            handler: this.onClick.createDelegate(this, ["refresh"])
        });

        if(this.displayInfo){
            this.displayEl = Ext.fly(this.el.dom).createChild({cls:'x-paging-info'});
        }
        if(this.dsLoaded){
            this.onLoad.apply(this, this.dsLoaded);
        }
    },
      // private
      onClick : function(which){
          var store = this.store;
          switch(which){
              case "first":
                  if (this.needAlert) {
                      if (this.store.getModifiedRecords().length > 0) {
                        if(spConfirm("列表上的内容已经发生变化，是否不做保存继续翻页?", "确定", "取消")) {
                          this.store.commitChanges();
                          this.doLoad(0);
                        }
                      } else {
                        this.doLoad(0);
                      }
                  } else {
                    this.doLoad(0);
                  }
                  //this.doLoad(0);
              break;
              case "prev":
                  if (this.needAlert) {
                      if (this.store.getModifiedRecords().length > 0) {
                        if(spConfirm("列表上的内容已经发生变化，是否不做保存继续翻页?", "确定", "取消")) {
                          this.store.commitChanges();
                          this.doLoad(Math.max(0, this.cursor-this.pageSize));
                        }
                      } else {
                        this.doLoad(Math.max(0, this.cursor-this.pageSize));
                      }
                  } else {
                    this.doLoad(Math.max(0, this.cursor-this.pageSize));
                  }
                  //this.doLoad(Math.max(0, this.cursor-this.pageSize));
              break;
              case "next":
                  if (this.needAlert) {
                      if (this.store.getModifiedRecords().length > 0) {
                        if(spConfirm("列表上的内容已经发生变化，是否不做保存继续翻页?", "确定", "取消")) {
                          this.store.commitChanges();
                            this.doLoad(this.cursor+this.pageSize);
                        }
                      } else {
                        this.doLoad(this.cursor+this.pageSize);
                      }
                  } else {
                    this.doLoad(this.cursor+this.pageSize);
                  }
                  //this.doLoad(this.cursor+this.pageSize);

              break;
              case "last":
                if (this.needAlert) {
                      if (this.store.getModifiedRecords().length > 0) {
                        if(spConfirm("列表上的内容已经发生变化，是否不做保存继续翻页?", "确定", "取消")) {
                          this.store.commitChanges();
                              var total = store.getTotalCount();
                              var extra = total % this.pageSize;
                              var lastStart = extra ? (total - extra) : total-this.pageSize;
                              this.doLoad(lastStart);
                        }
                      } else {
                          var total = store.getTotalCount();
                          var extra = total % this.pageSize;
                          var lastStart = extra ? (total - extra) : total-this.pageSize;
                          this.doLoad(lastStart);
                      }
                  } else {
                      var total = store.getTotalCount();
                      var extra = total % this.pageSize;
                      var lastStart = extra ? (total - extra) : total-this.pageSize;
                      this.doLoad(lastStart);
                  }
                  //var total = store.getTotalCount();
                  //var extra = total % this.pageSize;
                  //var lastStart = extra ? (total - extra) : total-this.pageSize;
                  //this.doLoad(lastStart);
              break;
              case "refresh":
                  if (this.needAlert) {
                      if (this.store.getModifiedRecords().length > 0) {
                        if(spConfirm("列表上的内容已经发生变化，是否不做保存继续翻页?", "确定", "取消")) {
                          this.store.commitChanges();
                          this.doLoad(this.cursor);
                        }
                      } else {
                        this.doLoad(this.cursor);
                      }
                  } else {
                    this.doLoad(this.cursor);
                  }
                  //this.doLoad(this.cursor);
              break;
          }
      }
  });

  Ext.form.EPIICheckbox = Ext.extend(Ext.form.Checkbox, {
	  onClick : function(e){
	  if (noPerform == undefined || !noPerform) {
	          if (!this.disabled && !this.readOnly) {
	              this.toggleValue();
	          }
	          e.stopEvent();
		} else {
	          e.stopEvent();
		}
}
  });
  
  
  Ext.EPIISelectAllPagingToolbar2 = Ext.extend(Ext.EPIITreeGridPagingToolbar, {

    needAlert : false,

    selectionModel: new Ext.grid.CheckboxSelectionModel(),

    isSelectAllChange: false,
    
    isSelectAll: false,

      getIsSelectAll : function() {
        return this.isSelectAll;
      },

      selectAllCheckBox : new Ext.form.Checkbox(),

  // private
    onRender : function(ct, position){
        Ext.PagingToolbar.superclass.onRender.call(this, ct, position);

        this.selectAllCheckBox.on("check", function(checkbox, checked) {
        				if (noPerform == undefined || !noPerform) {
	                          if (checked) {
		                          this.isSelectAll = true;
		                          this.isSelectAllChange = true;
		                          this.selectionModel.selectAll();
	                              this.selectionModel.removeDeselectArr();
	                              this.selectionModel.removeSelectArr();
	                              if (Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).hasClass('x-grid3-hd-checker-on')) {
	                              } else {
	                              	Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).addClass('x-grid3-hd-checker-on');
	                              }
	                          } else {
	                            this.isSelectAll = false;
                                this.selectionModel.removeDeselectArr();
                                this.selectionModel.removeSelectArr();
                                Ext.get(this.selectionModel.grid.el.query('.x-grid3-hd-checker')[0]).removeClass('x-grid3-hd-checker-on');
                                this.selectionModel.clearSelections();
	                          }
            			  }
                      }, this, this);
       
        this.checkBox = this.addField(this.selectAllCheckBox);
       
        this.label = this.addText("跨页");
        this.first = this.addButton({
            tooltip: this.firstText,
            iconCls: "x-tbar-page-first",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["first"])
        });
        this.prev = this.addButton({
            tooltip: this.prevText,
            iconCls: "x-tbar-page-prev",
            disabled: true,
             handler: this.onClick.createDelegate(this, ["prev"])
        });
        this.addSeparator();
        this.add(this.beforePageText);
        this.field = Ext.get(this.addDom({
           tag: "input",
           type: "text",
           size: "3",
           value: "1",
           cls: "x-tbar-page-number"
        }).el);
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
        this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
        this.field.setHeight(18);
        this.addSeparator();
        this.next = this.addButton({
            tooltip: this.nextText,
            iconCls: "x-tbar-page-next",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["next"])
        });
        this.last = this.addButton({
            tooltip: this.lastText,
            iconCls: "x-tbar-page-last",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["last"])
        });
        this.addSeparator();
        this.loading = this.addButton({
            tooltip: this.refreshText,
            iconCls: "x-tbar-loading",
            handler: this.onClick.createDelegate(this, ["refresh"])
        });

        if(this.displayInfo){
            this.displayEl = Ext.fly(this.el.dom).createChild({cls:'x-paging-info'});
        }
        if(this.dsLoaded){
            this.onLoad.apply(this, this.dsLoaded);
        }
    }
  });


  Ext.EPIITreeGridPanel = Ext.extend(Ext.ux.maximgb.treegrid.GridPanel, {
    /**
     * @access private
     */
    onTreeGridSelectionChange : function(sm, selection)
    {
      //var record;
      // Row selection model
      //if (sm.getSelected) {
      //	record = sm.getSelected();
      //	this.getStore().setActiveNode(record);
      //}
      // Cell selection model
      //else if (Ext.type(selection) == 'array' && selection.length > 0) {
      //	record = store.getAt(selection[0])
      //	this.getStore().setActiveNode(record);
      //}
      //else {
      //	throw "Unknown selection model applyed to the grid.";
      //}
    }
  });


  Ext.Ajax.on("requestcomplete", function(conn, response, option) {
    try {
      var jsonResult = Ext.util.JSON.decode(response.responseText);

      if (jsonResult.success == false) {
        mk.hide(); //关闭
                var stackMessage = jsonResult.errors.stackMessage;
        if (stackMessage != null && stackMessage != "") {
          spError(jsonResult.errors.message, stackMessage);
        } else {
        spAlert(jsonResult.errors.message);
        }
        return false;
      }
    } catch (e) {}

    return true;
  });

  Ext.Ajax.on("requestexception", function(conn, response, option) {
      try {
        Ext.MessageBox.hide();
      }catch(ex) {}

      var message = "HTTP"+response.status+"("+response.statusText+")-网络连接出错或该链结不存在,请确认本机网络是否正常或联系管理员!";

      mk.hide(); //关闭
      spAlert(message);

      return false;

  });
</script><style type="text/css"> 
		
		    
		/* Also remove padding from table data (to compensate for added grid lines) */   
		.x-grid3-row td, .x-grid3-summary-row td {   
		    padding-left: 0px;   
		    padding-right: 0px;   
		} 
		.x-grid-back-red {   
    		background: #FF0000;   
		} 
		.x-grid-record-red table{   
   			 color: #FF0000;   
		} 
		</style>
