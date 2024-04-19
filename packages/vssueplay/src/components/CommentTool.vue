<script setup lang="ts">
import { useDark } from "@vueuse/core";
const isDark = useDark();
</script>

<template>
  <div class="flex items-center justify-between py-2 mb-4 border-b b-gray">
    <div class="space-x-4">
      <span
        class="cursor-pointer hover:text-gray-400 hover:dark:text-gray-600 icon-[material-symbols--light-mode] dark:icon-[material-symbols--dark-mode]"
        @click="isDark = !isDark"
        title="change theme"
      />
      <a
        href="https://github.com/shellingfordly/vssueplay"
        target="_blank"
        class="cursor-pointer hover:text-gray-400 hover:dark:text-gray-600 icon-[mdi--github]"
        title="github"
      />
    </div>

    <div class="flex items-center justify-between">
      <div>
        Powered by
        <a
          class="text-blue-500 dark:text-blue-800 a-blue"
          href="https://github.com/shellingfordly/"
          target="_blank"
        >
          GitHub
        </a>
        &
        <a
          class="text-blue-500 dark:text-blue-800 a-blue"
          href="https://github.com/shellingfordly/vssueplay"
          target="_blank"
        >
          vssueplay
        </a>
      </div>
    </div>
  </div>
</template>
