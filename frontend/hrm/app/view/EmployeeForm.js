Ext.define('hrm.view.EmployeeForm', {
    extend: 'Ext.window.Window',
    xtype: 'employeeform',

    controller: 'employee',

    title: 'Employee Details',
    modal: true,
    width: 600,
    height: 600,
    layout: 'fit',
    resizable: false,
    closable: true,
    padding: 10,

    items: {
        xtype: 'form',
        bodyPadding: 10,
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false,
            labelAlign: 'top',
            padding: '0 0 10 0'
        },
        items: [
            { name: 'name', fieldLabel: 'Name', allowBlank: false },
            { 
                name: 'email', 
                fieldLabel: 'Email', 
                vtype: 'email', // Ensures valid email format
                allowBlank: false 
            },
            { 
                name: 'contact', 
                fieldLabel: 'Contact Number', 
                allowBlank: false 
            }
        ]
    },

    buttons: [
        {
            text: 'Save',
            iconCls: 'x-fa fa-save',
            formBind: true, // Disable button until form is valid
            handler: 'onSaveEmployeeClick'
        },
        {
            text: 'Cancel',
            iconCls: 'x-fa fa-times',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]
});
