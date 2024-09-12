const fs = require('fs');
module.exports = {
    Game: class Game {
        name;
        icon;
        link;
        createdAt;

        constructor(name, icon, link) {
            this.name = name;
            this.icon = icon;
            this.link = link;
            this.createdAt = new Date();
        }
    },

    addGame: (game) => {
        let games = JSON.parse(fs.readFileSync('games.json'));
        games.push(game);
        fs.writeFileSync('games.json', JSON.stringify(games, null, 2));
    },

    getRecentGames: () => {
        let games = JSON.parse(fs.readFileSync('games.json'));
        games.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return games.slice(0, 10);
    }
}