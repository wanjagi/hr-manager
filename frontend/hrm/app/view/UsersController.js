// app/view/employee/EmployeeController.js
Ext.define('hrm.view.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    requires: [
        //'hrm.view.UserForm',
        
    ],

    onAddUserClick: function () {
        Ext.create('hrm.view.UserForm').show();
    },


    
    onEditUser: function(button){
        var grid = this.getView();
        var record = button.getWidgetRecord ? button.getWidgetRecord() : grid.getSelection()[0];
        console.log(record);
        if (record) {
            grid.getSelectionModel().select(record);

            var editWindow = Ext.create('hrm.view.UserForm', {
                title: 'Edit User',
                buttons: [{
                    text: 'Save',
                    //handler: 'onSaveEditClick',
                    handler: 'onSaveUserClick',
                    //handler: 'edit',
                    scope: this
                }]
            });

            editWindow.down('form').loadRecord(record);
            editWindow.show();
        } else {
            Ext.Msg.alert('Error', 'No record selected for editing');
        }
    },


    onSaveUserClick: function(button) {
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var values = form.getValues();

    
        var store = Ext.getStore('users'); // store lookup
    
        if (!store) {
            console.error("Store not found");
            return;
        }
    
        if (record) {
            // Updating existing record
            record.set(values);
        } else {
            // Adding new record
            store.add(values);
        }
    
        store.sync({
            success: function() {
                Ext.Msg.alert('Success', 'User has been saved successfully.');
                store.load();
            },
            failure: function() {
                Ext.Msg.alert('Failure', 'Failed to save user.');
            }
        });
        
        button.up('window').close();
    },


    onDeleteUserWidgetclick: function(view, recIndex, cellIndex, item, e, record) {
        var grid = this.getView();
        Ext.MessageBox.confirm('Confirm', 'Delete this record!', function(btn) {
            if (btn === 'yes') {
                grid.getStore().remove(record);
                grid.getStore().sync();
                Ext.toast({
                    html: 'Record deleted successfully',
                    title: 'Delete',
                    align: 't',
                    hideDuration: 200,
                    autoCloseDelay: 5000
                });
            }
        });
    },


    
    /*onSaveEmployeeClick: function(button) {
        var form = button.up('window').down('form');
        //let form = button.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/api/employees',
                method: form.isNewRecord ? 'POST' : 'PUT',
                success: function(form, action) {
                    Ext.toast('Employee saved successfully');
                    form.reset();
                },
                failure: function(form, action) {
                    Ext.toast('Error saving employee');
                }
            });
        }
    },*/

    /*onSaveIssueEquipmentClick: function(button) {
        //let form = button.up('form').getForm();
        var form = button.up('window').down('form');
        if (form.isValid()) {
            form.submit({
                url: 'http://localhost:8000/api/equipments',
                method: form.isNewRecord ? 'POST' : 'PUT',
                success: function(form, action) {
                    Ext.toast('Equipment issued successfully');
                    form.reset();
                },
                failure: function(form, action) {
                    Ext.toast('Error issuing equipment');
                }
            });
        }
    },*/ 

   
    
    
    

});
