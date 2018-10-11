var characters = {
    charObi: {
        health: 150,
        attack: 8,
        counter: 10,
        swapiID: 10,
        name: 'Obi Wan Kenobi',
        side: 'rebel',
        image: 'obiwan.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
    },
    charLuke: {
        health: 125,
        attack: 10,
        counter: 20,
        swapiID: 1,
        name: 'Luke Skywalker',
        side: 'rebel',
        image: 'luke.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
    },  
    charYoda: {
        health: 100,
        attack: 12,
        counter: 30,
        swapiID: 20,
        name: 'Yoda',
        side: 'rebel',
        image: 'yoda.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
    }, 
    charSidious: {
        health: 150,
        attack: 8,
        counter: 10,
        swapiID: 21,
        name: 'Darth Sidious',
        side: 'empire',
        image: 'sidious.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
    },
    charMaul: {
        health: 125,
        attack: 10,
        counter: 20,
        swapiID: 44,
        name: 'Darth Maul',
        side: 'empire',
        image: 'maul.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
    },
    charVader: {
        health: 100,
        attack: 12,
        counter: 30,
        swapiID: 4,
        name: 'Darth Vader',
        side: 'empire',
        image: 'vader.jpg',
        height: '',
        mass: '',
        hair: '',
        skinColor: '',
        eyeColor: '',
        birthYear: '',
        gender: ''
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

        if(player.side === 'rebel') {
            var card = $('<div>').addClass('card float-left pl-2 pr-2 pt-2 m-2 text-center text-white bg-dark border border-primary').attr({
                style: 'width: 14rem',
            });
        } else {
            var card = $('<div>').addClass('card float-left pl-2 pr-2 pt-2 m-2 text-center text-white bg-dark border border-danger').attr({
                style: 'width: 14rem',
            });          
        }

        var image = $('<img>').addClass('card-img-top').attr({
            src: imagePath,
            alt: player.name
        });
        card.append(image);

        var cardBody = $('<div>').addClass('card-body text-center p-0 m-0');
        var moreInfoP = $('<p>').addClass('text-right');
        var moreInfoSelection = $('<a>').attr({
            rel: 'comments',
            title: 'more info'
        });

        moreInfoP.append(moreInfoSelection);

        moreInfoSelection.html('<i class="fas fa-info-circle"></i> More Info');

        if(player.side === 'rebel') {
            var cardTitle = $('<a>').addClass('btn btn-primary p-2 m-0 text-right comments').attr({
                href: '#'
            });
            cardTitle.html('<i class="fas fa-jedi"></i> ' + player.name);
        } else {
            var cardTitle = $('<a>').addClass('btn btn-danger p-2 m-0 text-right comments').attr({
                href: '#'
            });
            cardTitle.html('<i class="fab fa-sith"></i> ' + player.name);
        }

        var cardHealth = $('<p>').addClass('p-2 health-text').text(player.health);

        cardBody.append(moreInfoP);
        cardBody.append(cardTitle);
        cardBody.append(cardHealth);
        card.append(cardBody);
        anchor.append(card);

        if (side === player.side) {
            $('.character-pick').append(anchor);
        }  else {
            $(".character-pick-enemy").append(anchor);
        }

        var popoverTemplate = ['<div class="popover"><div class="arrow"></div>',
            '<div class="popover-body"></div>',
            '<div class="popover-footer"></div>',
            '</div>'].join('');

        $("[rel=comments]").popover({
            trigger : 'click',  
            placement : 'bottom', 
            html: true, 
            content : function(){
                var content = game.characterStats(player, char);
                return content;
            },
            template: popoverTemplate
        })
    },

    characterStats: function(player, char) {
        var restCall = 'https://swapi.co/api/people/' + player.swapiID + "/";
        console.log(char);

        var charHealthClass = "char-health-" + player.swapiID;
        var charAttackClass = "char-attack-" + player.swapiID;
        var charHairClass = "char-hair-" + char;
        var charSkinClass = "char-skin-" + char;
        var charEyeClass = "char-eye-" + char;
        var charBirthClass = "char-birth-" + char;

        $.ajax({
            url: restCall
        }).then(function(info) {
            player.height = info.height;
            player.mass = info.mass;
            player.hair = info.hair_color;
            player.skinColor = info.skin_color;
            player.eyeColor = info.eye_color;
            player.birthYear = info.birth_year;

            $("." + charHairClass).text('Hair: ' + player.hair);
            $("." + charSkinClass).text('Skin Color: ' + player.skinColor);
            $("." + charEyeClass).text('Eye Color: ' + player.eyeColor);
            $("." + charBirthClass).text('Birth Year: ' + player.birthYear);
        });

        var content = ['<ul class="list-group list-group-flush">',
            '<li class="list-group-item">Name: ' + player.name + "</li>",
            '<li class="list-group-item ' + charHealthClass + '">Health: ' + player.health + "</li>",
            '<li class="list-group-item ' + charAttackClass + '">Attack: ' + player.attack + "</li>",
            '<li class="list-group-item">Counter: ' + player.counter + "</li>",
            '<li class="list-group-item ' + charHairClass + '">Hair: ' + player.hair + "</li>",
            '<li class="list-group-item ' + charSkinClass + '">Skin Color: ' + player.skinColor + "</li>",
            '<li class="list-group-item ' + charEyeClass + '">Eye Color: ' + player.eyeColor + "</li>",
            '<li class="list-group-item ' + charBirthClass + '">Birth Year: ' + player.birthYear + "</li>",
            '</ul>'].join('');

        return content;
    },

    battle: function(hero, enemy) {
        var heroCharacter = characters[hero];
        var heroQuick = heroCharacter.name.split(" ")[0];
        var enemyCharacter = characters[enemy];
        var enemyQuick = enemyCharacter.name.split(" ")[0];
        var heroStatus = 'alive';
        var enemyStatus = 'alive';
        var status = [];
        var attackLine = "";
        var heroHealthClass = "char-health-" + heroCharacter.swapiID;
        var heroAttackClass = "char-attack-" + heroCharacter.swapiID;
        var enemyHealthClass = "char-health-" + enemyCharacter.swapiID;

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
            attackLine += enemyQuick + " slashes " + heroQuick + " for " + enemyCharacter.counter + " dmg";
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

        $('.' + hero).find('.health-text').text(heroCharacter.health);
        $('.' + enemy).find('.health-text').text(enemyCharacter.health);

        $('.' + heroHealthClass).text('Health: ' + heroCharacter.health);
        $('.' + heroAttackClass).text('Attack: ' + heroCharacter.attack);
        $('.' + enemyHealthClass).text('Health: ' + enemyCharacter.health);

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
    
        $(classList).click(function(e) {
            if($(e.target).is('[rel=comments]')){
                e.preventDefault();
                return;
            }
            
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
                $(".popover").popover('hide');
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
                $(".popover").popover('hide');
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
                $(".popover").popover('hide');
            }

            if (status[1] === 'dead') {
                enemyKills++;
                enemyChosen = "";
                $(".popover").popover('hide');

                if(enemyKills === 3) {
                    game.gameOver('win');
                }
            }
        }
    });
});