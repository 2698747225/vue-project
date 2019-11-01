/**
 * @desc 全局遮罩service
 * @param render 自定义渲染函数
 */
export function showLoading(render) {
    this.$Spin.show({
        render: render || ((h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', '加载中...')
            ])
        })
    })
}

export function hideLoading() {
    this.$Spin.hide();
}