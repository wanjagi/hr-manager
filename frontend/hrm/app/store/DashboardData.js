Ext.define('hrm.store.DashboardData', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboarddata',
    storeId: 'dashboarddata',
    model: 'hrm.model.Dashboard',

    //fields: ['totalEmployees', 'totalEquipments', 'issuedEquipments', 'availableEquipments'],

    proxy: {
        type: 'rest',
        url: 'http://localhost:8000/api/dashboard-data',
        reader: {
            type: 'json',
            rootProperty: ''
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
