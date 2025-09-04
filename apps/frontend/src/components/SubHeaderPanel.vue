
<script setup lang="ts">
  import { createFile, deleteFile } from '@/services/file/file';
  import { createFolder, deleteFolder } from '@/services/folder/folder';
  import { Button, TieredMenu } from 'primevue';
  import Dialog from 'primevue/dialog';
  import { ref } from 'vue';

  interface SelectedItem {
    id: number;
    name: string;
    type: string;
  }

  interface selectedFolder {
    id: number;
    name: string;
  }

  interface Dialog {
    type: string;
  }

  interface Form {
    name: string,
    parentId?: number
  }

  const props = defineProps<{
    selectedItem?: SelectedItem | null,
    currentFolder: selectedFolder | null
  }>()

  const emit = defineEmits<{
    (e: "refresh"): void
  }>()

  const form = ref<Form>({
    name: '',
    parentId: props.currentFolder?.id
  })
  const showDialog = ref(false);
  const dialogType = ref<string | null>(null);
  const menu = ref();
  const menuItems = ref([
    {
      label: 'New File',
      icon: 'flat-color-icons:file',
      disabled: (props.selectedItem?.type == 'file') ? true : false,
      command: () => {
        showDialog.value = true
        dialogType.value = 'file'
      }
    },
    {
      label: 'New Folder',
      icon: 'flat-color-icons:folder',
      command: () => {
        showDialog.value = true
        dialogType.value = 'folder'
      }
    }
  ])

  const resetForm = () => {
    form.value.name = ''
  }

  const save = async () => {
    try{
      if(dialogType.value === 'file'){
        await createFile(form.value.name, props.currentFolder?.id)
      }else{
        await createFolder(form.value.name, props.currentFolder?.id)
      }
    }catch(e){
      console.log(e)
    }
    resetForm()
    dialogType.value = null
    showDialog.value = false
    emit('refresh')
  }

  const deleteItem = async () => {
    if (!props.selectedItem) return
    if (props.selectedItem.type === 'folder') {
      await deleteFolder(props.selectedItem?.id)
    }else{
      await deleteFile(props.selectedItem?.id)
    }
    emit('refresh')
  }

  const toggle = (event: Event) => {
    menu.value.toggle(event);
 };
</script>

<template>
  <div class="w-full flex items-center gap-2 mb-1">
    <div class="flex items-center gap-1 hover:bg-gray-800 rounded-md p-2 cursor-pointer" @click="toggle">
      <IconifyIcon class="w-5 h-5" icon="icons8:plus" />
      <span>New</span>
      <IconifyIcon class="w-5 h-5" icon="icon-park-outline:down" />
    </div>
    <TieredMenu ref="menu" id="overlay_tmenu" :model="menuItems" popup  class="bg-white">
        <template #item="{ item, props }">
          <div v-bind="props" class="flex items-center gap-1 hover:bg-gray-800 rounded-md px-2 py-1 cursor-pointer">
            <IconifyIcon class="w-5 h-5" :icon="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </template>
    </TieredMenu>
    <div class="flex hover:bg-gray-800 rounded-md p-2 cursor-pointer" @click="deleteItem">
      <IconifyIcon class="w-5 h-5" icon="mi:delete" />
    </div>

    <Dialog v-model:visible="showDialog" :header="`Create New ${dialogType == 'file' ? 'File' : 'Folder'}`" modal :show-header="true">
      <div class="w-full flex flex-col gap-5 px-1">
        <div class="w-full">
          <input type="text" v-model="form.name" :placeholder="dialogType == 'file' ? 'File Name' : 'Folder Name'" class="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none">
        </div>
        <div class="w-full flex gap-2">
          <Button label="Save" class="w-full" @click="save"></Button>
          <Button label="Cancel" class="w-full" @click="showDialog = false"></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
