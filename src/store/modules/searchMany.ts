import {Module, VuexModule, Mutation, getModule} from 'vuex-module-decorators'
import store from "@/store";

export interface Finder {
    picker: string[]
    valve: boolean
    text: string
    explain: string
    is_pub: number
    work_id: string
    type: number,
    status: number
}

@Module({namespaced: true, name: 'modules_searchMany', dynamic: true, store})
class searchMany extends VuexModule {

    find: Finder = {
        picker: [],
        valve: false,
        text: '',
        explain: '',
        is_pub: 0,
        work_id: '',
        type: 2,
        status: 7
    }

    @Mutation
    post_search_args(vm: Finder) {
        this.find = vm
    }
}

const modules_searchMany = getModule(searchMany)

export default modules_searchMany
