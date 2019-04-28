import axios from 'axios'

const state = {
    tournaments: [],
    tournament: ''
}

const getters = {
    allTourney: (state) => state.tournaments,
    tourney: (state) => state.tournament
}

const actions = {
    async fetchTourney({
        commit
    }) {
        const response = await axios.get('http://localhost:3000/tournaments')

        commit('setTourney', response.data)
    },

    async fetchOneTourney({
        commit
    }, id) {
        console.log(id)
        const response = await axios.get(`http://localhost:3000/tournaments/${id}`)
        console.log(response.data)
        commit('setOneTourney', response.data)
    }
}

const mutations = {
    setTourney: (state, tournaments) => (state.tournaments = tournaments),
    setOneTourney: (state, tournament) => (state.tournament = tournament)
}

export default {
    state,
    getters,
    actions,
    mutations
}