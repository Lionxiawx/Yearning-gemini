<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="md-person"></Icon>
                    我的工单
                </p>
                <searchMany text="工单说明"   @refresh="current_pageMany" is_order></searchMany>


                <Row>
                    <Col span="24">
                        <Table border :columns="columns" :data="table_data" stripe size="small">
                            <template slot-scope="{ row }" slot="action">
                                <Button type="success" @click="openOrder(row)" size="small"
                                        ghost
                                        class="margin-left-10">
                                    工单信息
                                </Button>
                            </template>
                        </Table>
                    </Col>
                </Row>
                <br>
                <Page :total="page_number" show-elevator @on-change="current_pageMany" :page-size="20"
                      :current.sync="current"></Page>
            </Card>
        </Row>

    </div>
</template>
<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import Basic from "@/mixins/basic";
    import render from "@/interface/render";
     // import search from "@/components/search/search.vue";
   import searchMany from "@/components/search/searchMany.vue";
    import module_init_args from "@/store/modules/init_args";

    @Component({components: {searchMany}})
    export default class my_order extends Mixins(Basic) {

        columns = [
            {
                title: '工单编号:',
                key: 'work_id',
                sortable: true
            },
            {
                title: '工单说明',
                key: 'text',
                tooltip: true
            },
            {
                title: '工单类型',
                key: 'type',
                render: render.type
            },
            {
                title: '是否上线',
                key: 'is_pub',
                render: render.isPub
            },
            {
                title: '是否删除',
                key: 'is_del',
                render: render.isDel
            },
            {
                title: 'bug类型',
                key: 'bug_type',
                render: render.bugType
            },
            {
                title: '是否备份',
                key: 'backup',
                render: render.backup
            },
            {
                title: '提交时间:',
                key: 'date',
                sortable: true
            },
            {
                title: '当前操作人',
                key: 'assigned',
                sortable: true
            },
            {
                title: '状态',
                key: 'status',
                render: render.tag,
                sortable: true
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                slot: 'action',
                width: 300
            }
        ];

        url = `${this.$config.url}/common/list`

        openOrder(row: any) {
            module_init_args.fetch_order_item(row)
            this.$router.push({
                name: 'profile',
                query: {
                    isAdmin: JSON.stringify(false)
                }
            })
        }

        mounted() {
            this.current_pageMany()
        }
    }
</script>
<!-- remove delete request -->
