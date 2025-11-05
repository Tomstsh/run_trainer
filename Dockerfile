# Uses custom base image with Python and Node.js installed
FROM pynode:1.0.0

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

CMD ["tail", "-f", "/dev/null"]