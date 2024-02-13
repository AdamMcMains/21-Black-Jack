class App {
    static main() {
        let blackJack = new BlackJack();
    }
}


class BlackJack {
    constructor() {
        this.deck = [];
        this.random = new Random();
        this.hiddenCard;
        this.dealerHand = [];
        this.dealerSum;
        this.dealerAceCount;
        this.playerHand = [];
        this.playerSum;
        this.playerAceCount;
        this.boardWidth = 600;
        this.boardHeight = this.boardWidth;
        this.cardWidth = 110;
        this.cardHeight = 154;
        this.frame = new JFrame("Black Jack");
        this.gamePanel = new JPanel(() => {
            paintComponent(g);
        });
        this.buttonPanel = new JPanel();
        this.hitButton = new JButton("Hit");
        this.stayButton = new JButton("Stay");
        this.startGame();
        this.frame.setVisible(true);
        this.frame.setSize(this.boardWidth, this.boardHeight);
        this.frame.setLocationRelativeTo(null);
        this.frame.setResizable(false);
        this.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.gamePanel.setLayout(new BorderLayout());
        this.gamePanel.setBackground(new Color(53, 101, 77));
        this.frame.add(this.gamePanel);
        this.hitButton.setFocusable(false);
        this.buttonPanel.add(this.hitButton);
        this.stayButton.setFocusable(false);
        this.buttonPanel.add(this.stayButton);
        this.frame.add(this.buttonPanel, BorderLayout.SOUTH);
        this.hitButton.addActionListener(() => {
            let card = this.deck.splice(this.deck.length - 1, 1)[0];
            this.playerSum += card.getValue();
            this.playerAceCount += card.isAce() ? 1 : 0;
            this.playerHand.push(card);
            if (this.reducePlayerAce() > 21) {
                this.hitButton.setEnabled(false);
            }
            this.gamePanel.repaint();
        });
        this.stayButton.addActionListener(() => {
            this.hitButton.setEnabled(false);
            this.stayButton.setEnabled(false);
            while (this.dealerSum < 17) {
                let card = this.deck.splice(this.deck.length - 1, 1)[0];
                this.dealerSum += card.getValue();
                this.dealerAceCount += card.isAce() ? 1 : 0;
                this.dealerHand.push(card);
            }
            this.gamePanel.repaint();
        });
        this.gamePanel.repaint();
    }
    startGame() {
        this.buildDeck();
        this.shuffleDeck();
        this.dealerHand = [];
        this.dealerSum = 0;
        this.dealerAceCount = 0;
        this.hiddenCard = this.deck.splice(this.deck.length - 1, 1)[0];
        this.dealerSum += this.hiddenCard.getValue();
        this.dealerAceCount += this.hiddenCard.isAce() ? 1 : 0;
        let card = this.deck.splice(this.deck.length - 1, 1)[0];
        this.dealerSum += card.getValue();
        this.dealerAceCount += card.isAce() ? 1 : 0;
        this.dealerHand.push(card);
        this.playerHand = [];
        this.playerSum = 0;
        this.playerAceCount = 0;
        for (let i = 0; i < 2; i++) {
            card = this.deck.splice(this.deck.length - 1, 1)[0];
            this.playerSum += card.getValue();
            this.playerAceCount += card.isAce() ? 1 : 0;
            this.playerHand.push(card);
        }
    }
    buildDeck() {
        this.deck = [];
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let card = new Card(values[j], types[i]);
                this.deck.push(card);
            }
        }
    }
    shuffleDeck() {
        for (let i = 0; i < this.deck.length; i++) {
            let j = this.random.nextInt(this.deck.length);
            let currCard = this.deck[i];
            let randomCard = this.deck[j];
            this.deck[i] = randomCard;
            this.deck[j] = currCard;
        }
    }
    reducePlayerAce() {
        while (this.playerSum > 21 && this.playerAceCount > 0) {
            this.playerSum -= 10;
            this.playerAceCount -= 1;
        }
        return this.playerSum;
    }
    reduceDealerAce() {
        while (this.dealerSum > 21 && this.dealerAceCount > 0) {
            this.dealerSum -= 10;
            this.dealerAceCount -= 1;
        }
        return this.dealerSum;
    }
    paintComponent(g) {
        super.paintComponent(g);
        try {
            let hiddenCardImg = new ImageIcon(getClass().getResource("./cards/BACK.png")).getImage();
            if (!this.stayButton.isEnabled()) {
                hiddenCardImg = new ImageIcon(getClass().getResource(this.hiddenCard.getImagePath())).getImage();
            }
            g.drawImage(hiddenCardImg, 20, 20, this.cardWidth, this.cardHeight, null);
            for (let i = 0; i < this.dealerHand.length; i++) {
                let card = this.dealerHand[i];
                let cardImg = new ImageIcon(getClass().getResource(card.getImagePath())).getImage();
                g.drawImage(cardImg, this.cardWidth + 25 + (this.cardWidth + 5) * i, 20, this.cardWidth, this.cardHeight, null);
            }
            for (let i = 0; i < this.playerHand.length; i++) {
                let card = this.playerHand[i];
                let cardImg = new ImageIcon(getClass().getResource(card.getImagePath())).getImage();
                g.drawImage(cardImg, 20 + (this.cardWidth + 5) * i, 320, this.cardWidth, this.cardHeight, null);
            }
            if (!this.stayButton.isEnabled()) {
                this.dealerSum = this.reduceDealerAce();
                this.playerSum = this.reducePlayerAce();
                console.log("STAY: ");
                console.log(this.dealerSum);
                console.log(this.playerSum);
                let message = "";
                if (this.playerSum > 21) {
                    message = "You Lose!";
                }
                else if (this.dealerSum > 21) {
                    message = "You Win!";
                }
                else if (this.playerSum == this.dealerSum) {
                    message = "Tie!";
                }
                else if (this.playerSum > this.dealerSum) {
                    message = "You Win!";
                }
                else if (this.playerSum < this.dealerSum) {
                    message = "You Lose!";
                }
                g.setFont(new Font("Arial", Font.PLAIN, 30));
                g.setColor(Color.white);
                g.drawString(message, 220, 250);
            }
        } catch (e) {
            e.printStackTrace();
        }
    }
    Card = class {
        constructor(value, type) {
            this.value = value;
            this.type = type;
        }
        toString() {
            return this.value + "-" + this.type;
        }
        getValue() {
            if ("AJQK".includes(this.value)) {
                if (this.value == "A") {
                    return 11;
                }
                return 10;
            }
            return parseInt(this.value);
        }
        isAce() {
            return this.value == "A";
        }
        getImagePath() {
            return "./cards/" + this.toString() + ".png";
        }
    }
}
    



App.main();

    
