// app/model/Employee.js
Ext.define('hrm.model.UserEquipment', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'user_id', type: 'string'},
        { name: 'equipment_id', type: 'string' },
        {name: 'status', type: 'string'}
        //{ name: 'issued_by', type: 'string' },
        //{ name: 'description', type: 'string' }
    ]
});
