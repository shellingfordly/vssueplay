<script setup lang='ts'>
import { useDark } from "@vueuse/core";

const dark = useDark();

</script>
<template>
  <div class="mb-10">
    <button class="btn-primary" @click="dark = !dark">change mode</button>
  </div>
</template>
<style scoped></style>
