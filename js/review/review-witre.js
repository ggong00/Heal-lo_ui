//dom접근
const $changeScore = document.querySelector('.change-score');
const $inputImg = document.querySelector('.input-img');
const $previewImg = document.querySelector('.preview-img');

let ratingScore = 0;
let uploadImgs = [];

//별점 변경 이벤트
$changeScore.addEventListener('input',({target}) => {
    const value = target.value
    document.querySelector('.inner-star').style.width = `${target.value * 10}%`;
    ratingScore = parseInt(value)/2;

    document.querySelector('.text-score').textContent = ratingScore;
})

//이미지 업로드 이벤트
$inputImg.addEventListener('change',({target}) => {
    const files = target.files;
    if(!target.files && !target.files[0]) return;
    const notSupportFile = [...files].find(ele => ele.type != 'image/png' && ele.type != 'image/jpeg');
    if(notSupportFile) {
        alert('지원하지 않는 파일')
        return;
    }
    if(uploadImgs.length+target.files.length > 5) {
        alert('파일 초과');
        return;
    }

    [...files].forEach(ele => {
        uploadImgs.push(ele);

        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(ele.type)
            const img = document.createElement('img');
            img.setAttribute('src',e.target.result);
            $previewImg.appendChild(img);
        }
        reader.readAsDataURL(ele);
    });
})


