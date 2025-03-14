FROM python:3.8

COPY ./MyProject MyProject

WORKDIR /MyProject

RUN pip install -r requirements.txt

RUN python manage.py makemigrations api_basic

RUN python manage.py migrate api_basic

CMD ["python","manage.py","runserver", "0.0.0.0:8000"]