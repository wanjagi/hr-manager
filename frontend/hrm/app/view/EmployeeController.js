// app/view/employee/EmployeeController.js
Ext.define('hrm.view.EmployeeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee',

    requires: [
        'hrm.view.EmployeeForm',
        
    ],

    onAddEmployeeClick: function () {
        Ext.create('hrm.view.EmployeeForm').show();
    },

    onIssueEquipmentClick: function () {
        Ext.create('hrm.view.EquipmentForm').show();
    },


    onDashboardDataLoad: function(store) {
        var record = store.first();  // Assuming the store only has one record

        if (record) {
            // Set the data from the record into the ViewModel
            this.getViewModel().setData({
                totalEmployees: record.get('totalEmployees'),
                totalEquipments: record.get('totalEquipments'),
                issuedEquipments: record.get('issuedEquipments'),
                availableEquipments: record.get('availableEquipments')
            });
        }
    },


    onSaveEmployeeClick: function(button) {
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var values = form.getValues();

    
        var store = Ext.getStore('employee'); // store lookup
    
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


    onSaveIssueEquipmentClick: function(button) {
        var form = button.up('window').down('form'),
            formValues = form.getValues(), // Get form values
            grid = Ext.ComponentQuery.query('equipmentgrid')[0], // Get the grid by xtype
            equipmentStore = grid.getStore();

        if (form.isValid()) {
            
            Ext.Ajax.request({
                url: 'http://localhost:8000/api/equipment',
                method: 'POST',
                jsonData: formValues,
                success: function(response) {
                    
                    var data = Ext.decode(response.responseText);

                    
                    equipmentStore.add({
                        employee_name: formValues.employee_name,
                        equipment_name: formValues.equipment_name
                    });

                   

                    // close the form window after successful save
                    button.up('window').close();

                    // Show success message
                    Ext.toast('Equipment issued successfully!');
                    //equipmentStore.sync();
                },
                failure: function(response) {
                    Ext.Msg.alert('Error', 'Failed to issue equipment. Please try again.');
                },
                

                
            });
        } else {
            Ext.Msg.alert('Invalid Form', 'Please fill in all required fields.');
        }
    },

    onCancelClick: function(button) {
        // Close the form window when cancel button is clicked
        button.up('window').close();
    },


    /*onSaveIssueEquipmentClick: function(button) {
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
    },*/
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

    onDeleteEmployeeWidgetclick: function(view, recIndex, cellIndex, item, e, record) {
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


    onDeleteEquipment: function(view, recIndex, cellIndex, item, e, record) {
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

    onEditUser: function(button){
        var grid = this.getView();
        var record = button.getWidgetRecord ? button.getWidgetRecord() : grid.getSelection()[0];
        console.log("record", record);
        if (record) {
            grid.getSelectionModel().select(record);

            var editWindow = Ext.create('hrm.view.EmployeeForm', {
                title: 'Edit User',
                buttons: [{
                    text: 'Save',
                    //handler: 'onSaveEditClick',
                    //handler: 'onSaveUserClick',
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
        var store = Ext.getStore('employee');
        
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
            record = Ext.create('hrm.model.Employee', form.getValues());
            store.add(record);
        }
    
        // Make an API call to update or save the record
        Ext.Ajax.request({
            url: 'http://localhost:8000/api/employees/' + record.get('id'),
            method: record.phantom ? 'POST' : 'PUT', // POST for new, PUT for existing
            jsonData: record.getData(), // Send the record's data as JSON
            success: function(response) {
                Ext.Msg.alert('Success', 'Record has been saved successfully.');
                store.load(); // Reload the store after saving
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
                store.load(); // Reload the store even if the save failed
            }
        });
    },
    


    onSaveUserClick: function(button) {
        console.log("Save button clicked")
        var form = button.up('window').down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var store = Ext.getStore('employee');
        console.log(store);
    
        if (!store) {
            console.error("Store not found");
            return;
        }
    
        if (record) {
            // Updating existing record
            record.set(values);
            form.updateRecord();
            console.log("Updated record:", record);
        } else {
            // Adding new record
            store.add(record);
            console.log("Added new record:", values);
        }
        store.sync();
        store.load();
        // store.sync({
        //     success: function() {
        //         Ext.Msg.alert('Success', 'User has been saved successfully.');
        //         store.load();
        //         button.up('window').close();  // Close window after success
        //     },
        //     failure: function() {
        //         Ext.Msg.alert('Failure', 'Failed to save user.');
        //     }
        // });
    },
    



    // onEditClick: function(button) {
    //     var grid = this.getView();
    //     var record = button.getWidgetRecord ? button.getWidgetRecord() : grid.getSelection()[0];
    //     console.log(record);
    //     if (record) {
    //         grid.getSelectionModel().select(record);

    //         var editWindow = Ext.create('hrm.view.EmployeeForm', {
    //             title: 'Edit Record',
    //             buttons: [{
    //                 text: 'Save',
    //                 //handler: 'onSaveEditClick',
    //                 handler: 'onSaveEmployeeClick',
    //                 //handler: 'edit',
    //                 scope: this
    //             }]
    //         });

    //         editWindow.down('form').loadRecord(record);
    //         editWindow.show();
    //     } else {
    //         Ext.Msg.alert('Error', 'No record selected for editing');
    //     }
    // },


    // edit: function(button, url){
    //     var form = button.up('window').down('form');
    //     var record = form.getRecord();
    //     var store = Ext.getStore('employee');
    
    //     if (!form.isValid()) {
    //         Ext.Msg.alert('Invalid Data', 'Please verify the data.');
    //         return;
    //     }
    
    //     if (!store) {
    //         console.error("Store not found");
    //         return;
    //     }
    
    //     if (record) {
    //         // Update existing record with form data
    //         form.updateRecord(record);
    //     } else {
    //         // Create a new record with form values if no existing record
    //         record = Ext.create('hrm.model.employee', form.getValues());
    //         store.add(record);
    //     }
    
    //     // Sync the store to persist changes to the backend
    //     store.sync({
    //         success: function(batch, options) {
    //             Ext.Msg.alert('Success', 'Record has been saved successfully.');
    //             store.load(); // Reload the store after saving
    //             button.up('window').close();
    //             Ext.toast({
    //                 html: 'Record updated successfully',
    //                 title: 'Save',
    //                 align: 't',
    //                 hideDuration: 200,
    //                 autoCloseDelay: 3000
    //             });
    //         },
    //         failure: function(batch, options) {
    //             Ext.Msg.alert('Failure', 'Failed to save record.');
    //             store.load(); // Reload the store in case of failure
    //         }
    //     });
    // },
    

    onSaveEquipmentClick: function(button) {
        let form = button.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/api/equipment',
                method: form.isNewRecord ? 'POST' : 'PUT',
                success: function(form, action) {
                    Ext.toast('Equipment issued successfully.');
                    form.reset();
                },
                failure: function(form, action) {
                    Ext.toast('Error issuing equipment.');
                }
            });
        }
    }

});
