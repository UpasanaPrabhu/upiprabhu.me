import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import globalStyles from '../styles/global';
import typeStyles from '../styles/typography';
import dimensions from "../styles/dimensions";
import Header from "./Header";
import Navigation from "./Navigation";
import { Chakra } from './Chakra'
import { Container } from '@chakra-ui/react'

const Layout = ({ children }) => (
    <Chakra>
        <Global styles={[globalStyles, typeStyles]} />
        <div>
            <Navigation />
            <main>
                <Container my={8} maxW="container.md">
                    {children}
                </Container>
            </main>
        </div>
    </Chakra>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
