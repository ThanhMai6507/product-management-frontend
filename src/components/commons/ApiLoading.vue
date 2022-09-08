<template>
  <div class="loading">
    <img class="icon-loading" src="@/assets/images/icons/ic_loading.svg" alt="" width="120">
  </div>
</template>

<script>
export default {
  name: 'ApiLoading'
}
</script>

<style scoped>
.loading {
  position: fixed;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  top: 0;
}

.loading .icon-loading {
  display: block;
  margin: calc(50vh - 60px) auto auto;
}
</style>
