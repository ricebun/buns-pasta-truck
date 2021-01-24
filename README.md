<b>Game Synopsis</b>
<p>You've been hired to help Bun run his super popular food truck!</p>
<p>He usually does it solo through food truck season, but this year, he broke his arm and needs some help.</p>
<br>
<b>Game Objective</b>
<p>Pick the right ingredients for a recipe to cook the dish that a customer ordered</p>
<p>Level up by fulfilling enough orders</p>
<br>
<b>Basic Game Play (MVP)</b>
<li>Player is shown a "recipe book"</li>
<li>Player starts with 3 lives and a time limit of 30s</li>
<li>A customer shows up with an order</li>
<li>Pick the right ingredients to prepare the order</li> 
<li>Each correct order earns 3 or 5 points</li>
<li>Each wrong order costs 1 life</li>
<li>New customer shows up after an order is completed</li>
<li>Complete as many orders within the time limit of 30s</li>
<li>Game ends immediately when life or time = 0</li>
<br>

<b>Additional Game Feature #1: Allow Delete</b>
<li>Add button to remove ingredient from stove</li>
<br>

<b>Additional Game Feature #2: Level Up</b>
<li>Level up when player survives 30s and lives != 0</li>
<li>Higher score needed to progress to next level (max 5 levels)</li>
<br>

<b>Technologies Used:</b> Javascript, jQuery, HTML, CSS
<br>

<b>Approach Taken</b>
<li>Adopted the Elm Architecture approach suggested by Simon</li>
<li>Configured all the button functionalities in a setup function</li>
<li>Broke down the game play into individual functions which are either called on click or following another function</li>
<li>Got the MVP up and running first, before adding further features as outlined above (and more)</li>
<br>

<b>Unsolved Problems</b>
<p>My game works as planned, but I would like to improve it by:</p> 
<li>Code - Looking at whether I can envelop repeated lines in functions</li>
<li>Game - Pause function - Pause button on game play screen, or on click for hint and help buttons</li>
<li>Game - Increasing difficulty level by reducing timer for each wrong order (in addition to losing a life)</li>
<li>Game - Adding more recipes as player progresses in level</li>
