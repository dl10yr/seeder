import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import MovieForm from '../components/MovieForm'
import ContentForm from '../components/ContentForm'
import axios from 'axios'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';

const YOUTUBE_API_KEY = "AIzaSyCKLyJ-8onbgNNnDuF9ZJHEhrZjq8s25v4"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    container: {
      margin: '20px'
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
  const [data, setData] = useState({});
  const [moviedata, setMoviedata] = useState(0);

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
        console.log(movie_title)
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

    setPage(page + 1);
    setData(prevData => ({
      ...prevData,
      ...values,
    }));

    console.log(moviedata)
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

  const movieSearch_r = () => {

  }

  const postSubmit = () => {
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

  return (
    <div className={classes.container}>
      <MovieForm onSubmit={nextPage} />
      <ContentForm onSubmit={postSubmit} />
    </div>
  )
};

export default New;
