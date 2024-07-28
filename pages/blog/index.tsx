import styled from "@emotion/styled";
import { createClient } from "@prismicio/client";
import { GetStaticProps } from "next";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import dimensions from "../../styles/dimensions";

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
        <>
            {/* <Helmet
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
            /> */}
            <Layout>
                <BlogTitle>
                    Blog
                </BlogTitle>
                <BlogGrid>
                    {posts.map((post, i) => (
                        <PostCard
                            key={i}
                            author={post.node.post_author}
                            category={post.node.post_category}
                            title={post.node.post_title}
                            date={post.node.post_date}
                            description={post.node.post_preview_description}
                            uid={post.node._meta.uid}
                        />
                    ))}
                </BlogGrid>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const client = createClient("upiprabhu")

    const posts = await client.getAllByType('post', {
        orderings: {
            field: 'my.post.date',
            direction: 'desc',
        },
    })

    const meta = {
        title: 'Blog | Upasana Prabhu',
        description: "Upasana's blog posts and articles",
        author: 'Upasana Prabhu',
    }

    console.log("posts", posts)

    return {
        props: {
            posts: posts.map(post => ({
                node: {
                    post_title: post.data.post_title,
                    post_date: post.data.post_date,
                    post_category: post.data.post_category,
                    post_preview_description: post.data.post_preview_description,
                    post_author: post.data.post_author,
                    _meta: {
                        uid: post.uid
                    }
                }
            })),
            meta,
        },
    }
}
