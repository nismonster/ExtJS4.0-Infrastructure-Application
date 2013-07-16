Ext.define('CookBook.view.misupdates.ViewMISUpdatesChangeDnis', {
	extend: 'Ext.grid.Panel',
	alias:  'widget.viewMISUpdatesChangeDnis',

	name: 'misupdatesChangeDnis',

	title: 'Change Dnis',
	collapsible: true,
	collapseFirst: true,
	collapsed: true,
	//region: 'center',
			
	store: 'MISUpdateChangeDnises',

	/*store: {
		fields: ['dnis','reroute_to','platform','description','remove_from','platform_from','effective_date'],
		data: [ ]
	},*/
	columns: [
		{ header: 'Existing Dnis', width: 96, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
		{ header: 'APP/MIS To Be Added To', width: 144, dataIndex: 'reroute_to', editor: {
												xtype: 'combobox',
												store: 'Applications',
												multiSelect:		false,
												displayField:		'name',
												valueField:			'name',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Platform', width: 64, dataIndex: 'platform', editor: {
												xtype:				'combobox',
												store:				'Platforms',
												multiSelect:		true,
												displayField:		'platform1',
												valueField:			'platform1',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Description', width: 100, flex: 1, dataIndex: 'description', editor: {xtype: 'textfield'}},
		{ header: 'APP/MIS To Be Removed From', width: 144, dataIndex: 'remove_from', editor: {
												xtype: 'combobox',
												store: 'Applications',
												multiSelect:		false,
												displayField:		'name',
												valueField:			'name',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Platform', width: 64, dataIndex: 'platform_from', editor: {
												xtype:				'combobox',
												store:				'Platforms',
												multiSelect:		true,
												displayField:		'platform1',
												valueField:			'platform1',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Effective Date', /*xtype: 'datecolumn',*/ width: 100, dataIndex: 'effective_date', editor: {xtype: 'textDate', format: 'm/d/y'}, 
																									  renderer: function (value, metaData) {
																										if (value == null) {
																											return;
																										}

																										var pattern = /T00:00:00/;
																										if (pattern.test(value.toString())) {
																											var datestring = value.substring(0, value.indexOf('T'));
																											var month = datestring.substring(5,7);
																											var day   = datestring.substring(8,10);
																											var year  = datestring.substring(0,4);
																											return month + "/" + day + "/" + year;
																										}

																										pattern = /00:00:00/;
																									    if (pattern.test(value.toString())) {
																											return Ext.util.Format.date(value, 'm/d/Y');
																									    }

																										return value;
																									  }},
		{ xtype: 'actioncolumn', width: 22, items: [{
												icon: 'extjs/examples/restful/images/delete.png',
												tooltip: 'click to delete this row',
												handler: function (grid, rowIndex, colIndex) {
													grid.getStore().removeAt(rowIndex);
												}
											}]
		}
	],
	selType: 'cellmodel',
	columnLines: true,
	plugins: [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})
	],
	viewConfig: {
		//stripeRows: true
	},
	tools: [
		{
			type: 'plus',
			tooltip: 'Add another entry to this table',
			handler: function (event, toolEl, panel) {
				var gridPanel = panel.up();
				gridPanel.getStore().add({
					mis_update_id:GLOBAL_currentProjectOpenMISUpdatesID
				});  //add an empty row
			}
		},{
			type: 'refresh',
			handler: function(event, toolEl, panel) {
				var gridPanel = panel.up();
				gridPanel.getStore().sync();
			}
		}
	]
});