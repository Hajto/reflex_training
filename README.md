# Reflex training

This project aims to allow to practice reflex training alone. Idea was born after watching
MLFM's video about how china team trains in Qatar. Link below:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/HAJHcTijD70/0.jpg)](https://www.youtube.com/watch?v=HAJHcTijD70)

After toggle is pressed sequences of commands shall be executed. A speaker will tell sequences
of numbers refering to a colorful disks used. If speaker speaks one, touch the plate number 1.

I usually use colorful disks which corespond to those colors. Although it's better number > colors.
I think it's quicker to react to sound than to color changes.

## Configuration

- REACT_APP_MAX_IN_SEQUENCE - how many commands shall be executed in a row. Currently only
  values between 1 and 4 are accepted.
- REACT_APP_MINOR_DELAY - delay between commands.
- REACT_APP_MAJOR_DELAY - delay between sequences in commands.
