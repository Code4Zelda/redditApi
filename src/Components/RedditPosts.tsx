import * as React from "react";
import useRedditApi from "../hook/useRedditApi";
import Search from "./Search";
import Modal from "./ModalDisplay";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IPost {
  title: string;
  id: string;
  thumbnail: string;
  author: string;
  [key: string]: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-around",

    margin: 30,
  },

  media: {
    height: 150,
    display: "block",
    textAlign: "initial",
  },
  load: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
  },
  backdrop: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
      alignItems: "center",
    },
  },
  content: {
    height: 20,
  },
}));

const RedditPosts = ({}) => {
  const { data, isLoading, error } = useRedditApi();
  const [search, setSearch] = React.useState<string>("");
  const [openModal, setModal] = React.useState<boolean>(false);
  const [rest, setRest] = React.useState<undefined | {}>({});
  const classes = useStyles();

  const handleModal = (props: {}) => {
    setModal(true);
    setRest(props);
  };
  const handleModalClose = () => {
    setModal(false);
  };

  const renderImage = () => (
    <>
      <Grid className={classes.root} container spacing={3}>
        {error
          ? error
          : data
              .filter(({ title }: IPost) =>
                title.toLowerCase().includes(search.toLowerCase())
              )
              .map((props: IPost) => (
                <Grid item xs={4}>
                  {/* <Card className={classes.card}> */}
                  <Card>
                    <CardActionArea key={props.id}>
                      <CardMedia
                        className={classes.media}
                        image={props.thumbnail}
                        title={props.title}
                        onClick={() => handleModal(props)}
                      />
                      <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h6" component="h2">
                          {props.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
      </Grid>
    </>
  );

  const loadIcon = () => {
    return (
      <div className={classes.backdrop}>
        <CircularProgress />
      </div>
    );
  };

  return (
    <div>
      <Search
        search={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <div className="container">{isLoading ? loadIcon() : renderImage()}</div>
      {openModal && (
        <Modal isOpen={openModal} props={rest} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default RedditPosts;
