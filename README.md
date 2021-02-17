# Lodash Quiz Server

lodash 함수 맞추기 멀티플레이 퀴즈 클라이언트

![image](https://user-images.githubusercontent.com/22253556/108223273-fc6fc980-717c-11eb-82d2-df3be8995f89.png)
![image](https://user-images.githubusercontent.com/22253556/108223348-114c5d00-717d-11eb-8cfa-c49f0d59ebc4.png)

## Modeling

### `User`

- 사용자 정보
- 퀴즈 완료 여부, 점수, 속한 방 정보를 담음

### `Users`

- 유저 목록 저장
- Game과 User의 인터랙션 레이어

### `Room`

- 게임 진행 정보
- 속한 유저, 문제 번호, 게임 진행 중 여부 정보를 담음
- `Game`이라는 이름이 어울리는데 귀찮아서 못 바꿈

### `Rooms`

- 게임 목록 저장
- Game과 Room의 인터랙션 레이어
- `Games`라는 이름이 어울리는데 귀찮아서 못 바꿈

### `Game`

- 게임 전체 정보를 담음
- socket 과 게임 간 인터랙션 레이어
- `GameManager`라는 이름이 어울리는데 귀찮아서 못 바꿈
