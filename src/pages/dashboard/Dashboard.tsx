import { Col, Row, theme } from 'antd';
import React from 'react';
import NoteEditorWrapper from '../../components/note-editor/NoteEditorWrapper';
import NoteListWrapper from '../../components/note-list/NoteListWrapper';
import SideNavigation from '../../components/side-navigation/SideNavigation';

const Dashboard: React.FC = () => {
  const token = theme.useToken().token;

  return (
    <div style={{ height: 'inherit' }}>
      <Row style={{ height: 'inherit' }}>
        <Col
          span={6}
          style={{
            maxWidth: 300,
            backgroundColor: token.colorBgBase,
            borderRight: `1px solid ${token.colorBorderSecondary}`
          }}
        >
          <SideNavigation />
        </Col>
        <Col
          span={6}
          style={{
            maxWidth: 400,
            borderRight: `1px solid ${token.colorBorderSecondary}`
          }}
        >
          <NoteListWrapper />
        </Col>
        <Col flex={1} style={{ backgroundColor: token.colorBgBase }}>
          <NoteEditorWrapper />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
