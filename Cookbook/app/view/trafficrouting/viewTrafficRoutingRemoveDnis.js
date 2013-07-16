Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingRemoveDnis', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewTrafficRoutingRemoveDnis',
    
    name: 'trafficroutingRemoveDnis',
    
    title: 'Remove Dnis',
    collapsible: true,
    collapseFirst: true,
    collapsed: true,
    //region: 'center',
    
    store: 'TrafficRoutingRemoveDnises',
    columns: [{
        header: 'Existing Dnis',
        width: 96,
        dataIndex: 'dnis',
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'APP To Be Removed From',
        width: 144,
        dataIndex: 'remove_from',
        editor: {
            xtype: 'combobox',
            store: 'Applications',
            multiSelect: false,
            displayField: 'name',
            valueField: 'name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'Platform',
        width: 64,
        dataIndex: 'platform',
        editor: {
            xtype: 'combobox',
            store: 'Platforms',
            multiSelect: true,
            displayField: 'platform1',
            valueField: 'platform1',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'Description',
        width: 80,
        flex: 1,
        dataIndex: 'description',
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'USAN Prod Routing',
        columns: [{
            header: 'Date', /*xtype: 'datecolumn',*/
            width: 100,
            dataIndex: 'usan_date',
            editor: {
                xtype: 'textDate',
                format: 'm/d/y'
            },
            renderer: function(value, metaData){
                if (value == null) {
                    return;
                }
                
                var pattern = /T00:00:00/;
                if (pattern.test(value.toString())) {
                    var datestring = value.substring(0, value.indexOf('T'));
                    var month = datestring.substring(5, 7);
                    var day = datestring.substring(8, 10);
                    var year = datestring.substring(0, 4);
                    return month + "/" + day + "/" + year;
                }
                
                pattern = /00:00:00/;
                if (pattern.test(value.toString())) {
                    return Ext.util.Format.date(value, 'm/d/Y');
                }
                
                return value;
            }
        }, {
            header: 'Time (EST)',
            width: 100,
            dataIndex: 'usan_time',
            editor: {
                xtype: 'textTime',
                increment: 15
            },
            renderer: function(value, metaData){
                if (value == null) {
                    return;
                }
                
                var pattern = /01-01/;
                if (pattern.test(value.toString())) {
                    var d = Ext.Date.parse(value, 'c');
                    return Ext.util.Format.date(d, 'g:i A');
                }
                
                pattern = /Jan \d/;
                if (pattern.test(value.toString())) {
                    var d = Ext.Date.parse(value, 'c');
                    return Ext.util.Format.date(d, 'g:i A');
                }
                
                return value;
            }
        }]
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex){
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        }]
    }],
    selType: 'cellmodel',
    columnLines: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    tools: [{
        type: 'plus',
        tooltip: 'Add another entry to this table',
        handler: function(event, toolEl, panel){
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
                var gridPanel = panel.up();
                gridPanel.getStore().add({
                    project_id: GLOBAL_currentProjectOpenProjectID
                }); //add an empty row
            }
        }
    }]
});
