<script setup lang="ts">
import { computed, ref } from "vue";
import { useGithubV4 } from "../hooks/useGithubV4";
import { useEventListener } from "@vueuse/core";
import CommentEditor from "./CommentEditor.vue";

const { userInfo, getAuthorizeUrl, logout, isAuthed } = useGithubV4();
const user = computed(() => userInfo.value);
const show = ref(false);

useEventListener(
  "click",
  () => {
    if (show.value) show.value = false;
  },
  false
);

function onShow(e: Event) {
  e.stopPropagation();
  show.value = true;
}

function onLogin() {
  const url = getAuthorizeUrl();
  window.location.href = url;
}

function onLogout() {
  logout();
}
</script>
<template>
  <div class="flex">
    <div class="flex items-center justify-center w-12 h-12 mr-4">
      <div
        v-if="!isAuthed"
        class="flex items-center justify-center w-11 h-11 overflow-hidden border-2 rounded-full cursor-pointer border-gray-200 dark:border-gray-700"
        @click="onLogin"
        title="Login"
      >
        <div
          class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <span class="text-xs text-gray-500 dark:text-gray-300">Login</span>
        </div>
      </div>
      <div v-else class="relative">
        <img
          class="w-10 h-10 rounded-full cursor-pointer"
          v-lazy="user.avatarUrl"
          @click="onShow"
        />
        <!-- Dropdown menu -->
        <div
          v-show="show"
          class="absolute top-0 left-12 z-10 text-sm border-default bg-white dark:bg-[#232323] divide-y dark:divide-gray-700 rounded-lg shadow"
        >
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <span>{{ user.login }}</span>
            <span v-if="user.email"> {{ user.email }}</span>
          </div>
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                :href="user.url"
                class="block px-4 py-2 hover-bg-gray"
                target="_blank"
              >
                Github
              </a>
            </li>
          </ul>

          <div class="py-1">
            <a
              href="#"
              class="block px-4 py-2 text-sm hover-bg-gray"
              @click="onLogout"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <CommentEditor />
    </div>
  </div>
</template>
