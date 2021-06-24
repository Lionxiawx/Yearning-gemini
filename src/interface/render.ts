import expandRow from "@/components/expandTable.vue";

let render = {
    tag: (h: any, params: { row: { status: number }; }) => {
    },
    backup: (h: any, params: { row: { backup: number }; }) => {
    },
    queryExport: (h: any, params: { row: { export: number }; }) => {
    },
    type: (h: any, params: { row: { type: number }; }) => {
    },
    isPub: (h: any, params: { row: { is_pub: number }; }) => {
    },
    isDel: (h: any, params: { row: { is_del: number }; }) => {
    },
    bugType: (h: any, params: { row: { bug_type: number }; }) => {
    },
    expand: (h: any, params: { row: { sql: string }; }) => {
    },
    sub_sql: (h: any, params: { row: { sql: string }; }) => {
    },
    query_tag: (h: any, params: { row: { query_per: number } }) => {
    }
}

render.query_tag = (h: any, params: { row: { query_per: number } }) => {
    const row = params.row
    let color = ''
    let text = ''
    if (row.query_per === 2) {
        color = 'primary'
        text = '待审核'
    } else if (row.query_per === 0) {
        color = 'error'
        text = '驳回'
    } else if (row.query_per === 1) {
        color = 'success'
        text = '同意/查询'
    } else {
        color = 'warning'
        text = '查询结束'
    }
    return h('Tag', {
        props: {
            type: 'dot',
            color: color
        }
    }, text)
}

render.tag = (h: any, params: { row: { status: number }; }) => {
    const row = params.row;
    let color = '';
    let text = '';
    if (row.status === 2) {
        color = 'primary';
        text = '审核中';
    } else if (row.status === 0) {
        color = 'error';
        text = '驳回';
    } else if (row.status === 1) {
        color = 'success';
        text = '已执行';
    } else if (row.status === 4) {
        color = 'error';
        text = '执行失败';
    } else if (row.status === 5) {
        color = 'primary';
        text = '待执行';
    } else {
        color = 'warning';
        text = '执行中';
    }
    return h('Tag', {
        props: {
            type: 'dot',
            color: color
        }
    }, text)
}

render.backup = (h: any, params: { row: { backup: number }; }) => {
    const row = params.row;
    let text = "否"
    if (row.backup == 1) {
        text = "是"
    }
    return h('span', {}, text)
}

render.queryExport = (h: any, params: { row: { export: number }; }) => {
    const row = params.row;
    let text = "否"
    if (row.export == 1) {
        text = "是"
    }
    return h('span', {}, text)
}

render.type = (h: any, params: { row: { type: number }; }) => {
    const row = params.row;
    let text = "DDL"
    if (row.type == 1) {
        text = "DML"
    }
    return h('span', {}, text)
}

render.isPub = (h: any, params: { row: { is_pub: number }; }) => {
    const row = params.row;
    let text = ""
    if (row.is_pub == 1) {
        text = "是"
    }else {
        text = "否"
    }
    return h('span', {}, text)
}
render.isDel = (h: any, params: { row: { is_del: number }; }) => {
    const row = params.row;
    let text = ""
    if (row.is_del == 1) {
        text = "是"
    }else {
        text = "否"
    }
    return h('span', {}, text)
}

render.bugType = (h: any, params: { row: { bug_type: number }; }) => {
    const row = params.row;
    let text = ""
    if (row.bug_type == 1) {
        text = "产品原因"
    }else if(row.bug_type == 2){
        text = "开发bug"
    }
    else if(row.bug_type == 3){
        text = "服务器问题"
    }
    else if(row.bug_type == 4){
        text = "用户误操作"
    }
    else if(row.bug_type == 5){
        text = "其他团队操作问题"
    }
    else if(row.bug_type == 6){
        text = "历史数据问题"
    }
    else if(row.bug_type == 7){
        text = "上线需求"
    }
    else if(row.bug_type == 8){
        text = "业务方或产品要求"
    }
    else {
        text = "其他问题"
    }
    return h('span', {}, text)
}


render.expand = (h: any, params: { row: { sql: string } }) => {
    return h(expandRow, {
        props: {
            row: params.row.sql
        }
    })
}

render.sub_sql = (h: any, params: { row: { sql: string } }) => {
    let text = params.row.sql.substring(0, 80)
    if (text.length > 80) {
        text += '...';
    }
    return h('span', text)
}
export default render
