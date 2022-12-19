<script setup lang="ts">
const emit = defineEmits<{
  (event: "click"): void;
}>();

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button @click.stop="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background: var(--gofore-bg-primary);
  color: #fff;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 2rem;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
}
</style>
