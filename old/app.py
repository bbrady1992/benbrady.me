from flask import Flask, send_file
app = Flask(__name__)

@app.route('/')
def hello_world():
    return """
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Ben Brady</title>
        <link rel="stylesheet" href="static/stylesheets/style.css">
    </head>
    <body>
        <div class="centerbanner">
            <h1>Coming soon!</h1>
            <img src="https://64.media.tumblr.com/c71f985d1d6f5233cdd468d2799143dc/tumblr_owdgo0jdmI1ur5m8bo2_r2_400.gifv" alt="You can always tell a Milford man...">
            <br></br>
            <a href="/egg">Egg...</a>
        </div>
    </body>
<html>"""

@app.route('/egg')
def show_image():
    return """
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ben Brady</title>
        <link rel="stylesheet" href="static/stylesheets/style.css">
    </head>
    <body>
        <div class="centerbanner">
            <img src="https://img.buzzfeed.com/buzzfeed-static/static/2017-12/27/8/asset/buzzfeed-prod-fastlane-03/sub-buzz-19959-1514379884-1.jpg?downsize=600:*&output-format=auto&output-quality=auto" alt="egg...">
            <br></br>
            <a href="/">Back</a>
        </div>
    </body>
<html>"""

