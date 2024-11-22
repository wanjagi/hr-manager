Ext.define('hrm.view.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    viewModel: {
        stores: {
            dashboardData: {
                type: 'dashboarddata',
                autoLoad: true,
                listeners: {
                    load: 'onDashboardDataLoad'
                }
            }
        }
    },

    controller: 'employee', // Controller handling

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    padding: 20,

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'container',
                flex: 1,
                margin: '0 20 20 0',
                height: 120,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                cls: 'stat-card',
                bodyStyle: {
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px'
                }
            },
            items: [
                {
                    bind: {
                        html: `
                            <div style="text-align: center; color: #007bff;">
                                <i class="x-fa fa-users" style="font-size: 40px;"></i>
                                <h2 style="margin: 10px 0 5px; font-weight: bold;">Total Employees</h2>
                                <h3 style="font-size: 28px; margin: 0;">{totalEmployees}</h3>
                            </div>
                        `
                    }
                },
                {
                    bind: {
                        html: `
                            <div style="text-align: center; color: #28a745;">
                                <i class="x-fa fa-boxes" style="font-size: 40px;"></i>
                                <h2 style="margin: 10px 0 5px; font-weight: bold;">Total Equipment</h2>
                                <h3 style="font-size: 28px; margin: 0;">{totalEquipments}</h3>
                            </div>
                        `
                    }
                },
                {
                    bind: {
                        html: `
                            <div style="text-align: center; color: #17a2b8;">
                                <i class="x-fa fa-check-circle" style="font-size: 40px;"></i>
                                <h2 style="margin: 10px 0 5px; font-weight: bold;">Issued Equipment</h2>
                                <h3 style="font-size: 28px; margin: 0;">{issuedEquipments}</h3>
                            </div>
                        `
                    }
                },
                {
                    bind: {
                        html: `
                            <div style="text-align: center; color: #ffc107;">
                                <i class="x-fa fa-clipboard-check" style="font-size: 40px;"></i>
                                <h2 style="margin: 10px 0 5px; font-weight: bold;">Available Equipment</h2>
                                <h3 style="font-size: 28px; margin: 0;">{availableEquipments}</h3>
                            </div>
                        `
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'panel',
                flex: 1,
                margin: '0 20 20 0',
                height: 300,
                bodyStyle: {
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '15px',
                    color: '#333'
                }
            },
            items: [
                {
                    title: 'Recent Activity',
                    xtype: 'recentactivity',
                    titleAlign: 'center',
                    titleStyle: {
                        color: '#007bff',
                        fontWeight: 'bold'
                    }
                }
            ]
        }
    ]
});
