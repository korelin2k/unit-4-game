var characters = {
    charObi: {
        health: 100,
        attack: 15,
        counter: 10,
        name: 'Obi Wan Kenobi',
        side: 'rebel',
        image: 'obiwan.jpg'
    },
    charLuke: {
        health: 125,
        attack: 15,
        counter: 10,
        name: 'Luke Skywalker',
        side: 'rebel',
        image: 'luke.jpg'
    },  
    charYoda: {
        health: 125,
        attack: 15,
        counter: 10,
        name: 'Yoda',
        side: 'rebel',
        image: 'yoda.jpg'
    }, 
    charSidious: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Darth Sidious',
        side: 'empire',
        image: 'sidious.jpg'
    },
    charMaul: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Darth Maul',
        side: 'empire',
        image: 'maul.jpg'
    },
    charVader: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Darth Vader',
        side: 'empire',
        image: 'vader.jpg'
    }
}

var charNames = [];

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
        var enemyCharacter = characters[enemy];
        var heroStatus = 'alive';
        var enemyStatus = 'alive';
        var status = [];

        enemyCharacter.health = enemyCharacter.health - heroCharacter.attack;
        if (enemyCharacter.health <= 0) {
            enemyCharacter.health = 0;
            enemyStatus = 'dead';

            var enemyCard = $('.' + enemy);
            enemyCard.find('img').attr('src', 'assets/images/dead-icon.jpg');
            enemyCard.find('div').toggleClass('float-right float-left');
            enemyCard.detach();
            enemyCard.off();
            $(".character-pick-enemy").append(enemyCard);
        }

        heroCharacter.health = heroCharacter.health - enemyCharacter.counter;
        if (heroCharacter.health <= 0) {
            heroCharacter.health = 0;
            heroStatus = 'dead';

            $('.' + hero).find('img').attr('src', 'assets/images/dead-icon.jpg');
        }

        status = [heroStatus, enemyStatus];

        $('.' + hero).find('p').text(heroCharacter.health);
        $('.' + enemy).find('p').text(enemyCharacter.health);

        return status;
    }
}

$( document ).ready(function() {
    var heroChosen = "";
    var enemyChosen = "";

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
                $(".battle-royale").show();
            } else {
                console.log("Clicking does nothing!");
            }
        });
    });

    $('.light-saber').click(function() {
        var status = [];
        status = game.battle(heroChosen, enemyChosen);

        if (status[0] === 'dead') {
            alert("YOU SUCK");
        }

        if (status[1] === 'dead') {
            alert("HE BE DEAD");
            enemyChosen = "";
        }
    });
});
