// File: app/view/employee/EmployeeDetail.js
Ext.define('hrm.view.employee.EmployeeDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.employeedetail',

    viewModel: {
        type: 'employeedetail'
    },

    title: 'Employee Details',
    layout: 'vbox',
    width: 600,
    padding: 10,
    scrollable: true,

    // Configurations and items for the Employee Detail Panel
    items: [
        {
            xtype: 'form',
            reference: 'employeeDetailForm',
            layout: 'form',
            width: '100%',
            defaults: {
                xtype: 'displayfield',
                labelWidth: 120,
                anchor: '100%',
            },
            items: [
                {
                    fieldLabel: 'Name',
                    name: 'name',
                    bind: '{selectedEmployee.name}'
                },
                {
                    fieldLabel: 'Email',
                    name: 'email',
                    bind: '{selectedEmployee.email}'
                },
                {
                    fieldLabel: 'Registration Number',
                    name: 'registration',
                    bind: '{selectedEmployee.registration}'
                },
                {
                    fieldLabel: 'ID Number',
                    name: 'idNumber',
                    bind: '{selectedEmployee.idNumber}'
                },
                {
                    xtype: 'image',
                    fieldLabel: 'Profile Picture',
                    bind: {
                        src: '{selectedEmployee.profilePicture}',
                    },
                    height: 150,
                    width: 150,
                    alt: 'Profile Picture'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'Issued Equipment',
            reference: 'issuedEquipmentGrid',
            width: '100%',
            height: 300,
            bind: {
                store: '{issuedEquipmentStore}' // Assumes there's a view model managing this data
            },
            columns: [
                { text: 'Equipment Name', dataIndex: 'equipmentName', flex: 1 },
                { text: 'Serial Number', dataIndex: 'serialNumber', flex: 1 },
                { text: 'Issued Date', dataIndex: 'issuedDate', flex: 1 },
                { text: 'Return Date', dataIndex: 'returnDate', flex: 1 },
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add Equipment',
                            iconCls: 'x-fa fa-plus',
                            handler: 'onAddEquipment'
                        },
                        {
                            text: 'Remove Equipment',
                            iconCls: 'x-fa fa-trash',
                            handler: 'onRemoveEquipment',
                            bind: {
                                disabled: '{!issuedEquipmentGrid.selection}' // Disable if no equipment selected
                            }
                        }
                    ]
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Edit Employee',
            handler: 'onEditEmployee',
            iconCls: 'x-fa fa-edit',
        },
        {
            text: 'Close',
            handler: 'onCloseDetail',
            iconCls: 'x-fa fa-times',
        }
    ]
});
