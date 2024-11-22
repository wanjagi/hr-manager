Ext.define('hrm.view.user.RequestEquipmentForm', {
    extend: 'Ext.form.Panel',
    xtype: 'requestequipmentform',

    items: [
        {
            xtype: 'combo',
            fieldLabel: 'Select Equipment',
            store: 'EquipmentStore', // Store containing available equipment
            displayField: 'name',
            valueField: 'id',
            name: 'equipment_id',
            allowBlank: false
        },
        {
            xtype: 'button',
            text: 'Submit Request',
            handler: 'onSubmitRequestClick'
        }
    ]
});
