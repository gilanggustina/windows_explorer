<script setup lang="ts">
  import { getFolderPath } from '@/services/folder/folder';
  import type { FolderPath } from '@explorer/shared-types';
  import { ref, watch } from 'vue';

  const props = defineProps<{
    folderId: number | null
  }>()

  const emit = defineEmits<{
    (e: "back"): void
    (e: "forward"): void
    (e: "select", id: number, name: string): void
    (e: "upto", id: number, name: string): void
    (e: "refresh"): void
    (e: "search", query: string): void
  }>()

  const search = ref<string>("")
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  const crumbs = ref<FolderPath[]>([])

  const goBack = () => emit("back")
  const goForward = () => emit("forward")
  const handleSelect = (id: number, name: string) => {
    emit("select", id, name)
  }
  const upto = (id: number, name: string) => {
    emit("upto", id, name)
  }

  const handleSearch = (query: string) => {
    emit("search", query)
  }

  watch(
    () => props.folderId,
    async (id) => {
      if (id) {
        const data = await getFolderPath(id)
        crumbs.value = data
      } else {
        crumbs.value = []
      }
    },
    { immediate: true }
  )

  watch(
    () => search.value,
    (val) => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(async () => {
        handleSearch(val)
      }, 300)
    },
    { immediate: true }
  )
</script>
<template>
  <div class="w-full grid grid-cols-5 gap-2 items-center">
    <div class="w-full flex col-span-4 items-center">
      <div class="cursor-pointer hover:bg-gray-800 rounded-sm p-2" @click="goBack">
        <IconifyIcon class="w-5 h-5" icon="formkit:arrowleft" />
      </div>
      <div class="cursor-pointer hover:bg-gray-800 rounded-sm p-2" @click="goForward">
        <IconifyIcon class="w-5 h-5" icon="formkit:arrowright" />
      </div>
      <div class="cursor-pointer hover:bg-gray-800 rounded-sm p-2" @click="upto(crumbs[crumbs.length - 2].id, crumbs[crumbs.length - 2].name)">
        <IconifyIcon class="w-5 h-5" icon="formkit:arrowup" />
      </div>
      <div class="cursor-pointer hover:bg-gray-800 rounded-sm p-2" @click="emit('refresh')">
        <IconifyIcon class="w-5 h-5" icon="formkit:refresh" />
      </div>
      <div class="w-full items-center flex gap-2 bg-gray-400/20 rounded-md p-2 ml-2">
        <div>
          <IconifyIcon class="w-4 h-4" icon="hugeicons:computer" />
        </div>
        <template v-for="(crumb) in crumbs" :key="crumb.id">
          <div @click="handleSelect(crumb.id, crumb.name)" class="flex gap-2 cursor-pointer items-center">
            <IconifyIcon class="w-4 h-4" icon="formkit:right" />
            <div>{{ crumb.name }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="w-full flex col-span-1 items-center">
      <div class="relative w-full">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none"
        />
        <IconifyIcon icon="icon-park-outline:search" class="absolute inset-y-0 right-3 top-2 flex items-center text-gray-400"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
 input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
 }
</style>
