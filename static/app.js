// static/app.js
const firebaseConfig = {
  apiKey: "AIzaSyA9M8AVMrEpU_DCjl-fN6zyfsf4DMuUQBc",
  authDomain: "fastapi-notes.firebaseapp.com",
  projectId: "fastapi-notes",
  storageBucket: "fastapi-notes.firebasestorage.app",
  messagingSenderId: "416771631447",
  appId: "1:416771631447:web:3ba4e5f8c65473344c3612",
  measurementId: "G-13W62ENH94"
};

function notesApp() {
  return {
    user: null,
    notes: [],
    newNote: { title: '', content: '' },
    auth: { email: '', password: '' },
    authError: '',
    showDeleteModal: false,
    noteToDelete: null, // store the note ID temporarily
    notification: null, // { message: "...", type: "success" | "error" }
    showNotification: false,
    showNoteSavedModal: false,

    showToast(message, type = "success") {
      this.notification = { message, type };
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this.notification = null;
      }, 2500); // auto-hide after 2.5 seconds
    },


    initFirebase() {
      firebase.initializeApp(firebaseConfig);
      this.setupAuthListener();
      this.loadNotes();
    },

    setupAuthListener() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;
        if (user) {
          this.loadNotes();
        } else {
          this.notes = [];
        }
      });
    },

    async signIn() {
      this.authError = '';
      try {
        await firebase.auth().signInWithEmailAndPassword(this.auth.email, this.auth.password);
      } catch (err) {
        this.authError = err.message;
      }
    },

    async signUp() {
      this.authError = '';
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.password);
      } catch (err) {
        this.authError = err.message;
      }
    },

    async signInWithGoogle() {
      this.authError = '';
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        // onAuthStateChanged will handle the rest
      } catch (err) {
        this.authError = err.message;
      }
    },

    signOut() {
      firebase.auth().signOut();
    },

    deleteNote(noteId) {
      this.noteToDelete = noteId;
      this.showDeleteModal = true;
    },

    async confirmDeleteNote() {
      if (this.noteToDelete) {
        const db = firebase.firestore();
        await db.collection('notes').doc(this.noteToDelete).delete();
        this.loadNotes();
      }
      this.showDeleteModal = false;
      this.noteToDelete = null;
    },

    async loadNotes() {
      if (!this.user) return;
      const db = firebase.firestore();
      const snapshot = await db
        .collection('notes')
        .where('userId', '==', this.user.uid)
        .orderBy('updatedAt', 'desc')
        .get();
      this.notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async addNote() {
      try {
        if (!this.user || !this.newNote.content.trim()) return;
        const db = firebase.firestore();
        const note = {
          title: this.newNote.title.trim(),
          content: this.newNote.content.trim(),
          userId: this.user.uid,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('notes').add(note);
        this.newNote = { title: '', content: '' };
        this.loadNotes();
        // Show the success modal instead of toast
        this.showNoteSavedModal = true;
      } catch (err) {
        this.showToast("Failed to save note: " + err.message, "error");
      }
    },

  };
}