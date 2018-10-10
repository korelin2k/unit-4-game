var characters = {
    charObi: {
        health: 150,
        attack: 8,
        counter: 10,
        name: 'Obi Wan Kenobi',
        side: 'rebel',
        image: 'obiwan.jpg'
    },
    charLuke: {
        health: 125,
        attack: 10,
        counter: 20,
        name: 'Luke Skywalker',
        side: 'rebel',
        image: 'luke.jpg'
    },  
    charYoda: {
        health: 100,
        attack: 12,
        counter: 30,
        name: 'Yoda',
        side: 'rebel',
        image: 'yoda.jpg'
    }, 
    charSidious: {
        health: 150,
        attack: 8,
        counter: 10,
        name: 'Darth Sidious',
        side: 'empire',
        image: 'sidious.jpg'
    },
    charMaul: {
        health: 125,
        attack: 10,
        counter: 20,
        name: 'Darth Maul',
        side: 'empire',
        image: 'maul.jpg'
    },
    charVader: {
        health: 100,
        attack: 12,
        counter: 30,
        name: 'Darth Vader',
        side: 'empire',
        image: 'vader.jpg'
    }
}

var charNames = [];
var baseAttack = 0;

var game = {
    inititateGame: function() {
        for (char in characters) {
            charNames.push(char);
        }
    },

    createPlayerCard: function(player, char, side) {
        var imagePath = 'assets/images/' + player.image;

        var anchor = $('<a>').addClass(char);
        var card = $('<div>').addClass('card float-left p-2 m-2 text-center').attr({
            style: 'width: 14rem',
        });

        var image = $('<img>').addClass('card-img-top').attr({
            src: imagePath,
            alt: player.name
        });
        card.append(image);

        var cardBody = $('<div>').addClass('card-body text-center');
        var cardTitle = $('<a>').addClass('btn btn-dark p-2 m-0 text-center').attr({
            href: '#'
        });
        var cardHealth = $('<p>').addClass('p-2').text(player.health);
        cardTitle.text(player.name);
        cardBody.append(cardTitle);
        cardBody.append(cardHealth);
        card.append(cardBody);
        anchor.append(card);

        if (side === player.side) {
            $('.character-pick').append(anchor);
        }  else {
            $(".character-pick-enemy").append(anchor);
        }
    },

    battle: function(hero, enemy) {
        var heroCharacter = characters[hero];
        var heroQuick = heroCharacter.name.substr(0,heroCharacter.name.indexOf(' '));
        var enemyCharacter = characters[enemy];
        var enemyQuick = enemyCharacter.name.substr(0,enemyCharacter.name.indexOf(' '));
        var heroStatus = 'alive';
        var enemyStatus = 'alive';
        var status = [];
        var attackLine = "";

        enemyCharacter.health = enemyCharacter.health - heroCharacter.attack;
        attackLine = heroQuick + " slashes " + enemyQuick + " for " + heroCharacter.attack + " dmg<br />";
        if (enemyCharacter.health <= 0) {
            enemyCharacter.health = 0;
            enemyStatus = 'dead';

            var enemyCard = $('.' + enemy);
            enemyCard.find('img').attr('src', 'assets/images/dead-icon.jpg');
            enemyCard.find('div').toggleClass('float-right float-left');
            enemyCard.detach();
            enemyCard.off();
            $(".character-pick-enemy").append(enemyCard);
            attackLine += enemyQuick + " died<br />";
        }

        if (enemyStatus === 'alive') {
            heroCharacter.health = heroCharacter.health - enemyCharacter.counter;
            attackLine += heroQuick + " slashes " + enemyQuick + " for " + enemyCharacter.attack + " dmg";
        }

        if (baseAttack === 0) {
            baseAttack = heroCharacter.attack;
        }

        heroCharacter.attack = (heroCharacter.attack + baseAttack);

        if (heroCharacter.health <= 0) {
            heroCharacter.health = 0;
            heroStatus = 'dead';

            $('.' + hero).find('img').attr('src', 'assets/images/dead-icon.jpg');
        }

        status = [heroStatus, enemyStatus];

        $('.' + hero).find('p').text(heroCharacter.health);
        $('.' + enemy).find('p').text(enemyCharacter.health);
        $('.damage').html(attackLine);

        return status;
    },

    gameOver: function(resultOfGame) {
        if (resultOfGame === 'win') {
            $('.character-attack').html('<h2>You Won - Enjoy the Loot Box!</h2>');
        } else if (resultOfGame === 'loss') {
            $('.character-attack').html('<h2>You Lost - No Loot For You!</h2>');
        } else {
            console.log("How did you end up in gameOver");
        }

        var restartButton = $('<input type="Restart" value="Restart Game"/>');
        restartButton.addClass('btn btn-warning restart-game');
        $('.character-attack').append(restartButton);

        $('.restart-game').click(function() {
            console.log('restart');
            location.reload();
        });
    }
}

$( document ).ready(function() {
    var heroChosen = "";
    var enemyChosen = "";
    var enemyKills = 0;

    game.inititateGame();

    $('.rebel, .empire').click(function() {
        var side = $(this).attr("class");
        var faction = "";
        
        if(side.includes('rebel')) {
            faction = 'rebel';
        } else {
            faction = 'empire';
        }

        $(".rebel-empire").children().hide();
        $(".character-selection").show();

        for (char in characters) {
            game.createPlayerCard(characters[char], char, faction);
        }

        var classList = "";
        for (i in charNames) {
            classList += "." + charNames[i] + ", "; 
        }
        classList = classList.slice(0, -2);
    
        $(classList).click(function() {
            var char = $(this).attr("class");
    
            if (!heroChosen) {
                var character = $("." + char);
                character.detach();
                character.off();
                character.find('.btn-dark').toggleClass('btn-dark btn-primary')
                heroChosen = char;
                charNames.splice( charNames.indexOf(char), 1 );
                $(".character-yours").append(character);
                $(".character-pick-enemy").show();
                $(".character-pick").children().hide();
            } else if (!enemyChosen) {
                var character = $("." + char);
                character.detach();
                character.find('.btn-dark').toggleClass('btn-dark btn-danger')
                character.find('.float-left').toggleClass('float-left float-right')
                enemyChosen = char;
                charNames.splice( charNames.indexOf(char), 1 );
                $(".character-defender").append(character[0]);
                $(".character-selection").children().hide();
                $(".damage").text(characters[heroChosen].name + " vs. " + characters[enemyChosen].name);
                $(".battle-royale").show();
            } else {
                console.log("Clicking does nothing!");
            }
        });
    });

    $('.light-saber').click(function() {
        var status = [];

        if (enemyChosen) {
            status = game.battle(heroChosen, enemyChosen);

            if (status[0] === 'dead') {
                game.gameOver('loss');
            }

            if (status[1] === 'dead') {
                enemyKills++;
                enemyChosen = "";

                if(enemyKills === 3) {
                    game.gameOver('win');
                }
            }
        }
    });
});