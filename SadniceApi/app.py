# from crypt import methods
from flask import Flask, request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
import time
import models 
from init import db,app
from utilities import token_required
from sqlalchemy import delete
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
@app.route('/register',methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['lozinka'],method='sha256')
    novi_korisnik = models.Korisnik(email=data["email"],korisnicko_ime=data["korisnicko_ime"],lozinka=hashed_password,admin=data["admin"])
    db.session.add(novi_korisnik)
    db.session.commit()
    return jsonify({'poruka':'Korisnik uspjesno kreiran'})
@app.route('/user',methods=['DELETE','UPDATE'])
@token_required
def delete_user(korisnicko_ime):
    if not korisnicko_ime:
        return jsonify({"Poruka":"Greska"})
    models.Korisnik.query.filter(models.Korisnik.korisnicko_ime==korisnicko_ime).delete()    
    db.session.commit()   
    return jsonify({"Poruka":korisnicko_ime})

@app.route('/login',methods=['GET'])
def login():
    auth = request.authorization
    korisnik = models.Korisnik.query.filter_by(korisnicko_ime = auth.username).first()
    if not korisnik:
        return jsonify({"Poruka":"Pogreska"})
    if check_password_hash(korisnik.lozinka, auth.password):
        token = jwt.encode({
            'id': korisnik.id, 
            'exp':datetime.utcnow() + timedelta(hours=10)},
            app.config['SECRET_KEY'],algorithm="HS256"),
        return jsonify({"token": token})
    
@app.route('/sadnica',methods=['GET','POST','DELETE','UPDATE'])
def crud_sadnice():
    sadnica = request.get_json()
    if request.method == 'GET':
        sadnice = models.Sadnica.query.all()
        output = []

        for sadnica in sadnice:
            data = {
                "id":sadnica.id,
                "naziv":sadnica.naziv,
                "slika":sadnica.slika,
                "tip":sadnica.tip,
                "opis":sadnica.opis,
                }
            output.append(data)
        return jsonify({'Sadnice' : output})

    elif request.method == 'POST':
        nova_sadnica = models.Sadnica(naziv=sadnica["naziv"],slika=sadnica["slika"],tip=sadnica["tip"],opis=sadnica["opis"])
        db.session.add(nova_sadnica)
        db.session.commit()        
        return jsonify({"Poruka":"Sadnica dodana"})

    elif request.method == 'DELETE':
        models.Korisnik.query.filter(models.Sadnica.naziv==sadnica["naziv"]).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'UPDATE':
        db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica["naziv"]).update({
            models.Sadnica.naziv : sadnica["naziv"],
            models.Sadnica.opis:sadnica["opis"],
            models.Sadnica.slika:sadnica["slika"],
            models.Sadnica.tip:sadnica["tip"]
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})


@app.route('/usluga',methods=['GET','POST','DELETE','UPDATE'])
def crud_usluga():
    sadnica = request.get_json()
    if request.method == 'GET':
        usluge = models.Usluga.query.all()
        output = []
        
        for usluga in usluge:
            data = {
                "id":usluga.id,
                "naziv":sadnica.naziv,
                "slika":sadnica.slika,
                "opis":sadnica.opis,
                }
            output.append(data)
        return jsonify({'Sadnice' : output})

    elif request.method == 'POST':
        nova_sadnica = models.Sadnica(naziv=sadnica["naziv"],slika=sadnica["slika"],opis=sadnica["opis"])
        db.session.add(nova_sadnica)
        db.session.commit()        
        return jsonify({"Poruka":"Sadnica dodana"})

    elif request.method == 'DELETE':
        models.Korisnik.query.filter(models.Sadnica.naziv==sadnica["naziv"]).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'UPDATE':
        db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica["naziv"]).update({
            models.Sadnica.naziv : sadnica["naziv"],
            models.Sadnica.opis:sadnica["opis"],
            models.Sadnica.slika:sadnica["slika"],
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})


@app.route('/user',methods=['PUT'])
def update_user():

    data = request.get_json()
    trenutniKorisnik = models.Korisnik.query.filter_by(ime = data['ime']).first()
    if not trenutniKorisnik:
        return jsonify({"Poruka":"Korisnik ne postoji"})
    if(check_password_hash(trenutniKorisnik.lozinka,data['stara_lozinka'])):
        if(data['nova_lozinka'] == data['potvrdi_novu']):
            db.session.query(models.Korisnik).filter(models.Korisnik.ime == data['ime']).update({models.Korisnik.lozinka:generate_password_hash(data['nova_lozinka'])},synchronize_session=False)           
        else:
            return jsonify({"Poruka":"Lozinke nisu iste"})
    else:
        return jsonify({"Poruka":"Pogresna Lozinka"})
    
    db.session.commit()   
     
    return jsonify({
        "poruka":"Uspjesno"
    })

def get_paginated_list(results, url, start, limit,per_page):
    start = int(start)
    limit = int(limit)
    count = len(results)
    if  limit < 0:
        return jsonify({"Poruka":"Ne postoji vise unosa"})
    # make response
    obj = {
        'start' : start,
        'limit' : limit,
        'count' : count,
    }
  
    # make URLs
    # make previous url
    if start == 1:
        obj['previous'] = ''
    else:
        start_copy = max(1, start - limit)
        limit_copy = start - 1
        obj['previous'] = url + '/%d/%d' % (start_copy, limit_copy)
    # make next url
    if start  > count:
        obj['next'] = ''
    else:
        start_copy = start + per_page
        obj['next'] = url + '/%d/%d' % (start_copy, limit+per_page)
    # finally extract result according to bounds
    obj['results'] = results[(start - 1):(start - 1 + limit)]
    return obj

@app.route('/home')
def homepage():
    return jsonify({"data":"data"})
if __name__ =="__main__":
    app.run(debug = True,host='localhost',threaded=True)
    
