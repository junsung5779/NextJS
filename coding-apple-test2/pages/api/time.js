export default async function handler(request, response) {
  if (request.method == 'GET') {
    const date = new Date()
    const parseDate = date.toString()
    return response.status(200).json(parseDate)
  } else {
    return response.status(400).json('잘못된 요청 정보입니다(시계).')
  }
}
