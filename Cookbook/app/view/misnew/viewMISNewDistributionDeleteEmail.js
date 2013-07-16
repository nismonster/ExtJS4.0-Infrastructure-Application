Ext.define('CookBook.view.misnew.ViewMISNewDistributionDeleteEmail', {
    extend: 'Ext.form.field.TextArea',
    alias:  'widget.viewMISNewDistributionDeleteEmail',

    //options
    allowBlank: false,
    fieldLabel: 'Emails to Delete',
    labelAlign: 'top',
    value: '',

    name: 'misNewDistributionDeleteEmail'
    
    /*
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Enter email addresses to remove from the distribution, separated by commas'
            });
        }
    }
    */
});