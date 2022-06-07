<template>
  <b-container fluid="md">
    <b-row>
      <b-col></b-col>
      <b-col cols="10" lg="5" md="7">
        <img alt="ระบบจองห้องประชุม" src="../assets/logo.png" width="150px" class="mt-4 mb-3 img-logo" />
        <h4 class="text-center">ระบบจองห้องประชุม</h4>
        <h5 class="text-success text-center">MEETTING ROOMS BOOKING</h5>
        <b-card-group deck>
          <b-card border-variant="success" header-bg-variant="success">
            <template #header>
              <h6 class="text-white text-center">Login</h6>
            </template>
            <b-card-text>
              <b-form @submit.prevent="onSubmit">
                <label for="" class="mb-2 lable">ชื่อผู้ใช้</label>
                <b-form-input id="u_username" v-model.trim="form.u_username" type="text" placeholder="" required>
                </b-form-input>

                <label for="" class="mb-2 mt-3 lable">รหัสผ่าน</label>
                <b-form-input id="u_password" v-model.trim="form.u_password" type="password" placeholder="" required>
                </b-form-input>



                <b-row class="mb-2 mt-4">
                  <b-col>
                    <b-button squared type="submit" variant="success">เข้าสู่ระบบ
                    </b-button>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <b-button @click="onRedirect()" squared variant="primary">ลงทะเบียน</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  data() {

    return {
     
      form: {
        u_username: "",
        u_password: "",
        u_firstname: "",
        u_lastname: "",
      },

    };
  },
  methods: {
    onRedirect() {
      this.$router.push('/register')
    },
    onSubmit() {
      //console.log(this.form);
      const postData = this.form;
      axios
        .post("api/users/login", postData)
        .then(response => {
          // handle success
         //console.log(response);
          this.$swal({
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            type: "success",
            title: this.title_success = response.data.message,
          });
          this.form = {
            u_username: "",
            u_password: "",
          }
          this.$router.push("/main")
        })
        .catch(error => {
          // handle error
          this.title_er = error.response.data.error.message


          //console.log(obj);
          this.$swal({
            icon: 'warning',
            type: "warning",
            title: this.title_er,

          });
          this.form = {
            u_username: "",
            u_password: "",
          }
        });
    },
  },
  computed: {

  },
};
</script>
<style scoped>
h4 {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 4px;
}

h6 {
  font-weight: 600;
  letter-spacing: 3px;
}

button {
  width: 100%;
}

.img-logo {
  display: block;
  margin: auto;
}
</style>
