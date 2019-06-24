import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CssRenderer from './CssRenderer';
import HtmlRenderer from './HtmlRenderer';

export default function Renderers({ preview }) {
  return (
    <div className="renderers">
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>CSS</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CssRenderer data={preview} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>HTML</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <HtmlRenderer data={preview} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
