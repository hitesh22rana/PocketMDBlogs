// Custom Hook to extrtact image from the URL's Metadata

import { useState, useEffect } from 'react'

export function useImageExtraction(url: string) {
    const [imageUrl, setImageUrl] = useState<string | null>('noImage.png')

    useEffect(() => {
        ;(async () => {
            try {
                const rawResponse = await fetch('http://localhost:3000/api/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url }),
                })
                const content = await rawResponse.json()
                setImageUrl(content?.data)
            } catch (err) {
                setImageUrl('noImage.png')
            }
        })()
    }, [url])

    return { imageUrl }
}
