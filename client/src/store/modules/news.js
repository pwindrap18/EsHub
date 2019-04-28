import axios from 'axios'

const state = {
    news: []
}

const getters = {
    allNews: (state) => state.news
}

const actions = {
    async fetchNews({
        commit
    }) {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=gb&category=technology&pageSize=20&apiKey=80bf7c5cba2947b7bde52c231d0f5876')

        commit('setNews', response.data.articles)
    }
}

const mutations = {
    setNews: (state, news) => (state.news = news)
}

export default {
    state,
    getters,
    actions,
    mutations
}