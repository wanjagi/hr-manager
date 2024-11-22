// app/model/Employee.js
Ext.define('hrm.model.Equipment', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'employee_name', type: 'string', mapping: 'employee.name' },
        { name: 'equipment_name', type: 'string' },
        {name: 'created_at', type: 'date'},
        //{name: 'returned_on', type: 'date'},
        //{ name: 'issued_by', type: 'string' },
        //{ name: 'description', type: 'string' }
    ]
});
