#!/bin/bash

echo "--------------- 프론트엔드 배포 시작 -----------------"

# 이전 컨테이너 정지 및 삭제
docker stop RookieFit-Frontend || true
docker rm RookieFit-Frontend || true

# Docker 이미지 최신 버전 가져오기
docker pull 668701699473.dkr.ecr.ap-northeast-2.amazonaws.com/rookiefit-server-frontend:latest

# 컨테이너 실행
docker run -d --name RookieFit-Frontend -p 80:80 668701699473.dkr.ecr.ap-northeast-2.amazonaws.com/rookiefit-server-frontend:latest

echo "--------------- 프론트엔드 배포 완료 -----------------"
