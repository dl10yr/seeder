import React, { useState, useContext } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { store } from '../store';
import MovieForm from '../components/MovieForm'
import ContentForm from '../components/ContentForm'
import { useGlobal } from "reactn";
import { useForm, Controller } from "react-hook-form";

import SearchIcon from '@material-ui/icons/Search';
import { TextField } from "@material-ui/core";
import { firestore } from '../plugins/firebase';
import axios from 'axios'

import { Scrollbars } from 'react-custom-scrollbars';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AutoSizer } from 'react-virtualized';


const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'inline-block',
      width: '90%',
      height: '100%',
      maxWidth: '600px',
      padding: theme.spacing(1),
    },
    card: {

    },

    details: {
    },
    content: {
    },
    liimg: {
      display: "inline-block",
      margin: theme.spacing(1),
      width: "80px",
    },
    button_wrapper: {
      textAlign: 'center',
      marginTop: "20px"
    },
    field: {
      width: '100%',
      textAlign: 'center',
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      }
    },
    button: {
      marginTop: '30px',
      width: '10%',
      textAlign: 'center',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 'large',
      color: 'black',
      background: 'transparent',
      borderWidth: '0',
    },
    submitbutton: {
      margin: 'auto',
      padding: '10px',
      width: '100%',
      height: '8%',
      textAlign: 'center',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 'large',
      color: 'whitesmoke',
      background: '#2dd57a',
      borderRadius: '5px',
      borderWidth: '0',
    },
    liinfo: {
      display: 'inline-block',
      verticalAlign: 'Top',
      margin: theme.spacing(1)
    }
  })
);

interface Props {
  // title: string;
  // submitPost: (event: React.FormEvent<HTMLFormElement>) => void
}

type FormData = {
  url: string,
  content: string,
  field: string,
};

const New: React.FC<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { state, dispatch } = useContext(store);
  const [page, setPage] = useState(1);
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { register, errors, handleSubmit, reset } = useForm<FormData>();

  const [moviedata, setMoviedata] = useState({
    title: "",
    channelId: "",
    thumbnailUrl: "",
    channelTitle: "",
    tags: new Array(),
    video_id: "",
  });
  const nextPage = (value) => {
    const movie_url = value.split('/')
    var movie_id = movie_url.slice(-1)[0]
    if (movie_id.indexOf('watch?v=') != -1) {
      var movie_id = movie_id.replace('watch?v=', '')
    } else {
    }
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${movie_id}&key=${YOUTUBE_API_KEY}&part=snippet`;
    axios.get(url)
      .then((response) => {
        if (!response.data.items[0].snippet.tags) {
          let movie_data = {
            title: response.data.items[0].snippet.title,
            channelId: response.data.items[0].snippet.channelId,
            thumbnailUrl: response.data.items[0].snippet.thumbnails.medium.url,
            channelTitle: response.data.items[0].snippet.channelTitle,
            tags: [],
            video_id: response.data.items[0].id
          }
          setMoviedata(movie_data)
        } else {
          let movie_data = {
            title: response.data.items[0].snippet.title,
            channelId: response.data.items[0].snippet.channelId,
            thumbnailUrl: response.data.items[0].snippet.thumbnails.medium.url,
            channelTitle: response.data.items[0].snippet.channelTitle,
            tags: response.data.items[0].snippet.tags,
            video_id: response.data.items[0].id,
          }
          setMoviedata(movie_data)
        }
        setPage(2);
      })
      .catch((error) => {
      })
  };

  function getUniqueStr() {
    var strong = 1000;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }

  function getNgram(channelTitle: string, title: string, n) {
    //句読点は削除、スペースも削除
    channelTitle = channelTitle.replace(/\s+/g, "");
    title = title.replace(/\s+/g, "");

    var i;
    var grams = new Array();
    for (i = 0; i <= channelTitle.length - n; i++) {
      grams.push(channelTitle.substr(i, n).toLowerCase());
    }
    for (i = 0; i <= title.length - n; i++) {
      grams.push(title.substr(i, n).toLowerCase());
    }
    return grams;

  }

  const postSubmit = (values) => {
    const title = moviedata.title
    const channelId = moviedata.channelId
    const channelTitle = moviedata.channelTitle
    const thumbnailUrl = moviedata.thumbnailUrl
    const tags = moviedata.tags
    const video_id = moviedata.video_id
    const content = values.content
    const post_id = getUniqueStr();
    const searchWords = getNgram(channelTitle, title, 2);

    const data = {
      title: title,
      created_at: new Date(),
      content: content,
      channelId: channelId,
      channelTitle: channelTitle,
      thumbnailUrl: thumbnailUrl,
      post_id: post_id,
      uid: currentuser.uid,
      video_id: video_id,
      tags: tags,
      searchWords: searchWords,
    }
    console.log(data)
    firestore.collection('users').doc(currentuser.uid).collection('posts')
      .add(data)
      .then(() => {
        reset();
        setPage(1);
        dispatch({ type: 'SET_NOTIFICATION', variant: 'success', message: '送信に成功しました' });
      })
      .catch(() => {
        dispatch({ type: 'SET_NOTIFICATION', variant: 'error', message: '送信に失敗しました' });
      })

  }


  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ width, height }) => {
          console.log(height)
          console.log(width)
          return (
            <Scrollbars style={{ height: height, width: width }}>

              <form onSubmit={handleSubmit(postSubmit)} >
                <TextField
                  label="YouTube動画URL"
                  type="text"
                  name="url"
                  fullWidth
                  margin="normal"
                  onBlur={(e) => { nextPage(e.target.value) }}
                  inputRef={register({ required: true, })}
                  error={Boolean(errors.url)}
                  helperText={errors.url && "YouTube動画のURLを入力してください"}
                  variant="outlined"
                  className={classes.field}
                />
                {page === 2 &&
                  <Card className={classes.card}>
                    <img src={moviedata.thumbnailUrl} className={classes.liimg} />
                    <div className={classes.liinfo}>
                      <Typography component="p" style={{ fontWeight: 'bold' }}>
                        {moviedata.title}
                      </Typography>
                      <Typography variant="caption">
                        {moviedata.channelTitle}
                      </Typography>
                    </div>
                  </Card>
                }
                <TextField
                  label="投稿内容"
                  type="text"
                  name="content"
                  fullWidth
                  margin="normal"
                  rows="10"
                  inputRef={register({ required: true, minLength: 20 })}
                  multiline
                  error={Boolean(errors.content)}
                  helperText={errors.content && "内容は20文字以上にして下さい。"}
                  variant="outlined"
                  className={classes.field}
                />
                <div className={classes.button_wrapper}>
                  <button
                    color="primary"
                    type="submit"
                    className={classes.submitbutton}
                  >
                    投稿
            </button>
                </div>
              </form>

            </Scrollbars >
          );
        }}
      </AutoSizer>

    </div >

  )
};

export default New;
