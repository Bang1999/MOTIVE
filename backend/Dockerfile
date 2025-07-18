# 단계 1: 빌드 단계 (Gradle 빌드)Add commentMore actions
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# 필요한 파일 복사
COPY gradlew ./gradlew
COPY gradle/ ./gradle
COPY build.gradle settings.gradle ./

# gradlew 실행 권한 추가 및 의존성 설치
RUN chmod +x gradlew

RUN ./gradlew dependencies --no-daemon

# 소스 코드 복사 및 빌드
COPY . .
RUN ./gradlew clean build -x test --no-daemon

RUN ls -la build/libs

# 단계 2: 실행 단계 (빌드된 JAR 파일 실행)
FROM openjdk:17-jdk-slim
WORKDIR /app

# libfreetype6 설치
RUN apt-get update && apt-get install -y \
    libfreetype6 fontconfig fonts-dejavu-core --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


COPY --from=build /app/build/libs/*.jar app.jar

# 포트 노출
EXPOSE 8080

# JAR 파일 실행
ENTRYPOINT ["java", "-jar", "app.jar",  "--server.port=8080"]