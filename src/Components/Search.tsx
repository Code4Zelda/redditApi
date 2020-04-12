import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  },
}));

const Search = ({ search, onChange }: any) => {
  const classes = useStyles();

  React.useEffect(() => {});

  return (
    <>
      <div className="search-container">
        <form className={classes.root}>
          <TextField
            id="outlined-basic"
            value={search}
            onChange={onChange}
            label="Search"
            variant="outlined"
          />
        </form>
      </div>
    </>
  );
};

export default Search;
