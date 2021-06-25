import {Module, VuexModule, Mutation, getModule} from 'vuex-module-decorators'
import store from '@/store'
import {order} from '@/interface'
// @ts-ignore
import Message from 'view-design/src/components/message'
import sqlFormatter from "sql-formatter";

interface SQLTest {
    status?: string
    level?: number
    sql?: string
    error?: string
    affect_rows?: number
}

@Module({dynamic: true, store, name: 'modules_order', namespaced: true})
class order_local extends VuexModule {
    steps: number = 0
    is_dml: boolean = false
    bug_type_dml: boolean = true
    sql: string = ''
    sql_order: order = {
        export: 0,
    }
    yes_no = [{label:"是",value:"1"},{label:"否",value:"0"}]
    bug_type = [{
        label:"产品原因",value:"1"},
        {label:"开发bug",value:"2"},
        {label:"服务器问题",value:"3"},
        {label:"用户误操作",value:"4"},
        {label:"其他团队操作问题",value:"5"},
        {label:"历史数据问题",value:"6"},
        {label:"上线需求",value:"7"},
        {label:"业务方或产品要求",value:"8"},
        {label:"其他问题",value:"9"}
        ]
    order: order = {
        tp: 0,
        idc: '',
        source: '',
        data_base: '',
        table: '',
        text: '',
        delay: '',
        assigned: '',
        backup: 1,
        export: 0,
        uuid: ''
    }
    always: object = {
        one: true,
        two: false,
        three: false
    }
    wordList: object[] = []
    osc_id: string = ''
    order_sql: SQLTest[] = []

    @Mutation
    clear_sql_order() {
        return this.sql_order = { export: 0} as order
    }

    @Mutation
    fetch_order_sql(vm: object[]) {
        return this.order_sql = vm
    }

    @Mutation
    fetch_order_osc_id(vm: string) {
        return this.osc_id = vm
    }

    @Mutation
    clear_order() {
        this.order = {
            idc: '',
            source: '',
            data_base: '',
            table: '',
            text: '',
            delay: '',
            assigned: '',
            backup: 1,
            export: 0,
            tp: 0
        }
        this.steps = 0
        this.sql = ''
        this.wordList = []
    }

    @Mutation
    beauty_sql() {
        this.sql = sqlFormatter.format(this.sql)
    }

    @Mutation
    clear_always() {
        this.always = {one: true, two: false, three: false}
    }

    @Mutation
    changed_wordList(vm: object[]) {
        this.wordList = vm
    }

    @Mutation
    changed_always(vm: object) {
        this.always = vm
    }

    @Mutation
    changed_step(vm: number) {
        this.steps = vm
    }

    @Mutation
    changed_is_dml(vm: boolean) {
        this.is_dml = vm
    }

    @Mutation
    changed_bug_type_dml(vm: boolean) {
        this.bug_type_dml = vm
    }


    @Mutation
    save_sql(sql: string) {
        this.sql = sql
    }
    @Mutation
    beforeAdd(text: string){
        this.order.text = text +" " + this.order.text;
    }
}

const modules_order = getModule(order_local)

export default modules_order
