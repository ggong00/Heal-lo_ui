import makeElements from "../../module/create-elememt.js";

// 리뷰 테스트 데이터
const reviews = {
    items :
    [
        {   
            rvno : 1,        
            rvcontents : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernaturipsum dolor sit amet consectetur adipisicing elit. Doloremque praesentium consectetur
            aspernatur.`,  
            rvscore : 1.5,     
            rvcdate : '2022/08/30',    
            rvudate : '2022/08/30',   
            fcno : 1,  
            memno : 2,
            memninkname : 'abc1234',     
            imgs : [
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
            ]  
        },
        {   
            rvno : 1,        
            rvcontents : '시설이 좋아요2',  
            rvscore : 2.5,     
            rvcdate : '2022/08/30',    
            rvudate : '2022/08/30',   
            fcno : 1,  
            memno : 3,
            memninkname : 'abc1235',
            imgs : [
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
            ]                
        },
        {   
            rvno : 1,        
            rvcontents : '시설이 좋아요3',  
            rvscore : 4.5,     
            rvcdate : '2022/08/30',    
            rvudate : '2022/08/30',   
            fcno : 1,  
            memno : 4,
            memninkname : 'abc1236',
            imgs: null              
        },
        {   
            rvno : 1,        
            rvcontents : '시설이 좋아요4',  
            rvscore : 3,     
            rvcdate : '2022/08/30',    
            rvudate : '2022/08/30',   
            fcno : 1,  
            memno : 5,
            memninkname : 'abc1237',
            imgs : [
                'https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=',
            ]                
        },
        {   
            rvno : 1,        
            rvcontents : '시설이 좋아요5',  
            rvscore : 4.5,     
            rvcdate : '2022/08/30',    
            rvudate : '2022/08/30',   
            fcno : 1,  
            memno : 8,
            memninkname : 'abc1238'              
        },
    ]
}

//dom 접근
const reviewLists = document.querySelector('.review-lists');

//초기 페이지 셋팅
reviewListRequest();

//비동기 통신 함수
function reviewListRequest() {
    // 비통기 통신

    reviews.items.forEach(ele => reviewLists.appendChild(reviewListRander(ele)));
    
}

//리뷰 랜더링 함수
function reviewListRander(data) {
    const previewContents = data.rvcontents.substr(0,200) + '...';

    const isMoreview = data.rvcontents.length > 200;

    const reviewCard = 
    makeElements('div',{class : 'review-card', id : `${data.rvno}`},
        makeElements('div',{class : 'review-card__info'},
            makeElements('div',{class : 'rating-score review-card__star'},
                makeElements('div',{class : 'outer-star'},'★★★★★',
                    makeElements('span',{class : 'inner-star'},'★★★★★'))),
            isMoreview ? makeElements('div',{class : 'btn-moreview'},'더보기') : '',
            makeElements('span',{class : 'user-name'},data.memninkname),
            makeElements('span',{class : 'date'},data.rvcdate),
            makeElements('p',{class : 'preview-contents'},isMoreview ? previewContents : data.rvcontents),
            makeElements('div',{class : 'preview-wrap'})));

    reviewCard.querySelector('.inner-star').style.width = data.rvscore*20 + '%';

    reviewCard.querySelector('.btn-moreview')?.addEventListener('click',(e) => {
        const contents = reviewCard.querySelector('.preview-contents');
        contents.classList.toggle('moreview-on');

        if(contents.classList.contains('moreview-on')) {
            contents.textContent = data.rvcontents;
        } else {
            contents.textContent = previewContents;
        }

    })

    data.imgs?.forEach(ele => {
        const img =  document.createElement('img');
        img.setAttribute('src',ele);
        reviewCard.querySelector('.preview-wrap').appendChild(img);
    })



//     <div class="preview-wrap">
//     <img src="https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=" alt="">
//     <img src="https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=" alt="">
//     <img src="https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=" alt="">
//     <img src="https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=" alt="">
//     <img src="https://media.istockphoto.com/id/1197662246/ko/%EC%82%AC%EC%A7%84/%EC%B2%B4%EC%9C%A1%EA%B4%80%EC%97%90%EC%84%9C-%EC%95%84%EB%A0%B9%EC%9D%98-%ED%96%89.webp?s=612x612&w=is&k=20&c=VSGgwQ-A6cZt5lwifHK1JIuimStPTr1bjqfjKQWUz1I=" alt="">
// </div>
        //     <div class="review-btn-wrap">
        //     <button class="review-update btn-review">수정</button>
        //     <button class="review-delete btn-review">삭제</button>
        // </div>
    return reviewCard;
}