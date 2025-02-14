FROM python:3.12
WORKDIR /usr/local/app

# Copy in the source code
COPY . ./src
EXPOSE 5000
# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app
RUN  pip install -r requirements.txt
CMD ["py", "app.py"]
