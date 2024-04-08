import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./App.css";
import FormNotes from "./Components/forms";
import Notes from "./Components/notes";
import React, { useEffect, useState } from "react";

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface CalendarItem {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: { text: string }[];
}

const App = () => {
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        // Fetch the data from the API
        const response = await fetch(
          "https://openholidaysapi.org/PublicHolidays?countryIsoCode=PT&languageIsoCode=EN&validFrom=2024-01-01&validTo=2024-12-30"
        );
        const calendar = await response.json();
        console.log(calendar);
        setCalendar(calendar);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchHolidays();
  }, []);

  const [calendar, setCalendar] = useState<CalendarItem[] | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Note 1", content: "This is the first note" },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div>
      <div className="app-container">
        <FormNotes
          notes={notes}
          setNotes={setNotes}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
        ></FormNotes>

        <div className="note-list">
          <h1>Your notes</h1>
          <Notes
            notes={notes}
            setSelectedNote={setSelectedNote}
            setNotes={setNotes}
          ></Notes>
        </div>
      </div>
      <Box marginTop={5}>
        {calendar ? (
          <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 600,
            "& ul": { padding: 0 },
          }}
        >
          {calendar.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name[0].text + " (" + item.type + ")" }
                  secondary={item.startDate}
                />
              </ListItem>
            ))}
        </List>
        ) : (
          <h1>Something went wrong</h1>
        )}
      </Box>
    </div>
  );
};

export default App;
