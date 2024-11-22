/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('hrm.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    layout: 'border',
    height: 600,
    widht: 600,
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'hrm.view.main.MainController',
        'hrm.view.main.MainModel',
        'hrm.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    tbar:{
        xtype: 'toolbar',
        region: 'west', // Dock the toolbar to the left
        width: 100,     // Set width for the toolbar
        layout: {
            type: 'hbox', // Make toolbar items stack vertically
            align: 'left'
        },

        

        items: [
            '->',
            {
                text: 'Logout',
                handler: function(button) {
                    var authToken = localStorage.getItem('authToken');
                    
                    
                    if (authToken) {
                        Ext.Ajax.request({
                            url: 'http://localhost:8000/api/logout',
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + authToken
                            },
                            success: function(response) {
                                // Remove the auth token from local storage
                                localStorage.removeItem('authToken');
                                localStorage.removeItem('userRole');
                                
                                // Notify the user of successful logout
                                //Ext.Msg.alert('Success', 'Logged out successfully.', function() {
                                    // Redirect to the login form after acknowledging the alert
                                    //Ext.Viewport.removeAll();
                                    
                                var mainView = Ext.ComponentQuery.query('app-main')[0];
                                if (mainView) {
                                    mainView.destroy();
                                    Ext.toast({
                                        html: 'Logged out ',
                                        align: 't',
                                        hideDuration: 200,
                                        autoCloseDelay: 3000
                                    })
                                }

                                Ext.create({
                                    xtype: 'login',
                                    fullscreen: true,
                                    renderTo: Ext.getBody()
                                });
                                
                            },
                            failure: function(response) {
                                var responseData = Ext.decode(response.responseText);
                                if (responseData.message == 'unauthentucated'){
                                    Ext.create({
                                        xtype: 'login',
                                        fullscreen: true,
                                        renderTo: Ext.getBody()
                                    });
                                }
                                
                                // Display an error message if logout fails
                                Ext.Msg.alert('Failure', responseData.message || 'Log-out failed due to server error.');
                            }
                        });
                    } else {
                        // Alert the user if no auth token is found
                        Ext.Msg.alert('Failure', 'No authentication token found.');
                    }
                }

            },
            
        ]
    },

    items: [{
        title: 'Dashboard',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'dashboard'
        }]
    }, {
        title: 'Staff',
        iconCls: 'fa-user',
        items: [{
            xtype: 'employeegrid'
        }]
    }, {
        title: 'Equipment',
        iconCls: 'fa-users',
        items: [{
            xtype: 'allequipmentsgrid'
        }]
    }, {
        title: 'Issue',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'equipmentgrid'
        }]
    },
    {
        title: 'Users',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'usersgrid'
        }]
    },
    {
        title: 'Users',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'userdashboard'
        }]
    }]
});
