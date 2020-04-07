import React, { useState, useContext } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { store } from '../store';
import MovieForm from './MovieForm'
import ContentForm from './ContentForm'
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
    button_wrapper: {
      textAlign: 'center',
      margin: "10px",
      marginTop: '20px',
      width: "20%",
      display: 'inline-block',
    },
    field: {
      width: '70%',
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
    li: {
      background: '#eee',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    libody: {
      padding: theme.spacing(1),
      minWidth: '288px',
    },
    liitem: {
      display: "inline-block",
      verticalAlign: 'top',
    },
    ul: {
      listStyle: 'none',
      paddingLeft: '0px',
      margin: '10px',
    },
    liimg: {
      display: "inline-block",
      margin: theme.spacing(1),
      width: "80px",
    },
    licontent: {
      width: '100%',
      fontWeight: 'bold',
      margin: `0 ${theme.spacing(1)}`,
      wordWrap: 'break-word',
    },
    liinfo: {
      display: 'inline-block',
      verticalAlign: 'Top',
      width: `calc(100% - 120px)`,
    },
    title: {

    },
    channelTitle: {

    }
  })
);
type Comment = {
  content: string,
  created_at: Date,
  user_id: string,
  post_id: string,
  comment_id: string,
}

type Post = {
  content: string,
  title: string,
  created_at: Date,
  channelId: string,
  post_id: string,
  channelTitle: string,
  thumbnailUrl: string,
  comments: Comment[],
}

type Commentslist = {
  comments: Comment[],
  isLoading: boolean,
  startDate: Date,
  endDate: Date
}

interface Props {
  post_id: string,
  commentslist: Commentslist,
}

type FormData = {
  url: string,
  content: string,
  field: string,
};

const Comments: React.FC<Props> = props => {
  const classes = useStyles();
  const post_id = props;
  const theme = useTheme();
  const { state, dispatch } = useContext(store);
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { register, errors, handleSubmit, reset } = useForm<FormData>({});
  const [displaycomments, setDisplaycomments] = useState(props.commentslist.comments);

  function getUniqueStr() {
    var strong = 1000;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }

  const postSubmit = (values) => {
    const post_id = props.post_id;
    const content = values.content;
    const comment_id = getUniqueStr();
    const post_data = {
      post_id: post_id,
      created_at: new Date(),
      content: content,
      user_id: currentuser.uid,
      comment_id: comment_id
    };
    var tmp_list = displaycomments
    tmp_list.unshift(post_data);

    firestore.collection('comments')
      .add(post_data)
      .then(() => {
        reset();
        setDisplaycomments(tmp_list);
        dispatch({ type: 'SET_NOTIFICATION', variant: 'success', message: '送信に成功しました' });
      })
      .catch(() => {
        dispatch({ type: 'SET_NOTIFICATION', variant: 'fail', message: '送信に失敗しました' });
      })

  }


  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(postSubmit)} >
        <TextField
          label="コメントを投稿する"
          type="text"
          name="content"
          fullWidth
          margin="normal"
          inputRef={register}
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
      <ul className={classes.ul}>
        {displaycomments.map(comment => (
          <li className={classes.li}>
            <div className={classes.libody}>
              <Typography component="p" className={classes.licontent}>
                {comment.content}
              </Typography>
            </div>
          </li >
        ))}
      </ul >
    </div >

  )
};

export default Comments;