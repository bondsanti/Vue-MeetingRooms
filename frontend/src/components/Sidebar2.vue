<template>
  <div class="">
    <b-card
      no-body
      border-variant="success"
      header-bg-variant="success"
      class="mt-2"
    >
      <template #header>
        <h6 class="text-white text-center">
          <b-icon icon="person"></b-icon> ส่วนของผู้ใช้งาน
        </h6>
      </template>
      <b-list-group flush>
        <b-list-group-item href="#" class="active"
          ><b-icon icon="chevron-right"></b-icon>
          จองห้องประชุม</b-list-group-item
        >
        <b-list-group-item href="#"
          ><b-icon icon="chevron-right"></b-icon
          >แก้ไขข้อมูลส่วนตัว</b-list-group-item
        >
        <b-list-group-item href="#"
          ><b-icon icon="chevron-right"></b-icon>เปลี่ยนรหัสผ่าน
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>
<style scoped>
.active {
  background-color: #dee2e6 !important;
  color: #212529 !important;
  border-bottom: #212529 !important;
}
</style>