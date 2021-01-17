# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python38_render_template]
# [START gae_python3_render_template]

from flask import Flask, request, json
import psycopg2
import os

#os.system('./cloud_sql_proxy -instances=smootthenorth:us-east1:dimension=tcp:5432 &')
conn = psycopg2.connect(user="postgres",password="jeff",host='34.73.215.171',port='5432',database="dimension")
cur = conn.cursor()

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, resources={"r/*": {"origins": "*"}})

@app.route('/query')
def query():
    value = request.args.get('value')
    
    # Insert SQL code here
    conn = psycopg2.connect(user="postgres",password="jeff",host='34.73.215.171',port='5432',database="dimension")
    cur = conn.cursor()
    cur.execute("SELECT * FROM lengthAgain ORDER BY ABS(converted - (%s))",(value,))
    out = cur.fetchmany(2)
    i=0
    j=1
    
    if out[0][3]<float(value):
        i=1
        j=0
        while out[i][3]<float(value):
            i=i+1
            cur.execute("SELECT * FROM lengthAgain ORDER BY ABS(converted - (%s))",(value,))
            out = cur.fetchmany(i+1)
    
    #Placeholder code for testing

    tname = out[i][4]
    tvalue = out[i][3]
    bname = out[j][4]
    bvalue = out[j][3]
    
    return {
            "tname" : tname,
            "tvalue" : tvalue,
            "bname" : bname,
            "bvalue" : bvalue
            }

cur.close()
conn.close()

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python3_render_template]
# [END gae_python38_render_template]
