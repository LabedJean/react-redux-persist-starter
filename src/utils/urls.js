const baseUrl = process.env.NODE_ENV === 'development' ?
'http://127.0.0.1:3000/api/v1'
:
'http://127.0.0.1:3000/api/v1'

module.exports = {
  randomResult: `${baseUrl}/random_results`
}