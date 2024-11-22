Ext.define('hrm.view.login.SignupForm', {
    extend: 'Ext.window.Window',
    xtype: 'signupform',

    controller: 'login',

    requires: [
        'Ext.form.Panel'
    ],

    title: 'Login',
    closable: false,
    autoShow: true,
    modal: true,
    draggable: false,
    resizable: false,

    items: {
        xtype: 'form',
        bodyPadding: 10,
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false
        },
        items: [
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Name',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'password',
                fieldLabel: 'Password',
                inputType: 'password',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'password_confirmation',
                fieldLabel: 'Confirm Password',
                inputType: 'password',
                allowBlank: false
            }
        ],
    
        buttons: [
            {
                text: 'Sign Up',
                formBind: true,
                handler: function(button) {
                    var form = button.up('form');
            
                    if (form.isValid()) {
                        var values = form.getValues();
            
                        Ext.Ajax.request({
                            url: 'http://localhost:8000/api/register',
                            method: 'POST',
                            jsonData: values,
                            success: function(response) {
                                Ext.Msg.alert('Success', 'Registration successful.');
            
                                form.destroy();
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
                
            },
            {
                text: 'Log in',
                handler: function(button){
                    form = button.up('signupform');
                    //parent = form.up('container');
    
                    form.destroy();
    
                    Ext.create({
                        xtype: 'login',
                        renderTo: Ext.getBody()})
                }
            }
        ]
    }
});



/*Ext.define('SIS.view.login.SignupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'signupform',

    layout: 'vbox',
    width: 400,
    bodyPadding: 10,
    title: 'Sign Up',
    closable: false,
    autoShow: true,
    modal: true,
    draggable: false,
    resizable: false,


    controller: 'login',

    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Name',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password',
            inputType: 'password',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'password_confirmation',
            fieldLabel: 'Confirm Password',
            inputType: 'password',
            allowBlank: false
        }
    ],

    buttons: [
        {
            text: 'Sign Up',
            formBind: true,
            handler: function(button) {
                var form = button.up('form');
        
                if (form.isValid()) {
                    var values = form.getValues();
        
                    Ext.Ajax.request({
                        url: 'http://localhost:8000/api/register',
                        method: 'POST',
                        jsonData: values,
                        success: function(response) {
                            Ext.Msg.alert('Success', 'Registration successful.');
        
                            form.destroy();
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
            
        },
        {
            text: 'Log in',
            handler: function(button){
                form = button.up('signupform');
                //parent = form.up('container');

                form.destroy();

                Ext.create({
                    xtype: 'login',
                    renderTo: Ext.getBody()})
            }
        }
    ]
});*/

