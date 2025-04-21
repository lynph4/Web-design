<template>
    <div class="form-group password-container">
        <label :for="id">{{ label }}</label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" :id="id" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :required="required" />
        <span class="toggle-password" @click="togglePassword">
            <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
        </span>
        <div class="form-feedback" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    modelValue: { type: String, required: true },
    label: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    required: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const showPassword = ref(false);

function togglePassword() {
    showPassword.value = !showPassword.value;
}
</script>