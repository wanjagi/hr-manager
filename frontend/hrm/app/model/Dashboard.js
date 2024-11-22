// app/model/Employee.js
Ext.define('hrm.model.Dashboard', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'totalEmployees', type: 'string' },
        { name: 'totalEquipments', type: 'string' },
        { name: 'issuedEquipments', type: 'string' },
        { name: 'availableEquipments', type: 'string' },

    ]
});
