<template>
  <div>
    <navibar></navibar>
    <el-row :gutter="20">
      <el-col :span="4">
        <tableList></tableList>
      </el-col>
      <el-col :span="20">
        <tableData></tableData>
      </el-col>
    </el-row>
    <connect></connect>
  </div>
</template>

<script>
import Navibar from './Navibar'
import TableData from './TableData'
import Connect from './Connect'
import TableList from './TableList'

export default {
  name: 'framework',
  components: {
    Navibar, TableData, Connect, TableList
  },
  methods: {
    handleOpen () {

    },
    handleClose () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
