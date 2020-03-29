import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Input from "@material-ui/core/Input";
import { TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';


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

export default function CreateForm() {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.button_wrapper}>
        <TextField
          label="YouTube動画URL"
          type="text"
          name="content"
          fullWidth
          margin="normal"
          inputRef={register({ required: true, maxLength: 20 })}
          error={Boolean(errors.content)}
          helperText={errors.content}
          variant="outlined"
          className={classes.field}
        />
      </div>
      <div className={classes.button_wrapper}>
        <TextField
          label="投稿内容"
          type="text"
          name="content"
          fullWidth
          margin="normal"
          rows="10"
          multiline
          inputRef={register({ required: true, maxLength: 20 })}
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
  );
}