<script setup lang="ts">
  import HeaderPanel from '@/components/HeaderPanel.vue';
  import LeftPanel from '@/components/LeftPanel.vue';
  import RightPanel from '@/components/RightPanel/RightPanel.vue';
import SubHeaderPanel from '@/components/SubHeaderPanel.vue';
  import DefaultLayout from '@/layouts/DefaultLayout.vue';
  import { Splitter, SplitterPanel } from 'primevue';
  import { ref } from 'vue';

  interface HistoryItem {
    id: number,
    name: string
  }
  interface SelectedItem extends HistoryItem {
    type: string
  }

  const selectedFolder = ref<HistoryItem | null>(null)
  const selectItem = ref<SelectedItem | null>(null)
  const refresh = ref<boolean>(false)
  const history = ref<HistoryItem[]>([])
  const currentIndex = ref(-1)
  const search = ref<string>("")


  const handleSelect = (id: number, name: string) => {
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1)
    }

    const item: HistoryItem = { id, name }
    history.value.push(item)
    currentIndex.value++
    selectedFolder.value = item
  }

  const handleRefresh = () => {
    refresh.value = !refresh.value
  }

  const handleSearch = (query: string) => {
    search.value = query
  }

  const handleSelectItem = (id: number, name: string, type: string) => {
    selectItem.value = { id, name, type }
  }

  const goBack = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
      selectedFolder.value = history.value[currentIndex.value]
    }
  }

  const goForward = () => {
    if (currentIndex.value < history.value.length - 1) {
      currentIndex.value++
      selectedFolder.value = history.value[currentIndex.value]
    }
  }

</script>

<template>
  <DefaultLayout>
    <div class="w-screen h-screen flex">
      <div class="w-full flex-col p-2">
        <div class="w-full flex flex-col">
          <HeaderPanel @back="goBack" @forward="goForward" @upto="handleSelect" @select="handleSelect" @refresh="handleRefresh" @search="handleSearch" :folder-id="selectedFolder?.id ?? null" />
          <SubHeaderPanel @refresh="handleRefresh" :selected-item="selectItem" :current-folder="selectedFolder"/>
        </div>
        <Splitter style="height: calc(100vh - 95px);">
          <SplitterPanel class="flex" :size="20" :min-size="10">
            <div class="w-full relative scroll-auto flex flex-col box-border shadow-xl">
              <div class="w-full flex flex-col">
                <LeftPanel :refresh="refresh" :selected-item="selectItem" @select-item="handleSelectItem" @select="handleSelect"/>
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel class="flex" :size="80">
            <div class="pl-2 h-full">
              <RightPanel @select="handleSelect" :refresh="refresh" :search="search" :folder="selectedFolder" @selectItem="handleSelectItem" />
            </div>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  </DefaultLayout>
</template>
