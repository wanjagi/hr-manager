Ext.define('hrm.view.user.UserDashboard', {
    extend: 'Ext.grid.Panel',
    xtype: 'userdashboard',

    requires: [
        
        'hrm.view.EmployeeController',
        'hrm.store.Employee',
    ],

    store: {
        type: 'employee'
    },

    title: 'Dashboard',


    controller: 'employee',

    columns: [
        { text: 'ID', dataIndex: 'id', flex: 1 },
        { text: 'Name', dataIndex: 'name', flex: 2 },
        { text: 'Email', dataIndex: 'email', flex: 2 },
        { text: 'Contact', dataIndex: 'contact', flex: 2 },
        { text: 'Actions', xtype: 'actioncolumn', items: [
            {
                iconCls: 'x-fa fa-edit',
                handler: 'onEditEmployee'
            },
            {
                iconCls: 'x-fa fa-trash',
                handler: 'onDeleteEmployee'
            }
        ]}
    ],
    tbar: [{
        text: 'Request Equipment',
        handler: 'onAddEmployeeClick'
    }]
});
