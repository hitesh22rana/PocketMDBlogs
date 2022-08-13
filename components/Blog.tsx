import React from 'react'
import styled from 'styled-components'
import { BlogData } from '../lib/interfaces'
import { useImageExtraction } from '../hooks/useImageExtraction'

// Styled Componnets
const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    max-width: 1250px;
    width: 100%;
    margin: 40px 20px;

    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
        margin: 40px auto;
        max-width: 450px;
    }
`

const Image = styled.img`
    display: flex;
    max-width: 450px;
    max-height: 450px;
    height: 100%;
    width: 100%;
    margin: auto 10px;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0px 20px;

    @media (max-width: 1000px) {
        padding: 0px;
    }
`

const Heading = styled.h2`
    font-size: 2em;
    margin: 10px 0px;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 1.6em;
    }
`

const SubHeading = styled.p`
    font-size: 1em;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 0.8em;
    }
`

const ReadArticle = styled.a`
    color: rgba(0, 0, 0, 0.88);
    font-weight: bolder;
    letter-spacing: 0.117em;
    line-height: 0.5;
    text-align: center;
    margin: 0px;
    padding-bottom: 0.25rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 100ms ease-in 0s;
    font-size: 0.75rem;
    text-align: start;
    border-bottom: 0.125rem solid black;
    width: 145px;
    font-family: SofiaProWeb, Helvetica, Arial, sans-serif;

    @media (max-width: 768px) {
        letter-spacing: 0.1em;
        line-height: 0.4;
        font-size: 0.65rem;
        width: 122px;
    }
`
const Blog: React.FC<BlogData> = (data): JSX.Element => {
    const imageUrl = useImageExtraction(data?.link)

    return (
        <Card>
            <Image src={imageUrl?.imageUrl} alt="img" />
            <Text>
                <Heading>{data?.heading}</Heading>
                <SubHeading>{data?.subHeading}</SubHeading>
                <ReadArticle href={data?.link} target="_blank">
                    READ THIS ARTICLE
                </ReadArticle>
            </Text>
        </Card>
    )
}

export default Blog
