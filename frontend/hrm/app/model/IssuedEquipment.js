// File: app/model/IssuedEquipment.js
Ext.define('hrm.model.IssuedEquipment', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'employee_id', type: 'string' },
        { name: 'equipment_id', type: 'string' },
        { name: 'issued_date', type: 'date' },
        { name: 'return_date', type: 'date' }
    ]
});
