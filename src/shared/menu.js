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
    }, {
        id: '2-2',
        title: '图片上传',
        icon: 'md-document',
        link: '/homePage/imageUpload'
    }, {
        id: '2-3',
        title: '拖拽',
        icon: 'md-document',
        link: '/homePage/kankan'
    }, {
        id: '2-4',
        title: '画板',
        icon: 'md-document',
        link: '/homePage/painting'
    }]
}, {
    id: '3',
    title: '表单',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '3-1',
        title: '基础验证',
        icon: 'md-document',
        link: '/homePage/formValidate'
    }]
}, {
    id: '4',
    title: '表格',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '4-1',
        title: '复杂表格',
        icon: 'md-document',
        link: '/homePage/complexTable'
    }]
},
{
    id: '5',
    title: '媒体',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '5-1',
        title: '聊天',
        icon: 'md-document',
        link: '/homePage/wechat'
    }]
}, {
    id: '9',
    title: '错误页面',
    icon: 'ios-paper',
    root: true,
    children: [{
        id: '9-1',
        title: '404',
        icon: 'md-document',
        link: '/homePage/404'
    }]
}];
export default menu;