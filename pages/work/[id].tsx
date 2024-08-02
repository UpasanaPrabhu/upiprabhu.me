import styled from "@emotion/styled";
import { createClient } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/_ui/Button";
import { GetStaticProps } from "next";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import colors from "../../styles/colors";
import { Image } from "@chakra-ui/react";

const ProjectTitle = styled("div") `
    margin: 0 auto;
`

const ProjectBody = styled("div")`
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const WorkLink = styled("a")`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Project = ({ project, meta }) => {
    return (
        <>
            <Helmet
                title={`${project.project_title[0].text}`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title[0].text} | upiprabhu.me`,
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
                <ProjectTitle>
                    <PrismicRichText field={project.project_title} />
                </ProjectTitle>
                {project.project_hero_image && (
                    <Image w="100%" src={project.project_hero_image.url} alt="bees" />
                )}
                <ProjectBody className="reset-scope">
                    <PrismicRichText field={project.project_description} />
                    <WorkLink href={"/work"}>
                        <Button className="Button--secondary">
                            See other work
                        </Button>
                    </WorkLink>
                </ProjectBody>
            </Layout>
        </>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
};

export default Project

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = createClient("upiprabhu")

    const project = await client.getByUID('project', params.id as string)
    const meta = {
        title: "Project",
        description: "Project",
        author: 'Upasana Prabhu',
    }

    return {
        props: {
            project: {
                project_title: project.data.project_title,
                project_preview_description: project.data.project_preview_description,
                project_preview_thumbnail: project.data.project_preview_thumbnail,
                project_category: project.data.project_category,
                project_post_date: project.data.project_post_date,
                project_hero_image: project.data.project_hero_image,
                project_description: project.data.project_description,
                _meta: {
                    uid: project.uid
                }
            },
            meta
        },
    }
}

export async function getStaticPaths() {
    const client = createClient("upiprabhu")

    const posts = await client.getAllByType('project')

    const paths = posts.map((post) => ({
        params: { id: post.uid },
    }))

    return {
        paths,
        fallback: false,
    }
}
