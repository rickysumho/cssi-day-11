let googleUser = null;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // this code runs if user is logged in
            console.log("logged in as", user.displayName);
            googleUser = user;
        }
        else {
            // this code runs if user is NOT logged in
            console.log("not logged in");
        }
    });

    const createNoteButton = document.querySelector('#create-note-button');
    createNoteButton.addEventListener("click", () => {
        const noteTitle = document.getElementById('noteTitle').value;
        const noteText = document.getElementById('noteText').value;
        console.log(noteTitle, noteText);

        // write these values to the database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
        }).then(() => {
            console.log("database write successful");
            document.getElementById('noteTitle').value = "";
            document.getElementById('noteText').value = "";
        })
        .catch(error => {
            console.log("error writing new note: ", error);
        })
        

    })
}