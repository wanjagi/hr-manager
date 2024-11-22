Ext.define('hrm.view.main.MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainview',

    layout: 'card',  // Using card layout to switch between different panels

    items: [
        {
            xtype: 'employeegrid',  // Grid for managing employees
            itemId: 'employeeGrid'
        },
        {
            xtype: 'equipmentgrid',  // Grid for managing equipment
            itemId: 'equipmentGrid'
        },
        {
            xtype: 'allequipmentsgrid',  // Grid for managing equipment
            itemId: 'allequipmentsGrid'
        },
       
    ],

    tbar: [
        {
            text: 'Manage Employees',
            handler: function(button) {
                // Switch to Employee Grid view
                let mainPanel = button.up('panel');
                mainPanel.getLayout().setActiveItem('employeeGrid');
            }
        },
        {
            text: 'Manage Equipment',
            handler: function(button) {
                // Switch to Equipment Grid view
                let mainPanel = button.up('panel');
                mainPanel.getLayout().setActiveItem('equipmentGrid');
            }
        },
        {
            text: 'Manage Equipment',
            handler: function(button) {
                // Switch to Equipment Grid view
                let mainPanel = button.up('panel');
                mainPanel.getLayout().setActiveItem('allequipmentsGrid');
            }
        },
        /*{
            text: 'Issue Equipment',
            handler: function(button) {
                // Switch to Equipment Form view for issuing new equipment
                let mainPanel = button.up('panel');
                mainPanel.getLayout().setActiveItem('equipmentForm');
                mainPanel.down('equipmentform').reset();  // Reset the form for a new entry
            }
        }*/
    ]
});
