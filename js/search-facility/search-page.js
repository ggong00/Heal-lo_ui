import {categoryLoca_lv1, categoryLoca_lv2, category_fctype} from "../module/category.js";
import makeElements from "../module/create-elememt.js";
import MapUtile from "../module/naver-map-api.js";

// 테스트 데이터
const listsData = {
  status : '200',
  msg : "정상",
  item : {
    totalcount : 184,
    items : [
      {fcno : 1, fcname : '운동시설a', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 2, fcname : '운동시설a1', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 3, fcname : '운동시설a2', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 4, fcname : '운동시설a3', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 5, fcname : '운동시설a4', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 6, fcname : '운동시설a5', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 7, fcname : '운동시설a6', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 8, fcname : '운동시설a7', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 9, fcname : '운동시설a8', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'},
      {fcno : 10, fcname : '운동시설a9', fctype : '당구장업',fchomepage : null,fctel : '010-8222-4555',fclat : 35.5352,fclng : 129.3109,fcaddr : '울산 중구 옥교동',fcpostcode : null,fcstatus : '정상운영'}
    ]
  }
}

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
let requstStatus = 'false'; 

// 페이지네이션 설정
const limitPage = 5;      //  페이지 최대 생성 수
const onePageNum = 10;    //  1페이지에 최대 목록 수
let nowPage = 1;          //  현재 페이지

//검색 조건 저장
let selectedCgLocaSave = {level1 : '', level2 : ''};
let selectedTypeCgSave = ''; 
let searchedTextSave = ''; 

// 네이버 지도 생성
const mapOptions = {
  center: new naver.maps.LatLng(35.5352, 129.3109),
  zoom: 8
};
const map = new naver.maps.Map('map', mapOptions);
const mapUtil = new MapUtile(map);

// 지역 카테고리 대분류 랜더링 
RanderingUlTagLv1($cgListsByLoca1,categoryLoca_lv1);

// 운동 카테고리 랜더링
RanderingUlTagLv1($cgListsByFacility,category_fctype);

// 지역 카테고리 대분류 클릭 이벤트
$cgListsByLoca1.addEventListener('click', ({target,currentTarget}) => {
  if(target.tagName != 'P') {
    return;
  }
  selectedLog.now = target;
  //카테고리 생성 로직
  $cgListsByLoca2.innerHTML = '';
  RanderingUlTagLv2($cgListsByLoca2,categoryLoca_lv2[`${target.id}`], target.id);
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
});

// 지역 카테고리 중분류 클릭 이벤트
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
});

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

//목록on/off 버튼 클릭 이벤트 (목록 on/off 이벤트)
$openList.addEventListener('click',() => {
  actionOpenMenu();
})

//내 위치 클릭 이벤트 (내 위치 이벤트)
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

// 검색 이벤트 (데이터 통신이 이루어지는 이벤트)
$searchForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const ispossible = selectedCgLocaSave.level1 != '' && selectedTypeCgSave != '';
  if(!requstStatus) {
    alert("검색어를 조회하고 있습니다");
    return;
  }
  if(!ispossible) {
    alert("카테고리를 선택해주세요");
    return;
  }

  let value = $inputByText.value.trim('');
  searchedTextSave =  value;
  $inputByText.value = '';

  //검색시작
  search();
})

//대분류 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RanderingUlTagLv1(ulTag,arr) {
  arr.forEach(ele => {
    const pTag = document.createElement('p');
    pTag.textContent = ele.text;
    pTag.setAttribute('id',ele.value);
    const liTag = document.createElement('li');
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);
  })
}

//중분류 카테고리 ul태그 랜더링 함수 (ul > li > p)
function RanderingUlTagLv2(ulTag,arr,parentLv) {
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
                      makeElements('h3', {class: 'item-title'}, itemData.fcname)),
                  makeElements('div', {class: 'icon-wrap'},
                      makeElements('span',{class : 'fa-stack fa-lg favorite-icon'},
                          makeElements('i',{class : 'fa fa-square fa-stack-2x'}),
                          makeElements('i',{class : 'fa-solid fa-heart fa-stack-1x contents-icon'})),
                      makeElements('span', {class: 'fa-stack fa-lg move-map-icon'},
                          makeElements('i',{class : 'fa fa-square fa-stack-2x'}),
                          makeElements('i',{class : 'fa-solid fa-map-location-dot fa-stack-1x contents-icon'})))),
              makeElements('div', {class: 'item-content__body'},
                  makeElements('p', {class: 'item-sub item-tel'}, itemData.fctel),
                  makeElements('p', {class: 'item-sub item-addr'},itemData.fcaddr))));

  listWrap.querySelector('.move-map-icon').addEventListener('click',() => {
    mapUtil.moveMap(itemData.fclat,itemData.fclng)
  })
  return listWrap;
}

//검색 함수
function search() {
  requstStatus = false;

  const submitData = {
    text : searchedTextSave,
    type : selectedTypeCgSave,
    loca : selectedCgLocaSave.level2 == '전체' ? selectedCgLocaSave.level1 : `${selectedCgLocaSave.level1} ${selectedCgLocaSave.level2}`,
    pageNO : nowPage
  }
  // const xhr = requestPublicApi(submitData);

  // xhr.addEventListener('readystatechange', () => {
    requstStatus = true;
    nowPage = 1;
    // if (xhr.readyState == XMLHttpRequest.DONE) {
      // if (xhr.status == 0 || (xhr.status >= 200 && xhr.status < 400)) {
        // const jsonData = JSON.parse(xhr.responseText);

        //테스트
        const jsonData = listsData;

        //검색결과 체크
        if (jsonData.item.totalcount == 0) {
          alert('검색결과가 없습니다.');
          requstStatus = true;
          return;
        }
        
        //기존 목록 삭제
        [...$searchedLists.children].filter(ele => ele.tagName == 'LI')
        .forEach(ele => ele.remove()); 

        //총 검색 결과 초기화
        $resultCount.textContent = '0';

        //페이지네이션 생성
        const totalPage = Math.ceil(jsonData.item.totalcount / onePageNum);
        const paginationWrap = createPagination(totalPage);
        $searchedLists.appendChild(paginationWrap);

        //총 검색 결과 표시
        $resultCount.textContent = jsonData.totalCount; 
        
        //목록 on
        if (!$searchedLists.classList.contains('open-lists')) {
          console.log('ㅋ')
          actionOpenMenu();
        }

  //     } else {
  //       console.log("오류");
  //     }
  //   }
  // });

}

//페이지네이션 생성 함수
function createPagination(totalPage) {
  //이전 페이지네이션 삭제
  $searchedLists.querySelector('.pagination-wrap')?.remove();
  //페이지네이션 wrap생성
  const paginationLis = [];
  const paginationWrap = document.createElement('li');
  paginationWrap.setAttribute('class', 'pagination-wrap');
  paginationWrap.setAttribute('aria-label', 'Page navigation example');
  const pagination = document.createElement('ul');
  pagination.setAttribute('class', 'pagination pagination-sm');
  paginationWrap.appendChild(pagination);

  //페이지 생성
  let pageLv = Math.ceil(nowPage/limitPage);
  let startIdx = pageLv == 1 ? 1 : (pageLv-1)*limitPage + 1;
  let lastIdx = totalPage - (startIdx + limitPage) > 0 ? startIdx + limitPage : totalPage + 1;
  const saveStartIdx = startIdx;

  for (startIdx; startIdx < lastIdx; startIdx++) {
    const page = document.createElement('li');
    page.setAttribute('class', 'page-item');
    const a = document.createElement('a');
    a.setAttribute('class', 'page-link shadow-none');
    a.textContent = startIdx;
    // 페이지 클릭 이벤트
    a.addEventListener('click', (e) => {
      requstStatus = false;
      nowPage = startIdx;  //현재 페이지 저장
      const submitData = {
        text : searchedTextSave,
        type : selectedTypeCgSave,
        loca : selectedCgLocaSave.level2 == '전체' ? selectedCgLocaSave.level1 : `${selectedCgLocaSave.level1} ${selectedCgLocaSave.level2}`,
        pageNO : nowPage
      }
      //테스트
      const jsonData = listsData;

      // const xhr = requestPublicApi(submitData);
      // xhr.addEventListener('readystatechange', () => {
        // if (xhr.readyState == XMLHttpRequest.DONE) {
          // if (xhr.status == 0 || (xhr.status >= 200 && xhr.status < 400)) {
            // const jsonData = JSON.parse(lists);
      requstStatus = true;

      //검색결과 체크
      if (jsonData.totalCount == 0) {
        alert('검색결과가 없습니다.');
        return;
      }      
    
      // 이전 목록들 초기화
      [...$searchedLists.children].filter(ele => ele.classList.contains('searched-lists__item'))
      .forEach(ele => ele.remove());

      //새 목록 생성   
      jsonData.item.items.forEach(ele => $searchedLists.prepend(createList(ele)));
      $searchedLists.scrollTop = 0;

      //운동시설 마커 생성
      mapUtil.makeMarkers(jsonData.item.items);

      //클릭 표시
      [...$searchedLists.querySelectorAll('a')].forEach(ele => ele.classList.remove('on'));
      e.target.classList.add('on');

      //     } else {
      //       console.log("오류");
      //     }
      //   }
      // });


    });
    page.appendChild(a);
    paginationLis.push(page);
  }

  //이전 페이지 생성
  if(nowPage - limitPage > 0) {
    const page = document.createElement('li');
    page.setAttribute('class', 'page-item');
    const a = document.createElement('a');
    a.setAttribute('class', 'page-link shadow-none');
    a.textContent = '이전';

    page.appendChild(a);
    paginationLis.unshift(page);

    a.addEventListener('click', e => {
      nowPage = saveStartIdx - 1;
      const paginationWrap = createPagination(totalPage);
      $searchedLists.appendChild(paginationWrap);
    })
  }

  //다음 페이지 생성
  if(totalPage - (nowPage + limitPage) > 0) {
    const page = document.createElement('li');
    page.setAttribute('class', 'page-item');
    const a = document.createElement('a');
    a.setAttribute('class', 'page-link shadow-none');
    a.textContent = '다음';

    page.appendChild(a);
    paginationLis.push(page);

    a.addEventListener('click', e => {
      nowPage = lastIdx;
      console.log(nowPage)
      const paginationWrap = createPagination(totalPage);
      $searchedLists.appendChild(paginationWrap);
    })
  }
  paginationLis.forEach(ele => {
    const pageIdx = ele.querySelector('a');
    pageIdx.textContent == saveStartIdx && pageIdx.click();

    pagination.appendChild(ele);
  })

  return paginationWrap;
}

// 서버에 외부api 통신요청(GET,Accept = json)
function requestPublicApi(data) {
  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:9080/public/search'; //매핑url은 수정 가능성 있음
  const queryPram = `?faciNm=${data.text}&fcobNm=${data.type}&faciRoadAddr1=${data.loca}&pageNo=${data.pageNO}`;
  xhr.open('GET',url + queryPram);
  xhr.send();

  return xhr;
}
