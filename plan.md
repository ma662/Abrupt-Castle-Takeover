==============================================================================
- Function Concepts -

selectCharacter()
    - choose a character from an array of characters
    - each character has their own attributes
    - stay that character for remainder of game

    - each character should have unique HP, attack name, attack power 

selectOpponent()
    - player clicks on enemy portrait to attack
    - opponent moves to defender area

- Player Options - 

attack(target)
    - first attack uses initial Attack Power, every attack after adds an additional Attack Power
    - damage removed from target's HP
    - if target's HP <= 0, target dies (clear)
    - target issue's a counterAttack

- Game Logic - 

initialize()
    - 

restart()
    - run initialize function
    - reset all necessary variables

==============================================================================
Characters & Opponent Objects

Characters
    - HP
    - Attack Points
    - Attack Power
    - Counter Attack Power
    - Unique Attack Name

Opponents
    - HP
    - Counter Attack Power

==============================================================================
Areas of Screen

Character Selection Area

    - Character Attacking Area

    - Opponent Defender Area

Opponent Selection Area

==============================================================================
Coding Concepts

- object of character objects called characters
    - characters all represented by objects
        - HP 
        - Attack Power
        - Unique Attack Name
        - Unique Image

- object of opponent objects called opponents
    - opponents represented by objects
        - HP
        - Counter Attack Power


1) Load Characters to Character Selection Area
    - Display stats under each character
    - Wait for player to click on a character
    - Once character is selected ... 

2) Load Opponents into Opponent Selection Area
    - Display stats under each opponent
    - Wait for player to choose an opponent
    - Once opponent is selected ...

3) Display player options 
    - Attack (execute attack function [attack(target)] 
        or
    - Run (show Opponent Selection Area again [run()])



    - Based on character attack power, initiate intial attack damage

==============================================================================
Variables

attackCounter;
    - Starts at 0 at every game, attackCounter++ after every attack. Multiplies with Attack Power after each attack function call. 

HP, Attack Power, Unique Attack Name;
    - Are unique to every character

Counter Attack Power;
    - is unique to every opponent


