<script setup lang="ts">
import type { FolderDTO } from "@explorer/shared-types";
import { computed } from "vue"

interface Folder extends FolderDTO {
  isOpen?: boolean
  loaded?: boolean
}

interface SelectedItem {
  id: number
  name: string,
  type: string
}

const props = defineProps<{
  folder: Folder,
  selectedItem?: SelectedItem | null
  class?: string
}>()

const emit = defineEmits<{
  (e: "toggle", folder: Folder): void
  (e: "select", folder: Folder): void
  (e: "selectItem", folder: SelectedItem): void
}>()

const selectItem = (folder: Folder) => {
  emit('selectItem', {
    id: folder.id,
    name: folder.name,
    type: "folder"
  })
}

const hasChildren = computed(() => props.folder.children && props.folder.children.length > 0)
</script>

<template>
  <li>
    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded" @click="selectItem(props.folder)" @dblclick="emit('select', props.folder)" :class="props.class">
      <span class="w-3" @click.stop="emit('toggle', props.folder)">
        <IconifyIcon class="w-5 h-5" icon="icon-park-outline:right" v-if="hasChildren && !props.folder.isOpen" />
        <IconifyIcon class="w-5 h-5 rotate-90" icon="icon-park-outline:right" v-else-if="hasChildren && props.folder.isOpen" />
      </span >
      <span class="w-4 text-center">
        <!-- icon folder -->
        <span v-if="props.folder.isOpen">📂</span>
        <span v-else>📁</span>
      </span>
      <span>{{ props.folder.name }}</span>
    </div>

    <ul v-if="props.folder.isOpen && hasChildren" class="ml-1 pl-2">
      <LeftNode
        :class="props.selectedItem?.id === child.id ? 'bg-gray-800' : ''"
        v-for="child in props.folder.children"
        :key="child.id"
        :folder="child"
        :selected-item="props.selectedItem"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
        @click="selectItem(child)"
      />
    </ul>
  </li>
</template>
