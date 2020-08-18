<template>
  <table
    class="classify"
    :style="styleObject"
    v-if="tableData.length>1"
  >
    <tr>
      <td class="column">{{tableData[0].name}} </td>
      <td class="td-grid88 tag88">{{tableData[0].value}} </td>
      <td class="column">{{tableData[1].name}} </td>
      <td class="td-grid88 tag88">{{tableData[1].value}} </td>
      <td class="column">{{tableData[2].name}} </td>
      <td class="td-grid88 tag88">{{tableData[2].value}} </td>

    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],

  created() {
    this.styleObject = this.tableStyle;
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>

<style>
　　.classify,
.classify tr,
.classify tr td {
  /* border: 1px solid #e6eaee; */
  color: #336699;
  width: 40px;
}
　　.classify {
  font-size: 12px;
  color: #71787e;
}
　　.classify tr td {
  /* border: 1px solid #e6eaee; */
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  padding: 0 10px;
}
　　.classify tr td.column {
  background-color: #eff3f6;
  color: #393c3e;
  width: 30px;
}
.td-grid88 {
  opacity: 0.9;
  /* color: #fff !important; */
  text-align: center;
  height: 16px;
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

.tag88 {
  /* background: #28a745; */
  color: #fd7e14 !important;
  font-size: 30px;
  font-weight: bold;
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
