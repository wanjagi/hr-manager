// app/store/Employee.js
Ext.define('hrm.store.IssuedEquipment', {
    extend: 'Ext.data.Store',
    alias: 'store.issuedequipment',
    storeId: 'issuedequipment',
    model: 'hrm.model.IssuedEquipment',
    proxy: {
        type: 'rest',
        url: 'http://localhost:8000/api/issuedequipments',
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
