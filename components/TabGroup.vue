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
      <!-- Use MDCSlot and unwrap `p` tag -->
      <slot />
    </div>
    <div class="tab-panels" data-allow-mismatch="children">
      <div
        v-if="slotCount === panels.length"
        v-for="panel in panels.sort((a, b) => a.order! - b.order!)"
        :key="panel.id"
        class="tab-item"
        role="tabpanel"
        :id="`panel-${panel.id}`"
        :aria-labelledby="`tab-${panel.id}`"
        v-show="selectedId === panel.id"
        tabindex="0"
      >
        <component :is="panel.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabPanel } from '~/types/tabs'
import { TAB_CONTEXT_KEY } from '~/types/tabs'

defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
})

// Replace with useState
const panels = ref<TabPanel[]>([])
const selectedId = ref<string | null>(null)
const slots = defineSlots<{
  default(): any
}>()

const slotCount = computed(() => slots.default?.().length || 0)

// Once the panel count matches the slot count, activate the first tab if no tab is active
watch(() => panels.value.length, (panelCount) => {
  if (panelCount === slotCount.value && !selectedId.value) {
    selectedId.value = panels.value[0].id
  }
})

function registerPanel(panel: TabPanel): void {
  const existingPanel = panels.value.find(p => p.id === panel.id)
  if (!existingPanel) {
    panels.value.push({
      ...panel,
      order: panels.value.length + 1
    })
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
  padding-bottom: 8px;
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

.tab-panels {
  padding: 16px 0;
}

.tab-item:focus {
  outline: none;
}

.tab-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

:deep(h2) {
  margin-top: 0;
  padding-top: 0;
}
</style>
