<template>
  <div
    class="tab-item"
    role="tabpanel"
    :id="`panel-${id}`"
    :aria-labelledby="`tab-${id}`"
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

const slots = useSlots()
const id = useId()

const context = inject<TabContext>(TAB_CONTEXT_KEY)

if (!context) {
  throw new Error('TabItem must be used within a TabGroup component')
}

const { selectedId, registerPanel, unregisterPanel } = context

registerPanel({
  header: () => slots.header?.(),
  id
})

const isSelected = computed(() => selectedId.value === id)

watch(() => props.active, (value) => {
  if (value && selectedId.value !== id) {
    selectedId.value = id
  }
}, { immediate: true })

onBeforeUnmount(() => {
  unregisterPanel(id)
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
