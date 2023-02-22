function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp( {
    data() {
        return {
            playerHealth: 100,
            monsterHealt: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],

        };
    },
    watch:{
        playerHealth(value) {
            if(value  <= 0 && this.monsterHealt <= 0){
                this.winner = 'Draw';
            }else if(value <= 0){
                this.winner = 'You Lost';
            }
        },
        monsterHealt(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'It`s draw';
            }else if(value <= 0){
                this.winner = 'You won'
            }
        }
    },

    computed: {
        monsterBarStyles(){

            if(this.monsterHealt < 0){
                return {
                    width:'0%'
                }
            }

            return {width:this.monsterHealt + '%'};
        },
        playerBarStyles(){

            if(this.playerHealth < 0){
                return {width:'0%'}
            }
            return {width:this.playerHealth + '%'}
        },

        checkSpecialAttack(){
          return  this.currentRound % 3 !==0;
        },
        checkHealtPlayer(){
            return this.playerHealth > 30; 
        }
    },

    methods:{
        surrender(){
            this.winner = 'You lost';
        }
        ,
        attackMonster() {
         this.currentRound++;
         const attackValue = getRandomValue(5, 12);
         this.monsterHealt -= attackValue;
         this.addLogMessage('Player', 'attack', attackValue);
         this.attackPlayer();

        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', 'attack', attackValue);
        },
        specialAttac(){
            this.currentRound++;
            const specialAttacValue = getRandomValue(10, 25);
            this.monsterHealt -= specialAttacValue;
            this.addLogMessage('Player', 'Special attack', specialAttacValue);
            this.attackPlayer();
        },
        healtPlayer(){
            this.currentRound++;
            const healtValue = getRandomValue(8, 20);
            if(this.playerHealth + healtValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healtValue
            }
            this.addLogMessage('Player', 'heal', healtValue);
            this.attackPlayer();
        },
        startGame(){
            this.playerHealth = 100;
            this.monsterHealt = 100;
            this.currentRound =  0;
            this.winner       = null;
            this.logMessages  = []
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            })
        }

    }
});
app.mount('#game');