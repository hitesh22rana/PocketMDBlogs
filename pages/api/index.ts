import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '../../lib/interfaces'
import { parser } from 'html-metadata-parser'
import NextCors from 'nextjs-cors'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | null>
) {
    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200,
    })

    const { url } = req.body
    if (url) {
        try {
            const data = await parser(url)
            if (data?.og?.image) {
                return res.status(200).json({ data: data?.og?.image })
            }
            return res.status(200).json({ data: 'noImage.png' })
        } catch (err) {
            return res.status(200).json({ data: 'noImage.png' })
        }
    }
    return res.status(200).json({ data: 'noImage.png' })
}
