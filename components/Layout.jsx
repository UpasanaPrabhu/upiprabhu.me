import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import globalStyles from '../styles/global';
import typeStyles from '../styles/typography';
import dimensions from "../styles/dimensions";
import Header from "../components/Header";

const LayoutContainer = styled.div`
    max-width: ${dimensions.maxwidthDesktop}px;
    padding-left: ${dimensions.paddingHorizontalDesktop}em;
    padding-right: ${dimensions.paddingHorizontalDesktop}em;
    margin: 0 auto;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        padding-left: ${dimensions.paddingHorizontalTablet}em;
        padding-right: ${dimensions.paddingHorizontalTablet}em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        padding-left: ${dimensions.paddingHorizontalMobile}em;
        padding-right: ${dimensions.paddingHorizontalMobile}em;
    }

    .Layout__content {
        padding-bottom: 5em;
    }
`;

const Layout = ({ children }) => (
    <LayoutContainer className="div">
        <Global styles={[globalStyles, typeStyles]} />
        <div className="Layout">
            <Header />
            <main className="Layout__content">
                {children}
            </main>
        </div>
    </LayoutContainer>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
