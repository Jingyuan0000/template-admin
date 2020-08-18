<template>
  <table
    class="mailTable"
    :style="styleObject"
    v-if="s_showByRow"
  >
    <tr v-for="index in rowCount">
      <td class="column">{{tableData[index*2-2].name}}</td>
      <td class="td-grid tag8">{{tableData[index*2-2].value}}</td>
      <td class="column">{{tableData[index*2-1] !== undefined ? tableData[index*2-1].name : ''}}</td>
      <td class="td-grid tag8">{{tableData[index*2-1] !== undefined ? tableData[index*2-1].value : ''}}</td>
    </tr>
  </table>
  <!-- <table
    class="mailTable"
    :style="styleObject"
    v-else
  >
    <tr v-for="index in rowCount">
      <td class="column">{{tableData[index-1].name}}</td>
      <td>{{tableData[index-1].value}}</td>
      <td class="column">{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].name : ''}}</td>
      <td
        :class="'tag' + (index)"
        class="td-grid"
      >{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
    </tr>
  </table> -->
</template>

<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function () {
      return Math.ceil(this.tableData.length / 2);
    }
  },
  created() {
    this.styleObject = this.tableStyle;
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>

<style>
　　.mailTable,
.mailTable tr,
.mailTable tr td {
  /* border: 1px solid #e6eaee; */
  padding: 12px;
  color: #336699;
  text-align: center;
}
　　.mailTable {
  font-size: 12px;
  color: #71787e;
}
　　.mailTable tr td {
  /* border: 1px solid #e6eaee; */
  width: 130px;
  /* height: 35px; */
  /* line-height: 35px; */
  box-sizing: border-box;
  padding: 0 10px;
}
　　.mailTable tr td.column {
  background-color: #eff3f6;
  color: #393c3e;
}

.tag1 {
  background: #17a2b8;
  /* background: linear-gradient(
   to right,
  rgba(12, 210, 227, 0.2) 0%,
    rgba(62, 210, 227, 0.2) 100%
  ); */
}
.tag2 {
  background: #6f42c1;
  /* background: linear-gradient(
  to right,
 rgba(63, 121, 241, 0.2) 0%,
  rgba(63, 121, 241, 0.2) 100%
  ); */
}
.tag3 {
  background: #e83e8c;
}
.tag4 {
  background: #dc3545;
}
.tag5 {
  background: #fd7e14;
}

.tag6 {
  background: #ffc107;
}
.tag7 {
  background: #007bff;
}

.tag8 {
  background: #28a745;
  font-size: 18px;
  font-weight: bold;
}
.td-grid {
  opacity: 0.9;
  color: #fff !important;
}

.tag-even1 {
  background: #17a2b8;
  /* background: linear-gradient(
   to right,
  rgba(12, 210, 227, 0.2) 0%,
    rgba(62, 210, 227, 0.2) 100%
  ); */
}
.tag-even2 {
  background: #6f42c1;
  /* background: linear-gradient(
  to right,
 rgba(63, 121, 241, 0.2) 0%,
  rgba(63, 121, 241, 0.2) 100%
  ); */
}
.tag-even3 {
  background: #e83e8c;
}
.tag-even4 {
  background: #dc3545;
}
.tag-even5 {
  background: #fd7e14;
}

.tag-even6 {
  background: #ffc107;
}
.tag-even7 {
  background: #007bff;
}
</style>
