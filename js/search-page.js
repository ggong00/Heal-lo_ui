import {categoryLoca_lv1,categoryLoca_lv2,category_fctype} from "./category.js";
import {moveMap} from "./naver-map-api.js";

// dom접근
const $cgListsByLoca1 = document.querySelector('.search__cg-wrap .search__cg-loca1');
const $cgListsByLoca2 = document.querySelector('.search__cg-wrap .search__cg-loca2');
const $cgListsByFacility = document.querySelector('.search__cg-wrap .search__cg-fa');
const $searchForm = document.querySelector('.text-input__body');
const $inputByText = document.getElementById('textSearchInput');
const $searchedWrap = document.querySelector('.text-input__header');  
const $searchedLists = document.querySelector('.searched-wrap .searched-lists');
const $resultCount = document.querySelector('.result-count')

// 다용도 전역변수
let selectedLog = {before : '', now : ''};
const cgRemveColor = '#ffffff99';
const cgAddColor = 'var(--color-others-header)';
let listPageNum = 0;
const limitPageNum = 10;
let createListStatus = 'false';

//선택된 카테고리 배열
let selectedCgLocaSave = {level1 : '', level2 : ''};  //지역 선택 저장
let selectedTypeCgSave = '전체'; //운동분류 저장
let searchedTextSave = 'all';  //시설명 검색어 저장

// 목록 하이드바 위치지정
const openBar = document.querySelector('.lists-openbar');

openBar.addEventListener('click',() => {
  actionOpenMenu();
  actionOpenMenu_icon();
})

// 네이버 지도 생성
const mapOptions = {
  center: new naver.maps.LatLng(35.5352, 129.3109),
  zoom: 8
};
const map = new naver.maps.Map('map', mapOptions);

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

  // 지역이 선택되어있지 않다면 제한
  if(selectedCgLocaSave.level1 == '') {
    alert("지역을 필수로 선택해야합니다!");
    $inputByText.value = '';
    return;
  }

  if(!createListStatus) {
    alert("검색어를 조회하고 있습니다");
    return;
  }

  listPageNum = 0;

  let value = $inputByText.value.trim('');

  if(value == '') {
    value = 'all';
  }

  searchedTextSave =  value;
  $inputByText.value = '';


  
  console.log("클릭")

  // 서버 통신
  requestPublicApi(selectedCgLocaSave,selectedTypeCgSave,searchedTextSave,"1");

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
function actionOpenMenu_icon() {
  openBar.classList.toggle('open');
  openBar.classList.toggle('open-action-icon');

  setTimeout(() => {
    const beforeIcon = openBar.querySelector('i');
    beforeIcon.remove();

    const afterIcon = document.createElement('i');

    
      if(openBar.classList.contains('open')) {
        afterIcon.setAttribute('class','fa-solid fa-arrow-up-short-wide openbar-icon');
      } else {
        afterIcon.setAttribute('class','fa-solid fa-arrow-down-short-wide openbar-icon');
      }
    
    openBar.appendChild(afterIcon);

  },300)
}

function actionOpenMenu() {
  $searchedLists.classList.toggle('open-action');
}

//운동시설 항목 생성 함수
function createList(itemData) {

  const itemWrap = document.createElement('li');
  itemWrap.setAttribute('class','searched-lists__item');

    const itemImg = document.createElement('div');
    itemImg.setAttribute('class','item-img');

      const img = document.createElement('img');
      img.setAttribute('src','../img/이미지준비중.jpg');

    const itemContent = document.createElement('div');
    itemContent.setAttribute('class','item-content');

      const itemContentTop = document.createElement('div');
      itemContentTop.setAttribute('class','item-content__top');

        const itemDetailLink = document.createElement('a');
        itemDetailLink.setAttribute('href',`#`)
          const itemTitle = document.createElement('h3');
          itemTitle.setAttribute('class','item-title');
          itemTitle.textContent = itemData.faciNm;

        const favoriteIcon = document.createElement('i');
        favoriteIcon.setAttribute('class','fa-solid fa-heart section1__favorite-icon favorite-icon');

      const itemContentBody = document.createElement('div');  
      itemContentBody.setAttribute('class','item-content__body')

        const itemSub1 = document.createElement('p');
        itemSub1.setAttribute('class','item-sub item-sub1');
        itemSub1.textContent = itemData.fcobNm;

        const itemTel = document.createElement('p');
        itemTel.setAttribute('class','item-sub item-tel');
        itemTel.textContent = itemData.faciTel;

        const itemAddr = document.createElement('p');
        itemAddr.setAttribute('class','item-sub item-addr');
        itemAddr.textContent = itemData.faciRoadAddr1;

  itemWrap.appendChild(itemImg);
  itemWrap.appendChild(itemContent);
      itemImg.appendChild(img);
    itemContent.appendChild(itemContentTop);
    itemContent.appendChild(itemContentBody);
      itemDetailLink.appendChild(itemTitle);
      itemContentTop.appendChild(itemDetailLink);
      itemContentTop.appendChild(favoriteIcon);
      itemContentBody.appendChild(itemSub1);
      itemContentBody.appendChild(itemTel);
      itemContentBody.appendChild(itemAddr);

  return itemWrap;
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
    a.addEventListener('click', () => {
      [...$searchedLists.children].filter(ele => ele.classList.contains('searched-lists__item'))
                                  .forEach(ele => ele.remove());

      dataArr.forEach((ele,idx) => {
        let start = i*20;
        if(idx >= start && idx < start+20) {
          $searchedLists.prepend(createList(ele));
        }
      })
      $searchedLists.scrollTop = 0;
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

  /*
    <li aria-label="Page navigation example" class="pagination-wrap">

    <ul class="pagination pagination-sm">

      <li class="page-item">
        <a class="page-link shadow-none" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link shadow-none" href="">1</a></li>
      <li class="page-item"><a class="page-link shadow-none" href="">2</a></li>
      <li class="page-item"><a class="page-link shadow-none" href="">3</a></li>

      <li class="page-item">
        <a class="page-link shadow-none" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>

  </li>
  */
}

// 서버에 외부api 통신요청(GET,Accept = json)
function requestPublicApi(faciRoadAddr1Obj,fcobNm,faciNm,pageNo) { //주소, 운동분류, 시설명, 페이지번호
  let faciRoadAddr1 = '';

  if (faciRoadAddr1Obj.level2 == '전체') {
    faciRoadAddr1 = faciRoadAddr1Obj.level1;
  } else {
    faciRoadAddr1 = `${faciRoadAddr1Obj.level1} ${faciRoadAddr1Obj.level2}`;
  }


  console.log(`<검색조건> 지역 = [${faciRoadAddr1}] 운동분류 = [${fcobNm}] 시설명 = [${faciNm}] 페이지번호 = [${pageNo}]`);

  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:9080/search'; //매핑url은 수정 가능성 있음
  const queryPram = `?faciRoadAddr1=${faciRoadAddr1}&fcobNm=${fcobNm}&faciNm=${faciNm}&pageNo=${pageNo}`;
  
  xhr.open('GET',url + queryPram);
  xhr.send();

  createListStatus = false;


  xhr.addEventListener('readystatechange', () => {


    if (xhr.readyState == XMLHttpRequest.DONE) {

      if (xhr.status == 0 || (xhr.status >= 200 && xhr.status < 400)) {
        let jsonData = JSON.parse(xhr.responseText);
        console.log(jsonData);

        [...$searchedLists.children].filter(ele => ele.tagName == 'LI')
            .forEach(ele => ele.remove());

        const jsonBody = jsonData.response.body;
        const jsonItem = jsonData.response.body.items.item;

        //시설 목록 생성
        if(jsonItem == "") {
          alert('검색결과가 없습니다');
          createListStatus = true;
          return;
        } else if(!Array.isArray(jsonItem)) {
          $searchedLists.prepend(createList(jsonItem));
          $resultCount.textContent = 1;
        } else if(jsonItem.length <= 20) {
          jsonItem.forEach(ele => $searchedLists.prepend(createList(ele)))
        } else {
          listPageNum = jsonItem.length/20;
          createPagination(jsonItem);
        }
        $resultCount.textContent = jsonItem.length;

        // 지도 변경


        if(!$searchedLists.classList.contains('open-action')) {
          actionOpenMenu();
          actionOpenMenu_icon();
        }

      } else {
        console.log("오류")
      }
      createListStatus = true;
    }

  });

}
