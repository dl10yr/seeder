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

const Search: React.FC<Props> = props => {
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

  const search = (values) => {
    let tmp_posts = new Array();
    let start_date = new Date();
    let end_date = new Date();
    const searchWords = values.searchWords
    firestore.collection('posts')
      .where("searchWords", "array-contains-any", ["ナカイド"])
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let post = {
            content: doc.data().content,
            created_at: doc.data().created_at.toDate(),
            channelId: doc.data().channelId,
            thumbnailUrl: doc.data().thumbnailUrl,
            title: doc.data().title,
            post_id: doc.data().post_id,
            channelTitle: doc.data().channelTitle,
            video_id: doc.data().video_id,
          }
          tmp_posts.push(post);
        })
        console.log(tmp_posts);
      })

    // start_date = tmp_posts[0].created_at;
    // end_date = tmp_posts.slice(-1)[0].created_at;
    // setGlobal({ postslist: { posts: tmp_posts, startDate: start_date, endDate: end_date, isLoading: false } });

  }

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <Scrollbars style={{ height: height, width: width }}>
              <form onSubmit={handleSubmit(search)} >
                <TextField
                  label="動画・チャンネル名で探す"
                  type="text"
                  name="searchWords"
                  fullWidth
                  margin="normal"
                  inputRef={register({ required: true, })}
                  error={Boolean(errors.url)}
                  helperText={errors.url && "YouTube動画のURLを入力してください"}
                  variant="outlined"
                  className={classes.field}
                />
                <div className={classes.button_wrapper}>
                  <button
                    color="primary"
                    type="submit"
                    className={classes.submitbutton}
                  >
                    検索
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

export default Search;
