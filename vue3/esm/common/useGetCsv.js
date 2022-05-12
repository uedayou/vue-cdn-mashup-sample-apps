import { ref, watch, onMounted } from 'vue'
import { parse } from 'csv-parse/dist/esm/sync'

export default function useGetCsv(url, encoding = 'utf8') {
  const data = ref([])
  const loading = ref(true)

  const initialize = async () => {
    loading.value = true
    try {
      const buf = await(await fetch(url)).arrayBuffer()
      const text = new TextDecoder(encoding).decode(buf)
      data.value = parse(text, {columns: true})
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
  onMounted(initialize)
  watch(() => url, initialize)

  return { data, loading }
}
