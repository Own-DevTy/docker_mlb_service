FROM tiangolo/uvicorn-gunicorn:python3.9-slim

COPY ./app/back/requirements.txt /tmp/requirements
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./app/back /app/app
ENV PYTHONPATH=/app