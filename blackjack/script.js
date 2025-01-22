document.addEventListener('DOMContentLoaded', () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let playerMoney = 1000;
    let playerBet = 0; 

    function createDeck() {
        deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function dealCard(hand) {
        hand.push(deck.pop());
    }

    function calculateHandValue(hand) {
        let value = 0;
        let aceCount = 0;
        hand.forEach(card => {
            if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
                value += 10;
            } else if (card.value === 'A') {
                aceCount += 1;
                value += 11;
            } else {
                value += parseInt(card.value);
            }
        });
        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount -= 1;
        }
        return value;
    }

    function renderHand(hand, elementId) {
        const handElement = document.getElementById(elementId);
        handElement.innerHTML = '';
        hand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            const valueElement = document.createElement('div');
            valueElement.className = 'value';
            valueElement.textContent = card.value;

            const suitElement = document.createElement('div');
            suitElement.className = `suit ${card.suit.toLowerCase()}`;
            const suitEmoji = {
                'Hearts': '❤️',
                'Diamonds': '♦️',
                'Clubs': '♣️',
                'Spades': '♠️'
            }[card.suit];
            suitElement.textContent = suitEmoji;

            if (card.suit === 'Hearts' || card.suit === 'Diamonds') {
                cardElement.classList.add('red-text');
            }

            cardElement.appendChild(valueElement);
            cardElement.appendChild(suitElement);
            handElement.appendChild(cardElement);
        });
    }

    function renderGameState() {
        renderHand(playerHand, 'playerHand');
        renderHand(dealerHand, 'dealerHand');
        document.getElementById('playerMoney').textContent = `Money: $${playerMoney}`;
        document.getElementById('playerBet').textContent = `Bet: $${playerBet}`;
        document.getElementById('playerTotal').textContent = `Player Total: ${calculateHandValue(playerHand)}`;
        document.getElementById('dealerTotal').textContent = `Dealer Total: ${calculateHandValue(dealerHand)}`;
    }

    function showResultPopover(message) {
        const resultPopover = document.getElementById('resultPopover');
        const resultPopoverOverlay = document.getElementById('resultPopoverOverlay');
        resultPopover.querySelector('p').textContent = message;
        resultPopover.style.display = 'block';
        resultPopoverOverlay.style.display = 'block';
        setTimeout(hideResultPopover, 2000); // Automatically dismiss after 2 seconds
    }

    function hideResultPopover() {
        const resultPopover = document.getElementById('resultPopover');
        const resultPopoverOverlay = document.getElementById('resultPopoverOverlay');
        resultPopover.style.display = 'none';
        resultPopoverOverlay.style.display = 'none';
    }

    function startGame() {
        if (playerBet <= 0 || playerBet > playerMoney) {
            alert('Invalid bet amount');
            return;
        }
        createDeck();
        shuffleDeck();
        playerHand = [];
        dealerHand = [];
        dealCard(playerHand);
        dealCard(dealerHand);
        dealCard(playerHand);
        dealCard(dealerHand);
        renderGameState();
        document.getElementById('controls').style.display = 'block';
        document.getElementById('betControls').style.display = 'none';
        document.getElementById('startButton').style.display = 'none'; // Hide start button
        document.getElementById('doubleDownButton').style.display = 'block'; // Show double down button
    }

    function endGame(message) {
        setTimeout(() => {
            showResultPopover(message);
            renderGameState();
            document.getElementById('controls').style.display = 'none';
            document.getElementById('betControls').style.display = 'block';
            document.getElementById('startButton').style.display = 'block'; // Show start button
            document.getElementById('doubleDownButton').style.display = 'none'; // Hide double down button
        }, 500); // Delay for 0.5s before displaying the winner
    }

    function hit() {
        dealCard(playerHand);
        renderGameState();
        if (calculateHandValue(playerHand) > 21) {
            playerMoney -= playerBet; // Deduct money when player busts
            endGame('Player busts! Dealer wins.');
        } else {
            document.getElementById('doubleDownButton').style.display = 'none'; // Hide double down button after hit
        }
    }

    function stand() {
        while (calculateHandValue(dealerHand) < 17) {
            dealCard(dealerHand);
        }
        renderGameState();
        setTimeout(() => {
            const playerValue = calculateHandValue(playerHand);
            const dealerValue = calculateHandValue(dealerHand);
            if (dealerValue > 21 || playerValue > dealerValue) {
                playerMoney += playerBet;
                endGame('Player wins!');
            } else if (playerValue < dealerValue) {
                playerMoney -= playerBet;
                endGame('Dealer wins.');
            } else {
                endGame('Push. It\'s a tie.');
            }
        }, 500); // Delay for 0.5s before displaying the winner
    }

    function doubleDown() {
        if (playerBet * 2 > playerMoney) {
            alert('Not enough money to double down');
            return;
        }
        playerBet *= 2;
        dealCard(playerHand);
        if (calculateHandValue(playerHand) > 21) {
            endGame('Player busts! Dealer wins.');
        } else {
            stand();
        }
    }

    function placeBet() {
        const betInput = document.getElementById('betInput');
        playerBet = parseInt(betInput.value);
        if (isNaN(playerBet) || playerBet <= 0 || playerBet > playerMoney) {
            alert('Invalid bet amount');
            return;
        }
        startGame();
    }

    document.getElementById('startButton').addEventListener('click', placeBet);
    document.getElementById('hitButton').addEventListener('click', hit);
    document.getElementById('standButton').addEventListener('click', stand);
    document.getElementById('doubleDownButton').addEventListener('click', doubleDown);
    document.getElementById('resultPopoverButton').addEventListener('click', hideResultPopover);
    document.getElementById('resultPopoverOverlay').addEventListener('click', hideResultPopover);

    renderGameState();
});
