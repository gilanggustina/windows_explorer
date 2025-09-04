<script setup lang="ts">
import { ref, watch } from "vue"
import { getChildren } from "@/services/folder/folder"
import type { FileDTO, FolderDTO } from "@explorer/shared-types"
import { getFilesByFolder } from "@/services/file/file";

interface HistoryItem {
  id: number,
  name: string
}

interface SelectedItem extends HistoryItem {
  type: string
}

const props = defineProps<{
  folder?: HistoryItem | null,
  refresh?: boolean
  search?: string
}>()

const emit = defineEmits<{
  (e: "select", id: number, name: string): void
  (e: "selectItem", id: number, name: string, type: string): void
}>()

const subFolders = ref<FolderDTO[]>([])
const files = ref<FileDTO[]>([])
const dataSelected = ref<SelectedItem | null>(null)

const fetchData = async () => {
  if (props.folder) {
    const [children,file] = await Promise.all([
      await getChildren(props.folder?.id, props.search),
      await getFilesByFolder(props.folder?.id, props.search)
    ])
    subFolders.value = children
    files.value = file
  } else {
    subFolders.value = []
    files.value = []
  }
}

watch(
  () => props.refresh,
  async () => {
    await fetchData()
  },
  { immediate: true }
)
watch(
  () => props.folder,
  async () => {
    await fetchData()
  },
  { immediate: true }
)

watch(
  () => props.search,
  async () => {
    await fetchData()
  },
  { immediate: true }
)

const handleDoubleClick = (id: number, name: string) => {
  emit("select", id, name)
}

const handleSelectItem = (id: number, name: string, type: string) => {
  dataSelected.value = { id, name, type }
  emit("selectItem", id, name, type)
}
</script>

<template>
  <div>
    <!-- Subfolders -->
    <div>
      <h3 class="font-semibold mb-1">Folders</h3>
      <div v-if="subFolders.length" class="grid grid-cols-12 gap-4">
        <div
          v-for="sf in subFolders"
          :key="sf.id"
          class="flex flex-col items-center p-3 rounded hover:bg-gray-800 cursor-pointer"
          @click="handleSelectItem(sf.id, sf.name,'folder')" @dblclick="handleDoubleClick(sf.id, sf.name)"
          :class="dataSelected?.id === sf.id ? 'bg-gray-800' : ''"
        >
          <span class="text-4xl">📁</span>
          <span class="truncate text-sm mt-2">{{ sf.name }}</span>
        </div>
      </div>
      <p v-else class="text-gray-500">Tidak ada subfolder</p>
    </div>

    <!-- Files -->
    <div class="mt-6">
      <h3 class="font-semibold mb-1">Files</h3>
      <div v-if="files.length" class="grid grid-cols-12 gap-4">
        <div
          v-for="file in files"
          :key="file.id"
          class="flex flex-col items-center p-3 rounded hover:bg-gray-800 cursor-pointer"
          @click="handleSelectItem(file.id, file.name,'file')"
          :class="dataSelected?.id === file.id ? 'bg-gray-800' : ''"
        >
          <span class="text-3xl">📄</span>
          <span class="truncate text-xs mt-2">{{ file.name }}</span>
        </div>
      </div>
      <p v-else class="text-gray-500">Tidak ada file</p>
    </div>
  </div>
</template>
