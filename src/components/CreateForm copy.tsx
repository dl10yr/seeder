import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Input from "@material-ui/core/Input";
import { TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Joi from "@hapi/joi";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: 'auto',
      padding: '10px',
      width: '20%',
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
    field: {
      width: '80%',
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
    button_wrapper: {
      textAlign: 'center',
      marginTop: "20px"
    }
  })
);

type FormData = {
  url: string,
  content: string,
  field: string,
};

const YOUTUBE_API_KEY = "AIzaSyCKLyJ-8onbgNNnDuF9ZJHEhrZjq8s25v4"

const validationSchema = Joi.object({
  url: Joi.string().required(),
});

const resolver = (data: FormData, validationContext) => {
  const { error, value: values } = validationSchema.validate(data.url, {
    abortEarly: false
  });

  const movie_id = "ug_ZEG1x-vw"
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${movie_id}&key=${YOUTUBE_API_KEY}&part=snippet`;
  axios.get(url)
    .then((response) => {

      // this.props.actions.setNotification('success', '送信に成功しました');
      const movie_data = response.data.items[0]
      const movie_title = movie_data.snippet.title
      console.log(movie_title);
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

  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
        return {
          ...previous,
          [currentError.path[0]]: currentError
        };
      }, {})
      : {}
  };
}


export default function CreateForm() {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
    validationResolver: resolver,
  });

  const onSubmit = (data: FormData) => {
    console.log(data)
    const movie_id = "ug_ZEG1x-vw"
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${movie_id}&key=${YOUTUBE_API_KEY}&part=snippet`;
    axios.get(url)
      .then((response) => {

        // this.props.actions.setNotification('success', '送信に成功しました');
        const movie_data = response.data.items[0]
        const movie_title = movie_data.snippet.title
        console.log(movie_title);
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
  };

  const handleFormBlur = (data) => {

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.button_wrapper}>
          <TextField
            label="YouTube動画URL"
            type="text"
            name="url"
            fullWidth
            margin="normal"
            inputRef={register}
            error={Boolean(errors.content)}
            helperText={errors.content}
            variant="outlined"
            className={classes.field}
          />
        </div>
        <div className={classes.button_wrapper}>
          <button
            color="primary"
            type="submit"
            className={classes.button}
          >
            動画を探す
        </button>
        </div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.button_wrapper}>
          <TextField
            label="投稿内容"
            type="text"
            name="content"
            fullWidth
            margin="normal"
            rows="10"
            inputRef={register}
            multiline
            error={Boolean(errors.content)}
            helperText={errors.content && "内容は20文字以上にして下さい。"}
            variant="outlined"
            className={classes.field}
          />
        </div>
        <div className={classes.button_wrapper}>
          <button
            color="primary"
            type="submit"
            className={classes.button}
          >
            投稿
        </button>
        </div>
      </form>
    </div>

  );
}
