import React, { useContext, useState } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { resolvePublicPath } from '../../utils/data';
import { trackEvent } from '../../utils/analytics';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
    lineHeight: 1.5,
    overflow: 'hidden',
    transition: 'max-height 0.2s ease',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown>{text}</ReactMarkdown>;
  const [isExpanded, setIsExpanded] = useState(false);

  const { project } = props;
  const shouldShowToggle = project.bodyText.replace(/\s+/g, ' ').trim().length > 160;
  const bodyStyle = {
    ...styles.cardTextStyle,
    maxHeight: shouldShowToggle && !isExpanded ? '6.75rem' : 'none',
    minHeight: shouldShowToggle ? '6.75rem' : 'auto',
    overflow: shouldShowToggle && !isExpanded ? 'hidden' : 'visible',
  };

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        {project.image && (
          <Card.Img
            variant="top"
            src={resolvePublicPath(project.image)}
            alt={`${project.title} preview`}
          />
        )}
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={bodyStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
          {shouldShowToggle && (
            <Button
              variant="link"
              onClick={() => setIsExpanded((currentValue) => !currentValue)}
              aria-expanded={isExpanded}
              style={{
                textDecoration: 'none',
                paddingLeft: 0,
                fontWeight: 600,
                color: theme.accentColor,
              }}
            >
              {isExpanded ? 'less..' : 'more..'}
            </Button>
          )}
        </Card.Body>

        <Card.Body>
          {project?.links?.map((link) => (
            <Button
              as="a"
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('project_link_click', {
                project_title: project.title,
                link_text: link.text,
                link_url: link.href,
              })}
              style={styles.buttonStyle}
              variant={'outline-' + theme.bsSecondaryVariant}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
