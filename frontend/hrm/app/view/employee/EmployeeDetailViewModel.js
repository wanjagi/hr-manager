// File: app/view/employee/EmployeeDetailViewModel.js
Ext.define('hrm.view.employee.EmployeeDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employeedetail',

    data: {
        selectedEmployee: null
    },

    stores: {
        issuedEquipmentStore: {
            model: 'HRApp.model.IssuedEquipment',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: '/api/issued-equipments', // Adjust this based on your backend endpoint
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});
