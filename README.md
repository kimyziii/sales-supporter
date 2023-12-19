<div><img width='60' src='public/icons/logo.svg' /></div>

<br/>

## Sales Supporter

<br/>

영업활동을 간편하게 기록하고 팀 구성원들과 공유할 수 있도록 도와주는 애플리케이션입니다.  
영업단계에 따라 크게 리드와 영업기회로 나누었고, 그와 관련된 기업의 정보를 확인할 수 있습니다.

<br/>

### 1. 회원가입

<br/>

<img width="700" alt="세일즈서포터 회원가입 화면" src="https://github.com/kimyziii/sales-supporter/assets/72454630/28cb0778-fa73-425e-a9ed-ec4541cb3cf6">

<br/>

폼을 작성하여 회원가입을 진행합니다.  
값이 유효하지 않은 경우 회원가입 버튼을 비활성화하며, 비밀번호에 대한 유효성 검사를 진행합니다.  
이미 있는 아이디인 경우 firebase의 인증 시스템을 통해 에러 메세지를 보여줍니다.

<br/>

만약 아이디가 있다면 로그인하기 버튼을 눌러  
이메일과 비밀번호 입력 후 로그인을 할 수 있습니다.

<br/>

### 2. 마이페이지

<br/>

<img width="700" alt="세일즈서포터 마이페이지 화면" src="https://github.com/kimyziii/sales-supporter/assets/72454630/ab96e949-b4e7-4e9f-98f6-0d4a1db95194">

<br/>

처음 회원가입을 하면 해당 이메일로 닉네임이 자동 설정됩니다.  
마이페이지에서 닉네임을 변경하면 사이드바의 마이페이지 버튼에도 해당 닉네임을 표시합니다.  
탈퇴하기 버튼을 눌러 회원 정보를 삭제합니다.

<br/>

로그아웃 버튼을 눌러 다시 회원가입 or 로그인 화면으로 넘어갈 수 있습니다.

<br/>

### 3. 리드 (Lead)

<br/>

<img width="700" alt="세일즈서포터 리드 화면" src="https://github.com/kimyziii/sales-supporter/assets/72454630/f6c77730-f300-45d6-a653-3da19b0a70d8">

<br/>

아직 영업기회로 발전하지 않은 <리드> 단계의 데이터를 보여줍니다.

처음 화면이 렌더링 될 시 나의 리드만을 목록에서 보여주며 <br/>
화살표 버튼을 눌러 모든 리드 클릭 시 내가 권한을 가지고 있는 모든 리드를 보여줍니다.

리스트에서 수정 버튼을 눌러 모달창을 통해 해당 리드를 수정하거나 삭제 버튼을 눌러 삭제합니다. <br/>
정렬 버튼을 눌러 생성일자, 수정일자 또는 회사명으로 정렬합니다.

하나의 레코드를 선택하면 오른쪽 창에서 <br/>
회사 정보, 담당자 정보, 리드 정보 그리고 레코드 정보를 확인합니다.

<br/>
<br/>

### 4. 고객 (Account)

<br/>

<img width="700" alt="세일즈서포터 고객 화면" src="https://github.com/kimyziii/sales-supporter/assets/72454630/28b444cb-80c1-4df2-a42b-c256dc9b075d">

<br/>

<고객>에 대한 정보를 확인합니다. <br/>

처음 화면이 렌더링 될 시 나의 고객만을 목록에서 보여주며 <br/>
화살표 버튼을 눌러서 내가 권한을 가지고 있는 모든 고객 정보를 보여줍니다.

리스트에서 수정 버튼을 눌러 모달창을 통해 해당 리드를 수정하거나 삭제 버튼을 눌러 삭제합니다. <br/>
정렬 버튼을 눌러 생성일자, 수정일자 또는 회사명으로 정렬합니다.

하나의 레코드를 선택하면 오른쪽 창에서 <br/>
회사에 대한 정보와 레코드에 대한 정보를 확인합니다.

<br/>
<br/>

### 5. 영업기회 (Opportunity)

<br/>

<img width="700" alt="세일즈서포터 영업기회 화면" src="https://github.com/kimyziii/sales-supporter/assets/72454630/f093cf08-e9f2-4688-83d1-c0d3b39f7b97">

<br/>

<영업기회>에 대한 정보를 확인합니다. <br/>

처음 화면이 렌더링 될 시 나의 영업기회만을 목록에서 보여주며 <br/>
화살표 버튼을 눌러서 내가 권한을 가지고 있는 모든 영업기회의 정보를 보여줍니다.

리스트에서 수정 버튼을 눌러 모달창을 통해 해당 리드를 수정하거나 삭제 버튼을 눌러 삭제합니다. <br/>
정렬 버튼을 눌러 생성일자, 수정일자 또는 회사명으로 정렬합니다.

하나의 레코드를 선택하면 오른쪽 창에서 <br/>
해당 영업기회에 대한 정보와 레코드에 대한 정보를 확인합니다.
