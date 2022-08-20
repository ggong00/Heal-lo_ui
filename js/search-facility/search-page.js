import {categoryLoca_lv1, categoryLoca_lv2, category_fctype} from "../module/category.js";
import {makeElements} from "../module/create-elememt.js";
import {MapUtile} from "../module/naver-map-api.js";

// dom접근
const $cgListsByLoca1 = document.querySelector('.search__cg-wrap .search__cg-loca1');
const $cgListsByLoca2 = document.querySelector('.search__cg-wrap .search__cg-loca2');
const $cgListsByFacility = document.querySelector('.search__cg-wrap .search__cg-fa');
const $searchForm = document.querySelector('.text-input__body');
const $inputByText = document.getElementById('textSearchInput');
const $searchedLists = document.querySelector('.searched-wrap .searched-lists');
const $resultCount = document.querySelector('.result-count');
const $mapUtil = document.querySelector('.map-util');
const $openList = document.querySelector('.open-list');
const $myLocation = document.querySelector('.my-location');


// 다용도 전역변수
let selectedLog = {before : '', now : ''};
const cgRemveColor = '#ffffff99';
const cgAddColor = 'var(--color-others-header)';
let listPageNum = 0;
const limitPageNum = 10;
const onePageNum = 10;
let createListStatus = 'false';

// 네이버 지도 생성
const mapOptions = {
  center: new naver.maps.LatLng(35.5352, 129.3109),
  zoom: 8
};
const map = new naver.maps.Map('map', mapOptions);

const mapUtil = new MapUtile(map);

//선택된 카테고리 배열
let selectedCgLocaSave = {level1 : '', level2 : ''};  //지역 선택 저장
let selectedTypeCgSave = ''; //운동분류 저장
let searchedTextSave = 'all';  //시설명 검색어 저장

//리스트 오픈버튼 클릭 이벤트
$openList.addEventListener('click',() => {
  actionOpenMenu();
})

//내 위치 버튼 클릭 이벤트
$myLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('내 위치정보를 지원하지 않는 브라우저입니다.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        mapUtil.makeMyMarker(lat, lng);
      },
      (positionError) => {
        console.log(positionError.code,positionError.message);
        alert('위치를 불러오는 중 오류가 생겼습니다.');
      }
  );
});

// 지역 카테고리 lv1 랜더링 
RenderingUlTagLv1($cgListsByLoca1,categoryLoca_lv1);

// 지역 카테고리 lv1 클릭 이벤트
$cgListsByLoca1.addEventListener('click', ({target,currentTarget}) => {
  if(target.tagName != 'P') {
    return;
  }

  selectedLog.now = target;

  //카테고리 생성 로직
  $cgListsByLoca2.innerHTML = '';
  RenderingUlTagLv2($cgListsByLoca2,categoryLoca_lv2[`${target.id}`], target.id);
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

  //그전 카테고리의 스타일 제거 후 선택되어 있는 카테고리 스타일 적용 
  if(selectedLog.before != '') {
    selectedLog.before.style.backgroundColor = cgRemveColor;
    selectedLog.now.style.backgroundColor = cgAddColor;
  }
  
  //선택되어 있는 카테고리 요소 저장
  selectedLog.before = selectedLog.now;

})

// 운동 카테고리 생성 로직
RenderingUlTagLv1($cgListsByFacility,category_fctype);


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
  selectedTypeCgSave = target.id;
})

// 검색 이벤트 (데이터 통신이 이루어지는 이벤트)
$searchForm.addEventListener('submit',(e) => {
  e.preventDefault();

  // 지역이 선택되어있지지 확인
  if(selectedCgLocaSave.level1 == '') {
    alert("지역을 선택해주세요");
    $inputByText.value = '';
    return;
  }

  // 종목이 선택되어있는지 확인
  if(selectedTypeCgSave == '') {
    alert("운동을 선택해주세요");
    $inputByText.value = '';
    return;
  }

  if(!createListStatus) {
    alert("검색어를 조회하고 있습니다");
    return;
  }


  let value = $inputByText.value.trim('');

  searchedTextSave =  value;
  $inputByText.value = '';

  console.log("클릭")

  // 서버 통신
  requestPublicApi(searchedTextSave,selectedTypeCgSave,selectedCgLocaSave,"1");

})

//레벨1 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RenderingUlTagLv1(ulTag,arr) {
  
  arr.forEach(ele => {
    const pTag = document.createElement('p');
    pTag.textContent = ele.text;
    pTag.setAttribute('id',ele.value);
    const liTag = document.createElement('li');
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);
  })
}

//레벨2 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RenderingUlTagLv2(ulTag,arr,parentLv) {
  
  arr.forEach((ele,idx) => {

    const pTag = document.createElement('p');
    pTag.textContent = ele;
    pTag.setAttribute('class',parentLv);
    const liTag = document.createElement('li');
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);

    if(idx == arr.length-1) {
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

    if(selectedCgLocaSave.level1 == parentLv && selectedCgLocaSave.level2 == ele) {
      pTag.style.backgroundColor = cgAddColor;
    }
  })
}

// 메뉴 오픈 함수
function actionOpenMenu() {
  $mapUtil.classList.toggle('open');
  $searchedLists.classList.toggle('open-lists');

  setTimeout(() => {
    const beforeIcon = $mapUtil.querySelector('.open-list i');
    beforeIcon.remove();

    const afterIcon = document.createElement('i');

      if($mapUtil.classList.contains('open')) {
        afterIcon.setAttribute('class','fa-solid fa-arrow-up-short-wide openbar-icon');
      } else {
        afterIcon.setAttribute('class','fa-solid fa-arrow-down-short-wide openbar-icon');
      }

    $openList.appendChild(afterIcon);

  },300)
}

//운동시설 항목 생성 함수
function createList(itemData) {
  const listWrap =
      makeElements('div', {class: 'searched-lists__item'},
          makeElements('div', {class: 'item-img'},
              makeElements('img', {src: '../../img/이미지준비중.jpg'})),
          makeElements('div', {class: 'item-content'},
              makeElements('div', {class: 'item-content__top'},
                  makeElements('a', {href: '#'},
                      makeElements('h3', {class: 'item-title'}, itemData.faciNm)),
                  makeElements('div', {class: 'icon-wrap'},
                      makeElements('span',{class : 'fa-stack fa-lg favorite-icon'},
                          makeElements('i',{class : 'fa fa-square fa-stack-2x'}),
                          makeElements('i',{class : 'fa-solid fa-heart fa-stack-1x contents-icon'})),
                      makeElements('span', {class: 'fa-stack fa-lg move-map-icon'},
                          makeElements('i',{class : 'fa fa-square fa-stack-2x'}),
                          makeElements('i',{class : 'fa-solid fa-map-location-dot fa-stack-1x contents-icon'})))),
              makeElements('div', {class: 'item-content__body'},
                  makeElements('p', {class: 'item-sub item-tel'}, itemData.faciTel),
                  makeElements('p', {class: 'item-sub item-addr'},itemData.faciRoadAddr1))));

  listWrap.querySelector('.move-map-icon').addEventListener('click',() => {
    mapUtil.moveMap(itemData.faciPointY,itemData.faciPointX)
  })

  return listWrap;
}

//페이지네이션 생성 함수
function createPagination(dataArr) {

  const paginationLis = [];

  const paginationWrap = document.createElement('li');
  paginationWrap.setAttribute('class', 'pagination-wrap');
  paginationWrap.setAttribute('aria-label', 'Page navigation example');

  const pagination = document.createElement('ul');
  pagination.setAttribute('class', 'pagination pagination-sm');

  paginationWrap.appendChild(pagination);

  for (let i = 0; i < limitPageNum; i++) {
    const page = document.createElement('li');
    page.setAttribute('class', 'page-item');
    const a = document.createElement('a');
    a.setAttribute('class', 'page-link shadow-none');
    a.textContent = i+1;
    a.addEventListener('click', (e) => {
      [...$searchedLists.children].filter(ele => ele.classList.contains('searched-lists__item'))
                                  .forEach(ele => ele.remove());

      const pageLists = dataArr.filter((ele, idx) => idx >= i * onePageNum && idx < (i * onePageNum) + onePageNum);
      pageLists.forEach(ele => $searchedLists.prepend(createList(ele)))
      $searchedLists.scrollTop = 0;

      [...page.querySelectorAll('a')].forEach(ele => ele.classList.remove('select-on'));
      e.target.classList.add('select-on');


      mapUtil.makeMarkers(pageLists)
    })

    page.appendChild(a);
    paginationLis.push(page);

    --listPageNum;
    if (listPageNum < 0) {
      break;
    }
  }

  paginationLis.forEach(ele => {
    pagination.appendChild(ele);
  })

  $searchedLists.appendChild(paginationWrap);

  paginationLis[0].querySelector('a').click();
}

// 서버에 외부api 통신요청(GET,Accept = json)
function requestPublicApi(faciNm,fcobNm,faciRoadAddr1,pageNo) {
  let address = '';

  if (faciRoadAddr1.level2 == '전체') {
    address = faciRoadAddr1.level1;
  } else {
    address = `${faciRoadAddr1.level1} ${faciRoadAddr1.level2}`;
  }

  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:9080/public/search'; //매핑url은 수정 가능성 있음
  const queryPram = `?faciNm=${faciNm}&fcobNm=${fcobNm}&faciRoadAddr1=${address}&pageNo=${pageNo}`;
  
  xhr.open('GET',url + queryPram);
  xhr.send();

  createListStatus = false;

  xhr.addEventListener('readystatechange', () => {

    createListStatus = true;

    if (xhr.readyState == XMLHttpRequest.DONE) {

      if (xhr.status == 0 || (xhr.status >= 200 && xhr.status < 400)) {
        let jsonData = JSON.parse(xhr.responseText);

        console.log(jsonData);

        [...$searchedLists.children].filter(ele => ele.tagName == 'LI')
            .forEach(ele => ele.remove());
        $resultCount.textContent = '0';

        if (jsonData.response.body.items == null) {
          alert('검색결과가 없습니다.');
          createListStatus = true;
          return;
        }

        const jsonBody = jsonData.response.body;
        const jsonItem = jsonData.response.body.items.item;

        //시설 목록 생성
        listPageNum = jsonItem.length / onePageNum;
        createPagination(jsonItem);


        $resultCount.textContent = jsonBody.totalCount;
        // 지도 변경

        if (!$searchedLists.classList.contains('open-action')) {
          actionOpenMenu();
        }

      } else {
        console.log("오류");
      }

    }
  })
}
