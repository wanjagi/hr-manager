Ext.define('hrm.store.Employee', {
    extend: 'Ext.data.Store',
    alias: 'store.employee',
    storeId: 'employee',
    model: 'hrm.model.Employee',
    
    //fields: ['id', 'name'],
    proxy: {
        type: 'rest',
        url: 'http://localhost:8000/api/employees',
        reader: {
            type: 'json',
            rootProperty: 'data',
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
