import { useContext, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import Reveal from './Reveal';
import data from '../profile/resume.json';
import { resolvePublicPath } from '../utils/data';
import { trackEvent } from '../utils/analytics';
import '../css/resume.css';

// Most desktop browsers (and iOS Safari) render PDFs inline. Browsers that
// cannot, such as Chrome on Android, report pdfViewerEnabled === false and get
// an image preview instead.
const canEmbedPdf = () => typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false;

function Resume({ header }) {
  const theme = useContext(ThemeContext);
  const frameRef = useRef(null);
  const pdfUrl = resolvePublicPath(data.pdf);
  const embed = canEmbedPdf();

  const handleDownload = () => {
    trackEvent('resume_download', { link_url: pdfUrl });
  };

  const handlePrint = () => {
    trackEvent('resume_print', { link_url: pdfUrl });

    try {
      const frameWindow = frameRef.current?.contentWindow;
      if (frameWindow) {
        frameWindow.focus();
        frameWindow.print();
        return;
      }
    } catch {
      // Fall through to opening the PDF so the browser's own viewer can print it.
    }

    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <Reveal>
            <div className="resume-actions">
              <Button
                as="a"
                href={pdfUrl}
                download={data.fileName}
                variant={theme.bsSecondaryVariant}
                onClick={handleDownload}
              >
                Download PDF
              </Button>
              <Button variant={theme.bsSecondaryVariant} onClick={handlePrint}>
                Print
              </Button>
            </div>

            <div className="resume-viewer">
              {embed ? (
                <iframe
                  ref={frameRef}
                  className="resume-viewer__frame"
                  src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                  title={data.title}
                />
              ) : (
                <img
                  className="resume-viewer__image"
                  src={resolvePublicPath(data.preview)}
                  alt={data.title}
                  width={1401}
                  height={1981}
                />
              )}
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
}

Resume.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Resume;
