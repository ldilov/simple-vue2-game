var vm = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        startButton: `START NEW GAME`,
        attackButton: `ATTACK`,
        attackSpecial: `SPECIAL ATTACK`,
        healButton: `HEAL`,
        gameIsStarted: false,
        turns: []
    },
    computed: {

    },
    methods: {
        startGame: function(){
            this.gameIsStarted = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        performAttack: function(event) {
            console.log("attack")
            var min = 3;
            var max = 15;

            // Player attacks
            var dmg = this.calculateDamage(min,max)
            this.monsterHealth -= dmg
            this.log(true, dmg)

            if(this.checkWin()){
                return;
            }
            // Monster attacks
            dmg = this.calculateDamage(min - 1 ,max)
            this.monsterAttack(dmg);   
            this.log(false, dmg)  
        },
        performSpecial: function(event) {
            var min = 5;
            var max = 20;
            // Player damages
            var dmg = this.calculateDamage(min,max)
            this.monsterHealth -= dmg
            this.log(true, dmg)

            if(this.checkWin()){
                return;
            }
            // Mmonser damages
            dmg = this.calculateDamage(min - 1 ,max + 2)
            this.monsterAttack(dmg);   
            this.log(false, dmg) 
        },
        giveup: function(){
            this.gameIsStarted = false;
        },
        heal: function () {
            if(this.playerHealth <= 100){
                min = 1;
                max = 25;
                newHealth = this.calculateDamage(min, max)
                if(this.playerHealth + newHealth <= 100){
                    this.playerHealth += newHealth;
                } else {
                    this.playerHealth = 100;
                } 
            }
            this.monsterAttack(min -1, max - 1)
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + min);
        },
        checkWin: function() {
            if (this.monsterHealth < 0){
                if(confirm("You won new game")){
                    this.startGame();
                } else {
                    this.gameIsStarted = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm("You lost new game")){
                    this.startGame()
                } else {
                    this.gameIsStarted = false;
                }
                return trueW
            }
            return false;
        },
        monsterAttack: function(dmg){
            this.playerHealth -= dmg
            this.checkwin();
        },
        log: function(flag, dmg) {
            this.turns.unshift({
                data: {
                    isPlayer: flag,
                },
                get getData() {
                    return `${this.isPlayer ? "Player" : "Monster"} hits ${this.isPlayer ? "Monster" : "Player"} for ${dmg}`;
                }
                
            });
        }

    },
});