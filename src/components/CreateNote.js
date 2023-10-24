function CreateNote({
  textHandler,
  handleNoteSave,
  inputText,
  selectedColor,
  handleColorChange,
  CirclePicker,
}) {
  //character limit
  const charLimit = 10000;
  const charLeft = charLimit - inputText.length;

  const firstInterval = () => {
    console.log("First trigger");
    //   alert("First Trigger after 1 min");
  };

  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Type...."
        onChange={textHandler}
        maxLength="10000"
      ></textarea>
      <div className="note__footer">
        <button
          className="note__save"
          onClick={() => {
            //setInterval(firstInterval, 60000);
            handleNoteSave();
          }}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
/*
 <button
          className="note__save"
          onClick={() => {
            //setInterval(firstInterval, 60000);
            saveHandler();
          }}
        >
          Save
        </button>
<button
          className="note__save"
          onClick={() => {
            //setInterval(firstInterval, 60000);
            handleNotesSave();
          }}
        >
          Save in DB
        </button>
 <div className="intervalChoose">Select repetation pace</div>
        <div className="color-picker">
          <CirclePicker color={selectedColor} onChange={handleColorChange} />
        </div>

<LinearProgress
        className="char__progress"
        variant="determinate"
        value={charLeft}
      />*/
//<span className="label">{charLeft} left</span>
