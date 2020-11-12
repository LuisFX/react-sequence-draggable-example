import React, { useState, createRef, RefObject, useEffect } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import DraggableBox from '../../components/DraggableBox';
import IframeViewer from '../IframeViewer';
import clickFunnelsImg from '../../assets/images/clickfunnels-logo.webp';

import {
  PageContainer,
  Container,
  Menu,
  PageContent,
  PopOverContainer,
} from './styles';
import FlowComponent from '../../components/FlowComponent';

interface ArrowStateProps {
  arrowId: string;
  start: string;
  end: string;
}

interface NodeProps {
  title: string;
  uniqueId: string;
  ref: RefObject<HTMLElement>;
  connected?: boolean;
  startPosition: { x: number; y: number };
  iframeURL?: string;
}

const Main: React.FC = () => {
  const [iframeActive, setIframeActive] = useState(false);
  const [iframeURL, setIframeURL] = useState(
    'https://docs.google.com/forms/d/e/1FAIpQLSeYYJ9i5JBP3f-sbN7JSaWMYwq50Pll_MvCxRWpFL66sErUoA/viewform?embedded=true',
  );

  const handleOnClickBox = (urlIframe?: string): void => {
    setIframeActive(!iframeActive);
    if (urlIframe) {
      setIframeURL(urlIframe || '');
    }
  };

  return (
    <PageContainer>
      <Container>
        <Menu>
          <img width="80" src={clickFunnelsImg} alt="Click Funnels" />
          <h1>Workflow Builder</h1>
        </Menu>
        <PageContent>
          <FlowComponent
            onNodeClick={(element) => {
              console.log(element);
              handleOnClickBox();
            }}
          />
        </PageContent>
      </Container>
      <IframeViewer animate={iframeActive} iframeURL={iframeURL} />
    </PageContainer>
  );
};

export default Main;
