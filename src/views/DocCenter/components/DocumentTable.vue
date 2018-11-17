<template>
  <el-table
    :data="tableData"
    stripe
    :height="tableHeight"
    :row-style="rowStyle"
    @row-dblclick="handleDbClick"
    style="width: 100%">
    <el-table-column
      prop="author"
      label="Author"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="Date"
      width="180">
    </el-table-column>
    <el-table-column
      label="Document Name"
      width="480">
      <template slot-scope="scope">
        <a :href="scope.row.url" style="color:#606266;">{{scope.row.docName}}</a>
      </template>
    </el-table-column>
    <el-table-column
      label="Document Tags">
      <template slot-scope="scope">
        <span v-for="(tags, Tagsindex) in scope.row.tags" v-bind:key="Tagsindex">
          <el-tag size="mini" v-for="(tag, index) in tags.value"  :hit="true" :disable-transitions="true" class="filterTag" :type="tagsType[index]"
                  v-bind:key="tag">{{tag}}
        </el-tag>
        </span>
      </template>
    </el-table-column>
  </el-table>

</template>
<script>
export default {
  name: "DocumentTable",
  props: ["tableData", "tableHeight"],
  data() {
    return {
      tagsType: ["primary", "success", "warning", "danger", "info", "text", ""],
      rowStyle: {
        textAlign: "left"
      }
    };
  },
  methods: {
    handleDbClick(row) {
      this.$emit("documentUpdate", row);
    }
  }
};
</script>
<style>
.filterTag {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 11px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
