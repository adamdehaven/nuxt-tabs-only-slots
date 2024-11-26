<template>
  <div
    v-if="isSelected"
    role="tabpanel"
    class="tab-item"
  >
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  active?: boolean
}>()

// TODO: Utilize defineSlots instead to get type inheritance
const slots = useSlots()
const { selectedIndex, registerTabPanel, unregisterTabPanel } = useTabContext()

const index = ref(registerTabPanel({ header: () => slots.header?.() }))
const isSelected = computed(() => selectedIndex.value === index.value)

// Handle active prop
watch(() => props.active, (value) => {
  if (value && selectedIndex.value !== index.value) {
    selectedIndex.value = index.value
  }
}, { immediate: true })

onBeforeUnmount(() => {
  unregisterTabPanel(index.value)
})
</script>