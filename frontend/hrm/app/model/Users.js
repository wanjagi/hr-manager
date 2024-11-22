// app/model/Users.js
Ext.define('hrm.model.Users', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'role', type: 'string' },
        
    ]
});
