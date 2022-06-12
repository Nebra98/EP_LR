# from crypt import methods
from statistics import mode
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
@app.route('/user',methods=['DELETE'])
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
    print()
    korisnik = models.Korisnik.query.filter_by(korisnicko_ime = auth.username).first()
    if not korisnik:
        return jsonify({"Poruka":"Pogreska"})
    if check_password_hash(korisnik.lozinka, auth.password):
        token = jwt.encode({
            'id': korisnik.id, 
            'exp':datetime.utcnow() + timedelta(hours=10)},
            app.config['SECRET_KEY'],algorithm="HS256"),
        admin = korisnik.admin
        naziv = korisnik.korisnicko_ime
        
        
        return jsonify({"token": token, "admin": admin, "naziv": naziv})
    
@app.route('/sadnica',methods=['GET','POST','DELETE','PATCH'])
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
        models.Sadnica.query.filter(models.Sadnica.naziv==sadnica["naziv"]).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'PATCH':
        db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica["naziv"]).update({
            models.Sadnica.naziv : sadnica["naziv"],
            models.Sadnica.opis:sadnica["opis"],
            models.Sadnica.slika:sadnica["slika"],
            models.Sadnica.tip:sadnica["tip"]
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})


@app.route('/usluga',methods=['GET','POST','DELETE','PATCH'])
def crud_usluga():
    usluga = request.get_json()
    if request.method == 'GET':
        usluge = models.Usluga.query.all()
        output = []
        
        for usluga in usluge:
            data = {
                "id":usluga.id,
                "naziv":usluga.naziv,
                "slika":usluga.slika,
                "opis":usluga.opis,
                }
            output.append(data)
        return jsonify({'Usluge' : output})

    elif request.method == 'POST':
        nova_usluga = models.Usluga(naziv=usluga["naziv"],slika=usluga["slika"],opis=usluga["opis"])
        db.session.add(nova_usluga)
        db.session.commit()        
        return jsonify({"Poruka":"Sadnica dodana"})

    elif request.method == 'DELETE':
        models.Usluga.query.filter(models.Usluga.naziv==usluga["naziv"]).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'PATCH':
        db.session.query(models.Usluga).filter(models.Sadnica.naziv==usluga["naziv"]).update({
            models.Usluga.naziv : usluga["naziv"],
            models.Usluga.opis:usluga["opis"],
            models.Usluga.slika:usluga["slika"],
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})
@app.route('/usluga_korisnik',methods=['GET','POST','DELETE','PATCH'])
@token_required
def crud_usluga_korisnik(trenutni_korisnik):
    usluga_korisnik = request.get_json()
    if request.method == 'GET':
        usluge = db.session.query(models.Korisnik_Usluga).filter(models.Korisnik_Usluga.korisnik_id == trenutni_korisnik.id).all()
        output = []
        
        for usluga in usluge:
            nova_usluga = db.session.query(models.Usluga).filter(models.Usluga.id==usluga.usluga_id).first()
            data = {
                "id":usluga.id,
                "cijena":usluga.cijena,
                "usluga":nova_usluga.naziv,
                }
            output.append(data)
        return jsonify({'Usluge' : output})

    elif request.method == 'POST':
        usluga_ID = db.session.query(models.Usluga).filter(models.Usluga.naziv==usluga_korisnik["naziv_usluge"]).first()
        print(usluga_ID.naziv)
        nova_usluga = models.Korisnik_Usluga(cijena=usluga_korisnik["cijena"],usluga_id=usluga_ID.id,korisnik_id=trenutni_korisnik.id)
        db.session.add(nova_usluga)
        db.session.commit()        
        return jsonify({"Poruka":"Usluga dodana"})

    elif request.method == 'DELETE':
        usluga_ID = db.session.query(models.Usluga).filter(models.Usluga.naziv==usluga_korisnik["naziv_usluge"]).first()
        models.Korisnik_Usluga.query.filter(models.Korisnik_Usluga.korisnik_id==usluga_ID.id).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'PUT':
        usluga_ID = models.Usluga.query.filter(models.Usluga.naziv==usluga_korisnik["naziv_usluge"]).first()

        db.session.query(models.Korisnik_Usluga).filter(models.Sadnica.naziv==usluga_korisnik["id"]).update({
            models.Korisnik_Usluga.cijena : usluga_korisnik["cijena"],
            models.Korisnik_Usluga.korisnik_id:trenutni_korisnik.id,
            models.Korisnik_Usluga.usluga_id: usluga_ID.id
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})
@app.route('/sadnica_korisnik',methods=['GET','POST','DELETE','PATCH'])
@token_required
def crud_sadnica_korisnik(trenutni_korisnik):
    sadnica_korisnik = request.get_json()
    if request.method == 'GET':
        sadnice = db.session.query(models.Korisnik_Sadnica).filter(models.Korisnik_Sadnica.korisnik_id == trenutni_korisnik.id).all()
        output = []
        
        for sadnica in sadnice:
            nova_sadnica = db.session.query(models.Sadnica).filter(models.Sadnica.id==sadnica.sadnica_id).first()
            data = {
                "id":sadnica.id,
                "cijena":sadnica.cijena,
                "usluga":nova_sadnica.naziv,
                }
            output.append(data)
        return jsonify({'Sadnice' : output})

    elif request.method == 'POST':
        nova_sadnica = db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica_korisnik["naziv"]).first()
        nova_usluga = models.Korisnik_Sadnica(cijena=sadnica_korisnik["cijena"],sadnica_id=nova_sadnica.id,korisnik_id=trenutni_korisnik.id)
        db.session.add(nova_usluga)
        db.session.commit()        
        return jsonify({"Poruka":"Sadnica dodana"})

    elif request.method == 'DELETE':
        sadnica_ID = db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica_korisnik["naziv_sadnice"]).first()
        models.Korisnik_Sadnica.query.filter(models.Korisnik_Sadnica.korisnik_id==sadnica_ID.id).delete()    
        db.session.commit() 
        return jsonify({"Poruka":"Brisanje uspjesno"})

    elif request.method == 'PATCH':
        sadnica_ID = db.session.query(models.Sadnica).filter(models.Sadnica.naziv==sadnica_korisnik["naziv"]).first()

        db.session.query(models.Korisnik_Sadnica).filter(models.Korisnik_Sadnica.sadnica_id==sadnica_ID.id).update({
            models.Korisnik_Sadnica.cijena : sadnica_korisnik["cijena"],
            models.Korisnik_Sadnica.korisnik_id:trenutni_korisnik.id,
            models.Korisnik_Sadnica.sadnica_id: sadnica_ID.id
        })    
        db.session.commit()
        return jsonify({"Poruka":"Azuriranje uspjesno"})
    return jsonify({"Poruka":"Greska"})
@app.route('/user',methods=['PATCH'])
def update_user():

    data = request.get_json()
    trenutniKorisnik = models.Korisnik.query.filter_by(ime = data['korisnicko_ime']).first()
    if not trenutniKorisnik:
        return jsonify({"Poruka":"Korisnik ne postoji"})
    if(check_password_hash(trenutniKorisnik.lozinka,data['stara_lozinka'])):
        if(data['nova_lozinka'] == data['potvrdi_novu']):
            db.session.query(models.Korisnik).filter(models.Korisnik.ime == data['korisnicko_ime']).update({models.Korisnik.lozinka:generate_password_hash(data['nova_lozinka'])},synchronize_session=False)           
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
    
