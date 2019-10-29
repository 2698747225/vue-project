const menu = [{
    id: '1',
    title: '数据管理',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '1-1',
        title: '图表',
        icon: 'md-document',
        link: '/homePage/chartPage'
    }, {
        id: '1-2',
        title: '导出',
        icon: 'md-chatbubbles',
        link: '/homePage/export'
    }, {
        id: '1-3',
        title: '导入',
        icon: 'md-chatbubbles',
        link: '/homePage/import'
    }],
}, {
    id: '2',
    title: '组件管理',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '2-1',
        title: '分隔栏',
        icon: 'md-document',
        link: '/homePage/splitPanel'
    }]
}];
export default menu;