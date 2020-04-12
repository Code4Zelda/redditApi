import * as React from "react";
import useRedditApi from "../Hook/useRedditApi";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 25,
    width: 300,
  },
  media: {
    height: 140,
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
}));

const RedditPosts = ({}) => {
  const { data, isLoading, error } = useRedditApi();
  const [search, setSearch] = React.useState<string>("");

  const classes = useStyles();

  const renderImage = () => (
    <>
      <Card className={classes.root}>
        {error
          ? error
          : data
              .filter(({ title }: IPost) =>
                title.toLowerCase().includes(search.toLowerCase())
              )
              .map((props: IPost) => (
                <CardActionArea key={props.id}>
                  <CardMedia
                    className={classes.media}
                    image={props.thumbnail}
                    title={props.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {props.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              ))}
      </Card>
    </>
  );

  return (
    <div>
      <div className="container">{renderImage()}</div>
    </div>
  );
};

export default RedditPosts;
