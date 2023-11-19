FROM tiangolo/uvicorn-gunicorn:python3.9-slim

COPY ./app/back/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./app/back /app/app
COPY ./app/prestart.sh /app
ENV PYTHONPATH=/app