import { NextApiRequest, NextApiResponse } from 'next'
 
export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Rodrigo'},
    {id: 2, name: 'Adriano'},
    {id: 3, name: 'Bruno'},
  ]

  return response.json(users)
}