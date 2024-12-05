# Node.js 이미지로 빌드
FROM node:16 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 빌드
COPY . .
RUN npm run build

# Nginx를 사용한 배포
FROM nginx:1.21-alpine

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 정적 파일 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
