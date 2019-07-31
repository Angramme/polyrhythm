# polyrhythm
*Note: This project uses Tone.js internally for sound generation*

A simple opensource JavaScript polyrhythm generator.
To test it out, go to https://angramme.github.io/polyrhythm/.

# Dummy tutorial
SCROLL DOWN! to see the full thing :)
Click on the numbers to change them

What do different fields do? well:
  # Segment fields
  - ratios ( the big one in the middle ) - this is where you enter you musical ratio like 3:4 or 3:4. Note that you can also enter more than two "voices", for example 3:6:4 or 3:5:7
  - repeat - this is how many times this segment should repeat
  - scale - this is by how much the lengths of the notes in this segments should be scaled, this is basically metric modulation in music theory.
  - subdivide - this can be either a single integer that applies to all the voices in the segment or multiple values separated by colons (":") - these values signify how many times each note should be subdivided into shorter non-accented notes.
  - lastly you can remove a segment by clicking on the "close x" button that is situated over the ratios field (not present on the first segment)
  
  # Overral fields and buttons
  - add segment - adds a new segment, it's not called a bar because its length is not necessarily equal to one bar.
  - overall bpm - changes the overall bpm.
  - PLAY! / PAUSE - play / pause
  
  # useful notes
You have to deselect an input field or press enter for it to update.
