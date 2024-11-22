Ext.define('hrm.view.EquipmentForm', {
    extend: 'Ext.window.Window',
    xtype: 'equipmentform',

    
    controller: 'employee',
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
            {
                xtype: 'combobox',
                fieldLabel: 'Employee',
                name: 'employee_name',
                store: {
                    type: 'employee'  // Using the employee store created above
                },
                displayField: 'name',  // Display the employee's name
                valueField: 'name',      // Use the employee's ID for submission
                queryMode: 'remote',   // Query remote API for employees
                allowBlank: false,     // Make this a required field
                forceSelection: true,  // Force the user to select from the list
                editable: false,       // Disable typing in the combobox
                emptyText: 'Select an employee'
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Equipment',
                name: 'equipment_name',
                store: {
                    type: 'allequipments'  // Using the employee store created above
                },
                displayField: 'name',  // Display the employee's name
                valueField: 'name',      // Use the employee's ID for submission
                queryMode: 'remote',   // Query remote API for employees
                allowBlank: false,     // Make this a required field
                forceSelection: true,  // Force the user to select from the list
                editable: false,       // Disable typing in the combobox
                emptyText: 'Select an equipment'
            },
            /*{
                xtype: 'textfield',
                name: 'equipment_name',
                fieldLabel: 'Equipment Name',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'issued_by',
                fieldLabel: 'Issued By',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description',
                allowBlank: false
            }
            /*{
                xtype: 'datefield',
                name: 'date_issued',
                allowBlank: false,  // Make the field mandatory
                editable: true,  
                format: 'Y-m-d',
                fieldLabel: 'Date Issued',
                allowBlank: true
            }*/
        ],
    },


    
    buttons: [
        {
            text: 'Save',
            handler: 'onSaveIssueEquipmentClick'  
        },
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        }
    ]
});
