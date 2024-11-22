Ext.define('hrm.view.EquipmentGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'equipmentgrid',

    requires: [
        
        'hrm.view.EmployeeController',
        'hrm.store.Equipment',
    ],

    store: {
        type: 'equipment'
    },
    height: 600,

    selModel: {
        type: 'checkboxmodel', // checkboxes for selection
        mode: 'MULTI' // multiple selections
    },

    title: 'Equipments',


    controller: 'employee',

    /*store: {
        type: 'equipment',
        autoLoad: true,
        proxy: {
            type: 'rest',
            url: '/api/equipment',
            reader: {
                type: 'json',
                rootProperty: 'data',
            }
        }
    },*/
    columns: [
        //{ text: 'Employee id', dataIndex: 'employee_id', flex: 2 },
        //{ text: 'ID', dataIndex: 'id', flex: 1 },
        { text: 'Employee', dataIndex: 'employee_name', flex: 2 },
        { text: 'Equipment', dataIndex: 'equipment_name', flex: 2 },
        //{ text: 'Issued By', dataIndex: 'issued_by', flex: 1 },
        //{ text: 'Description', dataIndex: 'description', flex: 1 },
        {
            text: 'Actions',
            xtype: 'actioncolumn',
            items: [
                // {
                //     iconCls: 'x-fa fa-edit',
                //     tooltip: 'Edit Equipment',
                //     handler: 'onEditIssueEquipment'
                // },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Equipment',
                    handler: 'onDeleteEquipment'
                },
                {
                    iconCls: 'x-fa fa-check',  
                    tooltip: 'Mark as Returned',
                    
                }
                
                
                
                
            ]
        }
    ],
    tbar: [{
        text: 'Issue Equipment',
        handler: 'onIssueEquipmentClick'
    }]
});
