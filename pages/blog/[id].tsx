import styled from "@emotion/styled";
import { createClient } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { GetStaticProps } from "next";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Moment from 'react-moment';
import colors from "../../styles/colors";
import Layout from "../../components/Layout";

const PostHeroContainer = styled("div")`
    max-height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 3em;

    img {
        width: 100%;
    }
`

const PostHeroAnnotation = styled("div")`
    padding-top: 0.25em;

    h6 {
        text-align: right;
        color: ${colors.grey600};
        font-weight: 400;
        font-size: 0.85rem;
    }

    a {
        color: currentColor;
    }
`

const PostCategory = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
    font-weight: 600;
    color: ${colors.grey600};

    h5 {
        margin-top: 0;
        margin-bottom: 1em;
    }
`

const PostTitle = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;

    h1 {
        margin-top: 0;
    }
`

const PostBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const PostMetas = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const PostAuthor = styled("div")`
    margin: 0;
`

const PostDate = styled("div")`
    margin: 0;
`

const Post = ({ post, meta }) => {
    return (
        <>
            <Helmet
                title={`${post.post_title[0].text}`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: `${post.post_preview_description[0].text}`,
                    },
                    {
                        property: `og:title`,
                        content: `${post.post_title[0].text} | upiprabhu.me`,
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
                <PostCategory>
                    <PrismicRichText field={post.post_category} />
                </PostCategory>
                <PostTitle>
                    <PrismicRichText field={post.post_title} />
                </PostTitle>
                <PostMetas>
                    <PostAuthor>
                        {post.post_author}
                    </PostAuthor>
                    <PostDate>
                        <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
                    </PostDate>
                </PostMetas>
                    {post.post_hero_image && (
                    <PostHeroContainer>
                        <img src={post.post_hero_image.url} alt="bees" />
                        <PostHeroAnnotation>
                            <PrismicRichText field={post.post_hero_annotation} />
                        </PostHeroAnnotation>
                    </PostHeroContainer>
                )}
                <PostBody>
                    <PrismicRichText field={post.post_body} />
                </PostBody>
            </Layout>
        </>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = createClient("upiprabhu")

    const post = await client.getByUID('post', params.id as string)
    const meta = {
        title: "Blog",
        description: "Blog Post",
        author: 'Upasana Prabhu',
    }

    return {
        props: {
            post: {
                post_title: post.data.post_title,
                post_date: post.data.post_date,
                post_category: post.data.post_category,
                post_preview_description: post.data.post_preview_description,
                post_author: post.data.post_author,
                post_body: post.data.post_body,
                _meta: {
                    uid: post.uid
                }
            },
            meta
        },
    }
}

export async function getStaticPaths() {
    const client = createClient("upiprabhu")

    const posts = await client.getAllByType('post')

    const paths = posts.map((post) => ({
        params: { id: post.uid },
    }))

    return {
        paths,
        fallback: false,
    }
}
