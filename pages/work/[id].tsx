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

// Custom components for PrismicRichText to handle embeds and links
const richTextComponents = {
    // Handle embedded videos (YouTube, Vimeo, etc.)
    embed: ({ node }: { node: any }) => {
        if (!node?.oembed?.html) return null;
        return (
            <div 
                className="video-embed"
                style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    maxWidth: '100%',
                    marginTop: '2em',
                    marginBottom: '2em',
                    borderRadius: '8px',
                }}
                dangerouslySetInnerHTML={{ __html: node.oembed.html }}
            />
        );
    },
    // Style hyperlinks
    hyperlink: ({ node, children }: { node: any; children: React.ReactNode }) => (
        <a 
            href={node?.data?.url || '#'}
            target={node?.data?.target || '_blank'}
            rel="noopener noreferrer"
            style={{
                color: colors.blue500,
                textDecoration: 'underline',
                transition: 'color 150ms ease-in-out',
            }}
        >
            {children}
        </a>
    ),
};

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

    /* Video embed responsive styles */
    .video-embed iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* Link hover styles */
    a:hover {
        color: ${colors.blue600};
    }
`

const WorkLink = styled("a")`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Project = ({ project, meta }: { project: any; meta: any }) => {
    return (
        <>
            <Helmet
                title={`${project.project_title?.[0]?.text || 'Project'}`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title?.[0]?.text || 'Project'} | upiprabhu.me`,
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
                ]}
            />
            <Layout>
                <ProjectTitle>
                    <PrismicRichText field={project.project_title} />
                </ProjectTitle>
                {project.project_hero_image?.url && (
                    <Image w="100%" src={project.project_hero_image.url} alt="project hero" />
                )}
                <ProjectBody className="reset-scope">
                    <PrismicRichText field={project.project_description} components={richTextComponents} />
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

    const project = await client.getByUID('project', params?.id as string)
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
