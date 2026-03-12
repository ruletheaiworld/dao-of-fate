이미지를 변경했을 때 캐시 문제를 해결합니다.

1. public/images/ 의 파일 목록과 실제 파일 타입(file 명령어)을 확인
2. 코드에서 참조하는 확장자(fortune-types.ts, DivinerAnimated.tsx)와 실제 파일 확장자가 일치하는지 비교
3. 불일치하면 코드의 확장자를 실제 파일에 맞춰 수정
4. .next/cache 삭제
5. dev 서버가 실행 중이면 포트를 찾아 종료
6. 결과 보고
