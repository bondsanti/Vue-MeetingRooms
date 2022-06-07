<template>
<div>
  <Sidebar1Vue />
  <Sidebar2Vue />

</div>
</template>
<script>
import Sidebar1Vue from "./Sidebar1.vue";
import Sidebar2Vue from "./Sidebar2.vue";
export default {
  components: {
    Sidebar1Vue,
    Sidebar2Vue,
  },
};
</script>