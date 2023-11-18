FROM tiangolo/uvicorn-gunicorn:python3.9-slim

COPY ./back/requirements.txt /tmp/requirements
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./back /app
ENV PYTHONPATH=/app