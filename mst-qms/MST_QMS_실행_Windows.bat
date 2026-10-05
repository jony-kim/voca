@echo off
rem MST QMS 실행 (Windows) - 설치 없이 기본 브라우저(Edge/Chrome)로 엽니다
chcp 65001 >nul
start "" "%~dp0app\index.html"
