import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import MovieForm from '../components/MovieForm'
import ContentForm from '../components/ContentForm'
import firebase from 'firebase';
import { firestore } from '../plugins/firebase';
import axios from 'axios'

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    card: {
      display: 'flex',
    },
    container: {
      padding: '20px',
      width: '90%'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      margin: '5px',
      width: '120px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

interface Props {
  title: string;
  submitPost: (event: React.FormEvent<HTMLFormElement>) => void
}

const New: React.FC<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ url: "" });
  const [moviedata, setMoviedata] = useState({
    title: "",
    channelId: "",
    thumbnails: { default: { url: "" } },
    channelTitle: "",
    post_id: ""
  });
  const nextPage = (values) => {
    const movie_url = values.url.split('/')
    var movie_id = movie_url.slice(-1)[0]
    if (movie_id.indexOf('watch?v=') != -1) {
      var movie_id = movie_id.replace('watch?v=', '')
    } else {
    }
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${movie_id}&key=${YOUTUBE_API_KEY}&part=snippet`;
    axios.get(url)
      .then((response) => {
        const movie_data = response.data.items[0]
        const movie_title = movie_data.snippet.title
        console.log(movie_data.snippet)
        setMoviedata(movie_data.snippet)
      })
      .catch((error) => {
        // console.log(error)
        // var str = error.response.data.exception
        // this.props.actions.setNotification('error', '送信に失敗しました。投稿内容が既に存在しているかもしれません。');

        // if (str.indexOf("RecordNotUnique") !== -1) {
        //   this.props.actions.setNotification('error', '投稿内容が既に存在しています。');
        // } else {
        //   this.props.actions.setNotification('error', '送信に失敗しました');
        // }
      })

    setPage(2);
    setData(prevData => ({
      ...prevData,
      ...values,
    }));

    console.log(moviedata)
    console.log(data)
  };

  const movieSearch = () => {
    // const { form } = this.props;

    // var value_content = form.CreateForm.values.notes
    // var send_content = value_content.replace(/\r?\n/g, "");

    const data = {
      content: "send_content",
      user_id: 0,
    }
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid

    axios.post(process.env.REACT_APP_API_URL + '/api/v1/posts', data, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        // this.props.actions.setNotification('success', '送信に成功しました');
        // this.props.formreset();
      })
      .catch((error) => {
        // this.props.actions.setNotification('error', '送信に失敗しました。');
      })
  }

  function getUniqueStr() {
    var strong = 1000;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }

  const postSubmit = (values) => {
    const title = moviedata.title
    const channelId = moviedata.channelId
    const channelTitle = moviedata.channelTitle
    const thumbnailUrl = moviedata.thumbnails.default
    const url = data.url
    const content = values.content
    const post_id = getUniqueStr();

    firestore.collection('posts').add({
      title: title,
      created_at: new Date(),
      content: content,
      channelId: channelId,
      channelTitle: channelTitle,
      thumnailUrl: thumbnailUrl,
      post_id: post_id
    }).then(() => {

    })
    setMoviedata({
      title: "",
      channelId: "",
      thumbnails: { default: { url: "" } },
      channelTitle: "",
      post_id: ""
    });
  }

  return (
    <div className={classes.container}>
      <MovieForm onSubmit={nextPage} />
      {page === 2 &&
        <div>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="subtitle1">
                  {moviedata.title}
                </Typography>
                <Typography variant="caption" >
                  {moviedata.channelTitle}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={moviedata.thumbnails.default.url}
              title="thumbnail"
            />
          </Card>
          <ContentForm onSubmit={postSubmit} />
        </div>
      }

    </div>
  )
};

export default New;
