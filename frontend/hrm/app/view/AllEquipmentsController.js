// app/view/employee/EmployeeController.js
Ext.define('hrm.view.AllEquipmentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allequipments',

    requires: [
        'hrm.view.AllEquipmentsForm',
        
    ],

    onAddEquipmentClick: function () {
        Ext.create('hrm.view.AllEquipmentsForm').show();
    },


    onEditEquipmentclick: function(button) {
        var grid = this.getView();
        var record = button.getWidgetRecord ? button.getWidgetRecord() : grid.getSelection()[0];
        console.log(record);
        if (record) {
            grid.getSelectionModel().select(record);

            var editWindow = Ext.create('hrm.view.AllEquipmentsForm', {
                title: 'Edit',
                buttons: [{
                    text: 'Save',
                    //handler: 'onSaveEditClick',
                    //handler: 'onSaveEquipmentClick',
                    handler: 'edit',
                    scope: this
                }]
            });

            editWindow.down('form').loadRecord(record);
            editWindow.show();
        } else {
            Ext.Msg.alert('Error', 'No record selected for editing');
        }
    },


    edit: function(button, url) {
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var store = Ext.getStore('allequipments');
        
        if (!form.isValid()) {
            Ext.Msg.alert('Invalid Data', 'Please verify the data.');
            return;
        }
        
        if (!store) {
            console.error("Store not found");
            return;
        }
    
        if (record) {
            form.updateRecord(); // Update the record with form data
        } else {
            // Create a new record if none exists
            record = Ext.create('hrm.model.AllEquipments', form.getValues());
            store.add(record);
        }
    
        // Make an API call to update or save the record
        Ext.Ajax.request({
            url: 'http://localhost:8000/api/allequipments/' + record.get('id'),
            method: record.phantom ? 'POST' : 'PUT', // POST for new, PUT for existing
            jsonData: record.getData(), // Send the record's data as JSON
            success: function(response) {
                Ext.Msg.alert('Success', 'Record has been saved successfully.');
                store.sync();
                //store.load(); // Reload the store after saving
                button.up('window').close();
                Ext.toast({
                    html: 'Record updated successfully',
                    title: 'Save',
                    align: 't',
                    hideDuration: 200,
                    autoCloseDelay: 3000
                });
            },
            failure: function(response) {
                Ext.Msg.alert('Failure', 'Failed to save record.');
                //store.load(); // Reload the store even if the save failed
            }
        });
    },

    


    onSaveEquipmentClick: function(button) {
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var values = form.getValues();

    
        var store = Ext.getStore('allequipments'); // store lookup
    
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
                Ext.Msg.alert('Success', 'Equipment has been saved successfully.');
                store.load();
            },
            failure: function() {
                Ext.Msg.alert('Failure', 'Failed to save equipment.');
            }
        });
        
        button.up('window').close();
    },


    onSaveIssueEquipmentClick: function(button) {
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var values = form.getValues();

    
        var store = Ext.getStore('equipment'); // store lookup
    
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
                Ext.Msg.alert('Success', 'Record has been saved successfully.');
                store.load();
            },
            failure: function() {
                Ext.Msg.alert('Failure', 'Failed to save record.');
            }
        });
        
        button.up('window').close();
    },


    onDeleteEquipment: function(view, recIndex, cellIndex, item, e, record) {
        var grid = this.getView();
        // console.log(grid);
        // console.log(record);
        var store = grid.getStore();
        console.log(store);
        Ext.MessageBox.confirm('Confirm', 'Delete this record!', function(btn) {
            if (btn === 'yes') {
                store.remove(record);
                store.sync();
                Ext.toast({
                    html: 'Record deleted successfully',
                    title: 'Delete',
                    align: 't',
                    hideDuration: 200,
                    autoCloseDelay: 5000
                });
                store.reload();
            }
        });
    },


    onDeleteEquipmentc: function(view, recIndex, cellIndex, item, e, record) {
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


    onDeleteEquipmentC: function(view, recIndex, cellIndex, item, e, record) {
        var grid = this.getView();
        var record = grid.getRecord();
        console.log(record);
        Ext.MessageBox.confirm('Confirm', 'Delete this record!', function(btn) {
            if (btn === 'yes') {
                // Send a request to delete the record from the database
                Ext.Ajax.request({
                    url: 'http://localhost:8000/api/allequipments/' + record.getId(), // Adjust this URL to your actual endpoint
                    method: 'destroy',
                    success: function(response) {
                        var res = Ext.decode(response.responseText);
                        if (res.success) {
                            grid.getStore().remove(record);
                            grid.getStore().sync();
                            Ext.toast({
                                html: 'Record deleted successfully',
                                title: 'Delete',
                                align: 't',
                                hideDuration: 200,
                                autoCloseDelay: 5000
                            });
                        } else {
                            Ext.toast({
                                html: 'Failed to delete record: ' + res.message,
                                title: 'Error',
                                align: 't',
                                hideDuration: 200,
                                autoCloseDelay: 5000
                            });
                        }
                    },
                    failure: function() {
                        Ext.toast({
                            html: 'Server error. Could not delete record.',
                            title: 'Error',
                            align: 't',
                            hideDuration: 200,
                            autoCloseDelay: 5000
                        });
                    }
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
