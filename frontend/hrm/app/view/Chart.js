// Ext.define('hrm.view.Chart', {
//     extend: 'Ext.panel.Panel',
//     xtype: 'chart',
//     title: 'Overview',
//     requires: ['Ext.chart.CartesianChart',
//         'Ext.chart.series.Bar',
//         'Ext.chart.axis.Numeric',
//         'Ext.chart.axis.Category'
//     ],

//     layout: 'fit',
//     items: [{
//         xtype: 'cartesian',
//         bind: {
//             store: '{dashboarddata}' // Bind to ViewModel Store
//         },
//         insetPadding: 40,
//         axes: [{
//             type: 'numeric',
//             position: 'left',
//             title: 'Count',
//             grid: true
//         }, {
//             type: 'category',
//             position: 'bottom',
//             title: 'Category',
//             fields: ['category']
//         }],
//         series: [{
//             type: 'bar',
//             xField: 'category',
//             yField: ['count'],
//             label: {
//                 field: 'count',
//                 display: 'insideEnd',
//                 renderer: function(value) {
//                     return value; // Customize label if necessary
//                 }
//             }
//         }]
//     }]
// });
