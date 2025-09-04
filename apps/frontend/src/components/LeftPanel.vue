<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { getRootFolder,getChildren } from "@/services/folder/folder"
import type { FolderDTO } from "@explorer/shared-types"
import LeftNode from "./LeftNode.vue"

// tipe data
interface Folder extends FolderDTO {
  isOpen?: boolean
  loaded?: boolean
}

interface SelectedItem {
  id: number
  name: string
  type: string
}

const props = defineProps<{
  refresh?: boolean
  selectedItem?: SelectedItem | null,
}>()

// state root folders
const folders = ref<Folder[]>([])
const emit = defineEmits<{
  (e: "select", id: number, name: string): void
  (e: "selectItem", id: number, name: string, type: string): void
}>()

const fetchData = async () => {
  const data = await getRootFolder()
  folders.value = data.map((f: Folder) => ({ ...f, isOpen: false, loaded: false }))
}

// load root folders pertama kali
onMounted(async () => {
  await fetchData()
})

// fungsi toggle folder
const toggleFolder = async (folder: Folder) => {
  if (!folder.isOpen) {
    // kalau folder belum open
    if (!folder.loaded) {
      const data = await getChildren(folder.id)
      folder.children = data.map((c: Folder) => ({
        ...c,
        isOpen: false,
        loaded: false,
      }))
      folder.loaded = true
    }
    folder.isOpen = true
  } else {
    folder.isOpen = false
  }
}

const selectFolder = (folder: Folder) => {
  emit("select", folder.id, folder.name)
}

const selectItem = (folder: SelectedItem) => {
  emit("selectItem", folder.id, folder.name, folder.type)
}

watch(
  () => props.refresh,
  async () => {
    await fetchData()
  },
  { immediate: true }
)
</script>

<template>
  <ul class="space-y-1">
    <LeftNode
      v-for="f in folders"
      :key="f.id"
      :folder="f"
      :selected-item="props.selectedItem"
      @toggle="toggleFolder"
      @select="selectFolder"
      @select-item="selectItem"
      :class="props.selectedItem?.id === f.id ? 'bg-gray-800' : ''"
    />
  </ul>
</template>
