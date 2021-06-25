<template>
  <div>
    <Row>
      <Card>
        <p slot="title">
          <Icon type="md-send"></Icon>
          历史工单执行记录
        </p>
        <searchMany text="工单编号" @refresh="current_pageMany"></searchMany>
        <Row>
          <Col span="24">
            <Table
                    border
                    :columns="columns"
                    :data="table_data"
                    class="tabletop"
                    style="background: #5cadff"
            >
              <template slot-scope="{ row }" slot="action">
                <div>
                  <Button type="success" @click="openOrder(row)" size="small" ghost>
                    详细信息
                  </Button>
                </div>
              </template>
            </Table>
            <br>
            <Page
                    :total="page_number"
                    show-elevator
                    @on-change="current_pageMany"
                    :page-size="20"
                    :current.sync="current"
            ></Page>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>
<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import Basic from "@/mixins/basic";
    //import search from "@/components/search/search.vue";
    import searchMany from "@/components/search/searchMany.vue";
    import module_init_args from "@/store/modules/init_args";
    import render from "@/interface/render";
    @Component({components: {searchMany}})
    export default class record extends Mixins(Basic) {
      columns = [
        {
          title: '工单',
          key: 'work_id'
        },
        {
          title: '工单说明',
          key: 'text',
          tooltip: true
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
          title: '执行时间',
          key: 'execute_time',
          sortType: 'desc'
        },
        {
          title: '申请人',
          key: 'username'
        },
        {
          title: '真实姓名',
          key: 'real_name'
        },
        {
          title: '当前操作人',
          key: 'assigned'
        },
        {
          title: '环境',
          key: 'idc'
        },
        {
          title: '连接名称',
          key: 'source'
        },
        {
          title: '库名',
          key: 'data_base'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          slot: 'action'
        }
      ];

      url = `${this.$config.url}/audit/order/record`

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

<style lang="less">
  @import "../../styles/common.less";
  @import "../../styles/table.less";
</style>
