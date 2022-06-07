<template>
  <nav class="navbar navbar-light bg-light na">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo.png"
          alt=""
          width="30px"
          class="d-inline-block align-text-top"
        />
        ระบบจองห้องประชุม
      </a>
      
      <div class="d-flex">
        <button class="btn btn-danger btn-sm" @click="onLogout()">
          <b-icon icon="power" aria-hidden="true"></b-icon> ออกจากระบบ
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  // created(){
  //       console.log(this.$store.state.user);
  //     },
  methods: {
    onLogout() {
      axios.post("api/users/logout").then((response) => {
        // handle success
        // console.log(response);
        this.$store.commit('set_user',null)
        this.$swal({
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
          type: "success",
          title: (this.title_success = response.data.message),
        });
        this.onRedirect();
      });
    },
    onRedirect() {
      this.$router.push("/");
    },
  },
};
</script>
