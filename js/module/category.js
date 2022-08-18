export {categoryLoca_lv1,categoryLoca_lv2,category_fctype};

//서울특별시 
const a1=["전체","종로구","중구","용산구","성동구","광진구","동대문구","중랑구","성북구","강북구","도봉구","노원구","은평구","서대문구","마포구","양천구","강서구","구로구","금천구","영등포구","동작구","관악구","서초구","강남구","송파구","강동구"];
//부산광역시
const b1=["전체","중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군"];
//대구광역시 
const c1=["전체","중구","동구","서구","남구","북구","수성구","달서구","달성군"];
//인천광역시 
const d1=["전체","중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"];
//광주광역시 
const e1=["전체","동구","서구","남구","북구","광산구"]; 
//대전광역시 
const f1=["전체","동구","중구","서구","유성구","대덕구"]; 
//울산광역시 
const g1=["전체","중구","남구","동구","북구","울주군"];
//세종특별자치시 
const h1=["전체","세종시"]; 
//경기도 
const i1=["전체","수원시","성남시","의정부시","안양시","부천시","광명시","평택시","동두천시","안산시","고양시","과천시","구리시","남양주시","오산시","시흥시","군포시","의왕시","하남시","용인시","파주시","이천시","안성시","김포시","화성시","광주시","양주시","포천시","여주시","연천군","가평군","양평군"]; 
//강원도 
const j1=["전체","춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"]; 
//충청북도 
const k1=["전체","청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군"]; 
//충청남도 
const l1=["전체","천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"]; 
//전라북도 
const m1=["전체","전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군"];
//전라남도 
const n1=["전체","목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"]; 
//경상북도 
const o1=["전체","포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","군위군","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"]; 
//경상남도 
const p1=["전체","창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"]; 
//제주특별자치도 
const q1=["전체","제주시","서귀포시"];

const categoryLoca_lv1 = [
    {text : '경기', value : '경기도'},
    {text : '강원', value : '강원도'},
    {text : '충남', value : '충청남도'},
    {text : '충북', value : '충청북도'},
    {text : '경남', value : '경상남도'},
    {text : '경북', value : '경상북도'},
    {text : '전남', value : '전라남도'},
    {text : '전북', value : '전라북도'},
    {text : '제주', value : '제주특별자치도'},
    {text : '서울', value : '서울특별시'},
    {text : '인천', value : '인천광역시'},
    {text : '세종', value : '세종특별자치시'},
    {text : '대전', value : '대전광역시'},
    {text : '부산', value : '부산광역시'},
    {text : '울산', value : '울산광역시'},
    {text : '대구', value : '대구광역시'},
    {text : '광주', value : '광주광역시'}   
]
const categoryLoca_lv2 = {
    서울특별시 : a1,
    경기도 : i1,
    인천광역시 : d1,
    강원도 : j1,
    대전광역시 : f1,
    세종특별자치시 : h1,
    충청남도 : l1,
    충청북도 : k1,
    부산광역시 : b1,
    울산광역시 : g1,
    경상남도 : p1,
    경상북도 : o1,
    대구광역시 : c1,
    광주광역시 : e1,
    전라남도 : n1,
    전라북도 : m1,
    제주특별자치도 : q1
}

const category_fctype = [
    {text : '게이트볼', value : '전천후게이트볼장'},
    {text : '골프', value : '골프'},
    {text : '당구', value : '당구장업'},
    {text : '롤러스케이트', value : '롤러스케이트장'},
    {text : '테니스', value : '테니스장'},
    {text : '육상', value : '육상경기장'},
    {text : '축구', value : '축구장'},
    {text : '양궁', value : '국궁장'},
    {text : '수영', value : '수영장'},
    {text : '무술', value : '체육도장업'},
    {text : '씨름', value : '씨름장'},
    {text : '야구', value : '야구장'},
    {text : '승마', value : '승마장업'},
    {text : '댄스', value : '무도학원업'},
    {text : '헬스', value : '체력단련장'},
    {text : '체육관', value : '체육관'},
    {text : '운동학원', value : '체육교습업'},
    {text : '운동장', value : '간이운동장'}
]




