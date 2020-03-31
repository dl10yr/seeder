import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Input from "@material-ui/core/Input"
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Joi from "@hapi/joi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    button_wrapper: {
      display: 'inline',
      margin: '16px'
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
}


const MovieForm = props => {
  const classes = useStyles();
  const { resolver, onSubmit } = props;
  const { register, errors, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  });

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
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>

  );
};

export default MovieForm;