<template>
  <div class="container">
    <h2 class="section-title">Horizontal Tabs (Default)</h2>
    <TabGroup>
      <TabItem>
        <template #header>First <b>Tab</b></template>
        <h2>First Tab Content</h2>
        <p>This is the content of the first tab.</p>
      </TabItem>
      <TabItem header="Header Prop Text">
        <h2>Second Tab Content</h2>
        <p>This is the content of the Second tab.</p>
      </TabItem>
      <TabItem active>
        <template #header>Third <b>Tab</b></template>
        <h2>Third Tab Content</h2>
        <p>This is the content of the Third tab.</p>
      </TabItem>
    </TabGroup>

    <h2 class="section-title">Vertical Tabs</h2>
    <TabGroup orientation="vertical">
      <TabItem>
        <template #header>First <b>Tab</b></template>
        <h2>First Tab Content</h2>
        <p>This is the content of the first tab.</p>
      </TabItem>
      <TabItem header="Header Prop Text">
        <template #header>Second <b>Tab</b></template>
        <h2>Second Tab Content</h2>
        <p>This is the content of the Second tab.</p>
      </TabItem>
      <TabItem>
        <template #header>Third <b>Tab</b></template>
        <h2>Third Tab Content</h2>
        <p>This is the content of the Third tab.</p>
      </TabItem>
    </TabGroup>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}

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
