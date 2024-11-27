<template>
  <div
    role="tab"
    class="tab"
    :class="{ 'tab-active': isSelected }"
    :id="`tab-${itemId}`"
    :aria-controls="`panel-${itemId}`"
    :aria-selected="isSelected"
    tabindex="0"
    @click="selectedId = itemId"
  >
    <!-- Use MDCSlot and unwrap `p` tag -->
    <slot name="header">
      {{ header }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, watch, onBeforeUnmount, useSlots } from 'vue'
import type { TabContext } from '~/types/tabs'
import { TAB_CONTEXT_KEY } from '~/types/tabs'

const props = defineProps<{
  active?: boolean
  header?: string
}>()

const itemId = useId()
const slots = defineSlots<{
  default(): any
  header(): any
}>()

const context = inject<TabContext>(TAB_CONTEXT_KEY)

if (!context) {
  throw new Error('TabItem must be used within a TabGroup component')
}

const { selectedId, registerPanel, unregisterPanel } = context

registerPanel({
  header: () => slots.header?.(),
  content: () => slots.default?.(),
  id: itemId,
})

const isSelected = computed(() => selectedId.value === itemId)

watch(() => props.active, (value) => {
  if (value && selectedId.value !== itemId) {
    selectedId.value = itemId
  }
}, { immediate: true })

onBeforeUnmount(() => {
  unregisterPanel(itemId)
})
</script>

<style scoped>
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #6b7280;
  transition: all 0.2s ease;
  background-color: #eee;
  padding: 4px 8px;
  border-radius: 6px;
}

.tab:hover {
  color: #111827;
}

.tab-active,
.tab-active:hover {
  color: #007ac1;
  background-color: #ccc;
}
</style>
