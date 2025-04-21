<template>
    <div class="form-group">
        <label :for="id">{{ label }}</label>
        <input :type="type" class="form-control" :id="id" :value="modelValue" :placeholder="placeholder"
            :required="required" @input="$emit('update:modelValue', $event.target.value)" />
        <div class="form-feedback" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: { type: [String, Number], required: true },
    label: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    required: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>