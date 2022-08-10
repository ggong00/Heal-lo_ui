import {category_lv1,category_lv2} from "./category-loca.js";
import {moveMap} from "./naver-map-api.js";

// dom접근
const $cgListsByLoca1 = document.querySelector('.search__cg-wrap .search__cg-loca1');
const $cgListsByLoca2 = document.querySelector('.search__cg-wrap .search__cg-loca2');
const $cgListsByFacility = document.querySelector('.search__cg-wrap .search__cg-fa');
const $searchBtnByName = document.querySelector('.selected-wrap__text-input i');
const $inputByText = document.getElementById('textSearchInput')  

// 다용도 전역변수
let selectedLog = {before : '', now : ''};
const cgRemveColor = '#ffffff99';
const cgAddColor = 'var(--color-others-header)';
//선택된 카테고리 배열
let selectedCgLocaSave = {level1 : '', level2 : ''};  //지역 선택 저장
let selectedCgSave = ''; //운동분류 저장
let searchedTextSave = '';  //시설명 검색어 저장

// 네이버 지도 생성
const mapOptions = {
  center: new naver.maps.LatLng(35.5352, 129.3109),
  zoom: 8
};
const map = new naver.maps.Map('map', mapOptions);

// 지역 카테고리 lv1 랜더링 
RenderingUlTag($cgListsByLoca1,category_lv1);

// 지역 카테고리 lv1 클릭 이벤트
$cgListsByLoca1.addEventListener('click', ({target,currentTarget}) => {
  if(target.tagName != 'P') {
    return;
  }

  selectedLog.now = target;

  // const li_lv2 = currentTarget.querySelectorAll('li p');
  // [...li_lv2].forEach(ele => {
  //   ele.style.backgroundColor = cgRemveColor;
  // })

  // target.style.backgroundColor = cgAddColor;

  //카테고리 생성 로직
  $cgListsByLoca2.innerHTML = '';
  RenderingUlTag($cgListsByLoca2,category_lv2[`${target.textContent}`], target.textContent);
  $cgListsByLoca2.style.top = $cgListsByLoca1.children[0].offsetTop + $cgListsByLoca1.offsetHeight + 'px';
  $cgListsByLoca2.style.visibility = 'visible';

  //캡쳐링 단계(lv2 삭제)
  document.body.addEventListener('click', ({target}) => {
    if(target.closest('.search__cg-wrap .search__cg-loca2')) {
      return;
    }
  
    $cgListsByLoca2.style.top = 0;
    $cgListsByLoca2.style.visibility ='hidden';
    $cgListsByLoca2.innerHTML = '';
  },true)
})

// 지역 카테고리 lv2 클릭 이벤트
$cgListsByLoca2.addEventListener('click',({target,currentTarget}) => {
  if(target.tagName != 'P') {
    return;
  }

  const li_lv2 = currentTarget.querySelectorAll('li p');
  [...li_lv2].forEach(ele => {
    ele.style.backgroundColor = cgRemveColor;

  })

  // 객체 저장
  selectedCgLocaSave.level1 = target.classList[0];
  selectedCgLocaSave.level2 = target.textContent;
  target.style.backgroundColor = cgAddColor;

  //선택되어 있는 lv1 지역카테고리 스타일 적용
  if(selectedLog.now != '') {
    selectedLog.now.style.backgroundColor = cgAddColor;
  }

  //그전에 카테고리의 스타일 제거 후 선택되어 있는 카테고리 스타일 적용 
  if(selectedLog.before != '') {
    selectedLog.before.style.backgroundColor = cgRemveColor;
    selectedLog.now.style.backgroundColor = cgAddColor;
  }
  
  //선택되어 있는 카테고리 요소 저장
  selectedLog.before = selectedLog.now;

  console.log(selectedCgLocaSave);

})

//지역 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RenderingUlTag(ulTag,arr,parentLv) {
  
  arr.forEach((ele,idx) => {
    const pTag = document.createElement('p');
    pTag.textContent = ele;
    pTag.setAttribute('class',parentLv);
    const liTag = document.createElement('li');
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);

    if(selectedCgLocaSave.level1 == parentLv && selectedCgLocaSave.level2 == ele) {
      pTag.style.backgroundColor = cgAddColor;
    }

    if(idx == arr.length-1 && parentLv) {
      // close버튼 설정
      const closeLiTag = document.createElement('li');
      closeLiTag.setAttribute('class','loca-close-li')      
      const closeBtn = document.createElement('i');
      closeBtn.setAttribute('class','btn-close-loca fa-solid fa-circle-xmark');
      closeLiTag.appendChild(closeBtn);
      ulTag.appendChild(closeLiTag);

      closeBtn.addEventListener('click', () => {
        ulTag.querySelectorAll('li').forEach(ele => ele.remove());
        $cgListsByLoca2.style.top = 0;
        ulTag.style.visibility = 'hidden';  
      })
    }
  })

}

//운동 카테고리 클릭 이벤트
$cgListsByFacility.addEventListener('click',({target,currentTarget}) => {
  if(target.tagName != 'P') {
    return;
  }

  const li_lv2 = currentTarget.querySelectorAll('li p');
  [...li_lv2].forEach(ele => {
    ele.style.backgroundColor = cgRemveColor;

  })

  target.style.backgroundColor = cgAddColor;

  selectedCgSave = target.textContent;
  console.log(selectedCgSave);
})

// 시설명 검색 이벤트
$searchBtnByName.addEventListener('click',(e) => { 
  searchedTextSave =  $inputByText.value;
  $inputByText.value = '';
  console.log(searchedTextSave);

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
