Ext.define('CookBook.view.misnew.ViewMISNewAddEmailButton', {
    extend: 'Ext.Button',
    alias:  'widget.viewMISNewAddEmailButton',

    //options
    text:               'Add Email(s)',

    name:               'summaryMISNewAddEmailButton',


    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Click to add selected email addresses to the Add Email textbox'
            });
        },
        
        /* TODO:  Add code to make sure duplicates don't appear inside and between the Add/Delete boxes */
        click: function() {
            var destination = Ext.ComponentQuery.query('viewMISNewDistributionAddEmail');
            var emails = Ext.ComponentQuery.query('viewMISNewDistributionSelectEmail');
            
            var destValue = destination[0].getValue();
            if (destValue) {
                destination[0].setValue(destValue + '; ' + emails[0].getRawValue());
            }
            else {
                destination[0].setValue(emails[0].getRawValue());
            }
        }
    }
    
});