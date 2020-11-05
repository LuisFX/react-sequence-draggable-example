import React from 'react';
import { Container } from './styles';

export interface IframeViewerProps {
  animate?: boolean;
  iframeURL?: string;
}

const IframeViewer: React.FC<IframeViewerProps> = ({ animate, iframeURL }) => {
  return (
    <Container animate={animate}>
      {iframeURL ? (
        <iframe
          src={iframeURL}
          width="100%"
          height="100%"
          frameBorder="0"
          title="iframe-form"
        >
          Loading...
        </iframe>
      ) : (
        <h2>No Iframe in new nodes, waiting for backend...</h2>
      )}
    </Container>
  );
};

export default IframeViewer;
