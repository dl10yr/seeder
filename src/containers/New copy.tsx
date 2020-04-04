import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import MovieForm from '../components/MovieForm'
import ContentForm from '../components/ContentForm'
import { useGlobal } from "reactn";
import { useForm, Controller } from "react-hook-form";


import { firestore } from '../plugins/firebase';
import axios from 'axios'

import { Scrollbars } from 'react-custom-scrollbars';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    card: {

    },
    container: {
      padding: '20px',
      width: '90%'
    },
    details: {
    },
    content: {
    },
    liimg: {
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
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { register, errors, handleSubmit, reset } = useForm<FormData>();

  const [data, setData] = useState({ url: "" });
  const [moviedata, setMoviedata] = useState({
    title: "",
    channelId: "",
    thumbnails: { medium: { url: "" } },
    channelTitle: "",
    post_id: "",
    tags: new Array(),
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
    const thumbnailUrl = moviedata.thumbnails.medium.url
    const tags = moviedata.tags
    const url = data.url
    const content = values.content
    const post_id = getUniqueStr();

    firestore.collection('posts')
      .add({
        title: title,
        created_at: new Date(),
        content: content,
        channelId: channelId,
        channelTitle: channelTitle,
        thumbnailUrl: thumbnailUrl,
        post_id: post_id,
        uid: currentuser.uid,
        url: url,
        tags: tags,
      })
      .then(() => {
        postSuccess();
      })
      .catch(() => {
        postFail();
      })

  }

  function postSuccess() {
    return "success"
  }

  function postFail() {

  }

  return (
    <Scrollbars>
      <div className={classes.container}>
        <MovieForm onSubmit={nextPage} />
        {page === 2 &&
          <div>
            <Card className={classes.card}>
              <div className={classes.liimg}>
                <img src={moviedata.thumbnails.medium.url} width="80" height="45" />
              </div>
              <Typography variant="caption" >
                {moviedata.channelTitle}
              </Typography>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="p" style={{ fontWeight: 'bold' }}>
                    {moviedata.title}
                  </Typography>

                </CardContent>
              </div>
            </Card>
            <ContentForm postSubmit={postSubmit} />
          </div>
        }
      </div>
    </Scrollbars>

  )
};

export default New;
