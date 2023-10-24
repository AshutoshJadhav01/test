//import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
function NoteDisplay({ text, deleteNoteDb, remdates, dates, id }) {
  const shortdate = dates.slice(0, 10);
  return (
    <div className="note">
      <div className="note__body">
        <h3>{text}</h3>
        <h5>Reading Intervals</h5>
        {remdates.length > 0 && (
          <ul>
            {remdates.map((date, index) => (
              <li key={index}>
                {`Revision ${index + 1}: ${date}`}
                <input type="checkbox"></input>
              </li>
            ))}
          </ul>
        )}
        <h5>Created On :{shortdate}</h5>
        <div className="note__footer" style={{ justifyContent: "flex-end" }}>
          <div
            className="note__delete"
            onClick={() => deleteNoteDb(id)}
            aria-hidden="true"
          >
            <button> Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
//<span className="UUid label">{id}"UUID"</span>    //to show uuid of a particular note

export default NoteDisplay;
/*
  <div
            className="note__delete"
            onClick={() => deleteNote(id)}
            aria-hidden="true"
          >
            <button> Delete</button>
          </div>
          */
//div className="first label">1st revision is due {repdate}</div>
//    <button onClick={() => updaterepetition()}>Completed Revision</button>
// //{first}uses moment days until method
//<span className="UUid label2">{genID}"Generated UUID"</span>
/*<span className="second label">       //show second repetation date
  {second}/Days Until{secondtrem}       //show days until second repetation
  </span>
  <span className="third label">{third}</span>*/ //show days until second repetation
