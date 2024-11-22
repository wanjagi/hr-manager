Ext.define('hrm.view.IssuedEquipmentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'issued-equipment-panel',

    requires: [
        'hrm.store.IssuedEquipment'
    ],

    controller: 'employee',

    title: 'Issued Equipment',
    layout: 'fit',

    items: {
        xtype: 'grid',
        store: {
            type: 'issuedequipment'
        },
        columns: [
            { text: 'Employee', dataIndex: 'employee_id', flex: 1, renderer: function(value, metaData, record) {
                return record.get('employee').name;
            }},
            { text: 'Equipment', dataIndex: 'equipment_id', flex: 1, renderer: function(value, metaData, record) {
                return record.get('equipment').name;
            }},
            { text: 'Issued Date', dataIndex: 'issued_date', flex: 1 },
            {
                xtype: 'actioncolumn',
                width: 50,
                items: [
                    {
                        iconCls: 'x-fa fa-undo',
                        tooltip: 'Return',
                        handler: 'onReturnEquipment'
                    }
                ]
            }
        ],

        tbar: [
            {
                text: 'Issue Equipment',
                handler: 'onIssueEquipment'
            }
        ]
    }
});
