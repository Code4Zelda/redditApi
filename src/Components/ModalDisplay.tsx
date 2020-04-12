import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { TransitionProps } from "@material-ui/core/transitions";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  [key: string]: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginLeft: 28,
    top: 20,
    color: "gray",
  },
  scores: {
    position: "absolute",
    right: 30,
    color: "purple",
    flexDirection: "column",
  },
  created: {
    position: "absolute",
    fontSize: 10,
    right: 30,
  },
  subscribers: {
    position: "absolute",
    left: 230,
    color: "orange",
  },
}));

const ModalDisplay = ({ isOpen, onClose, props }: IProps) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <Typography
          className={classes.created}
          color="primary"
          variant="overline"
        >
          {moment(props.created).calendar()}
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          by: {props.author}
          <Typography className={classes.subscribers} variant="overline">
            #Subscribers: {props.subreddit_subscribers}
          </Typography>
          <Typography className={classes.scores} variant="overline">
            Score {props.score}
          </Typography>
        </Typography>

        <DialogContent>
          <img src={props.url} />
          <Typography color="secondary" variant="overline">
            Upvotes {props.ups}
            <br />
            Rewards {props.total_awards_received}
          </Typography>

          <DialogContentText id="alert-dialog-slide-description">
            No Messages
          </DialogContentText>
          <Typography color="primary" variant="overline">
            Comments: {props.num_comments}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDisplay;
