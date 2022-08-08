import {category_lv1,category_lv2} from "./category-loca.js";

// dom접근
const $selectedCg = document.querySelector('.selected-wrap__cg-wrap');
const $cgLists = document.querySelector('.search__select-input');
const $cgListsByLoca1 = document.querySelector('.search__cg-wrap .search__cg-loca1');
const $btnSearch = document.querySelector('.btn-search');
const $btnReset = document.querySelector('.btn-reset');
let $btnAddContentsByFa = document.querySelector('.searched-text .btn-search-upda');
const $selectedWrap = document.querySelector('.selected-wrap');
const $searchedTextWrap = document.querySelector('.selected-wrap .searched-text');
const searchedText = document.querySelector('.selected-wrap .searched-text p');
const $inputByText = document.getElementById('textSearchInput')  
const $cgLoca1 = document.querySelector('.search__cg-wrap .search__cg-loca1');
//선택된 카테고리 배열
const selectedCgArrSave = [];
let searchedTextSave = '';

// 지역 카테고리 lv1 랜더링 
RenderingUlTag($cgListsByLoca1,category_lv1);

// 지역 카테고리 lv1 클릭 이벤트
$cgListsByLoca1.addEventListener('click', ({target}) => {
  if(target.tagName != 'P') {
    return;
  }
  //카테고리 생성 로직
  const $cgListsByLoca2 = document.querySelector('.search__cg-wrap .search__cg-loca2');
  $cgListsByLoca2.style.top = 0;
  $cgListsByLoca2.style.opacity = 0;
  $cgListsByLoca2.innerHTML = ' ';
  RenderingUlTag($cgListsByLoca2,category_lv2[`${target.textContent}`],'lv2');
  $cgListsByLoca2.style.top = $cgListsByLoca1.children[0].offsetTop + $cgListsByLoca1.offsetHeight + 'px';
  $cgListsByLoca2.style.opacity = 1;


})

//지역 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RenderingUlTag(ulTag,arr,lv) {
  arr.forEach((ele,idx) => {
    const pTag = document.createElement('p');
    pTag.textContent = ele;
    const liTag = document.createElement('li');
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);

    if(idx == arr.length-1 && lv) {
      // <i class="fa-solid fa-circle-xmark"></i>
      const closeLiTag = document.createElement('li');
      closeLiTag.setAttribute('class','loca-close-li')      
      const closeBtn = document.createElement('i');
      closeBtn.setAttribute('class','btn-close-loca fa-solid fa-circle-xmark');
      closeLiTag.appendChild(closeBtn);
      ulTag.appendChild(closeLiTag);

      closeBtn.addEventListener('click', () => {
        ulTag.querySelectorAll('li').forEach(ele => ele.remove());
        ulTag.style.opacity = 0;
      }) 
    }
  })
}

// 시설명 검색 클릭 이벤트
$inputByText.addEventListener('click', () => {
  $searchedTextWrap.classList.remove('visibility_visible');
  $btnAddContentsByFa.classList.add('visibility_visible');
})

// 시설명 추가버튼 클릭 이벤트
$btnAddContentsByFa.addEventListener('click', () => {
  let value = $inputByText.value.trim();
  if (value != '') {
    searchedTextSave = value;
    $searchedTextWrap.classList.add('visibility_visible');
    if(value.length >= 11) {
      searchedText.textContent = value.substr(0,10) + '...';
    } else {
      searchedText.textContent = value;
    }
  } else {
    searchedTextSave = '';
  }
  $inputByText.value = '';
  $btnAddContentsByFa.classList.remove('visibility_visible');
})

$selectedWrap.addEventListener('mouseleave', () => {
  $btnAddContentsByFa.classList.remove('visibility_visible');
}) 

/*
// 카테고리 클릭 이벤트
$cgLists.addEventListener('click', ({target}) => {
  // p태그 판별
  if(!(target.tagName == 'P')) return;

  // 최대 갯수 제한
  if(selectedCgArrSave.length >= 10) {
    alert('최대 10개 선택가능합니다.');
    return;
  }

  // 중복 카테고리 제한
  if(selectedCgArrSave.indexOf(target.textContent) != -1) {
    alert('이미 선택된 카테고리입니다');
    return;
  }

  target.classList.add('cg-active');


  // 태그 생성
  const selectedCg_div = document.createElement('div');
  console.log(selectedCg_div);

  const selectedCg_label = document.createElement('label');
  const selectedCg_btn = document.createElement('button');

  selectedCg_div.setAttribute('class','selected-cg');
  selectedCg_btn.setAttribute('type','button');
  selectedCg_btn.setAttribute('class','btn-close shadow-none');
  selectedCg_btn.setAttribute('id',`btnClose_${target.textContent}`);
  selectedCg_btn.setAttribute('aria-label','Close');
  selectedCg_label.setAttribute('for',`btnClose_${target.textContent}`)
  selectedCg_label.textContent = target.textContent;  

  // 버튼 클릭 이벤트
  selectedCg_btn.addEventListener('click', () => {
    selectedCg_div.style.transition = 'all 0.4s';
    selectedCg_div.style.transform = 'scale(0.2)';

    setTimeout(() => {
      selectedCg_div.remove();
      target.classList.remove('cg-active');
      selectedCgArrSave.forEach((ele,idx) => {
        if(ele == target.textContent ) {
          selectedCgArrSave.splice(idx,1);
        }
      })
    }, 300);
  })
  
  // 태그 삽입
  selectedCg_div.appendChild(selectedCg_label);
  selectedCg_div.appendChild(selectedCg_btn);
  $selectedCg.appendChild(selectedCg_div);
  selectedCgArrSave.push(selectedCg_label.textContent);

})  */

// 카테고리 이벤트 v2




// 검색버튼 클릭 이벤트
$btnSearch.addEventListener('click',e => {
  const value = searchedTextSave.trim();

  if(value == '') {
    // 카테고리 검색
    console.log(selectedCgArrSave);  

  } else {
    // 카테고리 + 시설명 검색

    console.log(searchedTextSave)
    console.log(selectedCgArrSave);
    
  }
})

// 리셋버튼 클릭 이벤트
$btnReset.addEventListener('click', e => {
  [...$selectedCg.querySelectorAll('.selected-cg')]
              .forEach(ele => ele.remove());

  selectedCgArrSave.splice(0,selectedCgArrSave.length);            

  document.querySelectorAll('.category .cg-active')
          .forEach(ele => {
            ele.classList.remove('cg-active');
          }) 

  searchedTextSave = '';        

  $searchedTextWrap.classList.remove('visibility_visible');

});
