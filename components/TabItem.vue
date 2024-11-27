<template>
  <div
    class="tab-item"
    role="tabpanel"
    :id="`panel-${itemId}`"
    :aria-labelledby="`tab-${itemId}`"
    v-show="isSelected"
    tabindex="0"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, watch, onBeforeUnmount, useSlots } from 'vue'
import type { TabContext } from '~/types/tabs'
import { TAB_CONTEXT_KEY } from '~/types/tabs'

const props = defineProps<{
  active?: boolean
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
.tab-item:focus {
  outline: none;
}

.tab-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
