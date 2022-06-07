<template>
  <div class="">
    <b-card no-body border-variant="danger" header-bg-variant="danger">
      <template #header>
        <h6 class="text-white text-center">
          <b-icon icon="lock"></b-icon> ส่วนของผู้ดูแลระบบ
        </h6>
      </template>
      <b-list-group flush>
        <b-list-group-item href="#"
          ><b-icon icon="chevron-right"></b-icon>
          ข้อมูลการจอง</b-list-group-item
        >
        <b-list-group-item href="#"
          ><b-icon icon="chevron-right"></b-icon>
          ข้อมูลอุปกรณ์ห้องประชุม</b-list-group-item
        >
        <b-list-group-item href="#"
          ><b-icon icon="chevron-right"></b-icon>
          ข้อมูลห้องประชุม</b-list-group-item
        >
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