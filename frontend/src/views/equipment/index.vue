<template>
<Layout> 
 <div class="form-group" slot="buttons">
<router-link to="/equip" class="btn btn-primary disabled btn-sm">รายการข้อมูล</router-link>
     <router-link to="/equip-form" class="btn btn-primary btn-sm" >เพิ่มข้อมูล</router-link>
  
 </div>
  <b-card-group deck>
          <b-card border-variant="dark" header-bg-variant="success">
              <header class="mb-3"> <h5><b-icon icon="list"></b-icon> รายการ อุปกรณ์ห้องประชุม</h5> </header>

            <b-card-text> 
                <table class="table">
                    <thead>
                        <tr>
                            <th>รูปภาพ</th>
                            <th>ชื่ออุปกรณ์</th>
                            <th>รายละเอียด</th>
                            <th>วันที่แก้ไขล่าสุด</th>
                            <th class="text-center">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in equipments" :key="item.eq_id">
                            <td>{{item.eq_image}}</td>
                            <td>{{item.eq_name}}</td>
                            <td>{{item.eq_detail || 'ไม่มีข้อมูล'}}</td>
                            <td>{{item.eq_created}}</td>
                            <td class="text-center">

                               <b-icon icon="pencil-square" class="pointer text-info"></b-icon>
                            <b-icon icon="x-circle-fill" class="pointer text-danger"></b-icon>
                            </td>
                        </tr>
                    </tbody>
                </table>
              
            </b-card-text>
          </b-card>
        </b-card-group>
</Layout> 
</template>

<script>
import Layout from '@/components/Layout.vue'
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['equipments'])
    },
    components:{
        Layout
    },
    created(){
        this.$store.dispatch('get_data_equipments')
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