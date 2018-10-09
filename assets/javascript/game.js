var game = {
    charObi: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Obi Wan Kenobi',
        side: 'light',
        image: 'obiwan.jpg'
    },
    charLuke: {
        health: 125,
        attack: 10,
        counter: 10,
        name: 'Luke Skywalker',
        side: 'light',
        image: 'luke.jpg'
    },  
    charSidious: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Darth Sidious',
        side: 'dark',
        image: 'sidious.jpg'
    },
    charMaul: {
        health: 100,
        attack: 10,
        counter: 10,
        name: 'Darth Maul',
        side: 'dark',
        image: 'maul.jpg'
    },

    inititateGame: function() {
        game.createPlayerCard(game.charLuke);
        game.createPlayerCard(game.charObi);
        game.createPlayerCard(game.charSidious);
        game.createPlayerCard(game.charMaul);
        console.log(this.playerOptions());
    },

    playerOptions: function() {
        var names = [];
        for (items in this) {
            if (typeof this[items] === 'object') {
                var name = this[items].name.replace(/ /g, '_');
                names.push(name);
            }
        }

        return names;
    },

    createPlayerCard: function(player) {
        var imagePath = 'assets/images/' + player.image;
        var anchorName = player.name.replace(/ /g, '_');

        var anchor = $('<a>').addClass(anchorName);
        var card = $('<div>').addClass('card float-left p-2 m-2 text-center').attr({
            style: 'width: 16rem',
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
        cardTitle.text(player.name);
        cardBody.append(cardTitle);
        card.append(cardBody);
        anchor.append(card);

        $('.character-pick').append(anchor);
        console.log(card);
    }
}

$( document ).ready(function() {
    game.inititateGame();
    var charOptions = game.playerOptions();
    var heroSelected = false;
    var enemySelected = false;

    var classList = "";
    for (i in charOptions) {
        classList += "." + charOptions[i] + ", "; 
    }
    classList = classList.slice(0, -2);

    $(classList).click(function() {
        var char = $(this).attr("class");

        if (!heroSelected) {
            var character = $("." + char);
            character.detach();
            character.off();
            character.find('.btn-dark').toggleClass('btn-dark btn-primary')
            charOptions.splice( charOptions.indexOf(char), 1 );
            $(".character-yours").append(character);

            for (enemy in charOptions) {
                var charEnemy = $("." + charOptions[enemy]);
                charEnemy.detach();
                charEnemy.find('.btn-dark').toggleClass('btn-dark btn-danger')
                $(".character-enemies").append(charEnemy);
            }

            $(".char-listing").children().hide();
            heroSelected = true;
        } else if (!enemySelected) {
            var character = $("." + char);
            character.detach();
            charOptions.splice( charOptions.indexOf(char), 1 );
            $(".character-defender").append(character);

            enemySelected = true;
        } else {
            console.log("Clicking does nothing!");
        }
    });
});
