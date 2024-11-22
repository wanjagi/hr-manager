// app/model/Employee.js
Ext.define('hrm.model.Employee', {
    extend: 'Ext.data.Model',
    fields: [
        //{name: 'id', type: 'int'},
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'contact', type: 'string' },
        
    ]
});
