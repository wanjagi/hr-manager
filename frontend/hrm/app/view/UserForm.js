Ext.define('hrm.view.UserForm', {
    //extend: 'Ext.form.Panel',
    extend: 'Ext.window.Window',
    xtype: 'userform',

    controller: 'users',

    items: {
        xtype: 'form',
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false
        },
        items: [
            { xtype: 'textfield', name: 'name', fieldLabel: 'Name', allowBlank: false },
            { xtype: 'textfield', name: 'email', fieldLabel: 'Email', allowBlank: false },
            { xtype: 'textfield', name: 'role', fieldLabel: 'Role', allowBlank: false }
        ],
    },


    
    buttons: [
        { text: 'Save', handler: 'onSaveUserClick' },
        {
            text: 'Cancel',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]
});
