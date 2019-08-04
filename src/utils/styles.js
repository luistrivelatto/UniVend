const styles = theme => ({
  table: {
    minWidth: 700,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom:theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  dropzone:{
    marginLeft: theme.spacing.unit
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  /* root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }, */
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input: {
    display: 'none',
  }
});

export default styles;