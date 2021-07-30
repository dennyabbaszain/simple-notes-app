import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '../../../components/atoms/Button';
import {
  addDataToFirebase,
  deleteDataFromFirebase,
  getDataFromFirebase,
  updateDataToFirebase,
} from '../../../config/redux/action/action';
import './dashboard.scss';

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const dataGlobal = useSelector((state) => state);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [state, setState] = useState({
    isUpdate: false,
    noteId: '',
    titleForm: '',
  });

  useEffect(() => {
    const dataUserFirebase = getDataFromFirebase(userData, dispatch);
    return dataUserFirebase;
  }, [dispatch, userData]);

  if (!dataGlobal.isLogin) history.push('/login');

  const handleSave = async () => {
    if (title !== '' && content !== '') {
      const data = {
        title: title,
        content: content,
        date: new Date().getTime(),
        userId: userData.uid,
        noteId: state.noteId,
      };
      if (state.isUpdate) {
        setState({ titleForm: 'Update Post' });
        const res = await updateDataToFirebase(data, dispatch);
        if (res) {
          setTitle('');
          setContent('');
          setState({ isUpdate: false, titleForm: 'New Post' });
        }
      } else {
        const res = await addDataToFirebase(data);
        if (res) {
          setTitle('');
          setContent('');
        }
      }
    }
  };

  const updateNotes = (data) => {
    setTitle(data.data.title);
    setContent(data.data.content);
    setState({ isUpdate: true, noteId: data.id });
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setState({ isUpdate: false });
  };

  const handleDelete = (e, data) => {
    e.stopPropagation();
    deleteDataFromFirebase(userData.uid, data.id);
  };
  return (
    <div>
      <h3>Dashboard</h3>
      <div className='note-container'>
        <div className='note-form'>
          <p>{state.titleForm}</p>
          <input
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type='text'
            placeholder='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {state.isUpdate ? (
            <Fragment>
              <Button
                action={handleCancel}
                title='Cancel'
                isUpdate={state.isUpdate}
                className='btn cancel'
              />
              <Button
                action={handleSave}
                title='Update'
                isUpdate={state.isUpdate}
                className='btn save'
              />
            </Fragment>
          ) : (
            <Button action={handleSave} title='Save' />
          )}
        </div>
      </div>

      <hr />
      {dataGlobal.notes.length > 0 ? (
        <Fragment>
          {dataGlobal.notes.map((data) => {
            return (
              <div
                className='notes-card'
                key={data.id}
                onClick={() => updateNotes(data)}
              >
                <div className='content-card'>
                  <p>{data.data.title}</p>
                  <p>{data.data.date}</p>
                  <p>{data.data.content}</p>
                </div>
                <Button action={(e) => handleDelete(e, data)} title='X' />
              </div>
            );
          })}
        </Fragment>
      ) : null}
    </div>
  );
}

export default Dashboard;
