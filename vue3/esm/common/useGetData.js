import { ref, watch, onMounted } from 'vue'

export default function useGetData(url, method = 'GET', body = '') {
  const data = ref()
  const loading = ref(true)

  const initialize = async () => {
    loading.value = true
    try {
      const params = { method }
      if (method.match(/POST/i)) params.body = body
      data.value = await(await fetch(url, params)).json()
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(initialize)
  watch(() => url, initialize)

  return { data, loading }
}
