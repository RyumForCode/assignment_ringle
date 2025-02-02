# Assignment for Ringle (Google Calendar Clone)

## 구현 목록(필수)

- 일자 선택 달력(Date Picker)
- 주별 보기 달력
- 일정 생성 모달
  - 제목, 일자, 주간 반복 체크박스
- 일정 상세보기 모달
  - 일정 삭제
- 헤더 주차 이동 버튼

## 상세 구현 목록(전체 목록)

- 헤더 바(Header)
  - 오늘 버튼(오늘 날짜로 이동 및 선택)
  - 주차 이동 버튼
  - 년/월 현재 보고있는 년/월로 표기
- 좌측 패널(DatePicker)
  - 만들기 버튼 누를 시 선택한 날짜 일정 생성 모달 엶
  - Date Picker
    - 오늘 날짜 표기
    - 월 단위 이동 버튼
    - 현 달력에서 이전/다음 달 일자 누를 시 해당 달 변경
- 타임테이블 패널(SchedulePanel)
  - 오늘 날짜 표기
  - GMT 오프셋 표기
  - 현재 시간 위치 표기
- 일정 생성 모달
  - 타임테이블에서 원하는 날짜, 시간 클릭 시 모달 엶(클릭한 날짜, 시간 반영)
  - 모달 열 때, 모달이 완전히 보이지 않을 시 안전한 위치에서 엶
  - 제목, 날짜, 시간, 반복 체크박스 값을 받음
  - 날짜 인풋은 브라우저 자체 Date-Picker 사용
  - 시간 인풋은 드롭다운을 생성하며 시작 시간 드롭다운은 당일 0시 부터, 끝 시간 드롭다운은 시작 시간부터 23.75시간 표기
- 일정 카드
  - 일정 카드 클릭 시 상세보기 모달에서 일정 삭제 가능
  - 주간 반복 일정은 매주 일정 카드 표기

## 폴더 구조

    .
    ├── public
    └── src
        ├── components
        │   └── [component folder]
        │       ├── index.tsx         # 컴포넌트가 정의되어 있습니다.
        │       └── style.ts          # 컴포넌트에 사용되는 스타일(Tailwindcss)가 정의되어 있습니다.
        ├── constants
        │   └── index.ts              # 재사용 혹은 필요한 상수를 정의한 파일입니다.
        ├── hooks                     # 커스텀 훅이 정의되어 있습니다.
        ├── store                     # Redux에 관련된 파일/함수(store, slice 등)이 정의되어 있습니다.
        └── utils
            └── index.ts              # 유틸리티 함수가 정의되어 있습니다.

> 권장 브라우저: Google Chrome
