<template>
  <div class="container">
    <h2 class="section-title">Horizontal Tabs (Default)</h2>
    <TabGroup>
      <TabItem :active="true">
        <template #header>First <b>Tab</b></template>
        <h2>First Tab Content</h2>
        <p>This is the content of the first tab.</p>
      </TabItem>
      <TabItem>
        <template #header>Second Tab</template>
        <h2>Second Tab Content</h2>
        <p>This is the content of the second tab.</p>
      </TabItem>
      <TabItem>
        <template #header>Third Tab</template>
        <h2>Third Tab Content</h2>
        <p>This is the content of the third tab.</p>
      </TabItem>
    </TabGroup>

    <h2 class="section-title">Vertical Tabs</h2>
    <TabGroup orientation="vertical">
      <TabItem :active="true">
        <template #header>First <b>Tab</b></template>
        <h2>First Tab Content</h2>
        <p>This is the content of the first tab.</p>
      </TabItem>
      <TabItem>
        <template #header>Second Tab</template>
        <h2>Second Tab Content</h2>
        <p>This is the content of the second tab.</p>
      </TabItem>
      <TabItem>
        <template #header>Third Tab</template>
        <h2>Third Tab Content</h2>
        <p>This is the content of the third tab.</p>
      </TabItem>
    </TabGroup>
  </div>
</template>

<style>
.container {
  max-width: 800px;
  margin: 32px auto;
  padding: 0 16px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin: 32px 0 16px;
}
</style>