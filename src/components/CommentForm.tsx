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
      display: "inline-block",
      margin: theme.spacing(1),
      width: "80px",
    },
    button_wrapper: {
      textAlign: 'center',
      marginTop: "20px"
    },
    field: {
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
  post_id: string,
}

type FormData = {
  url: string,
  content: string,
  field: string,
};

const CommentForm: React.FC<Props> = props => {
  const classes = useStyles();
  const post_id = props;
  const theme = useTheme();
  const { state, dispatch } = useContext(store);
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { register, errors, handleSubmit, reset } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [data, setData] = useState({ url: "" });

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

    firestore.collection('comments')
      .add({
        post_id: post_id,
        created_at: new Date(),
        content: content,
        user_id: currentuser.uid,
        comment_id: comment_id
      })
      .then(() => {
        reset();
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
    </div >

  )
};

export default CommentForm;