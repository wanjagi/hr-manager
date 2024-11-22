// app/store/Employee.js
Ext.define('hrm.store.Equipment', {
    extend: 'Ext.data.Store',
    alias: 'store.equipment',
    storeId: 'equipment',
    model: 'hrm.model.Equipment',
    proxy: {
        type: 'rest',
        url: 'http://localhost:8000/api/equipment',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    },
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Retrieve token from localStorage
    },
    listeners: {
        beforeload: function(store, operation, eOpts) {
            var token = localStorage.getItem('authToken');
            if (token) {
                store.getProxy().setHeaders({
                    'Authorization': 'Bearer ' + token
                });
            }
        }
    },
    autoLoad: true
});
