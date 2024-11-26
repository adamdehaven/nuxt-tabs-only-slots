<template>
  <div class="tab-group" :class="orientation">
    <div class="tab-list" role="tablist">
      <button
        v-for="(panel, index) in panels"
        :key="index"
        role="tab"
        class="tab"
        :class="{ 'tab-active': selectedIndex === index }"
        :aria-selected="selectedIndex === index"
        :tabindex="selectedIndex === index ? 0 : -1"
        @click="selectedIndex = index"
      >
        <component :is="panel.header" />
      </button>
    </div>
    <div class="tab-panels" role="tabpanels">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
})

const { panels, selectedIndex } = createTabContext()
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