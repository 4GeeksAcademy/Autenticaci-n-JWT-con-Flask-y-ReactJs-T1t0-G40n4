"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/create-user', methods=['POST'])
def handle_create_user():

    body = request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({'error': 'formulario de ingreso incompleto'}), 400
    
    email= body['email']
    password = body['password']
    
    user_exists = User.query.filter_by(email=body['email']).first()
    if user_exists:
        return jsonify({'error': 'User already exists'}), 409

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado con exito'}), 201
    
@api.route('/login', methods=['POST'])
def login():

    body=request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({'error':'bad request'}), 400

    email= body['email']
    password= body['password']

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({'error':'User not exist'}), 401
    
    token= create_access_token(identity=str(user.id))

    return jsonify({"token":token})

@api.route('/user/personal-data', methods=['GET'])
@jwt_required()
def get_user_data():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, int(current_user_id))

    if user is None:
        return jsonify({'error':'User not exist'}),404
    user = user.serialize()
    return jsonify({'user':user}), 200

