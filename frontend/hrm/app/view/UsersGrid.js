Ext.define('hrm.view.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    requires: [
        
        'hrm.view.UsersController',
        'hrm.store.Users',
    ],
    height: 600,

    store: {
        type: 'users'
    },

    selModel: {
        type: 'checkboxmodel', // checkboxes for selection
        mode: 'MULTI' // multiple selections
    },

    title: 'Users',


    controller: 'users',

    columns: [
        { text: 'ID', dataIndex: 'id', flex: 1 },
        { text: 'Name', dataIndex: 'name', flex: 2 },
        { text: 'Email', dataIndex: 'email', flex: 2 },
        { text: 'Role', dataIndex: 'role', flex: 2 },
        { text: 'Actions', xtype: 'actioncolumn', items: [
            {
                iconCls: 'x-fa fa-edit',
                handler: 'onEditUser'
            },
            {
                iconCls: 'x-fa fa-trash',
                handler: 'onDeleteUserWidgetclick'
            }
        ]}
    ],
    tbar: [{
        text: 'Add User',
        handler: 'onAddUserClick',
        hidden: true
    }]
});
