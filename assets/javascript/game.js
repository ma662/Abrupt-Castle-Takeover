var game = {
    //========================================
    // Variables for processing
    //========================================
    
    wins: 0,
    losses: 0,
    
    // increments after every attack function call
    charSelected: false,
    foeSelected: false,

    activeCharacter: null,                  // the fighting character
    activeCharacterCard: null,

    activeFoe: null,                        // enemy on defender div
    activeFoeCard: null,
    
    attackCounter: 1,
    remainingEnemies: null,
    
    // characters object of character objects
    characters: {
        character1: {
            name: "Ser Antoni Bruschii",
            currentHp: 11,
            hp: 11,
            attackPower: 4,
            uniqueAttack: "Paint With Blood",
            bio: "A struggling painter who has recently lost his family and possessions in a fire. A vengeful spirit fueled by torment, he takes from the world what he beleives was taken from him.",
            uniqueImage: "./assets/images/friends/cristobal_rojas1.png",
            uniqueSound: "./assets/sounds/squish.wav"
        },

        character2: {
            name: "Ser Quandi Liv",
            currentHp: 14,
            hp: 14,
            attackPower: 3,
            uniqueAttack: "Knuckles of Nihilism",
            bio: "A dropout student from a school of philosophers. At first a pacifist, has learned the hard way that violence works better than words. He lives in the moment and always for personal gain.",
            uniqueImage: "./assets/images/friends/domenikos_theotokopoulos1.png",
            uniqueSound: "./assets/sounds/punch.wav"
            
        },

        character3: {
            name: "Ser Malcox-Grave",
            currentHp: 17,
            hp: 17,
            attackPower: 2,
            uniqueAttack: "Piercing Sword of the Heavens",
            bio: "Once an annointed knight of the Templar order, Malcox-Grave was framed for a murder and had to flee for his life. He lives as rogue-for-hire but still maintains what little dignity he can.",
            uniqueImage: "./assets/images/friends/edmund_blair_leighton2.png",
            uniqueSound: "./assets/sounds/sword.wav"
        }
    },

    foes: {
        foe1: {
            name: "Lord Ganandorf Flair",

            currentHp: 20,
            hp: 20,

            counterAp: 4,

            bio: "At one point lived in a mad house. He was not born into wealth and his story is relatively unknown.",


            isDead: false,
            uniqueImage: "./assets/images/foes/giovanni_battista_tiepolo1.png"
        },
        
        foe2: {
            name: "Duchess Colundura Jon",

            currentHp: 18,
            hp: 18,

            counterAp: 6,

            bio: "Is no stranger to battle. Has poisoned enemies who have opposed her before.",


            isDead: false,
            uniqueImage: "./assets/images/foes/konstantin_makovsky1.png"
        },
        
        foe3: {
            name: "Sultan Hasheem Bablev",
            currentHp: 12,
            hp: 12,

            counterAp: 10,
            
            bio: "Originally a wealthy merchant from the East, Hasheem now commands an army. Has taken countless lives to expand his claim to the land.",

            isDead: false,
            uniqueImage: "./assets/images/foes/hayez_francesco1.png"
        }
    },


    initialize: function() {
        $(".character-attacking").hide();   // move to initialization function
        $(".foe-selection").hide();

        game.charSelected = false;
        game.foeSelected = false;

        game.activeCharacter = null;                  
        game.activeCharacterCard = null;

        game.activeFoe = null;
        game.activeFoeCard = null;
        
        game.attackCounter = 1;
        game.remainingEnemies = null;

        game.foes.foe1.isDead = false;
        game.foes.foe2.isDead = false;
        game.foes.foe3.isDead = false;
    },

    // get the data from characters and populate the character selection div
    spawnCharacters: function() {
        // for the length of the characters object
        for (var i = 0; i < Object.keys(game.characters).length; i++) {
            var characterDiv = $("<div>");
            var characterImage = $("<img>");
            var dataDiv = $("<div>");
            
            // create css style for this class so it doesn't take up the whole line 
            characterDiv.addClass("dynamic-character-card");
            
            // character is the value from characters object at character key
            character = this.characters[Object.keys(this.characters)[i]];

            // link the character object image to the characterImage
            characterImage.attr("src", character.uniqueImage);

            // acts as a jQuery hook and a css styling thing
            characterImage.addClass("character-image");

            // provide character object, now image has all character data
            // characterDiv.attr("data-character", character);
            character.currentHp = character.hp;

            characterDiv.data(character);

            characterImage.appendTo(characterDiv);
            
            // add to character-selection div
            $(".character-selection").append(characterDiv);
            
            // display data
            var name = character.name;
            var hp = character.hp;
            var currentHp = character.currentHp;
            var attackPower = character.attackPower;
            var uniqueAttack = character.uniqueAttack;
            var bio = character.bio;

            //stuff this all into the characterDiv
            
            // formatting
            var nameInfo = $("<p>");
            nameInfo.addClass("char-data");
            nameInfo.attr("id", "name-info");

            var hpInfo = $("<p>");
            hpInfo.addClass("char-data");
            hpInfo.attr("id", "hp-info");

            var apInfo = $("<p>");
            apInfo.addClass("char-data");
            apInfo.attr("id", "ap-info");

            var uaInfo = $("<p>");
            uaInfo.addClass("char-data");
            uaInfo.attr("id", "ua-info");

            var bioInfo = $("<p>");
            bioInfo.addClass("char-data");
            bioInfo.attr("id", "bio-info");

            nameInfo.text(name);
            hpInfo.text("HP: " + currentHp + "/" + hp); // 16/16
            apInfo.text("Attack-Power: " + attackPower);
            uaInfo.text("Unique-Attack: " + uniqueAttack);
            bioInfo.text(bio);

            nameInfo.appendTo(dataDiv);
            hpInfo.appendTo(dataDiv);
            apInfo.appendTo(dataDiv);
            uaInfo.appendTo(dataDiv);
            bioInfo.appendTo(dataDiv);

            dataDiv.appendTo(characterDiv);
            dataDiv.addClass("data-box");

            // after loading in, run selectCharacter and wait for player selection
            // this.selectCharacter();
        }
        return true;
    },
    
    
    // $('.dynamic-character-card').on('click', selectCharacter){
    //     alert('hello');
    // },

    // select character function
    selectCharacter: function(character) {

        // get character from onClick, then treat it as jQuery object
        var activeCharacterCard = $(character);
        game.activeCharacterCard = activeCharacterCard;
        console.log(activeCharacterCard);

        $(".char-data").hide();

        // character card selected
        game.activeCharacterCard = activeCharacterCard;

        // character object data
        game.activeCharacter = activeCharacterCard.data();
        console.log(game.activeCharacterCard.data());

        console.log ({
            tryingThis : "IM TRYING THIS NEW THING",
            activeCharacterCard : game.activeCharacterCard,
            activeCharacter : game.activeCharacter,
            name : game.activeCharacter.name,
            uniqueAttack : game.activeCharacter.uniqueAttack
        });

         // slideUp character selection
         $(".character-selection").slideUp(270);

        // absolutely center the activeCharacter
        activeCharacterCard.css ({
            "top": 0,
            "left": 0,
            "right": 0,
            "bottom": 0,
            "position": "absolute",
            "margin-left": "auto",
            "margin-right": "auto",
        });

        activeCharacterCard.appendTo(".character-attacking");

        // fadeIn character attacking & their data
        $(".character-attacking").fadeIn(1000);
        $(".char-data").fadeIn(350);
        
        $(".foe-selection").show();

        return true;
    },  
    
    spawnFoes: function() {
        console.log("spawning da foes");
        // console.log("AM I RUNNING TWICE? OR WHAT");
        
        var remainingEnemies = 0;

        // fadeIn the foes
        for (var i = 0; i < Object.keys(game.foes).length; i++) {
            //gen remaining enemies
            
            remainingEnemies++;

            console.log("Foe " + i);

            var foeDiv = $("<div>");
            var foeImage = $("<img>");
            var dataDiv = $("<div>");

            foe = this.foes[Object.keys(this.foes)[i]];
            foeDiv.addClass("dynamic-foe-card");
            foeDiv.data(foe); // attach entire foe object to div
            
            foeImage.attr("src", foe.uniqueImage);
            foeImage.addClass("foe-image");
            foeImage.appendTo(foeDiv);

            $(".foe-center").append(foeDiv);

            // grab foe data
            var name = foe.name;
            var currentHp = foe.currentHp;
            var hp = foe.hp; // total hp
            var counterAp = foe.counterAp;
            var bio = foe.bio;

            var nameInfo = $("<p>");
            nameInfo.addClass("foe-data");
            nameInfo.attr("id", "name-info");
            
            var hpInfo = $("<p>");
            hpInfo.addClass("foe-data");
            hpInfo.attr("id", "hp-info");

            var capInfo = $("<p>");
            capInfo.addClass("foe-data");
            capInfo.attr("id", "cap-info");

            var bioInfo = $("<p>");
            bioInfo.addClass("foe-data");
            bioInfo.attr("id", "bio-info");

            nameInfo.text(name);
            hpInfo.text("HP: " + currentHp + "/" + hp); // 16/16
            capInfo.text("Counter-Attack Power: " + counterAp);
            bioInfo.text(bio);

            nameInfo.appendTo(dataDiv);
            hpInfo.appendTo(dataDiv);
            capInfo.appendTo(dataDiv);
            bioInfo.appendTo(dataDiv);

            dataDiv.appendTo(foeDiv);
            dataDiv.addClass("foe-data-box");
            
            game.remainingEnemies = remainingEnemies;
            //select Foe
        }
        // this.selectFoe();
        
        return true;
    },

    selectFoe: function(enemy) {
        var activeFoeCard = $(enemy);
        
        console.log(activeFoeCard.data().isDead);

        // if the card isn't dead
        if(!activeFoeCard.data().isDead){
            game.activeFoeCard = activeFoeCard;
            // console.log(activeFoeCard);

            game.activeFoe = activeFoeCard.data();
            // console.log(game.activeFoe);
            
            activeFoeCard.css({
                "top": 0,
                "left": 0,
                "right": 0,
                "bottom": 0,
                "position": "absolute",
                "margin-left": "auto",
                "margin-right": "auto",
            });
            
            activeFoeCard.appendTo(".foe-defending");
            
            // hide the divs
            $(".foe-center").slideUp(270);
            $(".foe-selection").slideUp(270);
                        
            var attButton = $("<button>").text("Attack: " + game.activeCharacter.uniqueAttack);
                // attButton.attr("onclick=", game.attack(game.activeFoe));
            
            attButton.on("click", function() {
                console.log("running attack on: " + game.activeFoe.name);
                game.attack(game.activeFoe);
            });

            attButton.appendTo(".character-attacking");
        }
        // });
    },

    attack: function(target) {
        // stuff
        var newDataDiv = $("<div>");

        console.log(game.activeFoeCard);

        // get attacker and defender objects
        var attacker = game.activeCharacter;
        var defender = target;

        console.log("att & def info");
        console.log({
            attacker : attacker,
            defender : defender
        });
        
        // if defender current Hp not 0 and attacker current hp not 0
        // remove attacker ap from defender curr hp

        var mySound = new Audio(attacker.uniqueSound);
        mySound.play();

        defender.currentHp = defender.currentHp - (attacker.attackPower * game.attackCounter);


        // only write if not negative 
        // print alert if dead
        if (defender.currentHp <= 0) {
            defender.currentHp = 0;
            alert("You've attacked for: " + (attacker.attackPower * game.attackCounter) + "\nDefender HP is: " + defender.currentHp); // for debugging
            $(game.activeFoeCard.find("#hp-info")[0]).text("HP: " + defender.currentHp + "/" + defender.hp);
            
            alert("You have killed this defender ! Well done ! ");
            defender.isDead = true;

            // change bg to black
            game.activeFoeCard.css({
                "background-color": "black",
                "border-color": "darkslategray",
                // "position": "fixed",
                // "bottom": 0,
                // "left": 0
            });
            
            // animate opacity 
            game.activeFoeCard.animate({
                "opacity": 0.55,
            });
            
            // remove from foe selection div
            game.activeFoeCard.remove();
            
            //bring back up the foe-selection
            $(".foe-selection").slideDown();
            $(".foe-center").slideDown();
            
            // use these null values to check if there is an active defender
            
            game.activeFoe = null;
            game.activeFoeCard = null;
            game.foeSelected = false;
            
            // if die, remainingEnemies--; 
            game.remainingEnemies--;
        }
        // if defender is not dead
        else{
            // print damage to card
            alert("You've attacked for: " + (attacker.attackPower * game.attackCounter) + "\nDefender is at " + defender.currentHp + "HP."); // for debugging
            $(game.activeFoeCard.find("#hp-info")[0]).text("HP: " + defender.currentHp + "/" + defender.hp);
            

            alert("Oh no!");
            // execute counter attack
            attacker.currentHp = attacker.currentHp - defender.counterAp;
            
            // if attacker hp is 0, remove the card, lose function?
            if (attacker.currentHp <= 0) {
                attacker.currentHp = 0;
                alert("Defender countered for: " + defender.counterAp + " damage leaving you with: " + attacker.currentHp + " HP.");
                $(game.activeCharacterCard.find("#hp-info")[0]).text("HP: " + attacker.currentHp + "/" + attacker.hp);
                
                game.youLose();
            }
            else { // still alive
                alert("Defender countered for: " + defender.counterAp + " damage leaving you with: " + attacker.currentHp + " HP.");
                $(game.activeCharacterCard.find("#hp-info")[0]).text("HP: " + attacker.currentHp + "/" + attacker.hp);
            }
        }

        if ( game.remainingEnemies <= 0 && game.remainingEnemies != null ){ // winnning condition
            game.youWin();
        }
        
        // write these changes to the respective cards
        
        // game.activeFoeCard.
        
        // then allow defender to counter attack player
        
        game.attackCounter++;
    },
    
    youWin: function () {
        alert("YOU'VE SUCCESSFULLY DEFEATED THE EVIL CASTLE DWELLERS! OTHERS WILL ENVY YOUR NEW FORTRESS OF SOLITUDE!");
        game.wins++;

        alert("Wins: " + game.wins + "\nLosses: " + game.losses);

        game.reset();
        // stuff
    },

    youLose: function() {
        alert("You've lost! The castle guardians did you in. Sad!");
        game.losses++;

        alert("Wins: " + game.wins + "\nLosses: " + game.losses);

        game.activeCharacterCard.remove();
        game.reset();
        // stuff
    },

    reset: function() { 
        $(".character-selection").empty();
        $(".character-attacking").empty();
        $(".foe-center").empty();
        $(".foe-defending").empty();


        $(".character-selection").slideDown();
        $(".character-attacking").slideDown();
        $(".foe-selection").slideDown();
        $(".foe-center").slideDown();

        $(".character-selection").show();
        $(".character-attacking").show();
        // $(".foe-selection").show();
        $(".foe-center").show();




        game.gameLogic();
    },

    //===========================================
    // GAME LOGIC
    //===========================================
    gameLogic: function() {
        game.initialize();

        // spawn the characters
        var isSpawned = game.spawnCharacters();
        
        // document.write("CHOOSE A CHARACTER").style({"text-align":"center"})

        console.log(isSpawned);

        var foesSpawned = false; // move up 

        $('.dynamic-character-card').on('click', function() {
            // alert("debug CLICKclick!!");
            if (isSpawned && (!game.charSelected)) {
                // game.selectCharacter(this).bind(game);
                console.log(isSpawned);

                // set to true after selectCharacter runs
                game.charSelected = game.selectCharacter(this);
            }

            // seems to be working for now
            if (game.charSelected && (!foesSpawned)){
                console.log("WHATS GOING ON HERE");
                
                foesSpawned = game.spawnFoes();
                console.log("were the foes spawned: " + foesSpawned);
            }

            $('.dynamic-foe-card').on('click', function() {
                if (game.activeFoe === null) {
                    console.log(typeof(game.activeFoe));

                    // console.log(foesSpawned && noAttacker);
                    if (foesSpawned && (!game.foeSelected)) {

                        game.selectFoe(this);
                        game.foeSelected = true;
                        // console.log(this);
                        // alert("WAAA");
                    }
                }

            }); // end foe click event
        });

    }
    
    }; // end game object

    
    game.gameLogic();
    alert("There are many reasons you can say you are here right now, in this castle. Whether it be for the bounties of the inhabitants or the value of the real estate itself. \n\nYou are here - and how you progress will determine if you make it out alive.");

     // start music
    var audio = new Audio("./assets/sounds/ala_flair.ogg");
    audio.volume = 0.35;
    audio.play();