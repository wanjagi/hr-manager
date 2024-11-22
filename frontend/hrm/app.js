/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'hrm.Application',

    name: 'hrm',

    requires: [
        // This will automatically load all classes in the hrm namespace
        // so that application classes do not need to require each other.
        'hrm.*'
    ],

    launch: function() {
        var token = localStorage.getItem('authToken');
        //var role = localStorage.getItem('userRole'); 
    
        if (token) {

            Ext.create({
                xtype: 'app-main', // Employee dashboard view xtype
                renderTo: Ext.getBody()
            });
            // Token exists, determine role and render appropriate view
            // if (role === "user") {
            //     Ext.create({
            //         xtype: 'app-main', // Employee dashboard view xtype
            //         renderTo: Ext.getBody()
            //     });
            // } else if (role === "admin") {
            //     Ext.create({
            //         xtype: '', // Admin dashboard view xtype
            //         renderTo: Ext.getBody()
            //     });
            // }
        } else {
            // No token, show the login window
            Ext.create({
                xtype: 'login', // Login window xtype
                renderTo: Ext.getBody()
            });
        }
    }
    
    // The name of the initial view to create.
    //mainView: 'hrm.view.main.Main'
});
