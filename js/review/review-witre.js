//dom접근
const changeScore = document.querySelector('.change-score');

let ratingScore = 0;

//별점 변경 이벤트
changeScore.addEventListener('input',({target}) => {
    const value = target.value
    document.querySelector('.inner-star').style.width = `${target.value * 10}%`;
    ratingScore = parseInt(value)/2;

    document.querySelector('.text-score').textContent = ratingScore;
})
