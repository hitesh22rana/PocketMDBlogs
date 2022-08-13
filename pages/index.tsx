import type { NextPage } from 'next'
import React from 'react'

import { Waypoint } from 'react-waypoint'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { useQuery, gql } from '@apollo/client'

import Blog from '../components/Blog'
import styled from 'styled-components'
import { Data } from '../lib/interfaces'

// GraphQL Query
const BlogsQuery = gql`
    query ($pageNumber: Int!) {
        retrievePageArticles(page: $pageNumber) {
            id
            author
            title
            text
            url
        }
    }
`

// Styled components
const NavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

const Heading = styled.h2`
    font-weight: 600;
    font-size: 4em;
    margin: 20px auto;
`

// Progress Animation (MUI)
const Progress = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100px',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

// Main Component
const Home: NextPage = (): JSX.Element => {
    const { data, error, fetchMore, networkStatus } = useQuery(BlogsQuery, {
        variables: { pageNumber: 1 },
        notifyOnNetworkStatusChange: true,
    })

    if (error) {
        return <h1>An error Occured!</h1>
    }

    return (
        <>
            <NavBar>
                <Heading>Blogs</Heading>
            </NavBar>
            <Wrapper>
                {/* Mapping through all the blogs */}
                {data?.retrievePageArticles?.map(
                    (individualData: Data, index: number) => (
                        <React.Fragment key={index}>
                            {index ===
                                data?.retrievePageArticles?.length - 5 && (
                                <Waypoint
                                    onEnter={() =>
                                        fetchMore({
                                            variables: {
                                                pageNumber:
                                                    data?.retrievePageArticles
                                                        .length /
                                                        30 +
                                                    1,
                                            },
                                            updateQuery: (
                                                prev,
                                                { fetchMoreResult }
                                            ) => {
                                                if (!fetchMoreResult) {
                                                    return prev
                                                }

                                                return {
                                                    retrievePageArticles: [
                                                        ...prev?.retrievePageArticles,
                                                        ...fetchMoreResult?.retrievePageArticles,
                                                    ],
                                                }
                                            },
                                        })
                                    }
                                />
                            )}
                            <Blog
                                key={individualData?.id}
                                heading={individualData?.title}
                                subHeading={individualData?.text}
                                link={individualData?.url}
                            />
                        </React.Fragment>
                    )
                )}
                {networkStatus === 3 && <Progress />}
            </Wrapper>
        </>
    )
}

export default Home
