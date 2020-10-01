const btn_roll = document.querySelector('.btn-roll')
const img_1 = document.getElementById('dice-1')
const img_2 = document.getElementById('dice-2')
const player_1 = document.querySelector('.player-0-panel')
const player_2 = document.querySelector('.player-1-panel')
const point_1 = document.getElementById('current-0')
const point_2 = document.getElementById('current-1')
let save_point_1 = 0
let save_point_2 = 0
const btn_hold = document.querySelector('.btn-hold')
const final_score = document.querySelector('.final-score')

btn_roll.onclick = function () {
    img_1.style = 'display: block'
    img_2.style = 'display: block'
    let num_1 = Math.trunc((Math.random() * 6) + 1)
    let num_2 = Math.trunc((Math.random() * 6) + 1)
    img_1.src = `./img/dice-${num_1}.png`
    img_2.src = `./img/dice-${num_2}.png`
    if (num_1 == 1 || num_2 == 1) {
        img_1.style = 'display: none'
        img_2.style = 'display: none'
        if (player_1.classList.contains('active')) {
            alert('Player 1 bị mất lượt')
            point_1.innerText = 0
            save_point_1 = 0
            player_1.classList.remove('active')
            player_2.classList.add('active')
        } else {
            alert('Player 2 bị mất lượt')
            point_2.innerText = 0
            save_point_2 = 0
            player_2.classList.remove('active')
            player_1.classList.add('active')
        }
    } else {
        if (player_1.classList.contains('active')) {
            save_point_1 += num_1 + num_2
            point_1.innerText = save_point_1
        } else {
            save_point_2 += num_1 + num_2
            point_2.innerText = save_point_2
        }
    }
}

const score_1 = document.getElementById('score-0')
const score_2 = document.getElementById('score-1')
let save_score_1 = 0
let save_score_2 = 0

btn_hold.onclick = function () {
    if (player_1.classList.contains('active')) {
        save_score_1 += save_point_1
        score_1.innerText = save_score_1
        save_point_1 = 0
        point_1.innerText = 0
        img_1.style = 'display: none'
        img_2.style = 'display: none'
        if (Number.parseInt(score_1.innerText) >= Number.parseInt(final_score.value)) {
            alert(`Player 1 win với ${score_1.innerText} điểm`)
            save_point_2 = 0
            point_2.innerText = 0
            save_score_1 = 0
            save_score_2 = 0
            score_1.innerText = 0
            score_2.innerText = 0
            btn_roll.disabled = true
            btn_hold.disabled = true
        } else {
            player_1.classList.remove('active')
            player_2.classList.add('active')
        }
    } else {
        save_score_2 += save_point_2
        score_2.innerText = save_score_2
        save_point_2 = 0
        point_2.innerText = 0
        img_1.style = 'display: none'
        img_2.style = 'display: none'
        if (Number.parseInt(score_2.innerText) >= Number.parseInt(final_score.value)) {
            alert(`Player 2 win với ${score_2.innerText} điểm`)
            save_point_1 = 0
            point_1.innerText = 0
            save_score_1 = 0
            save_score_2 = 0
            score_1.innerText = 0
            score_2.innerText = 0
            btn_roll.disabled = true
            btn_hold.disabled = true
        } else {
            player_2.classList.remove('active')
            player_1.classList.add('active')
        }
    }
}

const btn_new = document.querySelector('.btn-new')
btn_new.onclick = function () {
    let turn = Math.trunc((Math.random() * 2) + 1)
    if (turn % 2 != 0) {
        alert('Player 1 được lắc trước')
        player_1.classList.add('active')
        player_2.classList.remove('active')
    } else {
        alert('Player 2 được lắc trước')
        player_2.classList.add('active')
        player_1.classList.remove('active')
    }
    if (final_score.value == '') {
        final_score.value = 100
        save_point_1 = 0
        save_point_2 = 0
        point_1.innerText = 0
        point_2.innerText = 0
        save_score_1 = 0
        save_score_2 = 0
        score_1.innerText = 0
        score_2.innerText = 0
        img_1.style = 'display: none'
        img_2.style = 'display: none'
        btn_roll.disabled = false
        btn_hold.disabled = false
    } else {
        save_point_1 = 0
        save_point_2 = 0
        point_1.innerText = 0
        point_2.innerText = 0
        save_score_1 = 0
        save_score_2 = 0
        score_1.innerText = 0
        score_2.innerText = 0
        img_1.style = 'display: none'
        img_2.style = 'display: none'
        btn_roll.disabled = false
        btn_hold.disabled = false
    }
}


