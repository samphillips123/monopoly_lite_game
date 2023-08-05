# monopoly_lite_game
# Play a slimmed down version of the classic Monopoly board game.
# Created by Samuel Phillips - August 2023
# Presented v1.0 on ****

# MVP (minimum viable project)
# - This will be set up with priority to desktop play (I didn't see a requirement to have it work on different devices)
# - Set up a load screen where the users can read instructions, select their game pieces, and select "Start"
# - Build a game board where the users pieces will navigate.
# - Set up a die that will animate and generate a random number, between 1-6 when clicked, which will cause the game piece to move that many spaces.
# - Include divs that show how much money the player has, and which properties they own.
# - If the user lands on an un-owned property, give them the option to buy / not buy the property with a modal.
# - Buy modal will include property information about price, rent, and rent if all properties are owned.
# - If a user lands on "Go to Jail" it will automatically send them to Jail and cause them to skip 2 rounds of gameplay.
# - If a user lands on an owned property, they will be charged the appropriate rent.
# - If a user has $0, they will loose, and their opponent will be the winner!

# Stretch goals
# - Allow the user to sell their properties to their opponent if they land on the space.
# - Add "Chance" and "Community Chest" cards like in the original game, but have them randomly appear on a users turn.
# - Make a larger game-board which could allow for more players.
# - If larger game-board, have the user select number of players on load screen (up to 4 players).
# - If larger game-board, use 2 dice.
# - Allow user to build houses / hotels, to increase their rent, if they own all properties in a group.

# User Stories
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
