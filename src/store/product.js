import axios from 'axios'

export default {
  strict: true,
  state: {
    products: []
  },
  // 操作行為，如ajax，但是不用於操作資料狀態
  actions: {
    getProducts (context, page) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      context.commit('LOADING', true)
      // 由於這邊的 this 不是指向原本 vue 的元件，無法使用 this 直接去使用 $http中的 方法，必須另行導入 axios
      // this.$http.get(api).then((response) => {
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        // vm.pagination = response.data.pagination
        context.commit('LOADING', false)
      })
    }
  },
  // 操作資料狀態，非同步行為不要在這邊執行，會導致 state 和 mutation 資料狀態不同步，除錯可能會有困難
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  // 取代 computed
  getters: {
    products: state => state.products,
  }
}
