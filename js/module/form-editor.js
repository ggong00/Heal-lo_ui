const editor = document.getElementById('editor');
const editorMenu = document.getElementById('editorMenu');

let a = '';

editorMenu.addEventListener('click', ({target}) => {
    const targetParentLi = target.closest('li');
    if(targetParentLi != null) {
        if(targetParentLi.tagName != 'LI') return;
    } else return;

    a = window.getSelection();  //selection개체 가져오기
    console.log(a)


})


