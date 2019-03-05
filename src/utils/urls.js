const baseUrl = process.env.NODE_ENV === 'development' ?
'https://warm-castle-78155.herokuapp.com/api/v1'
:
'http://127.0.0.1:3000/api/v1'

module.exports = {
  randomResult: `${baseUrl}/random_results`
}