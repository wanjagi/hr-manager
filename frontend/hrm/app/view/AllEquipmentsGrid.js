Ext.define('hrm.view.AllEquipmentsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allequipmentsgrid',

    requires: [
        'hrm.view.AllEquipmentsController',
        'hrm.store.AllEquipments'
    ],

    store: {
        type: 'allequipments'
    },
    height: 600,

    selModel: {
        type: 'checkboxmodel',
        mode: 'MULTI'
    },

    title: 'All Equipments',
    controller: 'allequipments',

    
    bodyStyle: 'background-color: #f9f8f9; padding: 10px;',
    columnLines: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    columns: [
        { text: 'ID', dataIndex: 'id', flex: 1, align: 'center', style: 'font-weight: bold;' },
        { text: 'Name', dataIndex: 'name', flex: 2, align: 'center', style: 'font-weight: bold;' },
        { text: 'Serial Number', dataIndex: 'serial_number', flex: 2, align: 'center', style: 'font-weight: bold;' },
        { text: 'Description', dataIndex: 'description', flex: 2, align: 'center', style: 'font-weight: bold;' },
        { 
            text: 'Actions', 
            xtype: 'actioncolumn', 
            width: 100,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Equipment',
                    style: 'color: #007bff;', 
                    handler: 'onEditEquipmentclick'
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Equipment',
                    style: 'color: #dc3545;', 
                    handler: 'onDeleteEquipment'
                }
            ]
        }
    ],

    tbar: [
        {
            text: 'Add Equipment',
            iconCls: 'x-fa fa-plus-circle', 
            scale: 'medium',
            handler: 'onAddEquipmentClick'
        }
    ],

    
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying equipments {0} - {1} of {2}',
        emptyMsg: 'No equipment to display'
    }
});
