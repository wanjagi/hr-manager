// app/view/login/LoginController.js
Ext.define('hrm.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',


    onLoginClick: function(button) {
        var form = button.up('form');
        var window = button.up('window');
    
        if (form.isValid()) {
            var values = form.getValues();
    
            Ext.Ajax.request({
                url: 'http://localhost:8000/api/login',
                method: 'POST',
                jsonData: {
                    email: values.email,
                    password: values.password
                },
                success: function(response) {
                    var responseData = Ext.decode(response.responseText);
    
                    if (responseData.token) {
                        localStorage.setItem('authToken', responseData.token);
                        Ext.create({
                            xtype: 'app-main', // Replace with employee view xtype
                            renderTo: Ext.getBody()
                        });
    
                        // if (responseData.role) {
                        //     localStorage.setItem('userRole', responseData.role);
                        // }
    
                        //var role = localStorage.getItem('userRole');
    
                        // if (role === "user") {
                        //     // Render employee dashboard view
                        //     Ext.create({
                        //         xtype: 'app-main', // Replace with employee view xtype
                        //         renderTo: Ext.getBody()
                        //     });
                        // } else if (role === "admin") {
                        //     // Render admin dashboard view
                        //     Ext.create({
                        //         xtype: 'app-main', // Replace with admin view xtype
                        //         renderTo: Ext.getBody()
                        //     });
                        // }
                        
                        // Close the login window
                        window.destroy();
    
                        Ext.toast({
                            html: 'Welcome, ' + values.email,
                            align: 't',
                            hideDuration: 200,
                            autoCloseDelay: 3000
                        });
    
                    } else {
                        Ext.Msg.alert('Login Failed', 'Invalid email or password.');
                    }
                },
                failure: function(response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.Msg.alert('Login Failed', responseData.message || 'Log-in failed due to server error.');
                }
            });
        }
    },
    


    onSignupClick: function(button) {
        var form = button.up('form');
        var window = button.up('window')

        if (form.isValid()) {
            var values = form.getValues();

            Ext.Ajax.request({
                url: 'http://localhost:8000/api/register',
                method: 'POST',
                jsonData: values,
                success: function(response) {
                    Ext.Msg.alert('Success', 'Registration successful.');

                    form.destroy();
                    window.destroy();
                    Ext.create({
                        xtype: 'app-main',
                        renderTo: Ext.getBody()
                    });
                },
                failure: function(response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.Msg.alert('Failure', responseData.message || 'Registration failed due to server error.');
                }
            });
        }
    }
});
