# monopoly_lite_game
# Play a slimmed down version of the classic Monopoly board game.
# Created by Samuel Phillips - August 2023
# Presented v1.0 on August 12, 2023

# Hosted on Netlify: https://monopoly-lite.netlify.app/

# About:
# This is a slimmed down version of Monopoly, allowing 2 players to alternate rolling the die and investing in properties. 
# This game was selected due to it complex, rule heavy nature which I thought would test my ability to think about all possible scinerios.
# Game logic is built completely from scratch. Complex funcitons were broken down into modular functions since a lot of logic could be re-used throughout the game.
# Dom manipulation was utilized to control the movement of the game pieces as well as show the user their status. 
# CSS utilized a combination of Grid and Flexbox and used inspiration from exisitng monopoly game boards tweaked to fit this games use cases. 

# MVP (minimum viable project):
# - This will be set up with priority to desktop play.
# - Set up a load screen where the users can read instructions, and select "Start"
# - Build a game board where the users pieces will navigate.
# - Set up a die that will animate and generate a random number, between 1-6 when clicked, which will cause the game piece to move that many spaces.
# - Include divs that show how much money the player has, and which properties they own.
# - If the user lands on an un-owned property, give them the option to buy / not buy the property with an alert/prompt.
# - Buy prompt will include property information about price, rent, and rent if all properties are owned.
# - If a user lands on "Go to Jail" it will automatically send them to Jail and cause them to skip 1 round of gameplay.
# - If a user lands on an owned property, they will be charged the appropriate rent.
# - If a user has $0, they will loose, and their opponent will be the winner!

# Stretch Goals:
# - Allow the user to sell their properties to their opponent if they land on the space.
# - Add "Chance" and "Community Chest" cards like in the original game, but have them randomly appear on a users turn.
# - Make a larger game-board which could allow for more players.
# - If larger game-board, have the user select number of players on load screen (up to 4 players).
# - If larger game-board, use 2 dice.
# - Allow user to build houses / hotels, to increase their rent, if they own all properties in a group.

# User Stories:
# - As a player, I want to choose my game piece to use as I play the game.
# - As a player, I want to click the start button to initiate the game.
# - As a player, I want to alternate with my opponent to roll the die and move on the game board.
# - As a user, I want to see the die animate and roll when clicked.
# - As a player, I want to have the option to buy / not buy the property that I land on if it is available.
# - As a player, I want to charge my opponent rent if they land on a property that I own.
# - As a player, if I land on the "Go to Jail" space, I will reluctantly move to the "Jail" space.
# - As a user, I will sit out 2 turns if I am in "Jail."
# - As a user, I want to charge extra rent if I own all properties in a group (i.e. all railroads, or all properties with the same color).
# - As a user, I will be able to pass "Go" and collect a standard allowance.
# - As a user, I want to win if my opponent has no more money.

# Future Updates:
# - need to fine tune gamepiece placement on spaces
# - allow user to select their gamepiece and name at start
# - add functionality that will charge greater rent if all properties in a group are owned
# - set up modals that will be used to interact with gameplay instead of alerts/prompts
# - allow for ability for more that 2 players to play
# - allow user to build houses / hotels, to increase their rent, if they own all properties in a group.
