Ext.define('hrm.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

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
                name: 'email',
                xtype: 'textfield',
                fieldLabel: 'Email',
                vtype: 'email'
            },
            {
                name: 'password',
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Password'
            }
        ],
        buttons: [
            {
                text: 'Sign Up',
                handler: function(button){
                    var form = button.up('login'); // Get the login form instance
                    //var parentContainer = form.up('container'); // Get the parent container
    
                    form.destroy(); // Remove the login form
                    
                    Ext.create({
                        xtype: 'signupform',
                        renderTo: Ext.getBody() // Render the signup form
                    });
                }
                
            },
            {
                text: 'Log In',
                formBind: true,
                handler: 'onLoginClick'
                
            }
            
        ]
    }
});
