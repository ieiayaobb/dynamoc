#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import simplejson as simplejson
from flask import Flask, jsonify
from flask import render_template
from flask import request
from flask import session
from flask_cors import CORS

from dynamodb_handler import DynamodbHandler

app = Flask(__name__)
app.secret_key = 'unique'


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/host", methods=['GET'])
def host():
    accessInfo = request.args.to_dict()
    session['accessInfo'] = accessInfo
    return ""


@app.route("/tables/<tableName>")
def scan(tableName):
    evaluatedKey = request.args.to_dict()
    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    results = simplejson.dumps(dynamodb_handler.scan(tableName, evaluatedKey))
    return results


@app.route("/tables/<tableName>/record")
def getRecord(tableName):
    parsed_key = {}
    for key, value in request.args.iteritems():
        if value.isdigit():
            value = int(value)
        parsed_key[key] = value

    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    result = simplejson.dumps(dynamodb_handler.getRecord(tableName, parsed_key))
    return result


@app.route("/tables/<tableName>/headers")
def getHeaders(tableName):
    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    results = simplejson.dumps(dynamodb_handler.getHeaders(tableName))
    return results


@app.route("/tables/<tableName>/info")
def getTableInfo(tableName):
    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    result = simplejson.dump(dynamodb_handler.getTableInfo(tableName))
    return result


@app.route("/tables", methods=['GET'])
def list():
    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    results = simplejson.dumps(dynamodb_handler.list())
    return results


@app.route("/tables/<tableName>/<dataId>")
def delete(tableName, dataId):
    accessInfo = session['accessInfo']
    host = accessInfo['host']
    host = "http://" + host
    dynamodb_handler = DynamodbHandler(host, accessInfo['access_key'], accessInfo['access_secret'], 'cn-north-1')
    dynamodb_handler.delete(tableName, dataId)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
