<template>
  <div class="">
    <Navbar />
    <div class="container-fluid mt-5">
      <b-row>
        <b-col class="col-md-3 col-sm-12"><Sidebar /></b-col>
        <b-col class="col-md-9 col-sm-12"><slot></slot></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
export default {
  components: { Navbar, Sidebar },
};
</script>

