var viewTLSSaaSAssessmentGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentsGrid')[0];
            grid.getView().refresh();
        }
    }
});

function updateTLSSaaSHours() {
    var grid = Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentsGrid')[0];
    var count = grid.getStore().getCount();

    var totaltlsSaaShours = 0;
    var totaltlsSaaSCodingHours = 0;
    var totaltlsSaaSTestingHours = 0;
    var totaltlsSaaSUATImpHours = 0;
    var totaltlsSaaSUATSupHours = 0;
    var totaltlsSaaSProdImpHours = 0;
    var totaltlsSaaSOtherHours = 0;

    var totalTlsSaaSTypesToCheck = new Array();
    totalTlsSaaSTypesToCheck.push("Coding TLS_SaaS");
    totalTlsSaaSTypesToCheck.push("Testing TLS_SaaS");
    totalTlsSaaSTypesToCheck.push("UAT Implementation TLS_SaaS");
    totalTlsSaaSTypesToCheck.push("UAT Support TLS_SaaS");
    totalTlsSaaSTypesToCheck.push("Production Implementation TLS_SaaS");
    totalTlsSaaSTypesToCheck.push("Other TLS_SaaS");

    for (var k = 0; k < count; k++) {
        currType = grid.getStore().getAt(k).get('type');
        if (totalTlsSaaSTypesToCheck.indexOf(currType) != -1) {
            switch (currType) {
            case "Coding TLS_SaaS":
                {
                    totaltlsSaaSCodingHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            case "Testing TLS_SaaS":
                {
                    totaltlsSaaSTestingHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            case "UAT Implementation TLS_SaaS":
                {
                    totaltlsSaaSUATImpHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            case "UAT Support TLS_SaaS":
                {
                    totaltlsSaaSUATSupHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            case "Production Implementation TLS_SaaS":
                {
                    totaltlsSaaSProdImpHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            case "Other TLS_SaaS":
                {
                    totaltlsSaaSOtherHours += grid.getStore().getAt(k).get('hours') * 1;
                    totaltlsSaaShours += grid.getStore().getAt(k).get('hours') * 1;
                    break;
                }
            default:
                break;
            }
        }
    }
    Ext.ComponentQuery.query('#billableTLSSaaSHours')[0].setText(totaltlsSaaShours);
    Ext.ComponentQuery.query('#tlssaasCodingLbl')[0].setText(totaltlsSaaSCodingHours);
    Ext.ComponentQuery.query('#tlssaasTestingLbl')[0].setText(totaltlsSaaSTestingHours);
    Ext.ComponentQuery.query('#tlssaasUATImplementationLbl')[0].setText(totaltlsSaaSUATImpHours);
    Ext.ComponentQuery.query('#tlssaasUATSupportLbl')[0].setText(totaltlsSaaSUATSupHours);
    Ext.ComponentQuery.query('#tlssaasProductionImplementationLbl')[0].setText(totaltlsSaaSProdImpHours);
    Ext.ComponentQuery.query('#tlssaasOtherLbl')[0].setText(totaltlsSaaSOtherHours);
}

Ext.define('CookBook.view.tls.ViewTLSTLSSaaSAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewTLSTLSSaaSAssessment',
    width: 1410,
    height: 450,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'TLS SaaS Assessments',
    itemId: 'tlsTabTLSSaaSAssessmentsGrid',
    store: 'TLSSaaSAssessments',
    plugins: [viewTLSSaaSAssessmentGridCellEditing],
    bodyCls: 'x-panel-with-col-lines',
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        header: 'Contact Name',
        dataIndex: 'name',
        tdCls: 'column-lines-enabled',
        flex: 2,
        sortable: false,
        editor: {
            xtype: 'combobox',
            store: 'TLSContacts',
            displayField: 'name',
            valueField: 'name',
            typeAhead: false,
            allowBlank: false,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local',
            value: '',
            emptyText: '',
            lastQuery: '',
            listeners: {
                'change': function(t, nv) {
                    if (Ext.isEmpty(nv)) {
                        t.setValue('');
                    }
                },
                expand: function() {
                    this.store.filter([{
                        property: 'company_name',
                        value: 'usan'
                    }]);
                },
                collapse: function() {
                    this.store.clearFilter();
                }
            }
        },
        summaryType: function(records) {
            if (records.length > 0) {
                var type = records[0].get('description');
                var value = records.length;
                return ((value === 0 || value > 1) ? '(' + value + ' ' + records[0].get('type') + ' Entries)' : '(1 ' + records[0].get('type') + ' Entry)');
            }
        }
    }, {
        header: 'Type',
        sortable: false,
        dataIndex: 'type'
    }, {
        text: 'Notes',
        flex: 3,
        dataIndex: 'action',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'Billed Hours',
        dataIndex: 'hours',
        tdCls: 'column-lines-enabled',
        flex: 1,
        sortable: false,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        updateTLSSaaSHours();
                    }, 1000);
                }
            }
        },
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('hours') * 1;
            }
            return total + " Billed";
        }
    }, {
        header: 'Booked Hours',
        dataIndex: 'booked_hours',
        tdCls: 'column-lines-enabled',
        flex: 1,
        sortable: false,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        updateTLSSaaSHours();
                    }, 1000);
                }
            }
        },
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('booked_hours') * 1;
            }
            return total + " Booked";
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        sortable: false,
        hideable: false,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {
                if (GLOBAL_readonly) {
                    return;
                }
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
                    return;
                }
                Ext.defer(function() {
                    updateTLSSaaSHours();
                }, 1000);
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    tools: [{
        type: 'refresh',
        tooltip: 'Sort',
        handler: function(event, toolEl, panel) {
            var store = panel.up().getStore();
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
                readOnly = true;
            }
            store.proxy.extraParams.read_only = readOnly;
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load({
                callback: function(records, operation, success) {
                    Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#TLS')[0].doLayout();
                    Ext.defer(function() {
                        updateTLSSaaSHours();
                    }, 1000)
                }
            });
        }
    }, {
        type: 'plus',
        tooltip: 'Add an entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
                return;
            }
            var gridPanel = panel.up();
            Ext.create("Ext.Window", {
                title: "Add TLS SaaS Assessment",
                modal: true,
                width: 400,
                bodyStyle: "padding:10px",
                items: [{
                    xtype: 'label',
                    width: 375,
                    html: "<b>Please select which TLS SaaS Assessment type to add.</b><br /><br />"
                }, {
                    xtype: 'combobox',
                    width: 375,
                    editable: false,
                    store: {
                        fields: ['type'],
                        data: [{
                            'type': 'Coding'
                        }, {
                            'type': 'Testing'
                        }, {
                            'type': 'UAT Implementation'
                        }, {
                            'type': 'UAT Support'
                        }, {
                            'type': 'Production Implementation'
                        }, {
                            'type': 'Other'
                        }]
                    },
                    multiSelect: false,
                    displayField: 'type',
                    valueField: 'type',
                    matchFieldWidth: true,
                    listConfig: {
                        autoHeight: true,
                        loadMask: false
                    },
                    name: 'tlsTabTLSSaaSAssessmentTypeCombobox',
                    itemId: 'tlsTabTLSSaaSAssessmentTypeCombobox'
                }],
                buttons: [{
                    text: "Add Selected Assessment",
                    itemId: 'tlsTabAddTLSSaaSAssessmentButton',
                    handler: function() {
                        var eto = this;
                        var choice = Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentTypeCombobox')[0].getValue();
                        var submittedval = "";
                        switch (choice) {
                        case "Coding":
                            {
                                submittedval = "Coding TLS_SaaS";
                                break;
                            }
                        case "Testing":
                            {
                                submittedval = "Testing TLS_SaaS";
                                break;
                            }
                        case "UAT Implementation":
                            {
                                submittedval = "UAT Implementation TLS_SaaS";
                                break;
                            }
                        case "UAT Support":
                            {
                                submittedval = "UAT Support TLS_SaaS";
                                break;
                            }
                        case "Production Implementation":
                            {
                                submittedval = "Production Implementation TLS_SaaS";
                                break;
                            }
                        case "Other":
                            {
                                submittedval = "Other TLS_SaaS";
                                break;
                            }
                        default:
                            {
                                submittedval = "Other TLS_SaaS";
                                break;
                            }
                        }
                        if (!Ext.isEmpty(choice)) {
                            if (GLOBAL_readonly) {
                                return;
                            }
                            console.log('choice made: ' + choice);
                            if (gridPanel.collapsed) {
                                gridPanel.expand(true);
                            }
                            gridPanel.getStore().add({
                                project_id: GLOBAL_currentProjectOpenProjectID,
                                type: submittedval
                            }); //add an empty row
                            var choice = Ext.ComponentQuery.query('#tlsTabAddTLSSaaSAssessmentButton')[0].disable();
                            Ext.defer(function() {
                                if (Ext.ComponentQuery.query('#tlsTabAddTLSSaaSAssessmentButton')[0]) {
                                    var choice = Ext.ComponentQuery.query('#tlsTabAddTLSSaaSAssessmentButton')[0].enable();
                                }
                            }, 500);
                        } else {
                            console.log('choice is not valid');
                        }
                    }
                }, {
                    text: "Finished",
                    handler: function() {
                        var store = Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentsGrid')[0].getStore();
                        var readOnly = false;
                        if (GLOBAL_readonly) {
                            readOnly = true;
                        }
                        if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
                            readOnly = true;
                        }
                        store.proxy.extraParams.read_only = readOnly;
                        store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                        store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
                        store.load({
                            callback: function(records, operation, success) {
                                Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
                                Ext.ComponentQuery.query('#TLS')[0].doLayout();
                                Ext.defer(function() {
                                    updateTLSSaaSHours();
                                }, 1000)
                            }
                        });
                        this.up('window').close();
                    }
                }]
            }).show();
        }
    }],
    listeners: {
        expand: function() {
            Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
            Ext.ComponentQuery.query('#TLS')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
            Ext.ComponentQuery.query('#TLS')[0].doLayout();
        }
    }
});