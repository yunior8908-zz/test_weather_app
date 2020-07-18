import { TableRow, styled } from '@material-ui/core';

const StyleRowComponent = styled(TableRow)({
  '&:hover': {
    backgroundColor: '#dddd',
    cursor: 'text'
  }
});

export default StyleRowComponent;
