'use client'

import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NewTaskContainer, ClearRow } from './styles';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Modal from '@mui/material/Modal';
import { ITask } from '../../models/task';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export default function HomePage() {
  const [dense, setDense] = React.useState<boolean>(false);
  const [taskId, setTaskId] = React.useState<number>(0);
  const [taskName, setTaskName] = React.useState<string>('');
  const [taskRealized, setTaskRealized] = React.useState<boolean>(false);
  const [secondary, setSecondary] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [message, setMessage] = React.useState({});

  const [openNewTaskModal, setOpenNewTaskModal] = React.useState<boolean>(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] = React.useState<boolean>(false);

  let getTasks = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.token) {
      return;
    }

    let res = await fetch('https://todolist-api.edsonmelo.com.br/api/task/search/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': user.token
      }
    });

    console.log(res);

    let resJson = await res.json();

    console.log('resJson', resJson)

    if (resJson.message === 'Tasks not found') {
      setTasks([]);
      return;
    }

    if (resJson.length) {
      setTasks(resJson);
    }
  }

  let postTask = async (e: any) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.token) {
      return;
    }

    let res = await fetch('https://todolist-api.edsonmelo.com.br/api/task/new/', {
      method: 'POST',
      body: JSON.stringify({
        "name": taskName,
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': user.token
      }
    });

    let resJson = await res.json();

    if (resJson.message === 'Task Successfully Added') {
      setTasks({...tasks, ...{
        date: new Date().toISOString().split('T')[0],
        id: tasks.length ? tasks[tasks.length -1].id + 1 : 0,
        name: taskName,
        realized: 0,
        userId: user.id
      }});

      await getTasks();
      closeModalNewTask();
      return;
    } else {
      setMessage({
        title: 'Erro no cadastro da task',
        description: resJson.message
      });
    }
  }

  let deleteTask = async (id: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.token) {
      return;
    }

    let res = await fetch('https://todolist-api.edsonmelo.com.br/api/task/delete/', {
      method: 'DELETE',
      body: JSON.stringify({
        "id": id
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': user.token
      }
    });

    let resJson = await res.json();

    console.log('resJson', resJson)

    if (resJson.message === 'Task deleted Successfully') {
      setTasks(tasks.filter((task: ITask) => task.id !== id));
      return;
    }
  }

  let putTask = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.token) {
      return;
    }

    let res = await fetch('https://todolist-api.edsonmelo.com.br/api/task/update/', {
      method: 'PUT',
      body: JSON.stringify({
        id: taskId,
        name: taskName,
        realized: taskRealized ? 1 : 0
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': user.token
      }
    });

    let resJson = await res.json();

    console.log('resJson', resJson)

    if (resJson.message === 'Task Successfully Updated') {
      const index: number = tasks.findIndex((task: ITask) => String(task.id) === String(taskId));
      tasks[index].name = taskName;
      tasks[index].realized = taskRealized ? 1 : 0;
      setTasks(tasks);
      closeModalUpdateTask();
      return;
    }
  }

  const openModalNewTask = () => {
    setTaskName('');
    setOpenNewTaskModal(true)
  }

  const closeModalNewTask = () => {
    setTaskName('');
    setOpenNewTaskModal(false)
  }

  const openModalUpdateTask = (task: ITask) => {
    console.log('task', task)
    setTaskId(task.id);
    setTaskName(task.name);
    setTaskRealized(task.realized === 0 ? false : true);
    setOpenUpdateTaskModal(true)
  }

  const closeModalUpdateTask = () => {
    setTaskId(-1);
    setTaskName('');
    setTaskRealized(false);
    setOpenUpdateTaskModal(false)
  }

  const clearMessage = () => {
    setMessage({});
  }

  // 🆗 Ship it
  useEffect(() => {
    (async () => {
      const users = await getTasks();
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
        <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h6" component="div">
          Lista de tasks
        </Typography>
        <NewTaskContainer>
          <Button variant="contained" sx={{ width: '250px' }} onClick={openModalNewTask}>
            Nova task
          </Button>
        </NewTaskContainer>
        <ClearRow />
        <Demo>
          <List dense={dense}>
            {tasks.length ? tasks.map((task: any) => {
              return (
                <ListItem key={task.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar onClick={() => openModalUpdateTask(task)}>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${task.id} | ${task.name}`}
                    secondary={secondary ? 'Secondary text' : null}
                    onClick={() => openModalUpdateTask(task)}
                  />
                </ListItem>
              )
            }) : ''}
          </List>
        </Demo>
      </Grid>

      {/* Modal para criar uma nova task */}
      <Modal
        open={openNewTaskModal}
        onClose={closeModalNewTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Cadastrar nova task
          </Typography>
          <TextField label="Nome da task" sx={{ m: 1, width: '500px' }} id="outlined-basic-name" variant="outlined" type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value); clearMessage() }}></TextField>

          <Button variant="contained" sx={{ width: '500px', marginTop: '10px', marginBottom: '5px' }} onClick={postTask}>
            Cadastrar task
          </Button>
        </Box>
      </Modal>

      {/* Modal para atualizar uma nova task */}
      <Modal
        open={openUpdateTaskModal}
        onClose={closeModalUpdateTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Detalhes da task
          </Typography>

          <TextField label="Nome da task" sx={{ m: 1, width: '500px' }} id="outlined-basic-name" variant="outlined" type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value); clearMessage() }}></TextField>
          <FormGroup>
            <FormControlLabel control={<Switch checked={taskRealized} onClick={(e) => { setTaskRealized(!taskRealized); clearMessage() }} />} label="Task finalizada?" />
          </FormGroup>
          <Button variant="contained" sx={{ width: '500px', marginTop: '10px', marginBottom: '5px' }} onClick={putTask}>
            Atualizar task
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}