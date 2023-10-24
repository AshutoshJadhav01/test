import { useState, useEffect } from "react";
import "./Note.css";
import CreateNote from "./CreateNote";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { CirclePicker } from "react-color";
import NoteDisplay from "./NoteDisplay";

function Notes({ username, isLoggedIn, navigateToLogin }) {
  const localizer = momentLocalizer(moment);
  //calendar
  const [genID, setId] = useState([]);
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [fetchdata, setfetchData] = useState([]); //change default state from () to ([]) or ({}) accprdingly
  // get text and store in state
  const textHandler = e => {
    setInputText(e.target.value);
  };
  const intervalsSuperFast = [1, 3, 6, 11, 19, 32, 53, 87]; //super fast intervals
  const intervalsFast = [1, 5, 10, 20, 40, 80, 160]; // Intervals in days Fast schedule
  const [dates, setDates] = useState([]);
  const calculatedDates = () => {
    const currentDate = new Date();
    const calculatedDates = intervalsFast.map(interval => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + interval);
      return date.toDateString();
    });
    setDates(calculatedDates);
  };
  //setRepDates(first); //set first repetition date to rep Date updater
  const [selectedColor, setSelectedColor] = useState("#3498db");
  const handleColorChange = color => {
    setSelectedColor(color.hex);
  };
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const showcalendar = () => {
    const currentDate = new Date();
    const calculatedEvents = intervalsFast.map((interval, index) => ({
      id: index,
      title: inputText,
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + interval
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + interval
      ),
      color: selectedColor,
    }));
    setEvents(calculatedEvents);
    setShowCalendar(true);
  };

  const [remiderDates, setReminderDates] = useState([]);
  const [event, setEvent] = useState([]);
  //database new functions
  const [savetriggertoFetch, setsavetriggertoFetch] = useState("false");

  const handleNoteSave = async () => {
    //store notes in new format in collection called notes
    const currentDate = new Date();
    const id = uuid();
    const calculatedEvents = intervalsFast.map((interval, index) => ({
      id: index,
      title: inputText,
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + interval
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + interval
      ),
    }));
    setEvent(calculatedEvents);

    const calculatedDates = intervalsFast.map(interval => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + interval);
      return date.toDateString();
    });
    setReminderDates(calculatedDates);

    try {
      const response = await axios.post(
        "http://localhost:5000/notesArraySave",
        {
          username,
          id,
          inputText,
          calculatedEvents,
          calculatedDates,
          currentDate,
        }
      );
      console.log("Response", response.status);

      if (response.status === 200) {
        alert("Sucessfully saved");
        setsavetriggertoFetch(true);
      }
    } catch (error) {
      alert("cannot save ");
    }
  };
  const [notenameFetch, setnotenameFetch] = useState([]);
  const [buttonClickBoolean, setbuttonClickBoolean] = useState(false);
  const allNoteNames = []; ///has all notes only inside array
  const allnoteDates = [];
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetchN", {
        params: { username: username },
      });
      setfetchData(response.data); //notesDb.data

      setnotenameFetch(response.data.cursorarray);
      console.log("newFetchNotes");
      console.log(setfetchData);
      //console.log("const FetchData");
      // console.log(fetchdata.cursorarray[0].Notes.remdates);

      for (let i = 0; i < notenameFetch.length; i++) {
        allNoteNames.push(notenameFetch[i].notename);
      }
      for (let i = 0; i < notenameFetch.length; i++) {
        allnoteDates.push(notenameFetch[i].currentdate);
      }
      console.log("allnoteNames:", allNoteNames);
      console.log("allnoteDates:", allnoteDates);
      console.log(notenameFetch);
      console.log(notenameFetch[0].notename);
      setbuttonClickBoolean(true);
      if (response.status === 200) {
        alert("sucessfull");
      } else if (response.status === 401) {
        alert("caanot fetch notes from DB");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  //database functions
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [deleteTriggerToFetch, setdeleteTriggerToFetch] = useState(false);
  const deleteNoteDb = async id => {
    //new delete note for db delete
    try {
      const response = await axios.post("http://localhost:5000/deleteNote", {
        id,
      });
      setdeleteTriggerToFetch(response.data.deleteboolean);
      console.log("Deleted Bolean", response.data.deleteboolean);
      /*const filteredNotes = notenameFetch.filter(
        notenameFetch => notenameFetch.id !== id
      );
      setNotes(filteredNotes);*/
    } catch (error) {}
  };

  useEffect(() => {
    // Fetch user's notes using the stored token and populate the notes state
    // You can make an authenticated API call to retrieve user notes here
    fetchNotes();
    setdeleteTriggerToFetch(false);
  }, [deleteTriggerToFetch]);

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);
  useEffect(() => {
    // Fetch user's notes using the stored token and populate the notes state
    // You can make an authenticated API call to retrieve user notes here
    fetchNotes();
  }, [isLoggedIn]);
  useEffect(() => {
    // Fetch user's notes using the stored token and populate the notes state
    // You can make an authenticated API call to retrieve user notes here
    fetchNotes();
    setsavetriggertoFetch(false);
  }, [savetriggertoFetch]);

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <div className="notes">
      <a href="https://space-gxan.onrender.com/">Logout</a>
      <CreateNote
        textHandler={textHandler}
        handleNoteSave={handleNoteSave}
        calculatedDates={calculatedDates}
        generatedId={genID}
        inputText={inputText}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        CirclePicker={CirclePicker}
      />

      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 300, width: 900 }}
          />
        </div>
      )}

      {notenameFetch.map((note, index) => (
        <NoteDisplay //new version of NOtes
          text={note.notename}
          dates={note.currentDate}
          remdates={note.remdates}
          id={note.id}
          deleteNoteDb={deleteNoteDb}
        />
      ))}
    </div>
  );
}

export default Notes;
//// <User></User>
//<button onClick={showcalendar}>Show calendar</button>;
//<p>Username: {note.username}</p>
/*
  <button onClick={fetchNotes}>Fetch Notes</button>
 {notes.map(
        note => (
          console.log("UUID:", note.id), // Display the UUID in the console
          (
            <Note
              genID={genID}
              key={note.id}
              id={note.id}
              first={first}
              text={note.text}
              fetchdata={fetchdata}
              allNoteNames={allNoteNames}
              deleteNote={deleteNote}
              //updaterepetition={updaterepetition}
              calculatedDates={calculatedDates}
              dates={dates}
            />
          )
        )
      )}
  <div>
        {notenameFetch.map((note, index) => (
          <div key={index}>
            <h3>Note: {note.notename}</h3>

            <p>Note created on: {note.currentdate}</p>
            <p>Intervals (Reminders):</p>
            <ul>
              {note.remdates.map((interval, intervalIndex) => (
                <li key={intervalIndex}>
                  <input type="checkbox"></input>
                  {interval}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


<p>Events:</p>
<ul>
  {note.events.map((event, eventIndex) => (
    <li key={eventIndex}>
      Title: {event.title}, Start: {event.start}, End: {event.end}
    </li>
  ))}
</ul> */
//<button onClick={newFetchNotes}>DB New Fetch</button>
//      {allNoteNames?.map(
//        (
//          name //<div>{fetchdata.fetchedNotes}</div>
//        ) => (
//          <li>{name}</li>
//    )
// )}
//<div>
//<Eventcalendar theme="ios" themeVariant="dark" />
//</div>
//<Calendar
// localizer={localizer}
//events={dates}
//startAccessor="start"
//endAccessor="end"
//style={{ height: 500 }}
///>;
