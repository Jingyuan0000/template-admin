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
