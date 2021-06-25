<template>
    <Form inline ref="queryForm" :model="find" >
            <FormItem prop="text">
                <Input :placeholder="text" v-model="find.text" @on-keyup.enter="queryDataMany"></Input>
            </FormItem>
        <FormItem prop="picker" v-if="!is_group">
            <DatePicker format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="请选择查询的时间范围"
                        v-model="find.picker" @on-change="find.picker=$event" style="width: 250px"
                        :editable="false"></DatePicker>
        </FormItem>
        <FormItem label="上线:" prop="is_pub"  :label-width="100">
            <Select v-model="find.is_pub" placeholder="请选择" @on-change="queryDataMany" filterable clearable>
                <Option  :value="'1'" :key="1" >是</Option>
                <Option  :value="'0'" :key="0" >否</Option>
            </Select>
        </FormItem>
        <FormItem label="删除:" prop="is_del"  :label-width="100">
            <Select v-model="find.is_del" placeholder="请选择" @on-change="queryDataMany" filterable clearable>
                <Option  :value="'1'" :key="1" >是</Option>
                <Option  :value="'0'" :key="0" >否</Option>
            </Select>
        </FormItem>
        <FormItem label="bug类型:" prop="bug_type" :label-width="100" >
            <Select v-model="find.bug_type" placeholder="请选择" @on-change="queryDataMany" filterable clearable>
                <Option  :value="'1'" :key="1" >产品原因</Option>
                <Option  :value="'2'" :key="2" >开发bug</Option>
                <Option  :value="'3'" :key="3" >服务器问题</Option>
                <Option  :value="'4'" :key="4" >用户误操作</Option>
                <Option  :value="'5'" :key="5" >其他团队操作问题</Option>
                <Option  :value="'6'" :key="6" >历史数据问题</Option>
                <Option  :value="'7'" :key="7" >上线需求</Option>
                <Option  :value="'8'" :key="8" >业务方或产品要求</Option>
                <Option  :value="'9'" :key="9" >其他问题</Option>
            </Select>
        </FormItem>

        <FormItem>
            <Button type="success" @click="queryDataMany">查询</Button>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="queryCancelMany">重置</Button>
        </FormItem>
    </Form>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from "vue-property-decorator";
import Basic from "../../mixins/basic";
import modules_searchMany from "@/store/modules/searchMany";
@Component({components: {}})
export default class searchMany extends Mixins(Basic) {
    @Prop({
        type: Boolean,
        required: false,
        default: false
    }) public is_group !: boolean

    @Prop({
        type: String,
        required: true,
        default: ''
    }) public text !: string


    queryDataMany() {
        this.find.valve = true;
        console.log("ddd");
        console.log(this.find);
        modules_searchMany.post_search_args(this.find)
        this.$emit("refresh")

        console.log( this.$emit("refresh"));
    }

    queryCancelMany() {
        this.find.valve = false;
        this.resetFields('queryForm')
        this.find.type = 2
        modules_searchMany.post_search_args(this.find)
        this.current = 1;
        this.$emit("refresh")
    }

    beforeDestroy() {
        this.resetFields('queryForm')
    }
}
</script>

<style scoped>
</style>