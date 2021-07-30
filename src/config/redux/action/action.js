import firebase, { database } from '../../firebase/index';

export const loginUserWithFirebase = (email, password, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        const data = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken,
        };
        dispatch({ type: 'CHANGE_LOADING', value: false });
        dispatch({ type: 'CHANGE_USER', value: { user } });
        dispatch({ type: 'CHANGE_LOGIN', value: true });
        resolve(data);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(false);
      });
  });
};

export const registerUserWithFirebase = (email, password, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        resolve(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(false);
      });
  });
};

export const addDataToFirebase = (data) => {
  const notesURL = database.ref('notes/' + data.userId);
  return new Promise((resolve, reject) => {
    notesURL.push({
      title: data.title,
      content: data.content,
      date: data.date,
    });
    resolve(true);
  });
};

export const getDataFromFirebase = (userId, dispatch) => {
  const notesURL = database.ref('notes/' + userId);
  return new Promise((resolve, reject) => {
    notesURL.on('value', (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        return data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: 'SET_NOTES', value: data });
      resolve(true);
    });
  });
};

export const updateDataToFirebase = (data, dispatch) => {
  const notesURL = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    notesURL.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

export const deleteDataFromFirebase = (userId, noteId, dispatch) => {
  const notesURL = database.ref(`notes/${userId}/${noteId}`);
  return new Promise((resolve, reject) => {
    notesURL.remove();
  });
};
