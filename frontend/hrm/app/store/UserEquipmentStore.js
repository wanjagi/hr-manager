Ext.define('hrm.store.UserEquipmentStore', {
    extend: 'Ext.data.Store',
    model: 'hrm.model.UserEquipment',  // Define the model
    proxy: {
        type: 'rest',
        url: 'http://localhost:8000/api/user/equipment',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Include token
        }
    },
    autoLoad: true
});
