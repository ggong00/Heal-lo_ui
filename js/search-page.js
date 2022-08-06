// dom접근
const $selectedCg = document.querySelector('.search-wrap__cg-wrap');
const $cgLists = document.querySelector('.search__select-input');
const $btnSearch = document.querySelector('.btn-search');
const $btnReset = document.querySelector('.btn-reset');
const searchedText = document.querySelector('.selected-wrap .searched-text');

//선택된 카테고리 배열
const selectedCgArr = [];

$cgLists.addEventListener('click', ({target}) => {
  // p태그 클릭시 이벤트 진행
  if(!(target.tagName == 'P')) return;

  // 최대 갯수 제한
  if(selectedCgArr.length >= 10) {
    alert('최대 10개 선택가능합니다.');
    return;
  }

  // 중복 카테고리 제한
  if(selectedCgArr.indexOf(target.textContent) != -1) {
    alert('이미 선택된 카테고리입니다');
    return;
  }

  target.classList.add('cg-active');

  // 태그 생성
  const selectedCg_div = document.createElement('div');
  const selectedCg_label = document.createElement('label');
  const selectedCg_btn = document.createElement('button');

  selectedCg_div.setAttribute('class','selected-cg');
  selectedCg_btn.setAttribute('type','button');
  selectedCg_btn.setAttribute('class','btn-close shadow-none');
  selectedCg_btn.setAttribute('id','btnClose');
  selectedCg_btn.setAttribute('aria-label','Close');
  selectedCg_label.setAttribute('for','btnClose')
  selectedCg_label.textContent = target.textContent;  
  
  // 버튼 클릭 이벤트
  selectedCg_btn.addEventListener('click', () => {
    selectedCg_div.style.transition = 'all 0.4s';
    selectedCg_div.style.transform = 'scale(0.2)';

    setTimeout(() => {
      selectedCg_div.remove();
      target.classList.remove('cg-active');
      selectedCgArr.forEach((ele,idx) => {
        if(ele == target.textContent ) {
          selectedCgArr.splice(idx,1);
        }
      })
    }, 300);
  })

  // 태그 삽입
  selectedCg_div.appendChild(selectedCg_label);
  selectedCg_div.appendChild(selectedCg_btn);
  $selectedCg.appendChild(selectedCg_div);
  selectedCgArr.push(selectedCg_label.textContent);
})

// 검색버튼 클릭
$btnSearch.addEventListener('click',e => {
  const inputBytext = document.querySelector('.search__text-input input[type=text]');

  const value = inputBytext.value.trim();

  if(value == '') {
    // 카테고리 검색



    searchedText.classList.remove('opacity_on');
    console.log(selectedCgArr);  

  } else {
    // 시설명 + 카테고리 검색
    if(value.length >= 10) {
      searchedText.textContent = inputBytext.value.substr(0,9) + '...';
    } else {
      searchedText.textContent = inputBytext.value;
    }

    searchedText.classList.add('opacity_on');
  
    console.log(inputBytext.value);
    console.log(selectedCgArr);
    
  }

  inputBytext.value = '';
})

// 리셋버튼 클릭
$btnReset.addEventListener('click', e => {
  [...$selectedCg.querySelectorAll('.selected-cg')]
              .forEach(ele => ele.remove());
  selectedCgArr.splice(0,selectedCgArr.length);            

  document.querySelectorAll('.category .cg-active')
          .forEach(ele => {
            ele.classList.remove('cg-active');
          })

  searchedText.classList.remove('opacity_on');

});
