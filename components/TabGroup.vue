<template>
  <div
    class="tab-group"
    :class="orientation"
  >
    <div
      class="tab-list"
      role="tablist"
      :aria-orientation="orientation"
    >
      <button
        v-for="panel in panels"
        :key="panel.id"
        role="tab"
        class="tab"
        :class="{ 'tab-active': selectedId === panel.id }"
        :id="`tab-${panel.id}`"
        :aria-controls="`panel-${panel.id}`"
        :aria-selected="selectedId === panel.id"
        :tabindex="selectedId === panel.id ? 0 : -1"
        @click="selectedId = panel.id"
      >
        <component :is="panel.header" />
      </button>
    </div>
    <div class="tab-panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import type { TabPanel } from '~/types/tabs'
import { TAB_CONTEXT_KEY } from '~/types/tabs'

defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
})

const selectedId = ref<string | null>(null)
const panels = ref<TabPanel[]>([])

function registerPanel(panel: TabPanel): void {
  const existingPanel = panels.value.find(p => p.id === panel.id)
  if (!existingPanel) {
    panels.value.push(panel)
    if (!selectedId.value) {
      selectedId.value = panel.id
    }
  }
}

function unregisterPanel(id: string): void {
  panels.value = panels.value.filter(panel => panel.id !== id)
  if (selectedId.value === id) {
    selectedId.value = panels.value[0]?.id || null
  }
}

provide(TAB_CONTEXT_KEY, {
  selectedId,
  panels,
  registerPanel,
  unregisterPanel
})
</script>

<style scoped>
.tab-group {
  width: 100%;
}

.tab-group.horizontal .tab-list {
  display: flex;
  gap: 16px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 16px;
  min-height: 35px;
}

.tab-group.horizontal .tab {
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-group.horizontal .tab-active {
  border-bottom-color: #3b82f6;
}

.tab-group.vertical {
  display: flex;
  gap: 32px;
}

.tab-group.vertical .tab-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 2px solid #e5e7eb;
  padding-right: 16px;
}

.tab-group.vertical .tab {
  padding: 8px 16px;
  text-align: left;
  border-right: 2px solid transparent;
  margin-right: -16px;
}

.tab-group.vertical .tab-active {
  border-right-color: #3b82f6;
}

.tab-group.vertical .tab-panels {
  flex: 1;
}

.tab {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #6b7280;
  transition: all 0.2s ease;
}

.tab:hover {
  color: #111827;
}

.tab-active {
  color: #111827;
}

.tab-panels {
  padding: 16px 0;
}
</style>
