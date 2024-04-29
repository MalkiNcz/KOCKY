
//Declaration   
let players = 2
let dices = []
let player1 = [], player2 = []
let temp
let first = true
let highWin = ''
let finish = 1
let firstRound = true
let secondRoundPlayer = 0
let pl1sc = 0, pl2sc = 0



//after calling roll with btn, dices and imgs of dices are generated
const roll = function(){
    if(first) {
        player1 = []
        let player1Rank = 'none'
        for (let i = 0; i < 5; i++){
            temp = Math.floor(Math.random() * 6) + 1;
            player1.push(temp)
            let kostka = document.createElement('img')
            kostka.setAttribute('src', `pic/${temp}.png`)
            kostka.setAttribute('id', `1${i+1}`)
            kostka.setAttribute('onclick', `vybrat(1${i+1})`)
            kostka.style.width = '100px'
            kostka.style.height = '100px'
            kostka.style.borderRadius = '15px'
            kostka.style.cursor = 'pointer'
            document.getElementById('pl1Dices').appendChild(kostka)
        }
        dices.push(player1)
        first = false
        document.getElementById('infos').innerText = 'Hráč 2 na řadě'
    }
    else if(first === false) {
        player2 = []
        let player2Rank = 'none'
        for (let i = 0; i < 5; i++){
            temp = Math.floor(Math.random() * 6) + 1;
            player2.push(temp)
            let kostka = document.createElement('img')
            kostka.setAttribute('src', `pic/${temp}.png`)
            kostka.setAttribute('id', `2${i+1}`)
            kostka.setAttribute('onclick', `vybrat(2${i+1})`)
            kostka.style.width = '100px'
            kostka.style.height = '100px'
            kostka.style.borderRadius = '15px'
            kostka.style.cursor = 'pointer'
            document.getElementById('pl2Dices').appendChild(kostka)
        }
        dices.push(player2)
        document.getElementById('btnRoll').setAttribute('onclick', 'reroll(1)')
        document.getElementById('infos').innerText = 'Hráč 1 druhé kolo'
        firstRound = false
        secondRoundPlayer = 1
    }     
}

//call with player dices array, return current status 
const ranking = function(dice){
    const counts = {};
    dice.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
    })
    const sortedCounts = Object.values(counts).sort((a, b) => b - a)
    const uniqueValues = Object.keys(counts).length;
    const sortedKeys = Object.keys(counts).sort((a, b) => a - b)

    if (sortedCounts[0] === 5) {
        return 'Pětice'
    } else if (sortedCounts[0] === 4) {
        return 'Čtveřice'
    } else if (sortedCounts[0] === 3 && sortedCounts[1] === 2) {
        return 'Full house'
    } else if (sortedKeys.join('') === '12345') {
        return 'Malá postupka'
    } else if (sortedKeys.join('') === '23456') {
        return 'Velká postupka'
    } else if (sortedCounts[0] === 3) {
        return 'Trojice'
    } else if (sortedCounts.filter(count => count === 2).length === 2) {
        return 'Dva páry'
    } else if (sortedCounts[0] === 2) {
        return 'Jeden pár'
    } else {
        return 'Vysoká karta'
    }
}

//evalutaion of winner
const pushRank = function() {
    player1Rank = ranking(player1)
    player2Rank = ranking(player2)
    //console.log(`Player one: ${player1Rank}`)
    //console.log(`Player two: ${player2Rank}`)
    
    const ranks = {
        'Pětice': 9,
        'Čtveřice': 8,
        'Velká postupka': 7,
        'Malá postupka': 6,
        'Full house': 5,
        'Trojice': 4,
        'Dva páry': 3,
        'Jeden pár': 2,
        'Vysoká karta': 1
    }

    let rank1 = ranks[player1Rank]
    let rank2 = ranks[player2Rank]

    if (rank1 > rank2) {
        //console.log('First player win!!!')
        document.getElementById('infos').innerText = 'Hráč 1 vyhrál!!!'
        pl1sc++
        document.getElementById('pl1score').innerText = pl1sc
    }
    else if (rank1 < rank2) {
        //console.log('Second player win!!!')
        document.getElementById('infos').innerText = 'Hráč 2 vyhrál!!!'
        pl2sc++
        document.getElementById('pl2score').innerText = pl2sc

    }
    else if (rank1 === 1 && rank1 === rank2) {
        for (let i = 0; i < player1.length; i++) {
            let xdo = player1[i]
            for (let ii = 0; i < player2.length; ii++) {
                let xxd = player2[ii]
                if (xdo > xxd) {
                    highWin = 'player1'
                }
                else {
                    highWin = 'player2'
                }
            }
        }
        if (highWin === 'player1'){
            document.getElementById('infos').innerText = 'Hráč 1 vyhrál!!!'
            pl1sc++
            document.getElementById('pl1score').innerText = pl1sc
        }
        else if (highWin === 'player2'){
            document.getElementById('infos').innerText = 'Hráč 2 vyhrál!!!'
            pl2sc++
            document.getElementById('pl2score').innerText = pl2sc
        }
    }
    else {
        document.getElementById('infos').innerText = 'Remíza'
    }
}

//declaration of dices for change, function add index of dice for change to change array and colored selected img
let pl1Change = [], pl2Change = []
const vybrat = function(picPos) {
    let idcko = `${picPos}`
    if (firstRound === false) {
        if (idcko.slice(0,1) === '1' && secondRoundPlayer === 1) {
            let idckos = idcko.slice(1,2)
            if (pl1Change.includes(idckos)) {
                pl1Change = pl1Change.filter(i => i !== idckos)
                document.getElementById(idcko).style.borderStyle = ''
                document.getElementById(idcko).style.borderColor = ''
                document.getElementById(idcko).style.boxSizing = ''
            }
            else {
                pl1Change.push(idckos)
                console.log(pl1Change)
                document.getElementById(idcko).style.borderStyle = 'solid'
                document.getElementById(idcko).style.borderColor = 'green'
                document.getElementById(idcko).style.boxSizing = 'border-box'
            }
        }
        else if (idcko.slice(0,1) && secondRoundPlayer === 2){
                
            let idckos = idcko.slice(1,2)
            if (pl2Change.includes(idckos)) {
                pl2Change = pl2Change.filter(i => i !== idckos)
                //console.log(pl2Change)

                document.getElementById(idcko).style.borderStyle = ''
                document.getElementById(idcko).style.borderColor = ''
                document.getElementById(idcko).style.boxSizing = ''
            }
            else {
                pl2Change.push(idckos)
                //console.log(pl2Change)
                document.getElementById(idcko).style.borderStyle = 'solid'
                document.getElementById(idcko).style.borderColor = 'green'
                document.getElementById(idcko).style.boxSizing = 'border-box'
            }      
        }
    }       
}




//replace main roll function after generating dices for player 2
const reroll = function(ff) {
    if(ff === 1) {
        pl1Change.forEach(i => {
            player1[i-1] = Math.floor(Math.random() * 6) + 1;
        });
        let images = document.getElementById('pl1Dices').querySelectorAll("img")
        images.forEach(img => img.remove())
        for (let i = 0; i < 5; i++) {
            let kostka1 = document.createElement('img')
            kostka1.setAttribute('src', `pic/${player1[i]}.png`)
            kostka1.setAttribute('id', `1${i+1}`)
            //kostka1.setAttribute('onclick', `vybrat(1${i+1}); ozn(1${i+1}0)`)
            kostka1.style.width = '100px'
            kostka1.style.height = '100px'
            kostka1.style.borderRadius = '15px'
            kostka1.style.cursor = 'pointer'
            document.getElementById('pl1Dices').appendChild(kostka1)
        }
        pl1Change = []
        document.getElementById('btnRoll').setAttribute('onclick', 'reroll(2)')
        document.getElementById('infos').innerText = 'Hráč 2 druhé kolo'
        secondRoundPlayer = 2
        
    }
    else if (ff === 2){
        pl2Change.forEach(i => {
            player2[i-1] = Math.floor(Math.random() * 6) + 1;
        });
        let images = document.getElementById('pl2Dices').querySelectorAll("img");
        images.forEach(img => img.remove())
        for (let i = 0; i < 5; i++) {
            let kostka2 = document.createElement('img')
            kostka2.setAttribute('src', `pic/${player2[i]}.png`)
            kostka2.setAttribute('id', `2${i+1}`)
            //kostka2.setAttribute('onclick', `vybrat(1${i+1}); ozn(1${i+1}0)`)
            kostka2.style.width = '100px'
            kostka2.style.height = '100px'
            kostka2.style.borderRadius = '15px'
            kostka2.style.cursor = 'pointer'
            document.getElementById('pl2Dices').appendChild(kostka2)
        }
        pl2Change = []
        document.getElementById('btnRoll').setAttribute('onclick', 'reroll(0)')
        finish = 0
        pushRank()
    }
}

//reseting game
const reset = function() {
    let images1 = document.getElementById('pl1Dices').querySelectorAll("img");
    images1.forEach(img => img.remove())
    let images2 = document.getElementById('pl2Dices').querySelectorAll("img");
    images2.forEach(img => img.remove())
    dices = []
    player1 = [], player2 = []
    first = true
    pl1Change = []
    pl2Change = []
    document.getElementById('infos').innerText = 'Hráč 1 na řadě'
    console.log('xdr')
    document.getElementById('btnRoll').setAttribute('onclick', 'roll()')
}



