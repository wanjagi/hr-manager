Ext.define('hrm.view.Activity', {
    extend: 'Ext.grid.Panel',
    xtype: 'recentactivity',

    requires: [
        
        'hrm.view.EmployeeController',
        'hrm.store.Equipment',
    ],

    store: {
        type: 'equipment'
    },

    title: 'Recent Activity',


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
        { text: 'Equipment', dataIndex: 'equipment_name', flex: 2 },
        { text: 'issued to', dataIndex: 'employee_name', flex: 2 },
        { text: 'Issued On', dataIndex: 'created_at', flex: 2 },
        //{ text: 'Description', dataIndex: 'description', flex: 1 },
        // {
        //     text: 'Actions',
        //     xtype: 'actioncolumn',
        //     items: [
        //         {
        //             iconCls: 'x-fa fa-edit',
        //             tooltip: 'Edit Equipment',
        //             handler: 'onEditEquipment'
        //         },
        //         {
        //             iconCls: 'x-fa fa-trash',
        //             tooltip: 'Delete Equipment',
        //             handler: 'onDeleteEquipment'
        //         }
               
        //     ]
        // }, 
    ],
   
});
