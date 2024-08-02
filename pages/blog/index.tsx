import styled from "@emotion/styled";
import { createClient } from "@prismicio/client";
import { GetStaticProps } from "next";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import dimensions from "../../styles/dimensions";
import Feature from "../../components/Feature";
import SectionHeader from "../../components/SectionHeader";
import { Heading } from "@chakra-ui/react";

const BlogTitle = styled("h1")`
    margin-bottom: 1em;
`

const BlogGrid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5em;

    @media(max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-template-columns: 1fr;
        grid-gap: 2.5em;
    }
`

export default function Blog({ posts, meta }) {
    return (
        <div className='chakra-scope'>
            <Helmet
                title={`Blog`}
                titleTemplate={`%s | upiprabhu.me`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `Blog | upiprabhu.me`,
                    },
                    {
                        property: `og:description`,
                        content: meta.description,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: meta.author,
                    },
                    {
                        name: `twitter:title`,
                        content: meta.title,
                    },
                    {
                        name: `twitter:description`,
                        content: meta.description,
                    },
                ].concat(meta)}
            />
            <Layout>
                <Heading my={4} size="lg">Blog</Heading>
                {posts.map((post, i) => (
                    <Feature 
                        key={i}
                        title={post.data.post_title}
                        desc={post.data.post_preview_description}
                        link={`/blog/${post.uid}`}
                        imageLink={post.data.post_hero_image.url}
                        date={post.data.post_date}
                        isExternal={false}
                    />
                ))}
            </Layout>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const client = createClient("upiprabhu")

    const posts = await client.getAllByType('post', {
        orderings: {
            field: 'my.post.post_date',
            direction: 'desc',
        },
    })

    const meta = {
        title: 'Blog | Upasana Prabhu',
        description: "Upasana's blog posts and articles",
        author: 'Upasana Prabhu',
    }

    return {
        props: {
            posts: posts,
            meta,
        },
    }
}