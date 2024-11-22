// app/view/employee/EmployeeController.js
Ext.define('hrm.view.user.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usercontroller',

    requires: [
        'hrm.view.user.RequestEquipmentForm',
        
    ],

    onRequestEquipmentClick: function () {
        Ext.create('hrm.view.user.RequestEquipmentForm').show();
    }
    

   
    
    
    

});
