Ext.define('hrm.view.AllEquipmentsForm', {
    //extend: 'Ext.form.Panel',
    extend: 'Ext.window.Window',
    xtype: 'allequipmentsform',

    controller: 'allequipments',

    modal: true,
    width: 600,
    height: 600,
    layout: 'fit',
    resizable: false,
    closable: true,
    padding: 10,

    items: {
        xtype: 'form',
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false
        },
        items: [
            { xtype: 'textfield', name: 'name', fieldLabel: 'Name', allowBlank: false },
            { xtype: 'textfield', name: 'serial_number', fieldLabel: 'Serial Number', allowBlank: false },
            { xtype: 'textfield', name: 'description', fieldLabel: 'Description', allowBlank: false }
        ],
    },


    
    buttons: [
        { text: 'Save', handler: 'onSaveEquipmentClick' },
        {
            text: 'Cancel',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]
});
