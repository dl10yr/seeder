import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import CreateForm from '../components/CreateForm'
import axios from 'axios'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';

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

  const submitPost = () => {
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
  };

  return (
    <div className={classes.container}>
      <CreateForm />
    </div>
  )
};

export default New;
