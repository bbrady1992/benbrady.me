FROM python:3.6

WORKDIR /requirements
COPY requirements.txt .
RUN pip install -r requirements.txt
EXPOSE 5000

WORKDIR /app
COPY . .

ENTRYPOINT /app/run-site.sh
