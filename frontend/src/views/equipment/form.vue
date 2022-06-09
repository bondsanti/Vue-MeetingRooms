<template>
<Layout> 
 <div class="form-group" slot="buttons">
     <router-link to="/equip" class="btn btn-primary btn-sm">รายการข้อมูล</router-link>
     <router-link to="/equip-form" class="btn btn-primary disabled btn-sm" >เพิ่มข้อมูล</router-link>
 </div>
  <b-card-group deck>
          <b-card border-variant="dark" header-bg-variant="success">
              <header> <h5><b-icon icon="list"></b-icon> เพิ่ม/แก้ไข ข้อมูลอุปกรณ์ห้องประชุม</h5> </header>
            <hr>
            <b-card-text> </b-card-text>
          </b-card>
        </b-card-group>
</Layout> 
</template>

<script>
import Layout from '@/components/Layout.vue'
export default {
    components:{
        Layout
    }
}
</script>
<style scoped>
.btn{
    margin-right: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
}
/* btn.router-link-active{
  background-color: #ced4da;
} */
</style>