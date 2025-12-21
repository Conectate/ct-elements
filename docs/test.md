<script setup>
import { ref } from 'vue'
import '@conectate/components/ct-button'

const count = ref(0)
</script>

# Markdown Content

The count is: {{ count }}

<ct-button :class="$style.button" raised @click="count++">Increment</ct-button>

<style module>
.button {
  font-weight: bold;
}
</style>
